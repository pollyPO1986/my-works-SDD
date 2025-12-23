# 架構設計文檔 (ARCHITECTURE.md)

本文檔詳細說明了個人作品集應用的架構、設計決策和最佳實踐。

## 📐 高層架構

### 整體設計

```
┌─────────────────────────────────────────────────────────┐
│                      Browser (前端)                      │
├─────────────────────────────────────────────────────────┤
│                      React 18 (UI)                       │
├─────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐ │
│  │               Pages (路由層)                        │ │
│  │  Home │ PortfolioDetail │ PortfolioAll             │ │
│  └────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐ │
│  │           Components (組件層)                       │ │
│  │ ┌──────────────────────────────────────────────┐  │ │
│  │ │ ProfileCard  PortfolioSection  SkillsSection │  │ │
│  │ ├──────────────────────────────────────────────┤  │ │
│  │ │ Avatar  SocialLinks  CVDownloadButton        │  │ │
│  │ │ ProjectImage  ProjectTags  PortfolioCard     │  │ │
│  │ │ SkillTag  Navigation  Header                 │  │ │
│  │ └──────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐ │
│  │       Context & Hooks (業務邏輯層)                 │ │
│  │  PortfolioContext  useViewport                     │ │
│  └────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐ │
│  │           Data Layer (數據層)                       │ │
│  │ TypeScript Models  Static Data  SEO Utilities      │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## 📁 目錄結構詳解

### src/ 根目錄

```
src/
├── App.tsx                    # 主應用組件
├── main.tsx                   # 應用入口點
├── index.css                  # 全局樣式
├── App.css                    # App 組件樣式
├── portfolio-context.ts       # 類型定義（遺留，已廢棄）
├── test-setup.ts              # Vitest 測試配置
│
├── pages/                     # 頁面組件（路由層）
│   ├── Home.tsx               # 首頁：個人檔案 + 作品集展示
│   ├── PortfolioDetail.tsx    # 項目詳情頁
│   ├── PortfolioAll.tsx       # 完整作品集頁面
│   └── Home.test.tsx          # 首頁測試
│
├── components/                # 可複用組件
│   ├── Avatar.tsx             # 頭像組件
│   ├── SocialLinks.tsx        # 社群媒體連結
│   ├── CVDownloadButton.tsx   # CV 下載按鈕
│   ├── ProfileCard.tsx        # 個人資料卡
│   ├── Navigation.tsx         # 導航欄
│   ├── Header.tsx             # 頁面頭部
│   ├── ProjectImage.tsx       # 項目圖片
│   ├── ProjectTags.tsx        # 項目標籤
│   ├── PortfolioCard.tsx      # 作品集卡片
│   ├── PortfolioSection.tsx   # 作品集展示區
│   ├── SkillTag.tsx           # 技能標籤（規劃）
│   ├── SkillsSection.tsx      # 技能區展示（規劃）
│   └── __tests__/             # 組件測試
│
├── types/                     # TypeScript 類型定義
│   └── models.ts              # 數據模型、接口定義
│
├── data/                      # 靜態數據
│   └── portfolio.ts           # 作品集項目數據
│
├── utils/                     # 工具函數
│   ├── constants.ts           # 應用常量（斷點、顏色等）
│   └── seo.ts                 # SEO 工具函數
│
├── hooks/                     # 自定義 React Hooks
│   └── useViewport.ts         # 視口寬度檢測 Hook
│
├── context/                   # React Context
│   └── PortfolioContext.tsx   # 作品集全局狀態
│
├── router/                    # 路由相關
│   └── routes.tsx             # 路由定義（文檔）
│
└── assets/                    # 靜態資源
    └── (圖片、字體等)
```

## 🔄 數據流

### 應用數據流向

```
靜態數據 (portfolio.ts, constants.ts)
    ↓
Context Provider (App.tsx)
    ↓
頁面組件 (Home, PortfolioDetail)
    ↓
功能組件 (ProfileCard, PortfolioSection)
    ↓
