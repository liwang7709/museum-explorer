// 数据管道编排：Wikidata 解析 → 官方 API 增强 → 资讯聚合 → 生成 public/data/*.json
import { resolveAll } from './fetch-wikidata.mjs';
import { enrichOfficial } from './fetch-official.mjs';
import { fetchNews } from './fetch-news.mjs';
import { probePalace, enrichPalace } from './fetch-palace.mjs';
import { MUSEUMS, MUSEUM_MAP, COUNTRIES } from './museums.mjs';
import { DATA_DIR, writeJson, pickByDate, hashString, todayStr, isoNow, cacheGet } from './lib.mjs';

function groupBy(list, key) {
  const m = new Map();
  for (const it of list) {
    const k = it[key];
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(it);
  }
  return m;
}

async function main() {
  console.log('[1/5] Wikidata 解析精选文物…');
  const raw = await resolveAll();

  console.log('[2/5] 官方开放 API 增强（MET/AIC/Cleveland/故宫）…');
  let artifacts = await enrichOfficial(raw);
  const palaceOk = await probePalace();
  if (palaceOk) artifacts = await enrichPalace(artifacts);
  else console.log('  故宫数字文物库 API 不可用，使用维基共享资源图片兜底');

  console.log('[3/5] 全球展览资讯聚合…');
  let news = cacheGet('news.json');
  try {
    news = await fetchNews();
  } catch (e) {
    console.log('  资讯抓取失败，使用上次缓存:', e.message?.slice(0, 100));
  }

  console.log('[4/5] 组装博物馆与文物数据…');
  const byMuseum = groupBy(artifacts, 'museumId');
  const museums = MUSEUMS.map((m) => {
    const count = byMuseum.get(m.id)?.length || 0;
    return { ...m, count };
  }).filter((m) => m.count > 0);

  const finalArtifacts = artifacts
    .map((a, i) => {
      const museum = MUSEUM_MAP[a.museumId];
      const jitter = (hashString(a.qid + a.museumId) % 100) / 1000;
      const { _score, _metId, ...rest } = a;
      return {
        ...rest,
        id: `${a.museumId}-${i}`,
        popularity: Math.min(1, Math.max(0.1, (museum?.heat || 0.5) + jitter)),
        imageSource: museum?.dataSource === 'official-api' ? 'official' : 'commons',
        sourceLabel: museum?.dataSource === 'official-api' ? '官网开放数据' : '官网/维基共享资源',
      };
    })
    .sort((a, b) => b.popularity - a.popularity);

  const generatedAt = isoNow();
  writeJson(`${DATA_DIR}/museums.json`, { generatedAt, countries: COUNTRIES, museums });
  writeJson(`${DATA_DIR}/artifacts.json`, {
    generatedAt,
    total: finalArtifacts.length,
    note: '文物数据来源：各馆官网开放数据（MET/AIC/Cleveland/故宫数字文物库）+ 维基共享资源（附官网链接）。',
    artifacts: finalArtifacts,
  });
  writeJson(`${DATA_DIR}/news.json`, news || { generatedAt, items: [] });

  console.log('[5/5] 生成每日批次（日期种子确定性轮换）…');
  const today = todayStr();
  const picks = pickByDate(finalArtifacts, today, 16);
  const topByPop = [...finalArtifacts].sort((a, b) => b.popularity - a.popularity).slice(0, 30);
  const hotTerms = pickByDate(topByPop, today, 5).map((a) => a.title);
  const hotMuseumIds = [...museums].sort((a, b) => b.heat - a.heat).slice(0, 10).map((m) => m.id);
  writeJson(`${DATA_DIR}/today.json`, {
    date: today,
    generatedAt,
    picks: picks.map((a) => a.id),
    hotTerms,
    hotMuseumIds,
  });

  console.log('──────────── 完成 ────────────');
  console.log(`文物总数: ${finalArtifacts.length}`);
  console.log(`博物馆数: ${museums.length}`);
  console.log(`今日推荐: ${picks.length} 件 | 热门检索词: ${hotTerms.join(' / ')}`);
  console.log(`资讯条目: ${news?.items?.length || 0}`);
  const noImg = finalArtifacts.filter((a) => !a.imageUrl);
  const noWiki = finalArtifacts.filter((a) => !a.wikiUrl);
  if (noImg.length) console.log(`⚠ 无图片: ${noImg.length} (${noImg.slice(0, 8).map((a) => a.title).join(', ')})`);
  if (noWiki.length) console.log(`⚠ 无维基链接: ${noWiki.length} (${noWiki.slice(0, 8).map((a) => a.title).join(', ')})`);
}

main().catch((e) => {
  console.error('数据管道失败:', e);
  process.exit(1);
});
