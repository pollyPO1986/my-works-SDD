# 數據模型與型別設計：個人作品集介紹頁面

**特性**: 001-portfolio-intro | **日期**: 2025-12-22 | **階段**: Phase 1

---

## 執行摘要

此文件定義了個人作品集介紹頁面的完整數據結構和 TypeScript 型別系統。數據結構遵循
規格需求，支持多語言（i18n），並內置於靜態 JSON 文件中。

---

## 核心數據模型

### 1. PersonalProfile（個人資料）

**用途**: 存儲個人基本資訊、聯繫方式和社群連結

```typescript
/**
 * 個人資料卡片信息
 * @example
 * {
 *   name: "李昱琨",
 *   title: "前端工程師",
 *   bio: "熱情的 React + TypeScript 開發者...",
 *   avatar: "/images/avatar.jpg",
 *   cvUrl: "/cv/cv-zh.pdf",
 *   socialLinks: [ ... ]
 * }
 */
export interface PersonalProfile {
  // 基本信息
  name: string; // 姓名 [必須]
  title: string; // 職位/身份 [必須]
  bio: string; // 個人簡介 (100-500 字) [必須]

  // 視覺素材
  avatar: string; // 頭像圖片 URL 或路徑 [必須]

  // 下載資源
  cvUrl: string; // CV/履歷 PDF URL [必須]

  // 社群連結
  socialLinks: SocialLink[]; // 社群媒體連結陣列 [必須]

  // 元數據
  updatedAt?: Date; // 最後更新時間 [可選]
  locale?: 'zh-TW' | 'en'; // 內容語言 [可選，預設 'zh-TW']
}

/**
 * 社群媒體連結
 */
export interface SocialLink {
  platform: 'linkedin' | 'github' | 'twitter' | 'email'; // 平台名稱 [必須]
  url: string; // 完整 URL (e.g. https://linkedin.com/in/...) [必須]
  icon?: string; // FontAwesome 圖標名稱 [可選，自動推導]
  label?: string; // 無障礙標籤 [可選，自動推導]
}
```

**範例數據**:

```typescript
// src/data/personal-profile.ts
export const personalProfile: PersonalProfile = {
  name: '李昱琨',
  title: '前端工程師 | React 專家',
  bio: '熱情的 React 和 TypeScript 開發者，擁有 5 年前端工程經驗。專注於構建高性能、可訪問性強的用戶界面。喜歡開源貢獻和技術寫作。',
  avatar: '/images/avatar.jpg',
  cvUrl: '/cv/cv-2025-zh.pdf',
  socialLinks: [
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/leeuki/',
    },
    {
      platform: 'github',
      url: 'https://github.com/leeuki/',
    },
  ],
  updatedAt: new Date('2025-12-22'),
  locale: 'zh-TW',
};
```

---

### 2. PortfolioItem（作品項目）

**用途**: 存儲單個作品項目的詳細信息

```typescript
/**
 * 作品集項目
 * @example
 * {
 *   id: "proj-001",
 *   title: "電商平台前端",
 *   description: "使用 React + Vite 開發的全棧電商平台...",
 *   thumbnail: "/images/projects/ecommerce.png",
 *   featured: true,
 *   projectUrl: "https://ecommerce-demo.vercel.app",
 *   tags: ["React", "TypeScript", "Vite"],
 *   startDate: "2024-01",
 *   endDate: "2024-06",
 * }
 */
export interface PortfolioItem {
  // 基本識別
  id: string; // 唯一識別碼 (e.g. "proj-001") [必須]
  title: string; // 項目名稱 [必須]
  description: string; // 項目描述 (100-500 字) [必須]

  // 視覺素材
  thumbnail: string; // 縮圖圖片 URL 或路徑 [必須]
  images?: string[]; // 額外圖片 URL 陣列 (詳情頁用) [可選]

  // 展示優先級
  featured: boolean; // 是否為精選項目 (首頁展示) [必須]
  order?: number; // 顯示順序 (升序) [可選]

  // 外部連結
  projectUrl?: string; // 項目線上網址 [可選]
  repositoryUrl?: string; // GitHub 倉庫 URL [可選]

  // 元數據
  tags: string[]; // 技術標籤 (e.g. ["React", "TypeScript"]) [必須]
  startDate?: string; // 開始日期 (YYYY-MM 格式) [可選]
  endDate?: string; // 結束日期 (YYYY-MM 格式) [可選]

  // 詳細內容
  fullDescription?: string; // 完整描述 (詳情頁用) [可選]
  highlights?: string[]; // 亮點特性列表 [可選]
  metrics?: ProjectMetrics; // 項目成果指標 [可選]

  // 狀態
  status?: 'active' | 'archived' | 'in-progress'; // 項目狀態 [可選]
  locale?: 'zh-TW' | 'en'; // 內容語言 [可選]
}

/**
 * 項目成果指標
 */
export interface ProjectMetrics {
  performance?: {
    lighthouse?: number; // Lighthouse 分數 (0-100)
    pagespeed?: number; // PageSpeed 分數
    fcp?: number; // First Contentful Paint (ms)
  };
  accessibility?: {
    wcagLevel?: 'A' | 'AA' | 'AAA'; // WCAG 合規等級
  };
  adoption?: {
    users?: number; // 用戶數量
    downloads?: number; // 下載次數
    github_stars?: number; // GitHub Stars
  };
}
```