基礎組件 (Avatar, ProjectImage, SkillTag)
    ↓
HTML 渲染
```

### 示例：Portfolio 項目加載

```typescript
// 1. 靜態數據源
const portfolioItems: PortfolioItem[] = [
  { id: 'proj-001', title: '...', ... }
]

// 2. 傳遞給 Context
<PortfolioProvider items={portfolioItems}>
  <App />
</PortfolioProvider>

// 3. 頁面中使用 Context
const { portfolioItems } = useContext(PortfolioContext)

// 4. 傳遞給組件
<PortfolioSection items={portfolioItems} />

// 5. 組件渲染卡片
items.map(item => <PortfolioCard key={item.id} item={item} />)
```

## 🏛️ 分層設計

### 1. 頁面層 (Pages)

**責責任**：

- 路由和頁面級別的組件組合
- 全局狀態管理
- SEO 優化

**示例**：

- `Home.tsx`: 顯示首頁，包含 ProfileCard 和 PortfolioSection
- `PortfolioDetail.tsx`: 展示單個項目的詳細信息

### 2. 組件層 (Components)

分為三個子層：

#### 2.1 容器組件 (Container Components)

- ProfileCard, PortfolioSection, SkillsSection
- 管理狀態和邏輯
- 較少復用

#### 2.2 展示組件 (Presentational Components)

- PortfolioCard, Avatar, ProjectTags
- 純粹的數據展示
- 高度复用，易測試

#### 2.3 原子組件 (Atomic Components)

- 最小單位的組件
- 例如：Button、Icon、Badge

### 3. 業務邏輯層 (Hooks & Context)

**Context 使用**：

```typescript
interface PortfolioContextType {
  items: PortfolioItem[];
  selectedItem: PortfolioItem | null;
  selectItem: (id: string) => void;
}
```

**自定義 Hooks**：

```typescript
function useViewport(): { width: number; isMobile: boolean } {
  // 監聽視口變化
  // 用於響應式設計
}
```

### 4. 數據層 (Types & Data)

**類型定義** (`types/models.ts`):

```typescript
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  // ...
}
```

**靜態數據** (`data/portfolio.ts`):

```typescript
export const portfolioItems: PortfolioItem[] = [
  { id: 'proj-001', ... }
];
```

## 🎯 設計原則

### 1. 單一責任原則 (SRP)

每個組件只有一個職責：

```typescript
// ❌ 不良：組件做太多事
function ProjectCard({ item }) {
  // 獲取數據、格式化、渲染、處理點擊
}

// ✅ 良好：職責分離
function ProjectCard({ item, onClick }) {
  // 只負責渲染
}
```

### 2. 組合優先 (Composition Over Inheritance)

使用組件組合而非繼承：

```typescript
// ✅ 推薦：組合
<ProfileCard>
  <Avatar />
  <SocialLinks />
  <CVDownloadButton />
</ProfileCard>

// ❌ 避免：深層繼承
class ExtendedProfileCard extends BaseCard { }
```

### 3. Props 下鑽模式

使用 Props 傳遞數據和回調：

```typescript
interface PortfolioSectionProps {
  items: PortfolioItem[];
  onCardClick: (item: PortfolioItem) => void;
  maxFeatured: number;
}
```

### 4. 受控組件 (Controlled Components)

狀態由父組件管理：

```typescript
function PortfolioSection({ items, onCardClick }: Props) {
  return (
    <div>
      {items.map(item => (
        <PortfolioCard
          key={item.id}
          item={item}
          onClick={() => onCardClick(item)}
        />
      ))}
    </div>
  );
}
```

## 🎨 樣式架構

### Tailwind CSS 使用

**配置文件** (`tailwind.config.ts`):

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // 自定義顏色
      },
      spacing: {
        // 自定義間距
      },
    },
  },
};
```

**最佳實踐**：

