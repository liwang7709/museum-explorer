// 内置 SVG 小国旗（任何系统都能正常渲染；无旗则不显示，不留占位）
const FLAGS = {
  中国: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="30" height="20" fill="#DE2910" />
      <path d="M5 2.6 L5.9 4.7 L8.1 4.7 L6.4 6 L6.9 8.2 L5 6.9 L3.1 8.2 L3.6 6 L1.9 4.7 L4.1 4.7 Z" fill="#FFDE00" />
      <circle cx="10.5" cy="3" r="1" fill="#FFDE00" />
      <circle cx="11.6" cy="5.2" r="1" fill="#FFDE00" />
      <circle cx="10.8" cy="7.6" r="1" fill="#FFDE00" />
      <circle cx="9" cy="6.2" r="1" fill="#FFDE00" />
    </svg>
  ),
  美国: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="1.54" y="0" fill="#B22234" />
      <rect width="30" height="1.54" y="3.08" fill="#B22234" />
      <rect width="30" height="1.54" y="6.16" fill="#B22234" />
      <rect width="30" height="1.54" y="9.24" fill="#B22234" />
      <rect width="30" height="1.54" y="12.32" fill="#B22234" />
      <rect width="30" height="1.54" y="15.4" fill="#B22234" />
      <rect width="30" height="1.54" y="18.48" fill="#B22234" />
      <rect width="12" height="10.78" fill="#3C3B6E" />
      <g fill="#fff">
        {[2, 4, 6, 8].map((x) => [1.6, 3.7, 5.8, 7.9, 10].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.7" />))}
      </g>
    </svg>
  ),
  英国: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="30" height="20" fill="#012169" />
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#fff" strokeWidth="4" />
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#C8102E" strokeWidth="2" />
      <path d="M15 0 V20 M0 10 H30" stroke="#fff" strokeWidth="6" />
      <path d="M15 0 V20 M0 10 H30" stroke="#C8102E" strokeWidth="3" />
    </svg>
  ),
  法国: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="10" height="20" fill="#0055A4" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#EF4135" />
    </svg>
  ),
  荷兰: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="30" height="6.67" fill="#AE1C28" />
      <rect y="6.67" width="30" height="6.66" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#21468B" />
    </svg>
  ),
  意大利: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="10" height="20" fill="#009246" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#CE2B37" />
    </svg>
  ),
  西班牙: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </svg>
  ),
  奥地利: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="30" height="6.67" fill="#ED2939" />
      <rect y="6.67" width="30" height="6.66" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#ED2939" />
    </svg>
  ),
  俄罗斯: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="30" height="6.67" fill="#fff" />
      <rect y="6.67" width="30" height="6.66" fill="#0039A6" />
      <rect y="13.33" width="30" height="6.67" fill="#D52B1E" />
    </svg>
  ),
  梵蒂冈: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="15" height="20" fill="#FCD116" />
      <rect x="15" width="15" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="2.2" fill="none" stroke="#B8860B" strokeWidth="1.2" />
      <path d="M13.4 8.6 L16.6 8.6 L15 11.2 Z" fill="#B8860B" />
    </svg>
  ),
  日本: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="30" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="5.4" fill="#BC002D" />
    </svg>
  ),
  韩国: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="20" fill="none" stroke="#000" strokeWidth="0.3" />
      <circle cx="15" cy="10" r="4.6" fill="#fff" />
      <path d="M15 10 A4.6 4.6 0 0 1 15 5.4 A4.6 4.6 0 0 0 15 14.6 Z" fill="#CD2E3A" />
      <path d="M15 10 A4.6 4.6 0 0 0 15 5.4 A4.6 4.6 0 0 1 15 14.6 Z" fill="#0047A0" />
      <g stroke="#000" strokeWidth="1">
        <line x1="15" y1="2" x2="15" y2="4" />
        <line x1="15" y1="16" x2="15" y2="18" />
        <line x1="2" y1="10" x2="4" y2="10" />
        <line x1="26" y1="10" x2="28" y2="10" />
        <line x1="5.6" y1="3.4" x2="7" y2="4.8" />
        <line x1="23" y1="15.2" x2="24.4" y2="16.6" />
        <line x1="24.4" y1="3.4" x2="23" y2="4.8" />
        <line x1="5.6" y1="16.6" x2="7" y2="15.2" />
      </g>
    </svg>
  ),
  挪威: (
    <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" className="flag-svg">
      <rect width="30" height="20" fill="#BA0C2F" />
      <rect x="8" width="4" height="20" fill="#fff" />
      <rect y="8" width="30" height="4" fill="#fff" />
      <rect x="10" width="2" height="20" fill="#00205B" />
      <rect y="9" width="30" height="2" fill="#00205B" />
    </svg>
  ),
};

export default function Flag({ country }) {
  const svg = FLAGS[country];
  return svg ? <span className="flag" title={country}>{svg}</span> : null;
}
