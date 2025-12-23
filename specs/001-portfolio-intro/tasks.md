# Phase 2 實現任務清單：個人作品集介紹頁面

**特性**: 001-portfolio-intro | **日期**: 2025-12-22 | **階段**: Phase 2  
**參考文檔**: [spec.md](spec.md) | [plan.md](plan.md) |
[research.md](research.md) | [data-model.md](data-model.md) |
[contracts/components.md](contracts/components.md)

---

## 執行摘要

此文件包含個人作品集介紹頁面的全部實現任務（66 項），按以下優先級分組：

- **Phase 2.0** (Setup): 項目初始化和開發環境配置 (7 項)
- **Phase 2.1** (Foundational): 共享基礎設施和工具 (8 項)
- **Phase 2.2** (US1): 個人資料卡顯示 (14 項) ← P1 優先
- **Phase 2.3** (US2): 作品集展示區 (18 項) ← P1 優先
- **Phase 2.4** (US3): 技能標籤展示 (12 項) ← P2 優先
- **Phase 2.5** (Polish): 品質保證和部署 (7 項)

**MVP 建議**: 完成 Phase 2.0 → 2.1 → 2.2 → 2.3，獲得完整的核心功能產品。

---

## 任務優先級和依賴

### 依賴圖

```
Phase 2.0 (Setup)
    ↓
Phase 2.1 (Foundation)
    ├→ Phase 2.2 (US1: 個人資料卡) [獨立完成]
    ├→ Phase 2.3 (US2: 作品集展示) [獨立完成]
    └→ Phase 2.4 (US3: 技能標籤) [獨立完成]
         ↓
Phase 2.5 (Polish & Deploy)
```

### 並行執行機會

**建議的並行組合**:

1. **串聯路徑 (最小團隊)**: Setup → Foundation → US1 → US2 → US3 → Polish
2. **並行路徑 (2-3 人團隊)**:
   - 開發者 A: Setup → Foundation → US1 完整實現
   - 開發者 B: 並行 US2 + US3 實現（基於 Foundation 任務）
3. **全並行路徑 (3-4 人團隊)**:
   - 開發者 A: Setup + Foundation
   - 開發者 B: US1 + US1 測試
   - 開發者 C: US2 + US2 測試
   - 開發者 D: US3 + US3 測試
   - 在 Foundation 完成後，所有故事可並行進行

---

## 任務清單

### Phase 2.0: 項目初始化 (Setup)

**目標**: 創建 Vite + React + TypeScript 項目框架，配置開發環境

- [ ] T001 [P] 使用 Vite 官方範本創建新的 React + TypeScript 項目
      `npx create-vite@latest portfolio --template react-ts`，並驗證
      `npm run dev` 可正常啟動 [src/]
- [ ] T002 [P] 安裝核心依賴：tailwindCSS
      v3、@fortawesome/react-fontawesome、fontawesome-free、eslint、prettier、vitest、@testing-library/react
      [package.json]
- [ ] T003 [P] 配置 TypeScript strict mode：編輯 `tsconfig.json`，設置
      `"strict": true`、`"noImplicitAny": true` 等選項 [tsconfig.json]
- [ ] T004 [P] 配置 tailwindCSS：創建
      `tailwind.config.ts`、`postcss.config.js`，導入 tailwindCSS 指令到
      `src/index.css` [tailwind.config.ts, postcss.config.js, src/index.css]
- [ ] T005 [P] 配置 ESLint 和 Prettier：創建 `.eslintrc.json` 和
      `.prettierrc.json`，集成 TypeScript 規則和 React 規則 [.eslintrc.json,
      .prettierrc.json]
- [ ] T006 [P] 配置 Vitest：創建 `vitest.config.ts`，配置測試環境、覆蓋率報告、
      環境變量 [vitest.config.ts]
- [ ] T007 [P] 更新 `package.json` 的 scripts 部分，添加
      dev、build、preview、lint、format、test、test:ui 命令 [package.json]

**測試驗收**:

