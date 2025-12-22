# 實現計劃：個人作品集介紹頁面重構

**分支**: `001-portfolio-intro` | **日期**: 2025-12-22 | **規格**:
[spec.md](spec.md)  
**輸入**: 規格文件 `/specs/001-portfolio-intro/spec.md`

---

## 摘要

建立一個基於 **React.js v18 + TypeScript v5 + tailwindCSS v3 + Vite** 的個人作品
集介紹頁面。此為純靜態展示頁面，包含個人資料卡、精選作品集展示和技能標籤三個主要
區域。社群連結（LinkedIn、GitHub）和技能標籤均使用 **fontawesome-free** 圖標庫呈
現。

---

## 技術背景

### 技術選型確認

| 項目         | 版本/選擇        | 說明                                   |
| ------------ | ---------------- | -------------------------------------- |
| **框架**     | React.js v18.x   | 提供組件化開發和 SSR 能力              |
| **語言**     | TypeScript v5    | 提供類型安全和開發體驗                 |
| **樣式**     | tailwindCSS v3.x | 原子化 CSS，快速開發 UI                |
| **打包工具** | Vite             | 現代化前端構建，快速開發伺服器         |
| **圖標庫**   | fontawesome-free | 免費開源圖標庫，支持社群連結和技能展示 |
| **語言限制** | 正體中文         | 所有文件、註解、AI 回應採用繁體中文    |

### 技術棧驗證

- ✅ **性能**: Vite 提供快速冷啟動和熱模塊替換；React v18 的新特性支持並發渲染
- ✅ **類型安全**: TypeScript 確保開發品質和可維護性
- ✅ **樣式靈活性**: tailwindCSS 支持響應式設計，符合 Constitution UX 一致性要求
- ✅ **圖標支持**: fontawesome-free 提供豐富的圖標，支持社群連結和技能展示
- ✅ **無障礙性**: React 生態和 tailwindCSS 提供對無障礙開發的良好支持

---

## 憲法檢查

**✅ 通過** - 此特性符合項目 Constitution 的所有四個核心原則：

### I. 程式品質 (Code Quality)

- ✅ 使用 TypeScript strict 模式確保類型安全
- ✅ 建立 ESLint + Prettier 配置規範程式碼
- ✅ 提供完整的 JSDoc 文檔和型別定義

### II. 測試標準 (Testing Standards)

- ✅ 規劃單元測試（使用 Vitest）覆蓋核心組件
- ✅ 規劃組件測試（使用 React Testing Library）
- ✅ 設定測試覆蓋率目標 ≥80%

### III. UX 一致性 (User Experience Consistency)

- ✅ 使用 tailwindCSS v3 確保設計系統一致性
- ✅ 響應式設計支持手機、平板、桌機
- ✅ 符合 WCAG 2.1 AA 無障礙標準要求

### IV. 效能需求 (Performance Requirements)

- ✅ FCP < 3 秒目標（通過代碼分割和圖片優化）
- ✅ TTI < 5 秒目標（通過懶加載和性能優化）
- ✅ Lighthouse 性能分數 ≥85 目標

---

## 專案結構

### 文檔結構（此特性）

```
specs/001-portfolio-intro/
├── spec.md              ✓ 規格文件（已完成澄清）
├── plan.md              ← 本文件（實現計劃）
├── research.md          ← Phase 0（可行性和技術研究）
├── data-model.md        ← Phase 1（數據模型設計）
├── contracts/
│   └── components.md    ← Phase 1（組件契約定義）
└── tasks.md             ← Phase 2（實現任務清單）
```

### 源代碼結構（存放位置）

