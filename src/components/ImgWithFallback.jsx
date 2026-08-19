import { useState } from 'react';

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#f3ecdf"/><text x="50%" y="52%" font-size="90" text-anchor="middle">🏛️</text><text x="50%" y="62%" font-size="22" text-anchor="middle" fill="#8a7a5c">图片暂不可用 · 可查看说明与百科</text></svg>`,
  );

// 图片三级兜底：大图 → 缩略图 → 占位图（避免红叉/死链）
export default function ImgWithFallback({ src, thumb, alt = '', className = '', onClick }) {
  const [stage, setStage] = useState(0); // 0=原图 1=缩略图 2=占位
  const candidates = [src, thumb, PLACEHOLDER].filter(Boolean);
  const current = candidates[Math.min(stage, candidates.length - 1)];

  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      className={className}
      onClick={onClick}
      onError={() => setStage((s) => s + 1)}
    />
  );
}
