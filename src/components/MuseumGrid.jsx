const COUNTRY_FLAGS = {
  中国: '🇨🇳', 中国台湾: '🇹🇼', 美国: '🇺🇸', 英国: '🇬🇧', 法国: '🇫🇷',
  荷兰: '🇳🇱', 意大利: '🇮🇹', 西班牙: '🇪🇸', 奥地利: '🇦🇹', 俄罗斯: '🇷🇺',
  梵蒂冈: '🇻🇦', 日本: '🇯🇵', 韩国: '🇰🇷', 挪威: '🇳🇴',
};

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
            <span className="museum-flag">{COUNTRY_FLAGS[m.country] || '🏛️'}</span>
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
