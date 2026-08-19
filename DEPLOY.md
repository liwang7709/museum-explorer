# 🚀 部署指南（GitHub + Vercel 免费方案）

目标：把"博物馆世界"发布为**稳定公网链接**，并且每天自动刷新数据（资讯 + 热度 + 今日推荐）。

> 前提：一个 GitHub 账号（免费）。整个流程约 10~15 分钟，之后全自动。

---

## 第 1 步：把项目推到 GitHub

1. 打开 <https://github.com/new> ，创建一个**公开仓库**（Public），名字随意，如 `museum-explorer`。
2. 在仓库页复制 git 地址（`https://github.com/<你的名字>/museum-explorer.git`）。
3. 在本机项目目录执行（替换成你的仓库地址）：

```bash
cd museum-explorer
git init
git add .
git commit -m "feat: 博物馆世界 V1"
git branch -M main
git remote add origin https://github.com/<你的名字>/museum-explorer.git
git push -u origin main
```

> 如果本机没有 git，也可以直接把整个 `museum-explorer` 文件夹拖到 GitHub 网页的
> "uploading an existing file" 上传。

---

## 第 2 步：Vercel 一键部署

1. 打开 <https://vercel.com/new> ，用 GitHub 账号登录。
2. 点击 **Import** 你刚推上去的 `museum-explorer` 仓库。
3. Vercel 会自动识别 Vite：
   - Build Command：`pnpm run build`（Vercel 自动识别 pnpm）
   - Output Directory：`dist`
4. 点 **Deploy**，等 1~2 分钟，得到一个 `https://museum-explorer-xxx.vercel.app` 的公开链接。

> 之后每次推送代码/数据到 GitHub，Vercel 都会自动重新部署，站点永远是最新的。

---

## 第 3 步：启用每日自动刷新（数据管道）

仓库里已内置 `.github/workflows/daily-data.yml`：

- 每天 **北京时间 05:17** 自动运行数据管道：
  拉取各馆开放 API + 维基共享资源 + 全球展览资讯 RSS；
- 有变化就自动提交新的 `public/data/*.json` 并推送 → Vercel 自动重新部署；
- **即使某天任务没跑**，页面也会用"日期种子算法"在本机算出当天的推荐批次，不会死链。

GitHub 上无需任何额外配置：Actions 首次运行时可能需要在仓库
**Settings → Actions → General → Workflow permissions** 确认允许写入（选
"Read and write permissions"），之后全自动。

可以手动试跑一次验证：仓库 **Actions** 页 → 左侧 `Daily Data Refresh` →
右侧 **Run workflow** 按钮。

---

## 第 4 步：验证

- 打开 Vercel 给你的链接，确认页面正常、图片能加载；
- 连续两天打开，看"今日推荐文物"是否换了一批；
- 点几件文物和维基百科，看顶栏"已看 N 件"是否累加。

---

## 常见问题

| 问题 | 处理 |
| --- | --- |
| Actions 每天跑太久/失败 | 单个接口失败会自动跳过，不影响整站；在 Actions 日志里能看到失败原因 |
| 图片偶尔打不开 | 每张图有"官网大图 → 维基缩略图 → 占位图"三级兜底，浏览器自动降级 |
| 想换展示的博物馆/文物 | 编辑 `scripts/museums.mjs` 与 `scripts/curated.mjs`，本地 `pnpm run data` 生成后推上去即可 |
| 打卡数据想跨设备 | 目前打卡只存本浏览器（localStorage），这是刻意为之；需要跨设备同步再升级账号体系 |