```
src/
├── components/
│   ├── ProfileCard.tsx          # 個人資料卡組件
│   ├── PortfolioSection.tsx     # 作品集區域組件
│   ├── SkillsSection.tsx        # 技能區域組件
│   ├── Navigation.tsx           # 導航欄組件
│   └── __tests__/               # 組件測試
├── pages/
│   ├── Home.tsx                 # 主頁面
│   └── PortfolioDetail.tsx      # 作品詳情頁（可選）
├── types/
│   └── models.ts                # TypeScript 類型定義
├── styles/
│   └── globals.css              # 全局樣式和 tailwindCSS 配置
├── data/
│   └── portfolio-data.ts        # 靜態數據（個人資料、作品、技能）
├── hooks/
│   └── useViewport.ts           # 響應式設計 hook
├── utils/
│   └── constants.ts             # 常數和配置
└── App.tsx                       # 主應用組件
```

### 開發工具配置

```
project-root/
├── vite.config.ts              # Vite 配置
├── tsconfig.json               # TypeScript 配置（strict mode）
├── tailwind.config.js          # tailwindCSS 配置
├── eslintrc.json               # ESLint 配置
├── prettier.config.json        # Prettier 配置
├── vitest.config.ts            # Vitest 配置
├── package.json                # 依賴和腳本
└── README.md                   # 項目說明（正體中文）
```

---

## 技術決策和實現方向

### 1. 組件架構

**方向**: 原子設計模式 + 功能組件

- **原子組件**: Button、Icon、Card 等基礎 UI 元件
- **分子組件**: ProfileCard、PortfolioCard、SkillTag 等組合組件
- **生物組件**: ProfileSection、PortfolioSection、SkillsSection 等功能區域
- **模板**: 頁面布局和整體結構

### 2. 狀態管理

**方向**: React Context API（輕量級狀態）+ 靜態數據

由於此為純靜態展示頁面，不需要複雜的狀態管理：

- 使用 Context API 管理全局狀態（如暗色模式、語言選擇等，可選）
- 靜態數據存儲在 `src/data/portfolio-data.ts`
- 組件內部狀態使用 React hooks（useState、useEffect）

### 3. 樣式方案

**方向**: tailwindCSS 原子化 + 少量自定義 CSS

- 主要使用 tailwindCSS 工具類
- 複雜布局使用 CSS Grid 和 Flexbox
- 響應式設計利用 Tailwind 的斷點系統（sm, md, lg, xl）
- 避免大量自定義 CSS，保持樣式一致性

### 4. 圖標實現

**方向**: fontawesome-free + React 封裝

使用 `@fortawesome/react-fontawesome` 和 `@fortawesome/fontawesome-svg-core` 集
成：

```tsx
// 使用示例
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faReact, faVue } from '@fortawesome/free-brands-svg-icons'

// 社群連結圖標
<a href="..." target="_blank">
  <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
</a>

// 技能圖標
<div>
  <FontAwesomeIcon icon={faReact} />
  <span>React</span>
</div>
```

### 5. 靜態數據管理

**方向**: TypeScript 類型化的靜態數據對象

創建類型安全的數據結構：

```typescript
// src/data/portfolio-data.ts
export const personalProfile: PersonalProfile = {
  name: "李清瀠",
  title: "前端工程師",
  // ...
}

export const portfolioItems: PortfolioItem[] = [
  { title: "...", ... },
  // ...
]

export const skills: Skill[] = [
  { name: "React", category: "前端", icon: "faReact", ... },
  // ...
]
```

### 6. 性能優化策略

- **代碼分割**: 如有多頁面，使用 React.lazy + Suspense
- **圖片優化**: 使用 WebP 格式 + 原生 lazy loading
- **資源加載**: CDN 加載 fontawesome 或本地打包
- **構建優化**: Vite 原生支持，配合 rollup 插件

---

## 依賴清單

