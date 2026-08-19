// 故宫数字文物库（digicol.dpm.org.cn）探测与增强
// 官方接口可用时用官网大图替换兜底图；不可用时静默返回 false（不影响主流程）
import { fetchJson, similarity, norm } from './lib.mjs';

const ENDPOINTS = [
  'https://digicol.dpm.org.cn/cultural/search?searchValue=%E6%B8%85%E6%98%8E%E4%B8%8A%E6%B2%B3%E5%9B%BE',
  'https://digicol.dpm.org.cn/cultural/api/search?searchValue=%E6%B8%85%E6%98%8E%E4%B8%8A%E6%B2%B3%E5%9B%BE',
  'https://digicol.dpm.org.cn/api/search?searchValue=%E6%B8%85%E6%98%8E%E4%B8%8A%E6%B2%B3%E5%9B%BE',
];

export async function probePalace() {
  for (const url of ENDPOINTS) {
    try {
      const res = await fetchJson(url, { retries: 1, timeout: 12000, raw: true });
      const text = await res.text();
      if (text && text.length > 50) {
        console.log(`  故宫探测成功: ${url.slice(0, 70)} (${text.length} bytes)`);
        return true;
      }
    } catch (e) {
      console.log(`  故宫探测失败 ${url.slice(0, 60)}: ${e.message?.slice(0, 60)}`);
    }
  }
  return false;
}

export async function enrichPalace(artifacts) {
  // 预留：拿到接口结构后实现按文物名取官网大图
  console.log('  故宫 API 可用（占位：等待接口结构确认后接入官网大图）');
  return artifacts;
}