**範例數據**:

```typescript
// src/data/portfolio-items.ts
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'proj-001',
    title: '電商平台前端重構',
    description:
      '使用 React 18 + TypeScript + Vite 重構的大型電商平台前端。實現了 100+ 業務組件，支持 10+ 語言，性能提升 40%。',
    thumbnail: '/images/projects/ecommerce-thumb.png',
    featured: true,
    order: 1,
    projectUrl: 'https://ecommerce-demo.vercel.app',
    repositoryUrl: 'https://github.com/leeuki/ecommerce-frontend',
    tags: ['React', 'TypeScript', 'Vite', 'tailwindCSS'],
    startDate: '2024-01',
    endDate: '2024-06',
    status: 'active',
    metrics: {
      performance: {
        lighthouse: 95,
        fcp: 1200,
      },
      accessibility: {
        wcagLevel: 'AA',
      },
      adoption: {
        users: 50000,
        github_stars: 150,
      },
    },
  },
  {
    id: 'proj-002',
    title: '設計系統組件庫',
    description:
      '企業級設計系統，包含 50+ 可複用組件。支持暗色模式、主題定制、完整的 TypeScript 型別和文檔。',
    thumbnail: '/images/projects/design-system-thumb.png',
    featured: true,
    order: 2,
    repositoryUrl: 'https://github.com/leeuki/design-system',
    projectUrl: 'https://design-system-docs.vercel.app',
    tags: ['React', 'TypeScript', 'tailwindCSS', 'Storybook'],
    startDate: '2024-02',
    status: 'active',
    metrics: {
      adoption: {
        github_stars: 320,
      },
    },
  },
  {
    id: 'proj-003',
    title: '實時協作編輯工具',
    description:
      '支持多人實時編輯的 SaaS 產品。使用 WebSocket、Operational Transformation 實現衝突解決。',
    thumbnail: '/images/projects/collab-editor-thumb.png',
    featured: true,
    order: 3,
    projectUrl: 'https://collab-editor-demo.vercel.app',
    tags: ['React', 'TypeScript', 'WebSocket', 'Vite'],
    startDate: '2024-03',
    status: 'active',
  },
];
```

---

### 3. Skill（技能標籤）

**用途**: 存儲個人的技術技能和軟技能

```typescript
/**
 * 技能標籤
 * @example
 * {
 *   id: "skill-react",
 *   name: "React.js",
 *   category: "frontend",
 *   icon: "react",  // FontAwesome 圖標名稱
 *   level: 5,       // 1-5 級
 *   proficiency: "Expert",
 * }
 */
export interface Skill {
  // 基本識別
  id: string; // 唯一識別碼 (e.g. "skill-react") [必須]
  name: string; // 技能名稱 (e.g. "React.js") [必須]

  // 分類和視覺化
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'soft-skill'; // 技能類別 [必須]
  icon: string; // FontAwesome 圖標名稱 (e.g. "react") [必須]

  // 熟練度
  level: 1 | 2 | 3 | 4 | 5; // 技能等級 (1=初級, 5=專家) [必須]
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'; // 文字描述 [可選]

  // 額外信息
  yearsOfExperience?: number; // 經驗年數 [可選]
  description?: string; // 技能描述 (簡短) [可選]

  // 狀態
  endorsed?: number; // 被背書次數 (LinkedIn) [可選]
  locale?: 'zh-TW' | 'en'; // 內容語言 [可選]
}
```

