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