- `npm run dev` 成功啟動開發伺服器，無錯誤
- `npm run build` 成功構建，無 ESLint 警告
- `npm run test` 成功執行（即使沒有測試也應該正常啟動）

---

### Phase 2.1: 基礎設施與共享模組 (Foundation)

**目標**: 創建數據結構、類型定義、工具函數，建立組件開發的基礎

- [ ] T008 [P] 創建 TypeScript 類型定義文件 `src/types/models.ts`，包含
      PersonalProfile、SocialLink、PortfolioItem、Skill 等完整型別定義，並導出所
      有類型 [src/types/models.ts]

- [ ] T009 [P] 創建靜態數據文件 `src/data/portfolio.ts`，包含
      PersonalProfile、PortfolioItem 陣列（至少 5 個示例項目）、Skill 陣列（至少
      15 個示例技能）的真實數據示例，並導出為常量 [src/data/portfolio.ts]

- [ ] T010 [P] 創建工具函數文件 `src/utils/constants.ts`，定義 breakpoints（響應
      式斷點）、colors（色彩系統）、fontAwesomeIconMap（圖標對應表）
      [src/utils/constants.ts]

- [ ] T011 [P] 創建自定義 React Hook `src/hooks/useViewport.ts`，實現 viewport
      大小偵測，返回當前設備類型（mobile/tablet/desktop）和螢幕寬度，用於響應式
      設計 [src/hooks/useViewport.ts]

- [ ] T012 [P] 創建 React Context 文件 `src/context/PortfolioContext.tsx`，提供
      全局數據存儲（個人資料、作品集、技能），便於所有組件訪問無需逐層傳遞 props
      [src/context/PortfolioContext.tsx]

- [ ] T013 [P] 創建應用進入點 `src/App.tsx`，使用 Context Provider 包裝整個應用
      ，配置頁面頂級結構（Header、Main、Footer）、語言支持、SEO 元標籤
      [src/App.tsx]

- [ ] T014 [P] 創建全局樣式文件 `src/index.css`，包含 tailwindCSS 指令、全局變量
      定義（顏色、間距、字體）、重置樣式、可訪問性相關的基礎樣式 [src/index.css]

- [ ] T015 [P] 創建主入口文件 `src/main.tsx`，掛載 React 應用到 DOM，配置 React
      18 的 createRoot [src/main.tsx]

**測試驗收**:

- 所有類型定義編譯無誤，TypeScript strict mode 下無錯誤
- 應用啟動成功，無控制台警告
- Context 正確提供數據，組件可正確訪問全局狀態

---

### Phase 2.2: 使用者故事 1 - 個人資料卡顯示 [US1]

**故事目標**: 在頁面頂部展示個人基本資訊、頭像、社群連結和 CV 下載功能  
**優先級**: P1（MVP 核心功能）

**獨立測試準則**:

- ✅ 個人資料卡正確顯示姓名、職稱、簡介、頭像
- ✅ 社群連結（LinkedIn、GitHub）圖標可點擊，打開新視窗
- ✅ CV 下載按鈕正常工作，觸發文件下載
- ✅ 響應式設計：手機、平板、桌機上都正確顯示

#### T016-T029: 實現任務

- [ ] T016 [P] [US1] 創建 Avatar 組件 `src/components/Avatar.tsx`，支持 size 參
      數（small/medium/large）、rounded 參數、lazy loading、alt 文字和無障礙標籤
      [src/components/Avatar.tsx]

- [ ] T017 [P] [US1] 創建 SocialLinks 組件 `src/components/SocialLinks.tsx`，接
      收 SocialLink 陣列，支持 layout（horizontal/vertical）
      、size（small/medium/large）、showLabels 參數，每個連結使用 FontAwesome 圖
      標，具備 aria-label 和無障礙支持 [src/components/SocialLinks.tsx]

- [ ] T018 [P] [US1] 創建 CVDownloadButton 組件
      `src/components/CVDownloadButton.tsx`，支持 variant（primary/secondary）
      、onDownload 回調，實現 PDF 檔案下載邏輯，包含無障礙標籤
      [src/components/CVDownloadButton.tsx]