**範例數據**:

```typescript
// src/data/skills.ts
export const skills: Skill[] = [
  // 前端框架
  {
    id: 'skill-react',
    name: 'React.js',
    category: 'frontend',
    icon: 'faReact',
    level: 5,
    proficiency: 'Expert',
    yearsOfExperience: 5,
    description: 'React 核心和高級主題專家',
  },
  {
    id: 'skill-typescript',
    name: 'TypeScript',
    category: 'frontend',
    icon: 'faTypeScript',
    level: 5,
    proficiency: 'Expert',
    yearsOfExperience: 4,
  },

  // 樣式和 UI
  {
    id: 'skill-tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: 'faTailwind',
    level: 5,
    proficiency: 'Expert',
    yearsOfExperience: 3,
  },

  // 構建工具
  {
    id: 'skill-vite',
    name: 'Vite',
    category: 'frontend',
    icon: 'faVite',
    level: 4,
    proficiency: 'Advanced',
    yearsOfExperience: 2,
  },
  {
    id: 'skill-webpack',
    name: 'Webpack',
    category: 'frontend',
    icon: 'faWebpack',
    level: 3,
    proficiency: 'Intermediate',
    yearsOfExperience: 3,
  },

  // 測試
  {
    id: 'skill-testing',
    name: 'Testing (Vitest, Jest, RTL)',
    category: 'frontend',
    icon: 'faFlask',
    level: 4,
    proficiency: 'Advanced',
  },

  // 後端
  {
    id: 'skill-nodejs',
    name: 'Node.js',
    category: 'backend',
    icon: 'faNodeJs',
    level: 3,
    proficiency: 'Intermediate',
    yearsOfExperience: 2,
  },

  // DevOps
  {
    id: 'skill-docker',
    name: 'Docker',
    category: 'devops',
    icon: 'faDocker',
    level: 3,
    proficiency: 'Intermediate',
  },

  // 軟技能
  {
    id: 'skill-communication',
    name: '溝通協作',
    category: 'soft-skill',
    icon: 'faPeopleArrows',
    level: 4,
    proficiency: 'Advanced',
  },
  {
    id: 'skill-mentoring',
    name: '技術指導',
    category: 'soft-skill',
    icon: 'faChalkboardUser',
    level: 3,
    proficiency: 'Intermediate',
  },
];
```

---

## 類型系統和驗證

### 完整 TypeScript 定義文件

```typescript
// src/types/portfolio.ts

/**
 * 所有導出的類型定義
 */
export type * from './models/personal-profile';
export type * from './models/portfolio-item';
export type * from './models/skill';

/**
 * 全局數據容器
 */
export interface PortfolioData {
  version: string; // 數據格式版本 (e.g. "1.0.0")
  personalProfile: PersonalProfile;
  portfolioItems: PortfolioItem[];
  skills: Skill[];
  metadata?: {
    lastUpdated: string; // ISO 8601 格式
    author: string;
    locale: 'zh-TW' | 'en';
  };
}
```

### 驗證規則

**PersonalProfile**:

- `name`: 非空字符串，長度 1-100
- `title`: 非空字符串，長度 1-150
- `bio`: 非空字符串，長度 50-500
- `avatar`: 有效的相對或絕對 URL
- `cvUrl`: 有效的 URL，指向 PDF 文件
- `socialLinks`: 非空陣列，至少 1 項，平台值必須是允許的列表

**PortfolioItem**:

- `id`: 唯一字符串，格式 `proj-###`
- `title`: 非空字符串，長度 1-200
- `description`: 非空字符串，長度 50-500
- `thumbnail`: 有效的圖片 URL
- `featured`: 布林值，首頁最多 5 個精選項目
- `tags`: 非空陣列，長度 1-10，每個標籤 1-50 字符
- `startDate`/`endDate`: 有效的 YYYY-MM 格式

**Skill**:

- `id`: 唯一字符串，格式 `skill-###`
- `name`: 非空字符串，長度 1-100
- `level`: 整數 1-5
- `icon`: 有效的 FontAwesome 圖標名稱

---

## 數據存儲和加載

### 靜態數據文件結構

```
src/
├── data/
│   ├── index.ts                 // 匯出所有數據
│   ├── personal-profile.ts      // 個人資料
│   ├── portfolio-items.ts       // 作品項目
│   └── skills.ts                // 技能標籤
├── types/
│   ├── index.ts
│   ├── models/
│   │   ├── personal-profile.ts
│   │   ├── portfolio-item.ts
│   │   └── skill.ts
│   └── portfolio.ts             // 全局容器類型
└── ...
```

