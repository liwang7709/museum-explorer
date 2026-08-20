// 全球展览资讯聚合：国际艺术媒体 RSS（优先）+ Google News 中英（补充）
import Parser from 'rss-parser';
import { cacheGet, cacheSet, sleep, isoNow } from './lib.mjs';

const parser = new Parser({
  timeout: 15000,
  headers: { 'User-Agent': 'MuseumExplorer/0.1 (news aggregator)' },
});

const FEEDS = [
  // ── 权威国际艺术/文化媒体（优先展示）──
  { url: 'https://www.artnews.com/feed/', name: 'ARTnews', lang: 'en' },
  { url: 'https://www.theartnewspaper.com/rss.xml', name: 'The Art Newspaper', lang: 'en' },
  { url: 'https://news.artnet.com/feed/', name: 'Artnet News', lang: 'en' },
  { url: 'https://hyperallergic.com/feed/', name: 'Hyperallergic', lang: 'en' },
  { url: 'https://www.smithsonianmag.com/rss/latest_articles/', name: 'Smithsonian Magazine', lang: 'en' },
  { url: 'https://www.theguardian.com/culture/rss', name: 'The Guardian Culture', lang: 'en' },
  { url: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml', name: 'BBC Culture', lang: 'en' },
  { url: 'https://www.apollo-magazine.com/feed/', name: 'Apollo Magazine', lang: 'en' },
  { url: 'https://www.frieze.com/rss.xml', name: 'Frieze', lang: 'en' },
  { url: 'https://www.artforum.com/feed/', name: 'Artforum', lang: 'en' },
  { url: 'https://www.metmuseum.org/en/press/exhibitions/rss', name: 'The Met', lang: 'en' },
  { url: 'https://www.britishmuseum.org/rss.xml', name: 'British Museum', lang: 'en' },

  // ── Google News 聚合（补充覆盖）──
  { url: 'https://news.google.com/rss/search?q=museum+exhibition&hl=en-US&gl=US&ceid=US:en', name: 'Google News', lang: 'en' },
  { url: 'https://news.google.com/rss/search?q=art+museum+exhibition&hl=en-US&gl=US&ceid=US:en', name: 'Google News', lang: 'en' },
  { url: 'https://news.google.com/rss/search?q=major+museum+exhibition+opening&hl=en-GB&gl=GB&ceid=GB:en', name: 'Google News', lang: 'en' },
  // 中文（查询词必须 encodeURIComponent，否则 Google News 拒绝非 ASCII 路径）
  { url: `https://news.google.com/rss/search?q=${encodeURIComponent('博物馆 展览')}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans`, name: 'Google News', lang: 'zh' },
  { url: `https://news.google.com/rss/search?q=${encodeURIComponent('美术馆 展览 开幕')}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans`, name: 'Google News', lang: 'zh' },
  { url: `https://news.google.com/rss/search?q=${encodeURIComponent('故宫 文物 展览')}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans`, name: 'Google News', lang: 'zh' },
  { url: `https://news.google.com/rss/search?q=${encodeURIComponent('文博 新展 开展')}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans`, name: 'Google News', lang: 'zh' },
  { url: `https://news.google.com/rss/search?q=${encodeURIComponent('艺术展 观展 展讯')}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans`, name: 'Google News', lang: 'zh' },
  { url: `https://news.google.com/rss/search?q=${encodeURIComponent('博物馆 文物 考古 发现')}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans`, name: 'Google News', lang: 'zh' },
  { url: `https://news.google.com/rss/search?q=${encodeURIComponent('美术馆 展览')}&hl=zh-TW&gl=TW&ceid=TW:zh-Hant`, name: 'Google News', lang: 'zh' },
];

function isCjk(text) {
  return /[\u4e00-\u9fff]/.test(text || '');
}

function normTitle(t) {
  return String(t || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

export async function fetchNews() {
  const named = [];
  const google = [];
  const seen = new Set();
  for (const feed of FEEDS) {
    try {
      const data = await parser.parseURL(feed.url);
      for (const item of data.items || []) {
        const title = item.title?.trim();
        if (!title || !item.link) continue;
        const key = normTitle(title);
        if (seen.has(key)) continue;
        seen.add(key);
        const entry = {
          title,
          source: feed.name,
          lang: isCjk(title) ? 'zh' : 'en',
          url: item.link,
          date: item.isoDate || item.pubDate || new Date().toISOString(),
        };
        if (feed.name === 'Google News') google.push(entry);
        else named.push(entry);
      }
      console.log(`  news feed ok: ${feed.name} (${feed.url.slice(0, 60)}…)`);
    } catch (e) {
      console.log(`  news feed failed: ${feed.name} :: ${e.message?.slice(0, 80)}`);
    }
    await sleep(350);
  }
  const sortByDate = (arr) => arr.sort((a, b) => (a.date < b.date ? 1 : -1));
  // 去重（标题接近的合并）
  const dedup = (arr) => {
    const out = [];
    for (const it of arr) {
      const near = out.some(
        (d) => normTitle(d.title) === normTitle(it.title) || normTitle(d.title).includes(normTitle(it.title)) || normTitle(it.title).includes(normTitle(d.title)),
      );
      if (!near) out.push(it);
    }
    return out;
  };
  const namedDedup = dedup(sortByDate(named));
  const googleDedup = dedup(sortByDate(google));
  // 权威媒体优先占 60%，Google News 补充 40%，避免聚合源占大头
  const merged = [];
  const namedCount = Math.min(namedDedup.length, 24);
  for (let i = 0; i < namedCount; i++) merged.push(namedDedup[i]);
  for (const g of googleDedup) {
    if (merged.length >= 40) break;
    if (merged.length >= namedCount + 16) break;
    merged.push(g);
  }
  const result = { generatedAt: isoNow(), items: merged.slice(0, 40) };
  cacheSet('news.json', result);
  console.log(`News: 权威媒体 ${namedDedup.length} 条 + Google ${googleDedup.length} 条 → 收录 ${result.items.length} 条`);
  return result;
}
