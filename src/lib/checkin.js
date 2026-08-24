// 打卡：本浏览器 localStorage 记录（点图 / 点详情 / 点百科 / ChatGPT 均计一次）
// 存储格式：{ [artifactId]: { t: 时间戳, s: 文物快照 } }
// 快照保证：即使文物日后从数据集中移除，累计数与历史列表也不丢失（持续积累，永不清零）
// 兼容性：读取时自动合并早期 v1 格式（{id: 时间戳}）并一次性迁移到 v2

const KEY_V1 = 'museumExplorer.checkins.v1';
const KEY_V2 = 'museumExplorer.checkins.v2';

function normalizeEntry(v) {
  if (typeof v === 'number') return { t: v, s: null }; // 旧格式 {id: 时间戳}
  if (v && typeof v === 'object' && v.t) return { t: v.t, s: v.s || null };
  return null;
}

function parse() {
  try {
    const merged = {};
    // v1（历史数据，可能含更早的打卡记录）
    const v1 = JSON.parse(localStorage.getItem(KEY_V1)) || {};
    let v1Count = 0;
    for (const [id, v] of Object.entries(v1)) {
      const e = normalizeEntry(v);
      if (e) {
        merged[id] = e;
        v1Count++;
      }
    }
    // v2（当前数据，优先）
    const v2 = JSON.parse(localStorage.getItem(KEY_V2)) || {};
    for (const [id, v] of Object.entries(v2)) {
      const e = normalizeEntry(v);
      if (e) merged[id] = e;
    }
    // 一次性迁移：v1 并入 v2 后清除 v1
    if (v1Count > 0) {
      try {
        localStorage.setItem(KEY_V2, JSON.stringify(merged));
        localStorage.removeItem(KEY_V1);
      } catch {
        /* 忽略 */
      }
    }
    return merged;
  } catch {
    return {};
  }
}

function save(m) {
  try {
    localStorage.setItem(KEY_V2, JSON.stringify(m));
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

// 累计（永不清零，含历史迁移数据）
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