### 數據加載邏輯

```typescript
// src/data/index.ts
import { personalProfile } from './personal-profile';
import { portfolioItems } from './portfolio-items';
import { skills } from './skills';
import type { PortfolioData } from '../types';

/**
 * 應用主數據容器
 */
export const portfolioData: PortfolioData = {
  version: '1.0.0',
  personalProfile,
  portfolioItems: portfolioItems.sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999)
  ),
  skills,
  metadata: {
    lastUpdated: new Date().toISOString(),
    author: '李昱琨',
    locale: 'zh-TW',
  },
};

// 導出各個模塊供組件使用
export { personalProfile, portfolioItems, skills };
```

---

## 多語言支持（i18n）

### 架構設計

預留 i18n 支持，但初期只實現繁體中文。

```typescript
// src/i18n/translations.ts
export const translations = {
  'zh-TW': {
    labels: {
      portfolio: '作品集',
      skills: '技能標籤',
      downloadCV: '下載履歷',
      viewProject: '查看項目',
      featured: '精選作品',
    },
    messages: {
      noProjects: '尚無作品項目',
      noSkills: '尚無技能信息',
    },
  },
  en: {
    labels: {
      portfolio: 'Portfolio',
      skills: 'Skills',
      downloadCV: 'Download CV',
      viewProject: 'View Project',
      featured: 'Featured',
    },
    messages: {
      noProjects: 'No projects yet',
      noSkills: 'No skills available',
    },
  },
};

// 使用示例
const currentLocale: 'zh-TW' | 'en' = 'zh-TW';
const label = translations[currentLocale].labels.portfolio; // "作品集"
```

---

## 圖標對應表

### FontAwesome 圖標對應

| 技能/平台    | FontAwesome 圖標       | 說明              |
| ------------ | ---------------------- | ----------------- |
| React        | faReact (brands)       | React.js 框架     |
| TypeScript   | faTypeScript (brands)  | TypeScript 語言   |
| Tailwind CSS | faTailwind (brands)    | Tailwind CSS 框架 |
| Vite         | faVite (brands)        | Vite 構建工具     |
| JavaScript   | faJs (brands)          | JavaScript 語言   |
| HTML5        | faHtml5 (brands)       | HTML5 語言        |
| CSS3         | faCss3Alt (brands)     | CSS3 語言         |
| Node.js      | faNode (brands)        | Node.js 運行時    |
| Git          | faGit (brands)         | Git 版本控制      |
| Docker       | faDocker (brands)      | Docker 容器       |
| LinkedIn     | faLinkedin (brands)    | LinkedIn 社群     |
| GitHub       | faGithub (brands)      | GitHub 平台       |
| 下載         | faDownload (solid)     | 下載操作          |
| 外部連結     | faExternalLink (solid) | 外部網站          |
| 星星         | faStar (solid)         | 評分/收藏         |

---

## 未來擴展考慮

### 可能的數據模型擴展

1. **項目案例研究** (Case Study)

   ```typescript
   interface ProjectCaseStudy {
     id: string;
     projectId: string; // 關聯的項目 ID
     title: string;
     challenge: string;
     solution: string;
     results: string[];
     images: string[];
   }
   ```

2. **部落格或文章**

   ```typescript
   interface BlogPost {
     id: string;
     title: string;
     slug: string;
     content: string;
     tags: string[];
     publishedAt: Date;
     updatedAt?: Date;
   }
   ```

3. **成就或獎項**

   ```typescript
   interface Achievement {
     id: string;
     title: string;
     issuer: string;
     date: string;
     icon?: string;
     url?: string;
   }
   ```

4. **教育背景**
   ```typescript
   interface Education {
     id: string;
     institution: string;
     degree: string;
     field: string;
     startDate: string;
     endDate?: string;
   }
   ```

### 遷移策略

如果未來需要遷移至 CMS（如 Strapi、Contentful），可：

1. 保持現有 TypeScript 類型不變
2. 替換數據加載層（從靜態 JSON → API 調用）
3. 應用層代碼無需修改

---

**設計完成日期**: 2025-12-22  
**審查狀態**: 待批准 → Phase 1 組件契約  
**下一步**: 設計組件契約文件 (contracts/components.md)
