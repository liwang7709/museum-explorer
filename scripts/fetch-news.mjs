// 全球展览资讯聚合：Google News（中英）+ 国际艺术媒体 RSS
import Parser from 'rss-parser';
import { cacheGet, cacheSet, sleep, isoNow } from './lib.mjs';

const parser = new Parser({
  timeout: 20000,
  headers: { 'User-Agent': 'MuseumExplorer/0.1 (news aggregator)' },
});

const FEEDS = [
  // 国际英文
  { url: 'https://news.google.com/rss/search?q=museum+exhibition&hl=en-US&gl=US&ceid=US:en', name: 'Google News', lang: 'en' },
  { url: 'https://news.google.com/rss/search?q=art+museum+exhibition&hl=en-US&gl=US&ceid=US:en', name: 'Google News', lang: 'en' },
  { url: 'https://news.google.com/rss/search?q=major+museum+exhibition+opening&hl=en-GB&gl=GB&ceid=GB:en', name: 'Google News', lang: 'en' },
  { url: 'https://www.artnews.com/feed/', name: 'ARTnews', lang: 'en' },
  { url: 'https://www.theartnewspaper.com/rss.xml', name: 'The Art Newspaper', lang: 'en' },
  { url: 'https://www.smithsonianmag.com/rss/latest_articles/', name: 'Smithsonian Magazine', lang: 'en' },
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
  const items = [];
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
        items.push({
          title,
          source: feed.name,
          lang: isCjk(title) ? 'zh' : 'en',
          url: item.link,
          date: item.isoDate || item.pubDate || new Date().toISOString(),
        });
      }
      console.log(`  news feed ok: ${feed.name} (${feed.url.slice(0, 60)}…)`);
    } catch (e) {
      console.log(`  news feed failed: ${feed.name} :: ${e.message?.slice(0, 80)}`);
    }
    await sleep(400);
  }
  items.sort((a, b) => (a.date < b.date ? 1 : -1));
  // 去重（标题接近的合并）
  const dedup = [];
  for (const it of items) {
    const near = dedup.some(
      (d) => normTitle(d.title) === normTitle(it.title) || normTitle(d.title).includes(normTitle(it.title)) || normTitle(it.title).includes(normTitle(d.title)),
    );
    if (!near) dedup.push(it);
  }
  const result = { generatedAt: isoNow(), items: dedup.slice(0, 40) };
  cacheSet('news.json', result);
  console.log(`News: ${dedup.length} unique items (top 40 kept)`);
  return result;
}