- 使用 Tailwind 的響應式前綴 (`sm:`, `md:`, `lg:`)
- 避免寫自定義 CSS，優先使用 Tailwind 類
- 提取公共樣式為 `@apply` 指令

```css
@layer components {
  .card {
    @apply rounded-lg shadow-md p-4 bg-white;
  }
}
```

## 🧪 測試架構

### 測試金字塔

```
        /\
       /  \     E2E 測試 (10%)
      /────\
     /      \   組件測試 (30%)
    /────────\
   /          \ 單元測試 (60%)
  /____________\
```

### 測試組織

```
src/
├── components/
│   ├── Avatar.tsx
│   ├── Avatar.test.tsx           # 同級測試
│   └── __tests__/
│       ├── Avatar.test.tsx       # 或放在 __tests__
│       └── ProfileCard.test.tsx
└── pages/
    └── Home.test.tsx
```

### 測試示例

```typescript
describe('Avatar', () => {
  it('renders with correct src attribute', () => {
    render(<Avatar src="..." alt="..." />);
    expect(screen.getByAltText('...')).toHaveAttribute('src', '...');
  });

  it('has correct size classes', () => {
    const { container } = render(
      <Avatar src="..." size="lg" />
    );
    expect(container.querySelector('img')).toHaveClass('w-32', 'h-32');
  });
});
```

## ⚡ 性能考慮

### 1. 代碼分割

Vite 自動代碼分割：

```typescript
// 動態導入（自動分割）
const PortfolioDetail = lazy(() => import('./PortfolioDetail'));
```

### 2. 記憶化

避免不必要的重新渲染：

```typescript
const MemoizedCard = memo(PortfolioCard, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
});
```

### 3. 圖片優化

```typescript
<ProjectImage
  src="..."
  alt="..."
  width={600}
  height={400}
  loading="lazy"  // 懶加載
  srcSet="..."    // 響應式圖片
/>
```

### 4. 虛擬列表

對於大列表，使用虛擬滾動：

```typescript
// 規劃中的優化
const VirtualPortfolioList = () => {
  return (
    <VirtualList
      items={items}
      renderItem={(item) => <PortfolioCard item={item} />}
    />
  );
};
```

## 🔐 安全性考慮

### 1. XSS 防護

React 自動轉義文本內容：

```typescript
// ✅ 安全：React 自動轉義
<div>{userInput}</div>

// ❌ 危險：使用 dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### 2. 依賴安全

定期檢查依賴：

```bash
npm audit
npm update
```

### 3. 環境變量

敏感信息不要提交：

```bash
# .gitignore
.env.local
.env.*.local
```

## 📈 可擴展性

### 添加新功能的步驟

1. **定義類型** (`types/models.ts`):

   ```typescript
   interface NewFeature {
     id: string;
     // ...
   }
   ```

2. **創建組件** (`components/NewComponent.tsx`):

   ```typescript
   export function NewComponent(props: Props): ReactElement {
     // ...
   }
   ```

3. **編寫測試** (`components/__tests__/NewComponent.test.tsx`):

   ```typescript
   describe('NewComponent', () => {
     // ...
   });
   ```

4. **集成到頁面** (`pages/Home.tsx`):
   ```typescript
   <NewComponent {...props} />
   ```

## 🔄 構建流程

### 開發流程

```
source code (src/)
    ↓
TypeScript 檢查
    ↓
ESLint / Prettier
    ↓
Vite dev server (HMR)
    ↓
瀏覽器預覽
```

### 生產流程

```
source code (src/)
    ↓
TypeScript 編譯
    ↓
Tree-shaking
    ↓
Minification
    ↓
Output (dist/)
    ↓
gzip 壓縮
    ↓
部署
```

## 📚 進一步學習

- [React 官方文檔](https://react.dev)
- [Vite 官方文檔](https://vitejs.dev)
- [TypeScript 設計模式](https://refactoring.guru/design-patterns/typescript)

---

**最後更新**: 2024 年 1 月 15 日  
**版本**: 1.0.0
