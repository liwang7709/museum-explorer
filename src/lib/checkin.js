// 打卡：本浏览器 localStorage 记录（点图 / 点详情 / 点百科 / ChatGPT 均计一次）
// 存储格式：{ [artifactId]: { t: 时间戳, s: 文物快照 } }
// 快照保证：即使文物日后从数据集中移除，累计数与历史列表也不丢失（持续积累，永不清零）
const KEY = 'museumExplorer.checkins.v2';

function parse() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY)) || {};
    const out = {};
    for (const [id, v] of Object.entries(raw)) {
      if (typeof v === 'number') {
        // 兼容旧格式 {id: 时间戳}
        out[id] = { t: v, s: null };
      } else if (v && typeof v === 'object' && v.t) {
        out[id] = { t: v.t, s: v.s || null };
      }
    }
    return out;
  } catch {
    return {};
  }
}

function save(m) {
  try {
    localStorage.setItem(KEY, JSON.stringify(m));
  } catch {
    /* 隐私模式等场景静默失败 */
  }
}

function snapshotOf(artifact) {
  if (!artifact) return null;
  return {
    title: artifact.title || '',
    museumId: artifact.museumId || '',
    qid: artifact.qid || '',
    imageUrl: artifact.imageUrl || null,
    imageThumb: artifact.imageThumb || null,
    wikiUrl: artifact.wikiUrl || null,
  };
}

// 记录打卡；snapshot 为文物快照（有则存，历史永远可展示）
export function recordCheckin(id, artifact) {
  const m = parse();
  if (!m[id]) {
    m[id] = { t: Date.now(), s: snapshotOf(artifact) };
    save(m);
    return true;
  }
  return false;
}

export function isViewed(id) {
  return Object.prototype.hasOwnProperty.call(parse(), id);
}

// 累计（永不清零）
export function countTotal() {
  return Object.keys(parse()).length;
}

// 今日（本地时区 0 点起）
export function countToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const t0 = start.getTime();
  return Object.values(parse()).filter((v) => v.t >= t0).length;
}

// 历史：按时间倒序，含快照
export function getHistory() {
  return Object.entries(parse())
    .map(([id, v]) => ({ id, t: v.t, snapshot: v.s }))
    .sort((a, b) => b.t - a.t);
}

// 已看过的文物 id 集合（用于推荐过滤）
export function getViewedIds() {
  return new Set(Object.keys(parse()));
}