- [ ] T019 [US1] 創建 ProfileCard 組件 `src/components/ProfileCard.tsx`，包含：

  - 頭像（使用 Avatar 組件）
  - 姓名、職稱、簡介文本
  - 社群連結（使用 SocialLinks 組件）
  - CV 下載按鈕（使用 CVDownloadButton 組件）
  - 響應式布局：desktop 3 欄（1/3 頭像 + 2/3 文本），mobile 1 欄
  - 適當的 margin、padding、color 使用 tailwindCSS
    [src/components/ProfileCard.tsx]

- [ ] T020 [US1] 創建 Navigation 組件 `src/components/Navigation.tsx`，包含：

  - 固定頂部導航欄（sticky top-0）
  - 品牌 Logo / 頁面標題
  - 導航錨點連結（到 #profile、#portfolio、#skills）
  - 滾動進度條視覺指示
  - 響應式設計：桌機顯示全部導航，mobile 顯示簡化版本
    [src/components/Navigation.tsx]

- [ ] T021 [US1] 創建 Header 組件 `src/components/Header.tsx`，作為 Navigation
      的容器，處理滾動監聽和進度計算邏輯 [src/components/Header.tsx]

- [ ] T022 [US1] 創建單元測試 `src/components/__tests__/Avatar.test.tsx`，測試：

  - 正確渲染圖片和 alt 文字
  - 不同 size 參數的 CSS class 應用
  - lazy loading 屬性存在 [src/components/__tests__/Avatar.test.tsx]

- [ ] T023 [US1] 創建單元測試 `src/components/__tests__/SocialLinks.test.tsx`，
      測試：

  - 渲染所有傳入的社群連結
  - 每個連結有正確的 href 和 target="\_blank"
  - aria-label 屬性存在
  - layout 參數正確改變 CSS class
    [src/components/__tests__/SocialLinks.test.tsx]

- [ ] T024 [US1] 創建單元測試
      `src/components/__tests__/CVDownloadButton.test.tsx`，測試：

  - 按鈕文本正確顯示
  - onDownload 回調被正確調用
  - href 和 download 屬性設置正確
    [src/components/__tests__/CVDownloadButton.test.tsx]

- [ ] T025 [US1] 創建組件測試 `src/components/__tests__/ProfileCard.test.tsx`，
      測試：

  - 顯示個人名稱、職稱、簡介
  - 顯示所有社群連結
  - CV 下載按鈕存在且可點擊
  - 使用 screen.getByRole、screen.getByText 進行斷言
    [src/components/__tests__/ProfileCard.test.tsx]

- [ ] T026 [US1] 無障礙測試：使用 axe DevTools 檢查 ProfileCard 組件，確保：

  - 所有圖像有 alt 文字
  - 所有交互元素有無障礙名稱（aria-label 或 label）
  - 色彩對比度 ≥ 4.5:1 (WCAG AA)
  - 鍵盤導航能訪問所有交互元素文檔記錄在 [ACCESSIBILITY.md]

- [ ] T027 [US1] 響應式測試：在 Chrome DevTools 中測試 ProfileCard 組件，驗證：

  - 320px (iPhone SE) 上正確顯示
  - 768px (iPad) 上正確顯示
  - 1440px (桌機) 上正確顯示
  - 所有文本可讀，圖片等比例縮放文檔記錄在 [RESPONSIVE_TEST.md]

- [ ] T028 [US1] 性能測試：使用 Lighthouse 檢查 ProfileCard 組件的渲染性能，記錄
      ：

  - 組件初始化時間（應 < 100ms）
  - 圖片加載時間
  - 互動反應時間（應 < 200ms）文檔記錄在 [PERFORMANCE.md]

- [ ] T029 [US1] 集成測試：創建 `src/pages/Home.tsx`，包含 Header 和 ProfileCard
      組件，在完整頁面上測試：
  - 導航欄固定在頂部
  - ProfileCard 正確位置和樣式
  - 滾動時進度條變化
  - 社群連結和 CV 按鈕能正常工作

