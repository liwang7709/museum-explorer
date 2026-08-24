import { useMemo } from 'react';
import ImgWithFallback from './ImgWithFallback.jsx';
import { getHistory } from '../lib/checkin.js';

function dateLabel(ts) {
  const d = new Date(ts);
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOf = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.round((startToday - startOf) / 86400000);
  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

// 历史页：按日期分组倒序，卡片信息与首页推荐一致（快照兜底，永不清零）
export default function HistoryPage({ artifacts, museumById, onOpen, onBack }) {
  const byId = useMemo(() => new Map(artifacts.map((a) => [a.id, a])), [artifacts]);

  const groups = useMemo(() => {
    const list = getHistory().map((h) => {
      const current = byId.get(h.id);
      const info = h.snapshot || current;
      return {
        id: h.id,
        t: h.t,
        label: dateLabel(h.t),
        title: info?.title || '（文物）',
        museumId: info?.museumId || current?.museumId || '',
        imageUrl: h.snapshot?.imageUrl || current?.imageUrl || null,
        imageThumb: h.snapshot?.imageThumb || current?.imageThumb || null,
        wikiUrl: h.snapshot?.wikiUrl || current?.wikiUrl || null,
        artifact: current || null,
        // 旧记录（无快照且无法映射回当前文物）只有时间信息
        hasData: !!(h.snapshot || current),
      };
    });
    const g = new Map();
    for (const item of list) {
      if (!g.has(item.label)) g.set(item.label, []);
      g.get(item.label).push(item);
    }
    return [...g.entries()];
  }, [byId]);

  return (
    <main className="history-page">
      <div className="history-head">
        <button className="btn btn-ghost" onClick={onBack}>← 返回首页</button>
        <h2>🎫 我的文物打卡历史（累计 {getHistory().length} 件）</h2>
        <span />
      </div>
      {groups.length === 0 ? (
        <p className="empty">还没有打卡记录，点开任意文物即可开始～</p>
      ) : (
        groups.map(([label, items]) => (
          <section key={label} className="history-group">
            <h3 className="history-date">{label}</h3>
            <div className="artifact-grid">
              {items.map((item) =>
                !item.hasData ? (
                  // 历史旧记录：无快照且无法映射回当前文物（仅保留打卡时间与计数）
                  <div key={item.id} className="history-legacy">
                    <span>🕰 已查看的文物（历史旧记录）</span>
                    <span className="history-time">{new Date(item.t).toLocaleString('zh-CN')}</span>
                  </div>
                ) : (
                <article
                  key={item.id}
                  className={`artifact-card ${item.artifact ? '' : 'history-ghost'}`}
                  onClick={() => item.artifact && onOpen(item.artifact)}
                  style={item.artifact ? { cursor: 'pointer' } : undefined}
                >
                  <div className="artifact-media">
                    <ImgWithFallback
                      src={item.imageUrl}
                      thumb={item.imageThumb}
                      alt={item.title}
                      className="artifact-img"
                    />
                  </div>
                  <div className="artifact-body">
                    <h3 className="artifact-title">{item.title}</h3>
                    <p className="artifact-museum">
                      {museumById.get(item.museumId)?.name || ''}
                      {museumById.get(item.museumId)?.city ? ` · ${museumById.get(item.museumId).city}` : ''}
                      <span className="history-time">{new Date(item.t).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
                    </p>
                    <div className="artifact-actions">
                      {item.wikiUrl && (
                        <a
                          className="btn btn-wiki"
                          href={item.wikiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          📖 维基百科
                        </a>
                      )}
                      {item.artifact && (
                        <button className="btn btn-detail" onClick={() => onOpen(item.artifact)}>
                          查看详情
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}
