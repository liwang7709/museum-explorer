import Flag from './Flag.jsx';

// 台北故宫博物院按用户要求显示中国国旗；无旗不渲染，不留占位
const FLAG_OVERRIDE = { 中国台湾: '中国' };

export default function MuseumGrid({ museums, hotMuseumIds, onOpen, compact }) {
  // 紧凑横滑条（默认：只展示热门）
  if (compact) {
    return (
      <div className="museum-strip">
        {museums.map((m) => {
          const isHot = hotMuseumIds?.includes(m.id);
          return (
            <button key={m.id} className="museum-mini" onClick={() => onOpen(m)} title={m.blurb}>
              <Flag country={FLAG_OVERRIDE[m.country] || m.country} />
              <span className="museum-mini-name">{m.name}</span>
              <span className="museum-mini-meta">
                {m.city}
                {isHot ? ' · 🔥' : ''}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // 完整网格（展开全部时）
  return (
    <div className="museum-grid">
      {museums.map((m) => {
        const isHot = hotMuseumIds?.includes(m.id);
        return (
          <button key={m.id} className="museum-card" onClick={() => onOpen(m)} title={m.blurb}>
            <Flag country={FLAG_OVERRIDE[m.country] || m.country} />
            <span className="museum-name">{m.name}</span>
            <span className="museum-meta">{m.city} · 精选{m.count}件</span>
            {isHot && <span className="heat-badge">🔥 热门</span>}
            <span className="museum-heat">{m.heatLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
