// Wikidata 解析：精选清单 → 文物基础记录（标题/说明/共享资源图/百科链接/官网检索链接）
// 策略：Qid 仅作提示（需标题相似度校验）；不达标则中英文名称搜索 + 全量实体打分
import { CURATED } from './curated.mjs';
import { MUSEUM_MAP } from './museums.mjs';
import { fetchJson, cacheGet, cacheSet, commonsThumb, norm, similarity, hashString, sleep } from './lib.mjs';

const WD = 'https://www.wikidata.org/w/api.php';
const WIKI_LANGS = ['zh', 'en', 'fr', 'de', 'ja', 'ko', 'es', 'it', 'nl', 'ru', 'no'];

// 各馆在 Wikidata 中的"收藏/馆藏"实体 Qid（校验加分，个别不准无碍）
const COLLECTION_QID = {
  louvre: 'Q19675', met: 'Q160236', moma: 'Q188740', aic: 'Q239303',
  cleveland: 'Q657415', 'british-museum': 'Q6373', 'national-gallery-london': 'Q180788',
  tate: 'Q430682', vam: 'Q213322', 'musee-rodin': 'Q1799916', rijksmuseum: 'Q190804',
  'van-gogh': 'Q224124', mauritshuis: 'Q221092', uffizi: 'Q51252', prado: 'Q160112',
  'reina-sofia': 'Q460889', khm: 'Q95569', hermitage: 'Q132783', vatican: 'Q182955',
  'tokyo-national': 'Q653098', 'korea-national': 'Q494309', 'palace-beijing': 'Q212363',
  nmc: 'Q1074324', 'shanghai-museum': 'Q854217', 'npm-taipei': 'Q540195',
  smithsonian: 'Q131626', nga: 'Q214867', getty: 'Q731126', 'terra-cotta': 'Q48541',
  'norway-national': 'Q11973411',
};

// 馆名/城市/国家 的别名（用于描述匹配）
const MUSEUM_ALIASES = {
  'palace-beijing': ['palace museum', 'forbidden city', '故宫', '故宫博物院'],
  nmc: ['national museum of china', '中国国家博物馆'],
  'shanghai-museum': ['shanghai museum', '上海博物馆'],
  'npm-taipei': ['national palace museum', '故宮', '故宫博物院', 'taipei'],
  'terra-cotta': ['terracotta', 'terracotta army', '兵马俑', 'qin shi', 'mausoleum'],
  'hubei-museum': ['hubei provincial museum', '湖北省博物馆'],
  'hunan-museum': ['hunan museum', 'hunan provincial museum', '湖南博物院', '马王堆', 'mawangdui'],
  sanxingdui: ['sanxingdui', '三星堆'],
  met: ['metropolitan museum', 'the met', '大都会'],
  moma: ['museum of modern art', 'moma', '现代艺术博物馆'],
  aic: ['art institute of chicago', '芝加哥艺术'],
  smithsonian: ['smithsonian', '史密森尼'],
  nga: ['national gallery of art', '美国国家美术馆'],
  getty: ['getty', '盖蒂'],
  cleveland: ['cleveland museum of art', '克利夫兰'],
  'british-museum': ['british museum', '大英博物馆'],
  'national-gallery-london': ['national gallery', '英国国家美术馆'],
  tate: ['tate', '泰特'],
  vam: ['victoria and albert', 'v&a', '维多利亚'],
  louvre: ['louvre', '卢浮宫'],
  'musee-rodin': ['rodin', '罗丹'],
  rijksmuseum: ['rijksmuseum', '荷兰国立', 'amsterdam'],
  'van-gogh': ['van gogh museum', '梵高博物馆'],
  mauritshuis: ['mauritshuis', '莫瑞泰斯'],
  uffizi: ['uffizi', '乌菲兹', 'florence', '佛罗伦萨'],
  prado: ['prado', '普拉多', 'madrid', '马德里'],
  'reina-sofia': ['reina sof', '索菲亚王后'],
  khm: ['kunsthistorisches', 'art history museum vienna', '维也纳艺术史'],
  hermitage: ['hermitage', '艾尔米塔什', '圣彼得堡'],
  vatican: ['vatican', '梵蒂冈'],
  'tokyo-national': ['tokyo national museum', '東京国立', '东京国立'],
  'korea-national': ['national museum of korea', '韩国国立'],
  'norway-national': ['national museum of norway', '挪威国家'],
};

function museumSearchUrl(museumId, name) {
  const tpl = SEARCH_TEMPLATES[museumId] || MUSEUM_MAP[museumId]?.website;
  if (!tpl) return null;
  return tpl.replace('{q}', encodeURIComponent(name));
}

