# 部署指南 (DEPLOYMENT.md)

本文檔說明如何將個人作品集應用部署到各種平台。

## 📋 部署前檢查清單

在部署前，請確保完成以下步驟：

- ✅ 運行完整測試套件 (`npm run test`)
- ✅ 驗證所有 ESLint 檢查通過 (`npm run lint`)
- ✅ 代碼格式化完成 (`npm run format`)
- ✅ TypeScript 無錯誤編譯
- ✅ 生產構建成功 (`npm run build`)
- ✅ 預覽構建正常運行 (`npm run preview`)
- ✅ 更新版本號 (`package.json` 中的 version 字段)
- ✅ 更新 CHANGELOG
- ✅ 測試環境變量設置正確

## 🔨 構建流程

### 1. 開發版本構建

```bash
# 安裝依賴
npm install

# 開發模式驗證
npm run dev

# 運行完整測試
npm run test

# 檢查代碼質量
npm run lint && npm run format
```

### 2. 生產構建

```bash
# 生成優化的生產構建
npm run build

# 構建輸出位於 dist/ 目錄
ls -la dist/

# 驗證構建大小（應 < 200KB gzipped）
gzip -c dist/index.html | wc -c
```

### 3. 本地預覽

```bash
# 預覽生產構建（模擬生產環境）
npm run preview

# 應用將在 http://localhost:4173 啟動
```

## 🚀 部署到 GitHub Pages

### 方法 1：自動化部署（GitHub Actions）

#### 1.1 創建 GitHub Actions 工作流

在 `.github/workflows/deploy.yml` 中添加以下配置：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Check code quality
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2

  # 可選: E2E 測試（在部署後）
  e2e-test:
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

  # 安全檢查
  security:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Audit dependencies
        run: npm audit --production
```

#### 1.2 配置 GitHub Pages 設置

1. 進入 GitHub 倉庫的 **Settings**
2. 左側菜單選擇 **Pages**
3. 在 **Build and deployment** 下：
   - **Source**: 選擇 "GitHub Actions"
   - 確認工作流文件存在於 `.github/workflows/deploy.yml`

#### 1.3 手動觸發部署

```bash
# 推送到 main 分支自動觸發部署
git push origin main

# 或在 GitHub UI 中手動觸發工作流
# 進入 Actions 標籤 → 選擇工作流 → Run workflow
```

### 方法 2：手動部署

如果不使用 GitHub Actions，可手動部署：

```bash
# 1. 構建應用
npm run build

# 2. 複製 dist 文件到 gh-pages 分支
git checkout gh-pages

