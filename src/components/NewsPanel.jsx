function fmtTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const now = Date.now();
  const diff = now - d.getTime();
  if (diff < 3600e3) return `${Math.max(1, Math.floor(diff / 60e3))}分钟前`;
  if (diff < 86400e3) return `${Math.floor(diff / 3600e3)}小时前`;
  if (diff < 86400e3 * 7) return `${Math.floor(diff / 86400e3)}天前`;
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function NewsPanel({ items, updatedAt }) {
  if (!items.length) {
    return <p className="news-empty">资讯暂未更新，稍后再来看看～</p>;
  }
  return (
    <ul className="news-list">
      {items.map((it, i) => (
        <li key={`${it.url}-${i}`}>
          <a href={it.url} target="_blank" rel="noopener noreferrer">
            <span className="news-title">{it.title}</span>
            <span className="news-meta">
              <span className={`lang-badge ${it.lang === 'zh' ? 'zh' : 'en'}`}>
                {it.lang === 'zh' ? '中文' : 'EN'}
              </span>
              {it.source} · {fmtTime(it.date)}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
