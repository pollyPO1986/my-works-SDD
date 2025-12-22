/**
 * 應用程式常數和配置
 * 包括 breakpoints、色彩系統、圖標對應表等
 */

import { faLinkedin, faGithub, faTwitter, faEnvelope } from '@fortawesome/free-brands-svg-icons';
import { faReact, faNode, faGit } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * 響應式設計斷點
 * 遵循 Tailwind CSS 默認斷點
 */
export const BREAKPOINTS = {
  mobile: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * 設備類型判斷邏輯
 * 根據視口寬度判斷設備類型
 */
export const DEVICE_TYPE_THRESHOLDS = {
  mobile: BREAKPOINTS.md,
  tablet: BREAKPOINTS.lg,
  desktop: BREAKPOINTS.xl,
} as const;

/**
 * 色彩系統
 * 遵循 tailwindCSS 色彩系統
 */
export const COLORS = {
  primary: '#0ea5e9', // sky-500
  primaryLight: '#7dd3fc', // sky-300
  primaryDark: '#0284c7', // sky-600
  success: '#22c55e', // green-500
  warning: '#eab308', // yellow-500
  error: '#ef4444', // red-500
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  slate900: '#0f172a',
} as const;

/**
 * 間距單位
 * 遵循 tailwindCSS 間距系統
 */
export const SPACING = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
  '4xl': '6rem', // 96px
} as const;

/**
 * 字體大小
 */
export const FONT_SIZES = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  base: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem', // 48px
} as const;

/**
 * 社群平台圖標映射表
 * 將社群平台名稱映射到 FontAwesome 圖標
 */
export const SOCIAL_PLATFORM_ICONS: Record<string, IconDefinition> = {
  linkedin: faLinkedin,
  github: faGithub,
  twitter: faTwitter,
  email: faEnvelope,
};

/**
 * 技能圖標映射表
 * 將技能名稱映射到 FontAwesome 圖標
 */
export const SKILL_ICONS: Record<string, IconDefinition> = {
  react: faReact,
  nodejs: faNode,
  'node.js': faNode,
  git: faGit,
  'git/github': faGit,
  github: faGit,
};

/**
 * 技能分類標籤顏色
 */
export const SKILL_CATEGORY_COLORS: Record<string, string> = {
  frontend: 'bg-blue-100 text-blue-800',
  backend: 'bg-green-100 text-green-800',
  fullstack: 'bg-purple-100 text-purple-800',
  devops: 'bg-orange-100 text-orange-800',
  tools: 'bg-gray-100 text-gray-800',
  other: 'bg-slate-100 text-slate-800',
};

/**
 * 熟練度等級標籤
 */
export const PROFICIENCY_LEVELS = {
  Beginner: '初級',
  Intermediate: '中級',
  Advanced: '高級',
  Expert: '專家',
} as const;

/**
 * 項目狀態標籤
 */
export const PROJECT_STATUS_LABELS: Record<string, string> = {
  active: '進行中',
  archived: '已歸檔',
  'in-progress': '開發中',
};

/**
 * 動畫持續時間
 */
export const ANIMATION_DURATIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '750ms',
} as const;

/**
 * Z-index 層級
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modal: 400,
  popover: 500,
  tooltip: 600,
} as const;

/**
 * 最大容器寬度
 */
export const MAX_CONTAINER_WIDTH = 1280;

/**
 * 每頁顯示的項目數
 */
export const ITEMS_PER_PAGE = {
  portfolio: 5,
  skills: 10,
};

/**
 * 首頁精選作品數
 */
export const FEATURED_ITEMS_COUNT = 5;

/**
 * API 相關常數（如果有後端連接）
 */
export const API_ENDPOINTS = {
  baseUrl: process.env.VITE_API_URL || 'https://api.example.com',
  portfolio: '/api/portfolio',
  skills: '/api/skills',
  profile: '/api/profile',
};

/**
 * 語言配置
 */
export const SUPPORTED_LOCALES = ['zh-TW', 'en'] as const;
export const DEFAULT_LOCALE = 'zh-TW' as const;

/**
 * 無障礙 ARIA 相關常數
 */
export const ARIA_LABELS = {
  navigation: '主要導航',
  profileSection: '個人資料卡',
  portfolioSection: '作品集區域',
  skillsSection: '技能區域',
  downloadCV: '下載 CV',
  visitWebsite: '訪問網站',
  viewRepository: '查看代碼',
};
