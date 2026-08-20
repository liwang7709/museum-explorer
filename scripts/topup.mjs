// 精准补量：只解析指定条目并合并进现有数据（避免全量重跑）
// 用法：node scripts/topup.mjs
import fs from 'node:fs';
import { resolveEntry } from './fetch-wikidata.mjs';
import { CURATED } from './curated.mjs';
import { MUSEUM_MAP, COUNTRIES } from './museums.mjs';
import { DATA_DIR, writeJson, pickByDate, hashString, todayStr, isoNow } from './lib.mjs';

// 需要补量的条目（按 zh 名定位）
const WANT = new Set([
  // 荷兰
  '代尔夫特小巷', '斯塔尔梅斯特（布商行会理事）', '夫妇肖像（哈尔斯）', '纽南的牧师花园',
  // 挪威
  '星光之夜（蒙克）', '月光（蒙克）', '夏夜之梦（蒙克）', '胸针（蒙克）',
  // 日本
  '蒙古袭来绘词', '一遍圣绘', '玄奘三藏绘', '圣德太子绘传', '地狱草纸', '平治物语绘卷',
  // 梵蒂冈
  '大洪水（西斯廷天顶）', '利比亚女先知', '德尔斐女先知', '库米女先知', '耶利米先知（西斯廷）',
  // 奥地利
  '亚当与夏娃（克拉纳赫）', '春（阿尔钦博托）', '尼德兰谚语（勃鲁盖尔）', '苏珊娜与长老（丁托列托）', '基督受洗（委罗内塞）', '圣塞巴斯蒂安（鲁本斯）', '贪婪（勃鲁盖尔）',
  // 中国台湾
  '苕溪诗帖', '秋山问道图', '江行初雪图', '关山行旅图', '明皇幸蜀图', '汉宫春晓图', '韩熙载夜宴图（台北）', '洞天山堂图', '山路松声图', '十二景册页（沈周）',
  // 韩国
  '土偶装饰长颈壶', '青铜银入丝葡水禽纹净瓶', '金铜狮子香炉', '石造三尊佛立像', '青瓷阳刻莲唐草纹瓶', '新罗金制冠饰', '百济金铜光背', '木造阿弥陀如来坐像', '金刚力士像', '青铜金鼓', '青瓷狮子盖香炉', '新罗石灯',
  // 梵蒂冈/韩国 精准 qid 补量
  '维也纳的扬·索别斯基', '奥特里科利的宙斯', '梅利埃格（斯科帕斯）', '圣殇（米开朗基罗）', '科罗纳的维纳斯', '克利奥帕特拉七世雕像',
  '金铜如来立像（皇龙寺）', '新罗金项链（诺瑟洞）', '金铃冢金冠', '岁寒图（金正喜）', '仁王霁色图', '武宁王妃金制冠饰', '兽面纹青铜炉', '皇南大冢南坟金项链',
]);

async function main() {
  const existing = JSON.parse(fs.readFileSync(`${DATA_DIR}/artifacts.json`, 'utf8'));
  const byTitle = new Map(existing.artifacts.map((a) => [a.title, a]));
  const entries = CURATED.filter((e) => WANT.has(e.zh) && !byTitle.has(e.zh));
  console.log(`待解析 ${entries.length} 条`);
  const added = [];
  for (const entry of entries) {
    try {
      const r = await resolveEntry(entry);
      if (r.ok) {
        added.push(r.art);
        console.log(`  ✓ ${entry.zh} → ${r.art.qid} ${r.art.title}`);
      } else {
        console.log(`  ✗ ${entry.zh}: ${r.reason}`);
      }
    } catch (e) {
      console.log(`  ✗ ${entry.zh}: ${e.message?.slice(0, 90)}`);
    }
  }
  if (!added.length) {
    console.log('无新增，退出');
    return;
  }

  const museums = JSON.parse(fs.readFileSync(`${DATA_DIR}/museums.json`, 'utf8'));
  // 先按 qid 对现有数据去重（保留有图的第一条）
  const seenQid = new Set();
  const dedupBase = [];
  for (const a of existing.artifacts) {
    if (a.qid && seenQid.has(a.qid)) continue;
    if (a.qid) seenQid.add(a.qid);
    dedupBase.push(a);
  }
  const finalArtifacts = [...dedupBase];
  for (const a of added) {
    if (a.qid && seenQid.has(a.qid)) continue;
    if (a.qid) seenQid.add(a.qid);
    const museum = MUSEUM_MAP[a.museumId];
    const jitter = (hashString(a.qid + a.museumId) % 100) / 1000;
    const { _score, _metId, ...rest } = a;
    finalArtifacts.push({
      ...rest,
      id: `${a.museumId}-${a.qid}`,
      popularity: Math.min(1, Math.max(0.1, (museum?.heat || 0.5) + jitter)),
      imageSource: museum?.dataSource === 'official-api' ? 'official' : 'commons',
      sourceLabel: museum?.dataSource === 'official-api' ? '官网开放数据' : '官网/维基共享资源',
    });
  }
  // 保持与 build-data 一致的排序与计数
  finalArtifacts.sort((a, b) => b.popularity - a.popularity);
  const byMuseum = {};
  for (const a of finalArtifacts) byMuseum[a.museumId] = (byMuseum[a.museumId] || 0) + 1;
  museums.museums = museums.museums.map((m) => ({ ...m, count: byMuseum[m.id] || 0 }));
  museums.generatedAt = isoNow();

  const today = todayStr();
  const sortedByPop = [...finalArtifacts].sort((a, b) => b.popularity - a.popularity);
  const popRank = new Map(sortedByPop.map((a, i) => [a.id, i + 1]));
  const topByPop = sortedByPop.slice(0, 30);
  const todayFile = JSON.parse(fs.readFileSync(`${DATA_DIR}/today.json`, 'utf8'));
  todayFile.hotTerms = pickByDate(topByPop, today, 5).map((a) => {
    const museum = MUSEUM_MAP[a.museumId];
    return {
      term: a.title,
      reason: `${museum?.name || ''}馆藏 · 综合热度TOP${popRank.get(a.id)}${museum?.heatLabel ? ' · ' + museum.heatLabel : ''}`,
    };
  });
  todayFile.generatedAt = isoNow();

  writeJson(`${DATA_DIR}/artifacts.json`, { ...existing, generatedAt: isoNow(), total: finalArtifacts.length, artifacts: finalArtifacts });
  writeJson(`${DATA_DIR}/museums.json`, museums);
  writeJson(`${DATA_DIR}/today.json`, todayFile);

  const byRegion = {};
  for (const a of finalArtifacts) {
    const c = MUSEUM_MAP[a.museumId]?.country || '?';
    byRegion[c] = (byRegion[c] || 0) + 1;
  }
  console.log('──────────── 补量完成 ────────────');
  console.log(`文物总数: ${finalArtifacts.length}`);
  console.log('每区数量: ' + Object.entries(byRegion).sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c}${n}`).join(' / '));
}

main().catch((e) => {
  console.error('补量失败:', e);
  process.exit(1);
});
