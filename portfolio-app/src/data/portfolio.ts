/**
 * 靜態投資組合數據
 * 包含個人資料、作品集項目和技能
 * 以 TypeScript 對象形式版本控制，支持多語言
 */

import type { PersonalProfile, PortfolioItem, Skill } from '../types/models';

/**
 * 個人資料
 */
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
      label: 'LinkedIn 個人主頁',
    },
    {
      platform: 'github',
      url: 'https://github.com/leeuki/',
      label: 'GitHub 個人檔案',
    },
  ],
  updatedAt: new Date('2025-12-22'),
  locale: 'zh-TW',
};

/**
 * 作品集項目列表
 * 包含 5+ 個示例項目，其中 3-5 個標記為 featured
 */
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
    tags: ['React', 'TypeScript', 'Vite', 'tailwindCSS', 'i18n'],
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
    locale: 'zh-TW',
  },
  {
    id: 'proj-002',
    title: '設計系統組件庫',
    description:
      '構建了一套完整的企業級 React 組件庫，包含 50+ 組件。提供 Storybook 文檔、完整測試覆蓋率、TypeScript 支持和無障礙標準。',
    thumbnail: '/images/projects/design-system-thumb.png',
    featured: true,
    order: 2,
    repositoryUrl: 'https://github.com/leeuki/design-system',
    tags: ['React', 'TypeScript', 'Storybook', 'Testing Library', 'Design System'],
    startDate: '2023-06',
    endDate: '2024-01',
    status: 'active',
    metrics: {
      performance: {
        lighthouse: 98,
      },
      accessibility: {
        wcagLevel: 'AAA',
      },
    },
    locale: 'zh-TW',
  },
  {
    id: 'proj-003',
    title: '實時協作編輯器',
    description:
      '開發的實時協作文本編輯器，支持多用戶同時編輯、版本控制和操作變換(OT)算法。使用 WebSocket 實現低延遲同步。',
    thumbnail: '/images/projects/editor-thumb.png',
    featured: true,
    order: 3,
    projectUrl: 'https://collab-editor-demo.vercel.app',
    repositoryUrl: 'https://github.com/leeuki/collab-editor',
    tags: ['React', 'WebSocket', 'OT Algorithm', 'Node.js', 'MongoDB'],
    startDate: '2023-09',
    endDate: '2024-03',
    status: 'active',
    locale: 'zh-TW',
  },
  {
    id: 'proj-004',
    title: '性能監控儀表板',
    description:
      '構建了企業級性能監控平台，實時追蹤應用性能指標、用戶行為分析和錯誤追蹤。支持自訂儀表板和警報系統。',
    thumbnail: '/images/projects/monitoring-thumb.png',
    featured: false,
    order: 4,
    projectUrl: 'https://monitoring-dashboard.example.com',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Grafana', 'Prometheus'],
    startDate: '2023-03',
    endDate: '2023-09',
    status: 'active',
    locale: 'zh-TW',
  },
  {
    id: 'proj-005',
    title: '移動優先 PWA 應用',
    description:
      '開發的漸進式網路應用，支持離線訪問、推送通知和主屏安裝。優化了移動設備性能，Lighthouse 分數達 98。',
    thumbnail: '/images/projects/pwa-thumb.png',
    featured: false,
    order: 5,
    projectUrl: 'https://pwa-demo.vercel.app',
    repositoryUrl: 'https://github.com/leeuki/pwa-app',
    tags: ['React', 'PWA', 'Service Worker', 'TypeScript', 'Vite'],
    startDate: '2022-12',
    endDate: '2023-03',
    status: 'active',
    metrics: {
      performance: {
        lighthouse: 98,
      },
    },
    locale: 'zh-TW',
  },
  {
    id: 'proj-006',
    title: '開源貢獻 - React Router',
    description:
      '對 React Router 項目的多項貢獻，包括性能優化、文檔改進和新功能實現。PR 已合併到主幹。',
    thumbnail: '/images/projects/opensource-thumb.png',
    featured: false,
    order: 6,
    repositoryUrl: 'https://github.com/remix-run/react-router',
    tags: ['React', 'Open Source', 'TypeScript', 'Routing'],
    startDate: '2023-01',
    status: 'active',
    locale: 'zh-TW',
  },
];

/**
 * 技能列表
 * 包含 15+ 個示例技能，按分類組織
 */
export const skills: Skill[] = [
  // Frontend
  {
    id: 'skill-001',
    name: 'React',
    category: 'frontend',
    level: 5,
    proficiency: 'Expert',
    icon: 'faReact',
    locale: 'zh-TW',
  },
  {
    id: 'skill-002',
    name: 'TypeScript',
    category: 'frontend',
    level: 5,
    proficiency: 'Expert',
    locale: 'zh-TW',
  },
  {
    id: 'skill-003',
    name: 'Vite',
    category: 'frontend',
    level: 4,
    proficiency: 'Advanced',
    locale: 'zh-TW',
  },
  {
    id: 'skill-004',
    name: 'tailwindCSS',
    category: 'frontend',
    level: 4,
    proficiency: 'Advanced',
    locale: 'zh-TW',
  },
  {
    id: 'skill-005',
    name: 'HTML / CSS',
    category: 'frontend',
    level: 5,
    proficiency: 'Expert',
    locale: 'zh-TW',
  },
  {
    id: 'skill-006',
    name: 'JavaScript ES6+',
    category: 'frontend',
    level: 5,
    proficiency: 'Expert',
    locale: 'zh-TW',
  },

  // Backend
  {
    id: 'skill-007',
    name: 'Node.js',
    category: 'backend',
    level: 4,
    proficiency: 'Advanced',
    icon: 'faNode',
    locale: 'zh-TW',
  },
  {
    id: 'skill-008',
    name: 'Express.js',
    category: 'backend',
    level: 4,
    proficiency: 'Advanced',
    locale: 'zh-TW',
  },
  {
    id: 'skill-009',
    name: 'PostgreSQL',
    category: 'backend',
    level: 3,
    proficiency: 'Intermediate',
    locale: 'zh-TW',
  },
  {
    id: 'skill-010',
    name: 'MongoDB',
    category: 'backend',
    level: 3,
    proficiency: 'Intermediate',
    locale: 'zh-TW',
  },

  // DevOps & Tools
  {
    id: 'skill-011',
    name: 'Git / GitHub',
    category: 'tools',
    level: 5,
    proficiency: 'Expert',
    icon: 'faGit',
    locale: 'zh-TW',
  },
  {
    id: 'skill-012',
    name: 'Docker',
    category: 'devops',
    level: 3,
    proficiency: 'Intermediate',
    locale: 'zh-TW',
  },
  {
    id: 'skill-013',
    name: 'CI/CD (GitHub Actions)',
    category: 'devops',
    level: 3,
    proficiency: 'Intermediate',
    locale: 'zh-TW',
  },
  {
    id: 'skill-014',
    name: 'Vitest / Jest',
    category: 'tools',
    level: 4,
    proficiency: 'Advanced',
    locale: 'zh-TW',
  },
  {
    id: 'skill-015',
    name: 'ESLint / Prettier',
    category: 'tools',
    level: 4,
    proficiency: 'Advanced',
    locale: 'zh-TW',
  },
];

// 導出預設數據集
export const portfolioData = {
  personalProfile,
  portfolioItems,
  skills,
};
