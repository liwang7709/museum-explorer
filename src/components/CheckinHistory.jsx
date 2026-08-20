import ImgWithFallback from './ImgWithFallback.jsx';
import { getCheckins } from '../lib/checkin.js';

// 打卡历史：按时间倒序，卡片信息与推荐一致
export default function CheckinHistory({ artifacts, museumById, onOpen, onClose }) {
  const byId = new Map(artifacts.map((a) => [a.id, a]));
  const list = Object.entries(getCheckins())
    .map(([id, ts]) => ({ artifact: byId.get(id), ts }))
    .filter((x) => x.artifact)
    .sort((a, b) => b.ts - a.ts);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal history-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-bar">
          <span className="modal-bar-title">🎫 我的文物打卡历史（共 {list.length} 件）</span>
          <button className="modal-close" onClick={onClose} aria-label="关闭">✕</button>
        </div>
        <div className="modal-scroll">
          <div className="history-list">
            {list.map(({ artifact, ts }) => (
              <div
                className="history-item"
                key={artifact.id}
                onClick={() => {
                  onClose();
                  onOpen(artifact);
                }}
              >
                <ImgWithFallback
                  src={artifact.imageUrl}
                  thumb={artifact.imageThumb}
                  alt={artifact.title}
                  className="history-img"
                />
                <div className="history-info">
                  <div className="history-title">{artifact.title}</div>
                  <div className="history-meta">
                    {museumById.get(artifact.museumId)?.name} · {new Date(ts).toLocaleString('zh-CN')}
                  </div>
                </div>
                {artifact.wikiUrl && (
                  <a
                    className="history-wiki"
                    href={artifact.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    📖 维基
                  </a>
                )}
              </div>
            ))}
            {list.length === 0 && <p className="empty">还没有打卡记录，点开任意文物即可开始～</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
