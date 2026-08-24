// 官方开放 API 增强：MET / Art Institute of Chicago / Cleveland
// 用官方接口补充官网大图、官网详情页、更完整的原始语言说明。
import { fetchJson, commonsThumb, similarity, norm, sleep } from './lib.mjs';

function enrichDescription(art, fields) {
  const parts = [
    fields.artist && `${fields.artist}`,
    fields.dateText && `Date: ${fields.dateText}`,
    fields.medium && `Medium: ${fields.medium}`,
    fields.culture && `Culture: ${fields.culture}`,
    fields.period && `Period: ${fields.period}`,
    fields.department && `Department: ${fields.department}`,
    fields.extra && `${fields.extra}`,
  ].filter(Boolean);
  const text = parts.join('  ·  ');
  return art.description ? `${art.description} — ${text}` : text;
}

// ── MET ────────────────────────────────────────────────
async function enrichMet(art) {
  // Wikidata 属性 P3634 = Metropolitan Museum of Art ID
  const metId = art._metId;
  if (!metId) return art;
  const o = await fetchJson(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${metId}`, { retries: 2 });
  if (!o?.objectID) return art;
  const big = (o.primaryImage || '').replace('/original/', '/web-large/');
  const hasZhTitle = /[\u4e00-\u9fff]/.test(art.title || '');
  return {
    ...art,
    // 已有中文标题时保留（如 神奈川冲浪里），否则用官网英文标题
    title: hasZhTitle ? art.title : o.title || art.title,
    imageUrl: big || art.imageUrl,
    imageThumb: o.primaryImageSmall || art.imageThumb,
    // 官网详情页与检索页分离：detailUrl=藏品详情，sourceUrl=官网检索（列表）
    detailUrl: o.objectURL || art.detailUrl,
    sourceUrl: art.sourceUrl,
    description: enrichDescription(art, {
      artist: o.artistDisplayName,
      dateText: o.objectDate,
      medium: o.medium,
      culture: o.culture,
      period: o.period,
      department: o.department,
    }),
    tags: ['MET'],
  };
}

// ── Art Institute of Chicago ───────────────────────────
async function enrichArtic(art) {
  const name = norm(art.titleEn || art.title);
  if (!name) return art;
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(name)}&limit=5&fields=id,title,image_id,artist_title,date_display,medium_display,place_of_origin,description,api_link`;
  const data = await fetchJson(url, { retries: 2 });
  const rows = data?.data || [];
  let best = null;
  let bestSim = 0.4;
  for (const r of rows) {
    const s = similarity(name, norm(r.title));
    if (s > bestSim) {
      bestSim = s;
      best = r;
    }
  }
  if (!best) return art;
  const img = best.image_id
    ? `https://www.artic.edu/iiif/2/${best.image_id}/full/1200,/0/default.jpg`
    : null;
  return {
    ...art,
    title: best.title || art.title,
    // 官方图优先；缩略图保留维基共享资源版作为浏览器兜底（官方 CDN 可能拦截跨站热链）
    imageUrl: img || art.imageUrl,
    imageThumb: art.imageThumb || img,
    detailUrl: `https://www.artic.edu/artworks/${best.id}`,
    sourceUrl: art.sourceUrl,
    officialDescription: best.description || null, // 官网长说明（用于看点，独立字段）
    description: enrichDescription(art, {
      artist: best.artist_title,
      dateText: best.date_display,
      medium: best.medium_display,
      culture: best.place_of_origin,
      department: 'Art Institute of Chicago',
    }),
    tags: ['AIC'],
  };
}

// ── Cleveland Museum of Art ────────────────────────────
async function enrichCleveland(art) {
  const name = norm(art.titleEn || art.title);
  if (!name) return art;
  const url = `https://openaccess-api.clevelandart.org/api/artworks/?q=${encodeURIComponent(name)}&limit=5`;
  const data = await fetchJson(url, { retries: 2 });
  const rows = data?.data || [];
  let best = null;
  let bestSim = 0.4;
  for (const r of rows) {
    const s = similarity(name, norm(r.title));
    if (s > bestSim) {
      bestSim = s;
      best = r;
    }
  }
  if (!best) return art;
  const img = best.images?.web?.url || null;
  return {
    ...art,
    title: best.title || art.title,
    imageUrl: img || art.imageUrl,
    imageThumb: art.imageThumb || img,
    detailUrl: `https://www.clevelandart.org/art/${best.id}`,
    sourceUrl: art.sourceUrl,
    officialDescription: best.description || null, // 官网长说明（用于看点，独立字段）
    description: enrichDescription(art, {
      artist: best.creators?.map((c) => c.description).filter(Boolean).join(', '),
      dateText: best.creation_date,
      medium: best.technique,
      culture: best.culture?.[0],
    }),
    tags: ['CMA'],
  };
}

export async function enrichOfficial(artifacts) {
  const out = [];
  let done = 0;
  for (const art of artifacts) {
    let a = art;
    if (a.museumId === 'met') a = await enrichMet(a);
    else if (a.museumId === 'aic') a = await enrichArtic(a);
    else if (a.museumId === 'cleveland') a = await enrichCleveland(a);
    delete a._metId;
    out.push(a);
    done++;
    await sleep(150);
    if (done % 10 === 0) console.log(`  official enriched ${done}/${artifacts.length}`);
  }
  return out;
}