---

### Phase 2.3: 使用者故事 2 - 作品集展示區 [US2]

**故事目標**: 展示 3-5 個精選作品項目卡片，提供查看詳情和完整作品集連結  
**優先級**: P1（MVP 核心功能）

**獨立測試準則**:

- ✅ 正確顯示 3-5 個精選項目（featured: true）
- ✅ 每個項目卡片顯示標題、簡介、技術標籤、預覽圖片
- ✅ 點擊項目卡片或連結能打開外部項目或詳情頁
- ✅ 提供「查看完整作品集」導航連結
- ✅ 網格佈局響應式：mobile 1 欄，tablet 2 欄，desktop 3 欄

#### T030-T047: 實現任務

- [ ] T030 [P] [US2] 創建 ProjectImage 組件 `src/components/ProjectImage.tsx`，
      支持：

  - 圖片 lazy loading
  - WebP 現代格式 (fallback to JPEG/PNG)
  - 響應式圖片（srcset）
  - 圖片加載失敗時的備用顯示
  - 無障礙 alt 文字 [src/components/ProjectImage.tsx]

- [ ] T031 [P] [US2] 創建 ProjectTags 組件 `src/components/ProjectTags.tsx`，支
      持：

  - 渲染技術標籤列表
  - maxTags 參數限制顯示數量（預設 4）
  - 超出數量時顯示 "+N" 指示
  - tailwindCSS 樣式（背景、文字、圓角） [src/components/ProjectTags.tsx]

- [ ] T032 [P] [US2] 創建 PortfolioCard 組件
      `src/components/PortfolioCard.tsx`，包含：

  - 項目圖片（使用 ProjectImage）
  - 「精選」標籤顯示
  - 項目標題和簡介（line-clamp 限制行數）
  - 技術標籤列表（使用 ProjectTags）
  - 「查看項目」和 GitHub 連結按鈕
  - hover 效果（陰影擴大、圖片縮放）
  - 鍵盤導航支持（可用 Tab 和 Enter 訪問） [src/components/PortfolioCard.tsx]

- [ ] T033 [P] [US2] 創建 PortfolioSection 組件
      `src/components/PortfolioSection.tsx`，包含：

  - 渲染 featured 為 true 的項目卡片
  - 按 order 欄位排序
  - 最多顯示 maxFeatured 個項目（預設 5）
  - 網格佈局：grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  - 「查看完整作品集」導航連結
  - 無項目時顯示 fallback 消息 [src/components/PortfolioSection.tsx]

- [ ] T034 [US2] 創建單元測試 `src/components/__tests__/ProjectImage.test.tsx`，
      測試：

  - 圖片正確渲染
  - alt 文字存在
  - srcset 屬性設置
  - lazy loading 屬性存在 [src/components/__tests__/ProjectImage.test.tsx]

- [ ] T035 [US2] 創建單元測試 `src/components/__tests__/ProjectTags.test.tsx`，
      測試：

  - 所有標籤正確渲染
  - maxTags 限制生效
  - 超出標籤時 "+N" 顯示正確 [src/components/__tests__/ProjectTags.test.tsx]

- [ ] T036 [US2] 創建組件測試
      `src/components/__tests__/PortfolioCard.test.tsx`，測試：

  - 項目標題、簡介、標籤正確顯示
  - 項目連結 href 正確
  - 「精選」標籤在 featured 為 true 時顯示
  - 點擊卡片時 onClick 回調被調用
    [src/components/__tests__/PortfolioCard.test.tsx]

- [ ] T037 [US2] 創建組件測試
      `src/components/__tests__/PortfolioSection.test.tsx`，測試：

  - 只顯示 featured: true 的項目
  - 最多顯示 maxFeatured 個項目
  - 項目按 order 排序
  - 「查看完整作品集」連結存在
    [src/components/__tests__/PortfolioSection.test.tsx]

