import { useEffect } from 'react';
import ImgWithFallback from './ImgWithFallback.jsx';
import { recordCheckin } from '../lib/checkin.js';

export default function ArtifactModal({ artifact, museum, onClose, onChecked }) {
  useEffect(() => {
    if (artifact) {
      // 打开详情即打卡
      recordCheckin(artifact.id);
      onChecked?.();
      const onKey = (e) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    }
  }, [artifact?.id]);

  if (!artifact) return null;

  const wikiClick = () => {
    recordCheckin(artifact.id);
    onChecked?.();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="关闭">✕</button>
        <div className="modal-media">
          <ImgWithFallback
            src={artifact.imageUrl}
            thumb={artifact.imageThumb}
            alt={artifact.title}
            className="modal-img"
            onClick={() => { recordCheckin(artifact.id); onChecked?.(); }}
          />
        </div>
        <div className="modal-body">
          <h2>{artifact.title}</h2>
          <p className="modal-museum">
            {museum?.name} · {museum?.city} · {museum?.country}
            {artifact.dateText ? ` · ${artifact.dateText}` : ''}
          </p>
          {artifact.description && <p className="modal-desc">{artifact.description}</p>}
          {artifact.wikiExtract && (
            <details className="modal-extract">
              <summary>更多背景（维基百科摘要）</summary>
              <p>{artifact.wikiExtract}</p>
            </details>
          )}
          <div className="modal-actions">
            {artifact.sourceUrl && (
              <a className="btn btn-primary" href={artifact.sourceUrl} target="_blank" rel="noopener noreferrer">
                官网来源 ↗
              </a>
            )}
            {artifact.wikiUrl && (
              <a className="btn btn-wiki" href={artifact.wikiUrl} target="_blank" rel="noopener noreferrer" onClick={wikiClick}>
                📖 维基百科深读 ↗
              </a>
            )}
            <button className="btn btn-ghost" onClick={onClose}>关闭</button>
          </div>
          <p className="modal-note">点击图片或任意链接均计入"已看"打卡 · 数据来源：{artifact.sourceLabel}</p>
        </div>
      </div>
    </div>
  );
}
