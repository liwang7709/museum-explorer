import { useEffect, useMemo, useState } from 'react';
import { loadAll, searchArtifacts } from './lib/data.js';
import { pickByDate, todayStr, formatDateCn } from './lib/seed.js';
import { countCheckins, getCheckins, pruneCheckins } from './lib/checkin.js';
import ArtifactCard from './components/ArtifactCard.jsx';
import ArtifactModal from './components/ArtifactModal.jsx';
import MuseumGrid from './components/MuseumGrid.jsx';
import NewsPanel from './components/NewsPanel.jsx';
import CheckinHistory from './components/CheckinHistory.jsx';

export default function App() {
  const [data, setData] = useState({ museums: [], countries: [], artifacts: [], news: [], today: null });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [country, setCountry] = useState('全部');
  const [museumId, setMuseumId] = useState(null);
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [checkins, setCheckins] = useState(countCheckins());
  const [refreshCount, setRefreshCount] = useState(0);

  const reload = () => {
    setLoading(true);
    setLoadError('');
    loadAll()
      .then((d) => {
        // 清理失效的打卡记录（数据版本迁移后不留脏计数）
        const valid = new Set(d.artifacts.map((a) => a.id));
        setCheckins(pruneCheckins(valid));
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        setLoadError(String(e?.message || e));
        setLoading(false);
      });
  };

  useEffect(reload, []);

  const museumById = useMemo(() => new Map(data.museums.map((m) => [m.id, m])), [data.museums]);

  const filteredMuseums = useMemo(
    () => data.museums.filter((m) => country === '全部' || m.country === country),
    [data.museums, country],
  );

  const hotMuseumIds = useMemo(
    () =>
      data.today?.hotMuseumIds ||
      [...data.museums].sort((a, b) => b.heat - a.heat).slice(0, 10).map((m) => m.id),
    [data.museums, data.today],
  );

  const today = todayStr();

  const dailyPool = useMemo(() => {
    let pool = data.artifacts;
    if (museumId) {
      pool = pool.filter((a) => a.museumId === museumId);
    } else if (country !== '全部') {
      const ids = new Set(filteredMuseums.map((m) => m.id));
      pool = pool.filter((a) => ids.has(a.museumId));
    }
    return pool;
  }, [data.artifacts, museumId, country, filteredMuseums]);

  // 已看过的文物不再推荐（只影响推荐，不影响检索）
  const viewedIds = useMemo(() => new Set(Object.keys(getCheckins())), [checkins]);

  const dailyPicks = useMemo(() => {
    let picks;
    if (refreshCount === 0 && data.today?.picks?.length && !museumId && country === '全部') {
      // 服务端今日批次（与客户端算法一致，互为兜底）
      const byId = new Map(data.artifacts.map((a) => [a.id, a]));
      picks = data.today.picks.map((id) => byId.get(id)).filter(Boolean);
    } else {
      // 手动"换一批"：种子 = 日期 + 刷新次数（日期不变，仅换内容）
      const seed = refreshCount === 0 ? today : `${today}#${refreshCount}`;
      picks = pickByDate(dailyPool, seed, 16);
    }
    const unseen = picks.filter((a) => !viewedIds.has(a.id));
    return unseen.length >= 6 ? unseen : picks; // 避免清空：池子被看完时退回包含已看的批次
  }, [dailyPool, today, data.today, data.artifacts, museumId, country, refreshCount, viewedIds]);

  const hotTerms = useMemo(() => {
    if (data.today?.hotTerms?.length) {
      return data.today.hotTerms.map((h) =>
        typeof h === 'string' ? { term: h, reason: '' } : { term: h.term, reason: h.reason || '' },
      );
    }
    const top = [...data.artifacts].sort((a, b) => b.popularity - a.popularity).slice(0, 30);
    return pickByDate(top, today, 5).map((a) => ({ term: a.title, reason: '' }));
  }, [data, today]);

  const results = useMemo(
    () => searchArtifacts(data.artifacts, museumById, query),
    [data.artifacts, museumById, query],
  );

  const bumpCheckins = () => setCheckins(countCheckins());
  const openArtifact = (a) => setModal(a);
  const pickHotTerm = (t) => setQuery(t);
  const searchFocused = query.trim() !== '';

  const selectMuseum = (id) => {
    setMuseumId(id);
    setRefreshCount(0);
    document.getElementById('museum-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">🏛️</span>
          <div>
            <h1>博物馆世界</h1>
            <p>Museum Explorer · 全球知名博物馆文物</p>
          </div>
        </div>
        <button
          className="checkin-badge"
          onClick={() => setShowHistory(true)}
          title="点击查看打卡历史"
        >
          🎫 已看 <b>{checkins}</b> 件文物 <span className="checkin-arrow">▾</span>
        </button>
      </header>

      {loadError && (
        <div className="error-banner">
          <span>数据加载失败：{loadError}（页面功能可能不完整）</span>
          <button onClick={reload}>重新加载</button>
        </div>
      )}

      {/* 第一行：国家/地区筛选 */}
      <nav className="filter-row" aria-label="按国家或地区筛选博物馆">
        {['全部', ...data.countries].map((c) => (
          <button
            key={c}
            className={`chip ${country === c ? 'active' : ''}`}
            onClick={() => {
              setCountry(c);
              setMuseumId(null);
              setRefreshCount(0);
            }}
          >
            {c}
          </button>
        ))}
      </nav>

      <main>
        {/* 热门博物馆 */}
        <section id="museum-section" className="section">
          <h2 className="section-title">
            🔥 当下热门博物馆
            <small>按游客量 · 网页访问 · 社媒提及综合热度（每周更新）</small>
          </h2>
          {loading && !data.museums.length ? (
            <p className="empty">加载中…</p>
          ) : filteredMuseums.length ? (
            <MuseumGrid
              museums={filteredMuseums}
              hotMuseumIds={hotMuseumIds}
              selected={museumId}
              onSelect={selectMuseum}
            />
          ) : (
            <p className="empty">该地区暂无博物馆数据</p>
          )}
          {museumId && (
            <button className="chip clear-filter" onClick={() => setMuseumId(null)}>
              ✕ 清除博物馆筛选（{museumById.get(museumId)?.name}）
            </button>
          )}
        </section>

        <div className="main-grid">
          {/* 今日推荐 */}
          <section className="section">
            <div className="section-title-row">
              <h2 className="section-title">
                🔄 今日推荐文物 <small>{formatDateCn(today)} · 每天零点自动更换一批</small>
              </h2>
              <button
                className="btn btn-refresh"
                onClick={() => setRefreshCount((c) => c + 1)}
                title="手动换一批（不影响每天自动更新的日期）"
              >
                🔄 换一批
              </button>
            </div>
            {loading && !data.artifacts.length ? (
              <p className="empty">加载中…</p>
            ) : dailyPicks.length ? (
              <div className="artifact-grid">
                {dailyPicks.map((a) => (
                  <ArtifactCard
                    key={a.id}
                    artifact={a}
                    museum={museumById.get(a.museumId)}
                    onOpen={openArtifact}
                    onChecked={bumpCheckins}
                  />
                ))}
              </div>
            ) : (
              <p className="empty">暂无文物数据</p>
            )}
          </section>

          {/* 全球资讯 */}
          <aside className="section news-section">
            <h2 className="section-title">
              🌍 全球展览资讯 <small>中英混合 · 每日滚动更新</small>
            </h2>
            <NewsPanel items={data.news} updatedAt={data.newsGeneratedAt} />
          </aside>
        </div>

        {/* 检索 */}
        <section className="section search-section">
          <h2 className="section-title">🔍 站内检索</h2>
          <div className="search-bar">
            <input
              type="search"
              value={query}
              placeholder="搜索文物或博物馆，如：蒙娜丽莎 / Rosetta Stone / 梵高 / 兵马俑…"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="hot-list">
            <span className="hot-label">今日热门（点文物名可检索）：</span>
            <div className="hot-table">
              {hotTerms.map((h) => (
                <div key={h.term} className="hot-row">
                  <button
                    className="hot-term-name"
                    onClick={() => pickHotTerm(h.term)}
                    title="点击检索这件文物"
                  >
                    {h.term}
                  </button>
                  <span className="hot-term-reason">{h.reason}</span>
                </div>
              ))}
            </div>
          </div>
          {searchFocused && (
            <div className="search-results">
              <p className="result-count">
                {results.length ? `找到 ${results.length} 件相关文物` : '没有找到相关文物，试试其他关键词'}
              </p>
              {results.length ? (
                <div className="artifact-grid">
                  {results.map((a) => (
                    <ArtifactCard
                      key={a.id}
                      artifact={a}
                      museum={museumById.get(a.museumId)}
                      onOpen={openArtifact}
                      onChecked={bumpCheckins}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <p>
          数据来源：各博物馆官网开放数据（大都会 / 芝加哥艺术学院 / 克利夫兰 / 故宫数字文物库等）+ 维基共享资源，
          图片版权归各博物馆/权利人所有，点击文物可跳转官网原页；百科链接由维基百科提供（无词条的文物不展示）。
        </p>
        <p>
          打卡记录仅保存在当前浏览器（localStorage）。今日推荐由日期种子确定性生成，每日零点更换，可点"换一批"手动刷新。
          {data.generatedAt ? ` 数据更新于 ${new Date(data.generatedAt).toLocaleString('zh-CN')}` : ''}
        </p>
      </footer>

      <ArtifactModal
        artifact={modal}
        museum={modal ? museumById.get(modal.museumId) : null}
        onClose={() => setModal(null)}
        onChecked={bumpCheckins}
      />
      {showHistory && (
        <CheckinHistory
          artifacts={data.artifacts}
          museumById={museumById}
          onOpen={openArtifact}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}
