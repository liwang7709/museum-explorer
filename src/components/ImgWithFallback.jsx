import { useEffect, useState } from 'react';

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#f3ecdf"/><text x="50%" y="52%" font-size="90" text-anchor="middle">🏛️</text><text x="50%" y="62%" font-size="22" text-anchor="middle" fill="#8a7a5c">图片暂不可用 · 可查看说明与百科</text></svg>`,
  );

// 把维基 Special:FilePath（302 重定向）转换为 upload.wikimedia.org 直链（无重定向、更快）
// 保持原分辨率不压缩；转换失败自动回退原链接
async function commonsDirectUrl(src) {
  try {
    const m = String(src || '').match(/\/wiki\/Special:FilePath\/([^?]+)\?width=(\d+)/);
    if (!m) return null;
    const fileName = decodeURIComponent(m[1]);
    const width = m[2] || '1000';
    const enc = encodeURIComponent(fileName);
    const buf = await crypto.subtle.digest('MD5', new TextEncoder().encode(fileName));
    const md5 = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
    return `https://upload.wikimedia.org/wikipedia/commons/thumb/${md5[0]}/${md5.slice(0, 2)}/${enc}/${width}px-${enc}`;
  } catch {
    return null;
  }
}

// 图片多级兜底：CDN直链 → 原链接 → 缩略图 → 占位图（避免红叉/死链）
export default function ImgWithFallback({ src, thumb, alt = '', className = '', onClick }) {
  const [stage, setStage] = useState(0);
  const [direct, setDirect] = useState(null);

  useEffect(() => {
    let alive = true;
    setStage(0);
    setDirect(null);
    commonsDirectUrl(src).then((d) => {
      if (alive) setDirect(d);
    });
    return () => {
      alive = false;
    };
  }, [src]);

  const chain = [];
  if (direct && direct !== src) chain.push(direct);
  if (src) chain.push(src);
  if (thumb && thumb !== src) chain.push(thumb);
  chain.push(PLACEHOLDER);
  const current = chain[Math.min(stage, chain.length - 1)];

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