- [x] T038 [US2] 無障礙測試：使用 axe DevTools 檢查
      PortfolioCard、PortfolioSection，確保：

  - 項目卡片有適當的 role（article 或 button）
  - 標籤和圖片有無障礙名稱
  - 色彩對比度達標（WCAG AA）
  - 鍵盤導航能訪問所有連結和按鈕文檔記錄在 [ACCESSIBILITY.md]

- [x] T039 [US2] 響應式測試：測試 PortfolioSection 在不同屏幕寬度上的布局：

  - 320px: 1 欄網格
  - 768px: 2 欄網格
  - 1024px+: 3 欄網格文檔記錄在 [RESPONSIVE_TEST.md]

- [x] T040 [US2] 性能測試：測試作品集區域的性能：

  - 圖片加載不阻塞頁面互動
  - 滾動時圖片懶加載正常進行
  - FCP 保持在 < 3 秒內文檔記錄在 [PERFORMANCE.md]

- [x] T041 [US2] 邊界情況測試：測試極端情況：

  - 當沒有精選項目時，顯示適當的 fallback
  - 當項目數超過 20 個時，性能仍然良好
  - 當項目標題或簡介特別長時，文本截斷正確文檔記錄在 [EDGE_CASES.md]

- [x] T042 [US2] 圖片加載失敗測試：模擬圖片加載失敗場景：

  - 使用 DevTools Network 限流或禁用圖片
  - 驗證 alt 文字顯示
  - 驗證頁面布局不崩潰文檔記錄在 [ERROR_HANDLING.md]

- [x] T043 [US2] 集成測試：更新 `src/pages/Home.tsx`，添加 PortfolioSection 組件
      ，測試：

  - ProfileCard 和 PortfolioSection 的組合布局
  - 導航錨點連結正確指向各區域
  - 滾動到相應區域時錨點高亮

- [x] T044 [US2] 創建作品集詳情頁 `src/pages/PortfolioDetail.tsx`（可選），顯示
      單個項目的完整信息：

  - 項目大圖展示
  - 完整描述和成果指標
  - 返回列表連結 [src/pages/PortfolioDetail.tsx]

- [x] T045 [US2] 實現完整作品集頁面 `src/pages/PortfolioAll.tsx`（可選），顯示所
      有項目：

  - 搜索/篩選功能
  - 分頁或無限滾動
  - 排序選項（按日期、技術、評分） [src/pages/PortfolioAll.tsx]

- [x] T046 [US2] 集成路由（如使用 React Router，可選）：

  - 配置路由文件 `src/router/routes.tsx`
  - 主頁 (/) → Home.tsx
  - 作品詳情 (/portfolio/:id) → PortfolioDetail.tsx
  - 完整作品集 (/portfolio) → PortfolioAll.tsx [src/router/routes.tsx]

- [x] T047 [US2] 實現靜態導出（如使用 vite-plugin-ssr 或構建時生成靜態 HTML）：
  - 配置 Vite 以生成靜態 HTML 文件
  - 驗證所有路由都能生成靜態頁面
  - 可部署到 GitHub Pages 或靜態託管

---

### Phase 2.4: 使用者故事 3 - 技能標籤展示 [US3]

**故事目標**: 展示 10-15 項技能標籤，按分類（前端、後端、工具等）分組  
**優先級**: P2（增強功能）

**獨立測試準則**:

- ✅ 正確顯示所有技能項目
- ✅ 技能按分類分組顯示
- ✅ 每個技能顯示圖標、名稱、等級評分
- ✅ 響應式佈局：技能標籤自動換行

#### T048-T059: 實現任務

- [ ] T048 [P] [US3] 創建 SkillTag 組件 `src/components/SkillTag.tsx`，支持：

  - 技能名稱和圖標（FontAwesome）
  - 等級評分顯示（1-5 級星星符號）
  - 顏色編碼（根據等級變化背景顏色）
  - showLevel 參數控制是否顯示星星
  - showTooltip 參數控制是否顯示工具提示
  - 無障礙 aria-label [src/components/SkillTag.tsx]

