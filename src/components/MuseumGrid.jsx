import Flag from './Flag.jsx';

// 台北故宫博物院按用户要求显示中国国旗；无旗的国家/地区不渲染，不留占位
const FLAG_OVERRIDE = { 中国台湾: '中国' };

export default function MuseumGrid({ museums, hotMuseumIds, selected, onSelect }) {
  return (
    <div className="museum-grid">
      {museums.map((m) => {
        const isHot = hotMuseumIds?.includes(m.id);
        const active = selected === m.id;
        return (
          <button
            key={m.id}
            className={`museum-card ${active ? 'active' : ''}`}
            onClick={() => onSelect(active ? null : m.id)}
            title={m.blurb}
          >
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
