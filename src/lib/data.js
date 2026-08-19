// 数据加载：任一数据文件失败不影响整站（互不影响、可独立兜底）
async function loadJson(path) {
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path}`);
  return res.json();
}

export async function loadAll() {
  const [museums, artifacts, news, today] = await Promise.all([
    loadJson('./data/museums.json').catch(() => null),
    loadJson('./data/artifacts.json').catch(() => null),
    loadJson('./data/news.json').catch(() => null),
    loadJson('./data/today.json').catch(() => null),
  ]);
  return {
    museums: museums?.museums || [],
    countries: museums?.countries || [],
    generatedAt: museums?.generatedAt || null,
    artifacts: artifacts?.artifacts || [],
    news: news?.items || [],
    newsGeneratedAt: news?.generatedAt || null,
    today: today || null,
  };
}

// 检索：标题/英文名/说明/维基摘要/馆名/标签 的子串匹配
export function searchArtifacts(artifacts, museumById, query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return artifacts.filter((a) => {
    const museum = museumById.get(a.museumId);
    const hay = [
      a.title, a.titleEn, a.description, a.wikiExtract,
      museum?.name, museum?.nameEn, museum?.city,
      ...(a.tags || []),
    ].filter(Boolean).join(' ').toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}