- [ ] T049 [P] [US3] 創建 SkillsSection 組件
      `src/components/SkillsSection.tsx`，支持：

  - 渲染所有技能項目
  - groupByCategory 參數控制是否分組
  - 分類標題顯示（前端開發、後端開發、DevOps 等）
  - Flex 佈局自動換行
  - 無技能時顯示 fallback [src/components/SkillsSection.tsx]

- [ ] T050 [US3] 創建單元測試 `src/components/__tests__/SkillTag.test.tsx`，測試
      ：

  - 技能名稱正確顯示
  - 圖標正確渲染
  - 等級星星數量正確（1-5）
  - 等級顏色類名正確應用
  - aria-label 包含技能名稱和等級 [src/components/__tests__/SkillTag.test.tsx]

- [ ] T051 [US3] 創建組件測試
      `src/components/__tests__/SkillsSection.test.tsx`，測試：

  - 所有技能項目正確渲染
  - 按分類分組時分類標題顯示
  - groupByCategory 參數控制分組邏輯
  - 無技能時 fallback 顯示 [src/components/__tests__/SkillsSection.test.tsx]

- [ ] T052 [US3] 無障礙測試：使用 axe DevTools 檢查 SkillTag、SkillsSection，確
      保：

  - 技能標籤有無障礙名稱
  - 圖標有替代文字說明
  - 色彩不是唯一的信息傳達方式（配合文字和星星符號）
  - WCAG AA 色彩對比度達標文檔記錄在 [ACCESSIBILITY.md]

- [ ] T053 [US3] 響應式測試：測試技能區域在不同屏幕寬度上的佈局：

  - 320px: 技能標籤單列排列
  - 768px: 技能標籤 2-3 列排列
  - 1024px+: 技能標籤多列排列
  - 標籤自動換行，無溢出文檔記錄在 [RESPONSIVE_TEST.md]

- [ ] T054 [US3] 性能測試：測試技能區域性能：

  - 15+ 個技能標籤渲染時間 < 200ms
  - 圖標加載不阻塞頁面
  - 滾動時性能保持流暢文檔記錄在 [PERFORMANCE.md]

- [ ] T055 [US3] 邊界情況測試：

  - 當技能數量為 0 時，fallback 正確
  - 當技能名稱很長時，截斷或換行正確
  - 當某個分類沒有技能時，分類標題不顯示文檔記錄在 [EDGE_CASES.md]

- [ ] T056 [US3] 集成測試：更新 `src/pages/Home.tsx`，添加 SkillsSection 組件，
      測試：

  - ProfileCard → PortfolioSection → SkillsSection 的完整頁面佈局
  - 導航錨點正確指向技能區域
  - 滾動時各區域過渡流暢

- [ ] T057 [US3] 國際化（i18n）準備（可選）：

  - 創建 `src/i18n/translations.ts`，定義技能分類的中英文翻譯
  - 為 SkillsSection 添加 locale prop
  - 在繁體中文和英文之間切換分類標題 [src/i18n/translations.ts]

- [ ] T058 [US3] 暗色模式支持（可選）：

  - 配置 tailwindCSS 支持 dark mode
  - 在 SkillTag 中添加 dark: 樣式（暗色背景下的色彩調整）
  - 實現主題切換 hook 或 Context [src/context/ThemeContext.tsx 或
    hooks/useDarkMode.ts]

- [ ] T059 [US3] 技能排序功能（可選）：
  - 添加排序選項（按等級、字母、分類）
  - 在 SkillsSection 中實現排序邏輯
  - 提供 UI 控制（下拉菜單或按鈕組）

---

### Phase 2.5: 品質保證與部署 (Polish & Deploy)

**目標**: 完整的應用測試、文檔、效能優化、部署

#### T060-T066: 實現任務