### 核心依賴

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "@fortawesome/react-fontawesome": "^0.2.x",
    "@fortawesome/fontawesome-svg-core": "^6.x",
    "@fortawesome/free-brands-svg-icons": "^6.x",
    "@fortawesome/free-solid-svg-icons": "^6.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x",
    "eslint": "^8.x",
    "prettier": "^3.x",
    "vitest": "^1.x",
    "@testing-library/react": "^14.x",
    "@testing-library/jest-dom": "^6.x"
  }
}
```

---

## 實現階段

### Phase 0: 可行性研究與技術驗證 (research.md)

**目標**: 確認技術方案可行性，識別風險和依賴

- [ ] 驗證 Vite + React 18 + TypeScript 5 的組合可行性
- [ ] 測試 tailwindCSS v3 與 React 的集成
- [ ] 測試 fontawesome-free 的使用方式
- [ ] 性能基準測試（初始加載時間、首次內容繪製）
- [ ] 驗證響應式設計在各設備上的表現
- [ ] 檢查無障礙功能的實現方式

### Phase 1: 架構與設計 (data-model.md + contracts/components.md)

**目標**: 定義數據模型和組件契約

- [ ] 設計 TypeScript 類型系統
- [ ] 定義靜態數據結構和內容架構
- [ ] 規劃組件層級和通信方式
- [ ] 設計樣式系統和主題（如暗色模式支持）
- [ ] 規劃路由結構（如有多頁面）
- [ ] 定義組件的 props 和事件契約

### Phase 2: 實現與測試 (tasks.md)

**目標**: 根據設計實現功能並編寫測試

此階段將由 `/speckit.tasks` 命令生成詳細的任務清單，根據三個使用者故事分別實現：

- US1: 個人資料卡顯示
- US2: 精選作品集展示
- US3: 技能與專業標籤展示

---

## 關鍵實現考慮

### 1. TypeScript 類型安全

建立全面的類型定義，包括：

- 數據模型（PersonalProfile、PortfolioItem、Skill）
- 組件 Props 類型
- 樣式主題類型（如 tailwindCSS 自定義類型）

### 2. 響應式設計

利用 tailwindCSS 的響應式斷點：

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 內容 */}
</div>
```

### 3. 無障礙性實現

- 語義化 HTML（使用 `<nav>`、`<section>`、`<article>` 等）
- ARIA 標籤和角色定義
- 鍵盤導航支持
- 顏色對比度符合 WCAG AA 標準

### 4. 優化 fontawesome 使用

為了減少包體積：

```tsx
// 只導入需要的圖標，避免全量導入
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
```

### 5. 語言與本地化

- 所有代碼註解採用正體中文
- 考慮未來的多語言支持架構（雖然初期只需繁體中文）
- 使用 i18n 框架為將來的英文版本預留結構

---

## 成功指標

此實現計劃完成後應達成以下指標（來自 spec.md）：

| 成功準則   | 目標                   | 驗證方式                         |
| ---------- | ---------------------- | -------------------------------- |
| **SC-001** | FCP < 3 秒             | Lighthouse、WebPageTest          |
| **SC-002** | TTI < 5 秒             | Lighthouse、DevTools Performance |
| **SC-003** | 互動响應 < 200ms       | React DevTools Profiler          |
| **SC-004** | 3G 加載 < 5 秒         | Chrome DevTools Throttling       |
| **SC-005** | 響應式設計驗證         | 手機、平板、桌機實測             |
| **SC-006** | Lighthouse 分數 ≥85/95 | Lighthouse 測試                  |
| **SC-007** | WebP + 備用方案        | 網絡檢查、圖片格式驗證           |
| **SC-008** | 80% 訪客找到作品集     | 用戶測試或分析                   |
| **SC-009** | 鍵盤導航和 ARIA        | 無障礙檢查工具                   |
| **SC-010** | 平均停留時間 ≥2 分鐘   | 分析工具追蹤                     |

---

## 後續步驟

1. **完成 Phase 0**: 執行 research.md 進行可行性驗證
2. **完成 Phase 1**: 設計數據模型和組件契約
3. **生成 tasks.md**: 執行 `/speckit.tasks` 生成詳細任務清單
4. **實現和測試**: 按優先級實現三個使用者故事

---

**版本**: 1.0 | **建立日期**: 2025-12-22 | **狀態**: 待 Phase 0 研究確認