const SEARCH_TEMPLATES = {
  met: 'https://www.metmuseum.org/art/collection/search?q={q}',
  aic: 'https://www.artic.edu/search?q={q}',
  cleveland: 'https://www.clevelandart.org/art/search?q={q}',
  moma: 'https://www.moma.org/collection/?q={q}',
  smithsonian: 'https://www.si.edu/search/collection-images?keywords={q}',
  nga: 'https://www.nga.gov/collection-search-result.html?q={q}',
  getty: 'https://www.getty.edu/art/collection/search?q={q}',
  louvre: 'https://collections.louvre.fr/en/recherche?q={q}',
  'british-museum': 'https://www.britishmuseum.org/collection/search?keyword={q}',
  rijksmuseum: 'https://www.rijksmuseum.nl/en/search?q={q}',
  'van-gogh': 'https://www.vangoghmuseum.nl/en/search?q={q}',
  mauritshuis: 'https://www.mauritshuis.nl/en/explore/collection/?q={q}',
  tate: 'https://www.tate.org.uk/search?q={q}',
  vam: 'https://collections.vam.ac.uk/search/?q={q}',
  'national-gallery-london': 'https://www.nationalgallery.org.uk/search?q={q}',
  uffizi: 'https://www.uffizi.it/en/artworks?search={q}',
  prado: 'https://www.museodelprado.es/en/the-collection/search?q={q}',
  'tokyo-national': 'https://colbase.nich.go.jp/collection/?q={q}',
  khm: 'https://www.khm.at/en/objectdb/search/?q={q}',
  'palace-beijing': 'https://digicol.dpm.org.cn/search?searchValue={q}',
  'npm-taipei': 'https://digitalarchive.npm.gov.tw/Collection/Search?q={q}',
};

function claimValues(ent, prop) {
  const claims = ent?.claims?.[prop] || [];
  return claims
    .map((c) => c?.mainsnak?.datavalue?.value)
    .filter((v) => v !== undefined && v !== null);
}

function claimEntityIds(ent, prop) {
  return claimValues(ent, prop).map((v) => (typeof v === 'object' ? v.id : v));
}

function getLabel(ent) {
  const labels = ent.labels || {};
  for (const lang of WIKI_LANGS) if (labels[lang]) return labels[lang].value;
  return labels.en?.value || Object.values(labels)[0]?.value || '';
}

function getDescription(ent) {
  const descs = ent.descriptions || {};
  for (const lang of WIKI_LANGS) if (descs[lang]) return descs[lang].value;
  return '';
}

