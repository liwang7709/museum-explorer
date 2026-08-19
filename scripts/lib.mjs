// 数据管道公共工具
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const CACHE_DIR = path.join(ROOT, 'scripts', '.cache');
export const DATA_DIR = path.join(ROOT, 'public', 'data');

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function cacheGet(key) {
  const p = path.join(CACHE_DIR, key);
  if (fs.existsSync(p)) {
    try {
      return JSON.parse(fs.readFileSync(p, 'utf-8'));
    } catch {
      return null;
    }
  }
  return null;
}

export function cacheSet(key, value) {
  ensureDir(CACHE_DIR);
  fs.writeFileSync(path.join(CACHE_DIR, key), JSON.stringify(value));
}

export async function fetchJson(url, { timeout = 30000, retries = 4, headers = {}, raw = false } = {}) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), timeout);
      const res = await fetch(url, {
        signal: ctrl.signal,
        headers: {
          'User-Agent': 'MuseumExplorer/0.1 (open museum data aggregator; contact: local project)',
          ...headers,
        },
      });
      clearTimeout(t);
      if (res.status === 429) {
        const wait = Math.min(Number(res.headers.get('retry-after')) * 1000 || 3000, 8000);
        await sleep(wait);
        throw new Error(`HTTP 429 (rate limited), will retry`);
      }
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return raw ? res : await res.json();
    } catch (e) {
      lastErr = e;
      if (!/429/.test(e.message)) await sleep(900 * (i + 1));
    }
  }
  throw new Error(`fetchJson failed: ${url} :: ${lastErr?.message}`);
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 维基共享资源文件名 → 可直接外链的缩略图 URL
export function commonsThumb(fileName, width = 1000) {
  if (!fileName) return null;
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=${width}`;
}

// 归一化用于标题相似度比较
export function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

// 简单的词元相似度（Jaccard）
export function similarity(a, b) {
  const A = new Set(norm(a).split(/\s+/).filter(Boolean));
  const B = new Set(norm(b).split(/\s+/).filter(Boolean));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / (A.size + B.size - inter);
}

export function pick(obj, keys) {
  const out = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}

// ── 日期种子（每日确定性轮换）────────────────────────────
export function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 用日期字符串（YYYY-MM-DD）做种子，确定性打乱数组并取 n 个
export function pickByDate(list, dateStr, n) {
  const rng = mulberry32(hashString('museum-explorer::' + dateStr));
  const idx = list.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, n).map((i) => list[i]);
}

export function todayStr(offsetDays = 0) {
  const d = new Date(Date.now() + offsetDays * 86400000);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// 生成器时间戳
export function isoNow() {
  return new Date().toISOString();
}

// 写 JSON（带 2 空格缩进）
export function writeJson(file, data) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