# 3. 複製 dist/ 中的內容
cp -r dist/* .

# 4. 提交和推送
git add .
git commit -m "Deploy: update site"
git push origin gh-pages

# 5. 切換回 main
git checkout main
```

## 🌐 部署到其他平台

### Vercel（推薦）

Vercel 是 Vite 創建者推薦的平台，支持自動部署。

#### 使用 Vercel CLI 部署

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 登錄 Vercel
vercel login

# 部署（第一次會進行配置）
vercel

# 部署到生產環境
vercel --prod
```

#### 使用 Git 集成部署

1. 在 [vercel.com](https://vercel.com) 創建帳戶
2. 導入 GitHub 倉庫
3. 配置構建設置：
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. 點擊 "Deploy"

### Netlify

```bash
# 安裝 Netlify CLI
npm install -g netlify-cli

# 登錄
netlify login

# 部署
netlify deploy --prod --dir=dist
```

### AWS S3 + CloudFront

```bash
# 1. 構建
npm run build

# 2. 同步到 S3
aws s3 sync dist/ s3://your-bucket-name/ --delete

# 3. 清除 CloudFront 緩存
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Docker 部署

#### 1. 創建 Dockerfile

```dockerfile
# 構建階段
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 運行階段
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 2. 構建和運行

```bash
# 構建 Docker 鏡像
docker build -t portfolio:latest .

# 運行容器
docker run -p 80:80 portfolio:latest

# 推送到 Docker Hub
docker tag portfolio:latest YOUR_DOCKER_ID/portfolio:latest
docker push YOUR_DOCKER_ID/portfolio:latest
```

## 🔧 環境變量配置

### 開發環境

```bash
# .env.development
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

### 生產環境

```bash
# .env.production
VITE_API_URL=https://api.leeuki.com
VITE_ENV=production
```

### 在應用中使用

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const env = import.meta.env.VITE_ENV;
```

## 📊 部署後檢查

部署完成後，請驗證以下內容：

### 1. 基本檢查

```bash
# 檢查站點是否在線
curl -I https://your-domain.com

# 檢查 HTTP 重定向
curl -L https://your-domain.com

# 驗證 HTTPS 證書
openssl s_client -connect your-domain.com:443
```

### 2. 功能測試

- ✅ 首頁加載正常
- ✅ 導航連結工作
- ✅ 響應式設計正確
- ✅ 圖片加載成功
- ✅ 社群連結打開正確
- ✅ CV 下載有效

### 3. 性能驗證

在 [Google PageSpeed Insights](https://pagespeed.web.dev) 中測試：

- ✅ Lighthouse 評分 > 90
- ✅ Core Web Vitals 綠色指標
- ✅ 首頁加載時間 < 3 秒

### 4. SEO 驗證

- ✅ robots.txt 可訪問
- ✅ sitemap.xml 可訪問
- ✅ Open Graph 標籤正確
- ✅ Schema.org 結構化數據有效

使用以下工具驗證：

```bash
# 檢查 robots.txt
curl https://your-domain.com/robots.txt

# 檢查 sitemap.xml
curl https://your-domain.com/sitemap.xml

# 驗證元標籤（使用在線工具）
# https://www.opengraph.xyz/
# https://www.twittercardvalidator.com/
```

### 5. 安全檢查

- ✅ HTTPS 啟用
- ✅ HTTP 重定向到 HTTPS
- ✅ 安全頭部設置（X-Frame-Options 等）
- ✅ CORS 配置正確

### 6. 無障礙檢查

- ✅ axe DevTools 檢查通過
- ✅ 屏幕閱讀器測試
- ✅ 鍵盤導航測試

## 🔄 持續集成/部署 (CI/CD)

### GitHub Actions 工作流狀態

檢查工作流執行：

```bash
# 查看最近的工作流運行
gh run list --repo YOUR_REPO

# 查看特定工作流的詳細信息
gh run view RUN_ID

# 查看日誌
gh run view RUN_ID --log
```

### 監控構建狀態

在 README.md 中添加構建徽章：

```markdown
[![Deploy to GitHub Pages](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/deploy.yml)
```

## 🚨 故障排查

### 常見問題

**Q: 部署後頁面空白或資源 404？**

A: 檢查 `vite.config.ts` 中的 base 路徑設置：

```typescript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  // ...
});
```

**Q: 样式未加载？**

A: 檢查 Tailwind CSS 構建配置，確保所有模板文件包含在 `content` 中。

**Q: 圖片顯示 404？**

A: 確保圖片路徑相對於 `public/` 目錄正確。

**Q: 環境變量未加載？**

A: 使用 `import.meta.env.` 而非 `process.env.`

## 📝 版本管理

### 語義化版本 (SemVer)

格式: `MAJOR.MINOR.PATCH`

```
1.0.0  →  1.0.1  (補丁版本：修復)
1.0.0  →  1.1.0  (次版本：新功能)
1.0.0  →  2.0.0  (主版本：破壞性變更)
```

### 發佈新版本

```bash
# 更新 package.json 中的版本號
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# 創建 Git 標籤
git push origin main --tags

# 創建 GitHub Release
gh release create v1.0.0 --generate-notes
```

## 📚 進一步學習

- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [Vercel 文檔](https://vercel.com/docs)
- [Docker 最佳實踐](https://docs.docker.com/develop/dev-best-practices/)

---

**最後更新**: 2024 年 1 月 15 日