function getWikiUrl(ent) {
  const links = ent.sitelinks || {};
  const zh = links.zhwiki?.title;
  const en = links.enwiki?.title;
  const target = zh || en;
  if (!target) return null;
  const lang = zh ? 'zh' : 'en';
  return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(target.replace(/ /g, '_'))}`;
}

async function getEntity(qid) {
  const cached = cacheGet(`wd-${qid}.json`);
  if (cached) return cached;
  const url = `${WD}?action=wbgetentities&ids=${qid}&props=labels|descriptions|claims|sitelinks&languages=${WIKI_LANGS.join('|')}&format=json&origin=*&maxlag=5`;
  const data = await fetchJson(url, { retries: 4 });
  const ent = data?.entities?.[qid];
  if (ent) cacheSet(`wd-${qid}.json`, ent);
  await sleep(300);
  return ent || null;
}

async function searchEntities(name, lang) {
  const key = `wds-${hashString(name + '::' + lang)}.json`;
  const cached = cacheGet(key);
  if (cached) return cached;
  const url = `${WD}?action=wbsearchentities&search=${encodeURIComponent(name)}&language=${lang}&uselang=${lang}&limit=8&format=json&origin=*&maxlag=5`;
  const data = await fetchJson(url, { retries: 4 });
  const list = data?.search || [];
  cacheSet(key, list);
  await sleep(300);
  return list;
}

// 去掉括号消歧义后缀："The Harvesters (Bruegel)" → "The Harvesters"
function stripParen(s) {
  return String(s || '').replace(/\s*[（(].*?[)）]\s*/g, ' ').trim();
}

function isCjk(s) {
  return /[\u4e00-\u9fff]/.test(s || '');
}

// 维基百科摘要（增强"说明"字段；按文物所在语言取 zh 优先）
async function getWikiExtract(qid, lang, title) {
  const key = `wks-${qid}.json`;
  const cached = cacheGet(key);
  if (cached) return cached;
  try {
    const data = await fetchJson(
      `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`,
      { retries: 2, timeout: 15000 },
    );
    const out = (data?.extract || '').slice(0, 420);
    cacheSet(key, out);
    await sleep(250);
    return out;
  } catch {
    return '';
  }
}

// 实体打分：标题相似度(重) + 收藏馆匹配 + 馆名/城市/国家描述 + 有图 + 有百科
function scoreEntity(ent, entry, museum) {
  let score = 0;
  const labels = Object.values(ent.labels || {}).map((l) => l.value);
  const aliases = Object.values(ent.aliases || {}).flat().map((a) => a.value);
  const descs = Object.values(ent.descriptions || {}).map((d) => d.value);
  const targetNorm = norm(entry.name);

  let bestSim = 0;
  const targets = [entry.name, stripParen(entry.name), entry.zh].filter(Boolean);
  for (const t of targets) {
    for (const l of labels) bestSim = Math.max(bestSim, similarity(norm(t), norm(l)));
    for (const a of aliases) bestSim = Math.max(bestSim, similarity(norm(t), norm(a)));
  }
  score += bestSim * 8;

  const collQid = COLLECTION_QID[museum.id];
  if (collQid && claimEntityIds(ent, 'P195').includes(collQid)) score += 5;

  const hay = [...labels, ...aliases, ...descs].join(' ').toLowerCase();
  const needles = [...(MUSEUM_ALIASES[museum.id] || []), museum.name, museum.nameEn, museum.city, museum.country]
    .filter(Boolean)
    .map((s) => s.toLowerCase());
  for (const n of needles) {
    if (hay.includes(n)) {
      score += 3;
      break;
    }
  }

  if (claimValues(ent, 'P18').length) score += 1;
  if (ent.sitelinks?.zhwiki || ent.sitelinks?.enwiki) score += 0.5;
  return { score, bestSim };
}

async function buildArtifact(ent, entry, museum, scoreInfo) {
  const imageFile = claimValues(ent, 'P18')[0];
  const art = {
    museumId: museum.id,
    qid: ent.id,
    title: getLabel(ent) || entry.zh || entry.name,
    titleEn: ent.labels?.en?.value || '',
    description: getDescription(ent) || '',
    imageUrl: commonsThumb(imageFile, 1000),
    imageThumb: commonsThumb(imageFile, 420),
    wikiUrl: getWikiUrl(ent),
    sourceUrl: museumSearchUrl(museum.id, entry.name),
    tags: [],
    _score: scoreInfo?.score ?? 0,
  };
  const metId = claimValues(ent, 'P3634')[0];
  if (metId !== undefined) art._metId = String(metId);

  // 说明太短时用维基百科摘要补足（原文语言）
  if ((art.description || '').length < 60) {
    const zhTitle = ent.sitelinks?.zhwiki?.title;
    const enTitle = ent.sitelinks?.enwiki?.title;
    if (zhTitle || enTitle) {
      const sumLang = zhTitle ? 'zh' : 'en';
      const sumTitle = zhTitle || enTitle;
      const extract = await getWikiExtract(ent.id, sumLang, sumTitle);
      if (extract) {
        art.wikiExtract = extract;
        art.wikiLang = sumLang;
      }
    }
  }
  return art;
}

async function resolveEntry(entry) {
  const museum = MUSEUM_MAP[entry.museum];
  if (!museum) return { ok: false, reason: `unknown museum ${entry.museum}` };

  const candidates = new Map(); // qid -> {ent, score, bestSim}

  // 1) Qid 提示：可信（标题高度相似）则直接采用
  if (entry.qid) {
    const ent = await getEntity(entry.qid);
    if (ent) {
      const { score, bestSim } = scoreEntity(ent, entry, museum);
      candidates.set(entry.qid, { ent, score, bestSim });
      if (score >= 5.5) {
        return { ok: true, art: await buildArtifact(ent, entry, museum, { score }) };
      }
    }
  }

  // 2) 中英文名称搜索（去掉括号后缀；中文查询用 zh 语言）→ 对候选拉全量实体再打分
  const rawQueries = [entry.name, entry.zh].filter(Boolean);
  const queries = [...new Set(rawQueries.map((q) => stripParen(q)).concat(rawQueries))];
  for (const q of queries) {
    let results = [];
    try {
      results = await searchEntities(q, isCjk(q) ? 'zh' : 'en');
    } catch {
      /* 继续 */
    }
    for (const cand of results.slice(0, 5)) {
      if (candidates.has(cand.id)) continue;
      const ent = await getEntity(cand.id);
      if (ent) {
        const { score, bestSim } = scoreEntity(ent, entry, museum);
        candidates.set(cand.id, { ent, score, bestSim });
      }
    }
  }

  const ranked = [...candidates.values()]
    .filter((c) => c.score >= 4)
    .sort((a, b) => b.score - a.score);
  if (ranked.length) {
    return { ok: true, art: await buildArtifact(ranked[0].ent, entry, museum, { score: ranked[0].score }) };
  }
  const best = [...candidates.values()].sort((a, b) => b.score - a.score)[0];
  return { ok: false, reason: `no good match (best score ${best?.score ?? 0}, sim ${best?.bestSim ?? 0})` };
}

export async function resolveAll() {
  const artifacts = [];
  const failures = [];
  let i = 0;
  for (const entry of CURATED) {
    i++;
    try {
      const r = await resolveEntry(entry);
      if (r.ok) {
        artifacts.push(r.art);
      } else {
        failures.push({ museum: entry.museum, name: entry.name, zh: entry.zh, reason: r.reason });
      }
    } catch (e) {
      failures.push({ museum: entry.museum, name: entry.name, zh: entry.zh, reason: `exception: ${e.message?.slice(0, 120)}` });
    }
    if (i % 20 === 0) console.log(`  wikidata resolved ${i}/${CURATED.length}`);
  }
  console.log(`Wikidata: ${artifacts.length} resolved, ${failures.length} failed`);
  for (const f of failures.slice(0, 50)) {
    console.log(`  FAIL [${f.museum}] ${f.zh || f.name}: ${f.reason}`);
  }
  return artifacts;
}