- [ ] T060 [P] 端到端 (E2E) 測試：創建 `e2e/portfolio.spec.ts`（使用 Playwright
      或 Cypress），測試完整用戶流程：

  - 頁面加載和初始渲染
  - 點擊社群連結（驗證新視窗打開）
  - CV 下載功能
  - 滾動到各區域
  - 響應式設計（多設備模擬） [e2e/portfolio.spec.ts]

- [ ] T061 [P] 性能優化和分析：

  - 執行 Lighthouse 檢查，目標 Performance ≥ 85
  - 分析關鍵渲染路徑，優化初始加載
  - 實現代碼分割（如使用 React.lazy）
  - 壓縮圖片資源，驗證 WebP 格式使用
  - 生成性能基準報告 [PERFORMANCE_REPORT.md]

- [ ] T062 [P] 無障礙性完整審計：

  - 執行完整的 WCAG 2.1 AA 審計（使用 axe, WAVE 等工具）
  - 修復所有發現的無障礙問題
  - 進行屏幕閱讀器測試（NVDA、JAWS）
  - 生成無障礙合規報告 [ACCESSIBILITY_AUDIT.md]

- [ ] T063 [P] SEO 優化和元數據：

  - 添加頁面元標籤（title、description、og:_、twitter:_）
  - 使用 React Helmet 管理 HTML 頭部
  - 添加結構化數據（Schema.org JSON-LD）
  - 建立 sitemap.xml 和 robots.txt
  - 驗證 Open Graph 分享卡片 [public/robots.txt, public/sitemap.xml]

- [ ] T064 [P] 文檔完成：

  - 編寫 README.md，包含項目概述、技術棧、安裝說明、開發指南
  - 編寫 CONTRIBUTING.md，定義代碼貢獻規範
  - 編寫 DEPLOYMENT.md，說明部署步驟
  - 編寫 ARCHITECTURE.md，解釋項目結構和設計決策
  - 添加 JSDoc 註釋到所有公共函數和組件 [README.md, CONTRIBUTING.md,
    DEPLOYMENT.md, ARCHITECTURE.md]

- [ ] T065 [P] 配置部署流程：

  - 創建 `.github/workflows/deploy.yml`（GitHub Actions），自動構建和部署到
    GitHub Pages
  - 配置 `package.json` 的 homepage 欄位
  - 設置 `vite.config.ts` 的 base 路徑（如需要）
  - 驗證部署後的應用在 GitHub Pages 上正常運行 [.github/workflows/deploy.yml]

- [ ] T066 [P] 最終檢查和發布：
  - 執行完整的回歸測試（npm run test，覆蓋率 ≥ 80%）
  - 驗證所有代碼遵循 ESLint 規則（npm run lint）
  - 代碼格式化（npm run format）
  - 檢查 TypeScript 編譯（無任何錯誤或警告）
  - 執行生產構建（npm run build），驗證構建成功且體積 < 200KB
  - 記錄發布日期和版本號 [releases/v1.0.0.md]

---

## 測試覆蓋目標

**總體目標**: ≥ 80% 測試覆蓋率

### 按組件的測試覆蓋

| 組件             | 單元測試    | 組件測試 | E2E 測試 | 目標覆蓋 |
| ---------------- | ----------- | -------- | -------- | -------- |
| Avatar           | ✅ T022     | —        | —        | 95%      |
| SocialLinks      | ✅ T023     | —        | —        | 95%      |
| CVDownloadButton | ✅ T024     | —        | —        | 95%      |
| ProfileCard      | —           | ✅ T025  | —        | 90%      |
| ProjectImage     | ✅ T034     | —        | —        | 90%      |
| ProjectTags      | ✅ T035     | —        | —        | 95%      |
| PortfolioCard    | —           | ✅ T036  | —        | 90%      |
| PortfolioSection | —           | ✅ T037  | —        | 85%      |
| SkillTag         | ✅ T050     | —        | —        | 95%      |
| SkillsSection    | —           | ✅ T051  | —        | 85%      |
| 數據模型 (types) | —           | —        | —        | 100%     |
| 工具函數 (utils) | ✅ T008-015 | —        | —        | 90%      |
| **整體應用**     | —           | —        | ✅ T060  | **≥80%** |

