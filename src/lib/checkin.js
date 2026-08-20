// 打卡：本浏览器 localStorage 记录（点图 / 点详情 / 点百科均计一次）
const KEY = 'museumExplorer.checkins.v1';

export function getCheckins() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function recordCheckin(id) {
  const m = getCheckins();
  if (!m[id]) {
    m[id] = Date.now();
    try {
      localStorage.setItem(KEY, JSON.stringify(m));
    } catch {
      /* 隐私模式等场景静默失败 */
    }
    return true;
  }
  return false;
}

export function countCheckins() {
  return Object.keys(getCheckins()).length;
}

export function isViewed(id) {
  return Object.prototype.hasOwnProperty.call(getCheckins(), id);
}

// 清理已不在当前数据中的打卡记录（如文物下线/ID迁移），避免脏计数
export function pruneCheckins(validIds) {
  const m = getCheckins();
  let changed = false;
  for (const k of Object.keys(m)) {
    if (!validIds.has(k)) {
      delete m[k];
      changed = true;
    }
  }
  if (changed) {
    try {
      localStorage.setItem(KEY, JSON.stringify(m));
    } catch {
      /* 忽略 */
    }
  }
  return Object.keys(m).length;
}
