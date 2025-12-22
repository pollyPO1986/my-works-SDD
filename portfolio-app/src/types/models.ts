/**
 * 數據模型類型定義
 * 所有 TypeScript 類型定義集中於此文件
 * 支持正體中文和英文語言變體
 */

/**
 * 社群媒體連結
 * @example
 * {
 *   platform: "linkedin",
 *   url: "https://www.linkedin.com/in/leeuki/",
 *   icon: "faLinkedin",
 *   label: "LinkedIn 個人主頁"
 * }
 */
export interface SocialLink {
  /** 平台名稱 */
  platform: 'linkedin' | 'github' | 'twitter' | 'email'
  /** 完整 URL */
  url: string
  /** FontAwesome 圖標名稱（可選，自動推導） */
  icon?: string
  /** 無障礙標籤（可選，自動推導） */
  label?: string
}

/**
 * 個人資料卡片
 * 表示個人的基本身份信息
 * @example
 * {
 *   name: "李昱琨",
 *   title: "前端工程師",
 *   bio: "熱情的 React + TypeScript 開發者...",
 *   avatar: "/images/avatar.jpg",
 *   cvUrl: "/cv/cv-2025-zh.pdf",
 *   socialLinks: [...],
 *   locale: "zh-TW"
 * }
 */
export interface PersonalProfile {
  // 基本信息
  /** 姓名 [必須] */
  name: string
  /** 職位/身份 [必須] */
  title: string
  /** 個人簡介 (100-500 字) [必須] */
  bio: string

  // 視覺素材
  /** 頭像圖片 URL 或路徑 [必須] */
  avatar: string

  // 下載資源
  /** CV/履歷 PDF URL [必須] */
  cvUrl: string

  // 社群連結
  /** 社群媒體連結陣列 [必須] */
  socialLinks: SocialLink[]

  // 元數據
  /** 最後更新時間 [可選] */
  updatedAt?: Date
  /** 內容語言 [可選，預設 'zh-TW'] */
  locale?: 'zh-TW' | 'en'
}

/**
 * 項目成果指標
 * 記錄項目的性能、無障礙、採用等指標
 * @example
 * {
 *   performance: {
 *     lighthouse: 95,
 *     fcp: 1200
 *   },
 *   accessibility: { wcagLevel: "AA" },
 *   adoption: { users: 50000, github_stars: 150 }
 * }
 */
export interface ProjectMetrics {
  performance?: {
    /** Lighthouse 分數 (0-100) */
    lighthouse?: number
    /** PageSpeed 分數 */
    pagespeed?: number
    /** First Contentful Paint (ms) */
    fcp?: number
  }
  accessibility?: {
    /** WCAG 合規等級 */
    wcagLevel?: 'A' | 'AA' | 'AAA'
  }
  adoption?: {
    /** 用戶數量 */
    users?: number
    /** 下載次數 */
    downloads?: number
    /** GitHub Stars */
    github_stars?: number
  }
}

/**
 * 作品集項目
 * 代表一個完成的項目或案例
 * @example
 * {
 *   id: "proj-001",
 *   title: "電商平台前端重構",
 *   description: "使用 React 18 + TypeScript 重構的電商平台...",
 *   thumbnail: "/images/projects/ecommerce-thumb.png",
 *   featured: true,
 *   order: 1,
 *   projectUrl: "https://ecommerce-demo.vercel.app",
 *   repositoryUrl: "https://github.com/leeuki/ecommerce-frontend",
 *   tags: ["React", "TypeScript", "Vite"],
 *   startDate: "2024-01",
 *   endDate: "2024-06",
 *   status: "active"
 * }
 */
export interface PortfolioItem {
  // 基本識別
  /** 唯一識別碼 (e.g. "proj-001") [必須] */
  id: string
  /** 項目名稱 [必須] */
  title: string
  /** 項目描述 (100-500 字) [必須] */
  description: string

  // 視覺素材
  /** 縮圖圖片 URL 或路徑 [必須] */
  thumbnail: string
  /** 額外圖片 URL 陣列 (詳情頁用) [可選] */
  images?: string[]

  // 展示優先級
  /** 是否為精選項目 (首頁展示) [必須] */
  featured: boolean
  /** 顯示順序 (升序) [可選] */
  order?: number

  // 外部連結
  /** 項目線上網址 [可選] */
  projectUrl?: string
  /** GitHub 倉庫 URL [可選] */
  repositoryUrl?: string

  // 元數據
  /** 技術標籤 (e.g. ["React", "TypeScript"]) [必須] */
  tags: string[]
  /** 開始日期 (YYYY-MM 格式) [可選] */
  startDate?: string
  /** 結束日期 (YYYY-MM 格式) [可選] */
  endDate?: string

  // 詳細內容
  /** 完整描述 (詳情頁用) [可選] */
  fullDescription?: string
  /** 亮點特性列表 [可選] */
  highlights?: string[]
  /** 項目成果指標 [可選] */
  metrics?: ProjectMetrics

  // 狀態
  /** 項目狀態 [可選] */
  status?: 'active' | 'archived' | 'in-progress'
  /** 內容語言 [可選] */
  locale?: 'zh-TW' | 'en'
}

/**
 * 技能標籤
 * 代表掌握的技能
 * @example
 * {
 *   id: "skill-001",
 *   name: "React",
 *   category: "frontend",
 *   level: 5,
 *   proficiency: "Expert"
 * }
 */
export interface Skill {
  // 基本識別
  /** 唯一識別碼 [必須] */
  id: string
  /** 技能名稱 [必須] */
  name: string
  /** 技能分類 [必須] */
  category: 'frontend' | 'backend' | 'fullstack' | 'devops' | 'tools' | 'other'

  // 熟練度
  /** 技能等級 1-5 (1=初級, 5=專家) [可選，預設 3] */
  level?: 1 | 2 | 3 | 4 | 5
  /** 熟練度描述 [可選] */
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

  // 關聯項目
  /** 相關項目 ID [可選] */
  relatedProjects?: string[]

  // 元數據
  /** 圖標名稱 (FontAwesome) [可選] */
  icon?: string
  /** 內容語言 [可選] */
  locale?: 'zh-TW' | 'en'
}

/**
 * 應用程式全局狀態
 * 代表整個應用的數據狀態
 */
export interface PortfolioState {
  /** 個人資料 */
  profile: PersonalProfile
  /** 作品集項目列表 */
  portfolioItems: PortfolioItem[]
  /** 技能列表 */
  skills: Skill[]
  /** 當前語言設定 */
  locale: 'zh-TW' | 'en'
}

/**
 * 設備類型
 * 用於響應式設計
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * 視口大小信息
 */
export interface ViewportSize {
  width: number
  height: number
  deviceType: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}