---

## 實現策略與 MVP 建議

### MVP 最小可行產品範圍

**推薦 MVP 包含**: Phase 2.0 → 2.1 → 2.2 → 2.3

| 階段             | 任務數 | 時間估算     | 交付物              |
| ---------------- | ------ | ------------ | ------------------- |
| Setup (2.0)      | 7      | 2-3 天       | 項目框架 + 依賴     |
| Foundation (2.1) | 8      | 2-3 天       | 數據模型 + 組件基礎 |
| US1 (2.2)        | 14     | 3-4 天       | 個人資料卡 + 導航   |
| US2 (2.3)        | 18     | 4-5 天       | 作品集展示          |
| **MVP 小計**     | **47** | **11-15 天** | **核心應用**        |
| US3 (2.4)        | 12     | 2-3 天       | 技能標籤（增強）    |
| Polish (2.5)     | 7      | 2-3 天       | 優化 + 部署         |
| **完整版本**     | **66** | **15-21 天** | **生產級應用**      |

### 推薦開發順序

**串聯路徑** (1 人開發):

```
T001-T007 (Setup, 2-3 天)
  ↓
T008-T015 (Foundation, 2-3 天)
  ↓
T016-T029 (US1, 3-4 天)
  ↓
T030-T047 (US2, 4-5 天)
  ↓
T048-T059 (US3, 2-3 天)
  ↓
T060-T066 (Polish, 2-3 天)
```

**並行路徑** (2-3 人團隊):

```
開發者 A: T001-T015 (Setup + Foundation)
開發者 B: T016-T029 (US1 同時進行)
開發者 C: T030-T047 (US2 同時進行)
  ↓ (在 Foundation 完成後)
開發者 A: T048-T059 (US3)
  ↓ (所有故事完成後)
全體: T060-T066 (Polish + Deploy)
```

---

## 依賴與前提條件

### 環境要求

- Node.js ≥ 16.0.0
- npm ≥ 8.0.0
- VSCode + ESLint / Prettier 擴展（推薦）

### 已完成的先決條件

- ✅ 規格文件 (spec.md) - 已澄清 5 個關鍵問題
- ✅ 技術計劃 (plan.md) - 已確認技術棧和架構
- ✅ 可行性研究 (research.md) - 已驗證技術可行性
- ✅ 數據模型設計 (data-model.md) - 已定義完整的 TypeScript 類型
- ✅ 組件契約設計 (contracts/components.md) - 已定義 13 個組件的接口

### 外部依賴

- fontawesome-free CDN 或 npm 包（用於圖標）
- tailwindCSS 官方文檔（用於樣式參考）
- 用戶提供的個人資料、作品集圖片、CV 文件

---

## 成功衡量

### 任務完成標準

✅ 每項任務都應滿足：

1. **代碼**: 實現代碼遵循 TypeScript strict mode、ESLint 規則、JSDoc 文檔標準
2. **測試**: 相應的測試通過，覆蓋率達到指定目標
3. **無障礙**: 遵循 WCAG 2.1 AA 標準
4. **文檔**: 有清晰的實現說明和使用示例
5. **性能**: 滿足指定的性能要求（FCP、互動反應時間等）

### 交付驗收

**完整應用應滿足**:

- ✅ 所有 3 個使用者故事獨立可測試
- ✅ 性能指標達標（Lighthouse ≥ 85，FCP < 3s）
- ✅ 無障礙審計通過（WCAG 2.1 AA）
- ✅ 測試覆蓋率 ≥ 80%
- ✅ 所有代碼無 ESLint 警告
- ✅ 可成功構建和部署到 GitHub Pages
- ✅ 文檔完整（README、DEPLOYMENT、ARCHITECTURE 等）

---

**任務清單建立日期**: 2025-12-22  
**總任務數**: 66 項  
**預計完成時間**: 15-21 天（取決於開發人員數量和工作強度）  
**下一步**: 按優先級開始執行任務（推薦從 T001 開始）
