import Flag from './Flag.jsx';
import ArtifactCard from './ArtifactCard.jsx';

const FLAG_OVERRIDE = { 中国台湾: '中国' };

// 博物馆详情页：馆信息头 + 该馆全部文物（按综合热度排序）
export default function MuseumPage({ museum, artifacts, museumById, onOpen, onBack, onChecked }) {
  if (!museum) return null;
  const list = artifacts
    .filter((a) => a.museumId === museum.id)
    .sort((a, b) => b.popularity - a.popularity);

  return (
    <main className="museum-page">
      <div className="history-head">
        <button className="btn btn-ghost" onClick={onBack}>← 返回首页</button>
        <h2>
          <span className="inline-flag"><Flag country={FLAG_OVERRIDE[museum.country] || museum.country} /></span>
          {museum.name}
        </h2>
        <span />
      </div>

      <div className="museum-page-meta">
        <span>{museum.city} · {museum.country}</span>
        <span className="museum-heat">{museum.heatLabel}</span>
      </div>
      {museum.blurb && <p className="museum-page-blurb">{museum.blurb}</p>}
      <div className="museum-page-links">
        {museum.website && (
          <a className="btn btn-primary" href={museum.website} target="_blank" rel="noopener noreferrer">
            官网 ↗
          </a>
        )}
        {museum.wikiUrl && (
          <a className="btn btn-wiki" href={museum.wikiUrl} target="_blank" rel="noopener noreferrer">
            📖 维基百科
          </a>
        )}
      </div>

      <h3 className="museum-page-count">🏺 该馆文物（共 {list.length} 件 · 按综合热度排序）</h3>
      {list.length ? (
        <div className="artifact-grid">
          {list.map((a) => (
            <ArtifactCard
              key={a.id}
              artifact={a}
              museum={museumById.get(a.museumId) || museum}
              onOpen={onOpen}
              onChecked={onChecked}
            />
          ))}
        </div>
      ) : (
        <p className="empty">该馆暂无文物数据</p>
      )}
    </main>
  );
}
