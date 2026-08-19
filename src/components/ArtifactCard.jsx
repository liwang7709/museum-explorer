import ImgWithFallback from './ImgWithFallback.jsx';
import { isViewed, recordCheckin } from '../lib/checkin.js';

export default function ArtifactCard({ artifact, museum, onOpen, onChecked }) {
  const viewed = isViewed(artifact.id);
  return (
    <article className={`artifact-card ${viewed ? 'viewed' : ''}`}>
      <div className="artifact-media" onClick={() => onOpen(artifact)}>
        <ImgWithFallback
          src={artifact.imageUrl}
          thumb={artifact.imageThumb}
          alt={artifact.title}
          className="artifact-img"
        />
        {viewed && <span className="viewed-badge">✓ 已看</span>}
        <span className="source-tag">{artifact.sourceLabel}</span>
      </div>
      <div className="artifact-body">
        <h3 className="artifact-title" onClick={() => onOpen(artifact)}>{artifact.title}</h3>
        <p className="artifact-museum">
          {museum?.name} · {museum?.city}
          {museum?.country ? ` · ${museum.country}` : ''}
        </p>
        <p className="artifact-desc">{artifact.description || artifact.wikiExtract || ''}</p>
        <div className="artifact-actions">
          {artifact.wikiUrl && (
            <a
              className="btn btn-wiki"
              href={artifact.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                recordCheckin(artifact.id);
                onChecked?.();
              }}
              title="点击跳转维基百科深入了解（计入打卡）"
            >
              📖 维基百科
            </a>
          )}
          <button className="btn btn-detail" onClick={() => onOpen(artifact)}>
            查看详情
          </button>
        </div>
      </div>
    </article>
  );
}
