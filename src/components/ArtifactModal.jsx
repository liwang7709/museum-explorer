import { useEffect, useState } from 'react';
import ImgWithFallback from './ImgWithFallback.jsx';
import { recordCheckin } from '../lib/checkin.js';
import { getQuotes } from '../lib/quotes.js';

function buildChatPrompt(artifact, museum) {
  const parts = [
    `请介绍这件文物：${artifact.title}`,
    museum ? `它收藏于${museum.name}（${museum.city}，${museum.country}）` : '',
    artifact.description ? `官方说明：${artifact.description.slice(0, 120)}` : '',
    artifact.wikiExtract ? `背景：${artifact.wikiExtract.slice(0, 120)}` : '',
    '请结合权威资料介绍其历史背景、艺术看点与意义。',
  ].filter(Boolean);
  return parts.join('。');
}

export default function ArtifactModal({ artifact, museum, onClose, onChecked }) {
  const [checkedIn, setCheckedIn] = useState(false);

  useEffect(() => {
    if (artifact) {
      const fresh = recordCheckin(artifact.id, artifact);
      setCheckedIn(fresh || true);
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

  const doCheckin = () => {
    recordCheckin(artifact.id, artifact);
    setCheckedIn(true);
    onChecked?.();
  };

  const quotes = getQuotes(artifact.qid);
  // 看点：优先维基摘要，其次官网说明（均为权威来源原文/转述，不做 AI 编造）
  const highlights = [artifact.wikiExtract, artifact.description].filter(Boolean).join(' ').trim().slice(0, 320);
  const sources = [
    { label: '官网藏品页', url: artifact.sourceUrl },
    { label: '维基百科', url: artifact.wikiUrl },
    { label: 'Wikidata 数据', url: artifact.qid ? `https://www.wikidata.org/wiki/${artifact.qid}` : null },
  ].filter((s) => s.url);
  const chatUrl = `https://chatgpt.com/?q=${encodeURIComponent(buildChatPrompt(artifact, museum))}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* 吸顶栏：关闭按钮固定，不随内容滚动 */}
        <div className="modal-bar">
          <span className="modal-bar-title">{artifact.title}</span>
          <button className="modal-close" onClick={onClose} aria-label="关闭">✕</button>
        </div>
        <div className="modal-scroll">
          <div className="modal-media">
            <ImgWithFallback
              src={artifact.imageUrl}
              thumb={artifact.imageThumb}
              alt={artifact.title}
              className="modal-img"
              onClick={doCheckin}
            />
            <span className="modal-img-hint">点击图片计入打卡</span>
          </div>
          <div className="modal-body">
            <h2>{artifact.title}</h2>
            <p className="modal-museum">
              {museum?.name} · {museum?.city} · {museum?.country}
              {artifact.dateText ? ` · ${artifact.dateText}` : ''}
            </p>
            {artifact.description && <p className="modal-desc">{artifact.description}</p>}

            {/* 看点 + 来源 Top3 */}
            {highlights && (
              <div className="modal-module">
                <h4>💡 看点</h4>
                <p className="modal-highlights">{highlights}</p>
                {sources.length > 0 && (
                  <p className="modal-sources">
                    信息来源 Top{Math.min(sources.length, 3)}：
                    {sources.slice(0, 3).map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                    ))}
                  </p>
                )}
              </div>
            )}

            {/* 名人点评：无则不显示 */}
            {quotes.length > 0 && (
              <div className="modal-module">
                <h4>🗣️ 名人点评</h4>
                {quotes.map((q, i) => (
                  <blockquote key={i} className="modal-quote">
                    <p>{q.text}</p>
                    <footer>
                      —— {q.who} ·{' '}
                      <a href={q.url} target="_blank" rel="noopener noreferrer">{q.source}</a>
                    </footer>
                  </blockquote>
                ))}
              </div>
            )}

            {/* 更多背景：默认展开 */}
            {artifact.wikiExtract && (
              <details className="modal-extract" open>
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
                <a className="btn btn-wiki" href={artifact.wikiUrl} target="_blank" rel="noopener noreferrer" onClick={doCheckin}>
                  📖 维基百科深读 ↗
                </a>
              )}
              <a className="btn btn-chatgpt" href={chatUrl} target="_blank" rel="noopener noreferrer" onClick={doCheckin} title="打开 ChatGPT 并预填关于这件文物的提问（需登录 ChatGPT）">
                🤖 ChatGPT
              </a>
              <button className="btn btn-ghost" onClick={onClose}>关闭</button>
            </div>
            <p className="modal-note">
              点击图片或任意链接均计入"已看"打卡{checkedIn ? ' ✓' : ''} · 数据来源：{artifact.sourceLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
