# 組件契約設計：個人作品集介紹頁面

**特性**: 001-portfolio-intro | **日期**: 2025-12-22 | **階段**: Phase 1

---

## 執行摘要

此文件定義了個人作品集介紹頁面的所有組件的契約、接口和使用方式。每個組件都遵循以
下原則：

- **型別安全**: 完整的 TypeScript 型別定義
- **可訪問性**: WCAG 2.1 AA 標準
- **可複用性**: 支持不同的使用場景
- **測試性**: 易於單元和集成測試

---

## 組件層級架構

```
App (頁面容器)
├── Header (頁首)
│   └── Navigation (導航)
├── main
│   ├── ProfileCard (個人資料卡)
│   │   ├── Avatar (頭像)
│   │   └── SocialLinks (社群連結)
│   ├── PortfolioSection (作品集區域)
│   │   └── PortfolioCard[] (作品卡片)
│   │       ├── ProjectImage (項目圖片)
│   │       └── ProjectTags (項目標籤)
│   ├── SkillsSection (技能區域)
│   │   └── SkillTag[] (技能標籤)
│   └── CTASection (號召性用語)
│       └── CVDownloadButton (CV 下載按鈕)
└── Footer (頁尾)
    └── SocialLinks (社群連結)
```

---

## 組件定義

### 1. App 組件 (頁面容器)

**職責**: 載入數據、管理全局狀態、組織主要佈局

```typescript
// src/components/App.tsx
export interface AppProps {
  // 無 props，使用靜態數據
}

/**
 * 根應用組件
 * @component
 * @example
 * <App />
 */
export default function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-12 space-y-16">
        <ProfileCard />
        <PortfolioSection />
        <SkillsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
```

**關鍵特性**:

- ✅ 響應式佈局（移動、平板、桌機）
- ✅ 無障礙頭部標記（lang="zh-TW"）
- ✅ SEO 優化（React Helmet）

---

### 2. Header 組件

**職責**: 頁面頭部導航和品牌

```typescript
// src/components/Header.tsx
export interface HeaderProps {
  scrollProgress?: number; // 滾動進度 (0-1) [可選]
}

/**
 * 頁面頭部組件
 * @component
 * @example
 * <Header scrollProgress={0.5} />
 */
export function Header({ scrollProgress = 0 }: HeaderProps): JSX.Element {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 品牌 Logo */}
        <div className="text-xl font-bold text-slate-900">李昱琨</div>

        {/* 導航連結 */}
        <ul className="hidden md:flex gap-6">
          <li>
            <a href="#portfolio">作品集</a>
          </li>
          <li>
            <a href="#skills">技能</a>
          </li>
          <li>
            <a href="#contact">聯繫</a>
          </li>
        </ul>

        {/* 進度條 */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-blue-500"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </nav>
    </header>
  );
}
```

**無障礙要求**:

- `<nav>` 標籤用於語義化
- 快捷鍵支持（可選）
- 焦點指示器清晰

---

### 3. ProfileCard 組件

**職責**: 展示個人資料、社群連結和 CV 下載

```typescript
// src/components/ProfileCard.tsx
export interface ProfileCardProps {
  profile: PersonalProfile; // 個人資料對象 [必須]
  onDownloadCV?: () => void; // CV 下載回調 [可選]
}

/**
 * 個人資料卡片組件
 * @component
 * @example
 * <ProfileCard profile={personalProfile} onDownloadCV={() => { ... }} />
 */
export function ProfileCard({
  profile,
  onDownloadCV,
}: ProfileCardProps): JSX.Element {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      {/* 左側：頭像 */}
      <div className="md:col-span-1 flex justify-center">
        <Avatar src={profile.avatar} alt={profile.name} size="large" />
      </div>

      {/* 右側：文本和操作 */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">{profile.name}</h1>
        <p className="text-xl text-slate-600">{profile.title}</p>
        <p className="text-base text-slate-700 leading-relaxed max-w-prose">
          {profile.bio}
        </p>

        {/* 社群連結 */}
        <SocialLinks links={profile.socialLinks} />

        {/* CV 下載按鈕 */}
        <CVDownloadButton url={profile.cvUrl} onDownload={onDownloadCV} />
      </div>
    </section>
  );
}
```

**包含的子組件**:

- `Avatar`: 頭像圖片
- `SocialLinks`: 社群連結列表
- `CVDownloadButton`: CV 下載按鈕

---

### 4. Avatar 組件

**職責**: 頭像圖片的縮放和備用方案

```typescript
// src/components/Avatar.tsx
export interface AvatarProps {
  src: string; // 圖片 URL [必須]
  alt: string; // 替代文字 [必須]
  size?: 'small' | 'medium' | 'large'; // 尺寸 [可選，預設 'medium']
  rounded?: boolean; // 圓形邊角 [可選，預設 true]
}

/**
 * 頭像圖片組件
 * @component
 * @example
 * <Avatar src="/avatar.jpg" alt="李昱琨" size="large" />
 */
export function Avatar({
  src,
  alt,
  size = 'medium',
  rounded = true,
}: AvatarProps): JSX.Element {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  const roundedClass = rounded ? 'rounded-full' : 'rounded-lg';

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} ${roundedClass} object-cover border-4 border-slate-200`}
      loading="lazy"
    />
  );
}
```

**特性**:

- ✅ 惰性加載 (lazy)
- ✅ 響應式尺寸
- ✅ 備用邊框（圖片加載失敗時可見）

---

### 5. SocialLinks 組件

**職責**: 展示社群媒體連結，使用 FontAwesome 圖標

```typescript
// src/components/SocialLinks.tsx
export interface SocialLinksProps {
  links: SocialLink[]; // 社群連結陣列 [必須]
  layout?: 'horizontal' | 'vertical'; // 佈局方向 [可選，預設 'horizontal']
  size?: 'small' | 'medium' | 'large'; // 圖標大小 [可選]
  showLabels?: boolean; // 顯示標籤文字 [可選，預設 false]
}

/**
 * 社群連結組件
 * @component
 * @example
 * <SocialLinks links={personalProfile.socialLinks} size="medium" />
 */
export function SocialLinks({
  links,
  layout = 'horizontal',
  size = 'medium',
  showLabels = false,
}: SocialLinksProps): JSX.Element {
  const iconMap = {
    linkedin: faLinkedin,
    github: faGithub,
    twitter: faTwitter,
    email: faEnvelope,
  };

  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl',
  };

  const layoutClass =
    layout === 'horizontal' ? 'flex gap-4' : 'flex flex-col gap-3';

  return (
    <div className={layoutClass}>
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label || `前往 ${link.platform}`}
          className="text-slate-600 hover:text-blue-600 transition-colors"
          title={link.label}
        >
          <FontAwesomeIcon
            icon={iconMap[link.platform] || faLink}
            className={sizeClasses[size]}
          />
          {showLabels && <span className="ml-2 text-sm">{link.label}</span>}
        </a>
      ))}
    </div>
  );
}
```

**無障礙要求**:

- ✅ `aria-label` 用於屏幕閱讀器
- ✅ `target="_blank" rel="noopener noreferrer"` 安全
- ✅ 足夠的顏色對比度（WCAG AA）

---

### 6. CVDownloadButton 組件

**職責**: CV 文件下載按鈕

```typescript
// src/components/CVDownloadButton.tsx
export interface CVDownloadButtonProps {
  url: string; // CV 文件 URL [必須]
  label?: string; // 按鈕標籤 [可選，預設 '下載履歷']
  onDownload?: () => void; // 下載事件回調 [可選]
  variant?: 'primary' | 'secondary'; // 按鈕風格 [可選]
}

/**
 * CV 下載按鈕組件
 * @component
 * @example
 * <CVDownloadButton url="/cv/cv.pdf" onDownload={() => console.log('Downloaded')} />
 */
export function CVDownloadButton({
  url,
  label = '下載履歷',
  onDownload,
  variant = 'primary',
}: CVDownloadButtonProps): JSX.Element {
  const handleClick = () => {
    onDownload?.();
    // 觸發下載
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cv.pdf';
    link.click();
  };

  const variantClass =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-slate-100 text-slate-900 hover:bg-slate-200';

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${variantClass}`}
      aria-label={label}
    >
      <FontAwesomeIcon icon={faDownload} className="mr-2" />
      {label}
    </button>
  );
}
```

---

### 7. PortfolioSection 組件

**職責**: 精選作品集合的容器

```typescript
// src/components/PortfolioSection.tsx
export interface PortfolioSectionProps {
  items?: PortfolioItem[]; // 作品項目 [可選，無傳遞時自動加載]
  maxFeatured?: number; // 最多顯示數量 [可選，預設 5]
  title?: string; // 部分標題 [可選]
}

/**
 * 作品集區域組件
 * @component
 * @example
 * <PortfolioSection maxFeatured={3} />
 */
export function PortfolioSection({
  items = portfolioItems,
  maxFeatured = 5,
  title = '精選作品集',
}: PortfolioSectionProps): JSX.Element {
  const featuredItems = items
    .filter((item) => item.featured)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, maxFeatured);

  return (
    <section id="portfolio" className="space-y-8">
      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>

      {/* 查看完整作品集的連結 */}
      <div className="text-center pt-4">
        <a
          href="/portfolio"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          查看完整作品集 →
        </a>
      </div>
    </section>
  );
}
```

---

### 8. PortfolioCard 組件

**職責**: 單個作品項目的卡片展示

```typescript
// src/components/PortfolioCard.tsx
export interface PortfolioCardProps {
  item: PortfolioItem; // 作品項目對象 [必須]
  onClick?: (id: string) => void; // 點擊回調 [可選]
}

/**
 * 作品項目卡片組件
 * @component
 * @example
 * <PortfolioCard item={portfolioItem} onClick={(id) => console.log(id)} />
 */
export function PortfolioCard({
  item,
  onClick,
}: PortfolioCardProps): JSX.Element {
  return (
    <article
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
      onClick={() => onClick?.(item.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(item.id);
        }
      }}
    >
      {/* 項目圖片 */}
      <div className="relative aspect-video bg-slate-200 overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
          loading="lazy"
        />

        {/* 精選標籤 */}
        {item.featured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            精選
          </div>
        )}
      </div>

      {/* 內容 */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* 項目標籤 */}
        <ProjectTags tags={item.tags} />

        {/* 操作按鈕 */}
        <div className="flex gap-2 pt-2">
          {item.projectUrl && (
            <a
              href={item.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              查看項目 →
            </a>
          )}
          {item.repositoryUrl && (
            <a
              href={item.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm text-slate-600 hover:text-slate-800 font-semibold"
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
```

**交互特性**:

- ✅ 鍵盤導航支持（Enter/Space）
- ✅ 懸停效果（視覺反饋）
- ✅ 惰性加載圖片

---

### 9. ProjectTags 組件

**職責**: 項目技術標籤的展示

```typescript
// src/components/ProjectTags.tsx
export interface ProjectTagsProps {
  tags: string[]; // 標籤陣列 [必須]
  maxTags?: number; // 最多顯示數量 [可選，預設 4]
  size?: 'small' | 'medium' | 'large'; // 標籤大小 [可選]
}

/**
 * 項目標籤列表組件
 * @component
 * @example
 * <ProjectTags tags={['React', 'TypeScript', 'Vite']} />
 */
export function ProjectTags({
  tags,
  maxTags = 4,
  size = 'medium',
}: ProjectTagsProps): JSX.Element {
  const displayedTags = tags.slice(0, maxTags);
  const remainingCount = Math.max(0, tags.length - maxTags);

  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-2',
  };

  return (
    <div className="flex flex-wrap gap-2">
      {displayedTags.map((tag) => (
        <span
          key={tag}
          className={`bg-slate-100 text-slate-700 rounded-full font-medium ${sizeClasses[size]}`}
        >
          {tag}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className={`text-slate-600 font-medium ${sizeClasses[size]}`}>
          +{remainingCount}
        </span>
      )}
    </div>
  );
}
```

---

### 10. SkillsSection 組件

**職責**: 技能標籤的容器和展示

```typescript
// src/components/SkillsSection.tsx
export interface SkillsSectionProps {
  skills?: Skill[]; // 技能列表 [可選]
  groupByCategory?: boolean; // 按分類分組 [可選，預設 true]
  title?: string; // 部分標題 [可選]
}

/**
 * 技能區域組件
 * @component
 * @example
 * <SkillsSection groupByCategory={true} />
 */
export function SkillsSection({
  skills = portfolioSkills,
  groupByCategory = true,
  title = '技能標籤',
}: SkillsSectionProps): JSX.Element {
  const skillsByCategory = groupByCategory
    ? skills.reduce((acc, skill) => {
        const category = skill.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
        return acc;
      }, {} as Record<string, Skill[]>)
    : { all: skills };

  const categoryLabels: Record<string, string> = {
    frontend: '前端開發',
    backend: '後端開發',
    devops: 'DevOps',
    design: '設計',
    'soft-skill': '軟技能',
  };

  return (
    <section id="skills" className="space-y-8">
      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>

      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <div key={category} className="space-y-4">
          {category !== 'all' && (
            <h3 className="text-lg font-semibold text-slate-700">
              {categoryLabels[category] || category}
            </h3>
          )}

          <div className="flex flex-wrap gap-3">
            {categorySkills.map((skill) => (
              <SkillTag key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
```

---

### 11. SkillTag 組件

**職責**: 單個技能標籤的展示

```typescript
// src/components/SkillTag.tsx
export interface SkillTagProps {
  skill: Skill; // 技能對象 [必須]
  showLevel?: boolean; // 顯示等級 [可選，預設 true]
  showTooltip?: boolean; // 顯示工具提示 [可選，預設 true]
}

/**
 * 技能標籤組件
 * @component
 * @example
 * <SkillTag skill={reactSkill} showLevel={true} />
 */
export function SkillTag({
  skill,
  showLevel = true,
  showTooltip = true,
}: SkillTagProps): JSX.Element {
  const levelColors = {
    1: 'bg-red-100 text-red-800',
    2: 'bg-orange-100 text-orange-800',
    3: 'bg-yellow-100 text-yellow-800',
    4: 'bg-lime-100 text-lime-800',
    5: 'bg-green-100 text-green-800',
  };

  const iconMap = {
    faReact: faReact,
    faTypeScript: faTypeScript,
    // ... 更多圖標映射
  };

  const title = showTooltip
    ? `${skill.name} - ${skill.proficiency} (${
        skill.yearsOfExperience || 0
      }+ 年經驗)`
    : undefined;

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
        levelColors[skill.level]
      }`}
      title={title}
      role="img"
      aria-label={title}
    >
      <FontAwesomeIcon
        icon={iconMap[skill.icon as keyof typeof iconMap] || faStar}
      />
      <span>{skill.name}</span>
      {showLevel && (
        <span className="ml-1 text-xs opacity-75">
          {'★'.repeat(skill.level)}
          {'☆'.repeat(5 - skill.level)}
        </span>
      )}
    </div>
  );
}
```

**視覺反饋**:

- ✅ 顏色根據技能等級變化
- ✅ 星星評級顯示
- ✅ 工具提示提供額外信息

---

### 12. CTASection 組件

**職責**: 號召性用語（Call-to-Action）區域

```typescript
// src/components/CTASection.tsx
export interface CTASectionProps {
  cvUrl: string; // CV URL [必須]
  onCVDownload?: () => void; // 下載回調 [可選]
}

/**
 * 號召性用語區域組件
 * @component
 * @example
 * <CTASection cvUrl="/cv/cv.pdf" />
 */
export function CTASection({
  cvUrl,
  onCVDownload,
}: CTASectionProps): JSX.Element {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-12 text-center text-white space-y-6">
      <h2 className="text-3xl font-bold">對我的工作感興趣？</h2>
      <p className="text-lg opacity-90 max-w-2xl mx-auto">
        我始終對有趣的機會保持開放。隨時與我聯繫！
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <CVDownloadButton
          url={cvUrl}
          variant="secondary"
          label="下載我的履歷"
          onDownload={onCVDownload}
        />
        <a
          href="mailto:contact@example.com"
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          發送郵件
        </a>
      </div>
    </section>
  );
}
```

---

### 13. Footer 組件

**職責**: 頁尾信息和連結

```typescript
// src/components/Footer.tsx
export interface FooterProps {
  socialLinks?: SocialLink[]; // 社群連結 [可選]
  year?: number; // 年份 [可選，預設當前年份]
}

/**
 * 頁尾組件
 * @component
 * @example
 * <Footer socialLinks={personalProfile.socialLinks} year={2025} />
 */
export function Footer({
  socialLinks,
  year = new Date().getFullYear(),
}: FooterProps): JSX.Element {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 mt-16 border-t border-slate-800">
      <div className="container mx-auto px-4 space-y-6">
        {/* 社群連結 */}
        {socialLinks && (
          <div className="flex justify-center">
            <SocialLinks links={socialLinks} size="medium" />
          </div>
        )}

        {/* 版權信息 */}
        <div className="text-center text-sm border-t border-slate-800 pt-6">
          <p>© {year} 李昱琨. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Built with React • Styled with Tailwind CSS • Icons from FontAwesome
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

## 組件使用指南

### 導入和使用

```typescript
// src/main.tsx - 應用入口
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 組件測試示例

```typescript
// src/components/__tests__/ProfileCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ProfileCard } from '../ProfileCard';
import { personalProfile } from '../../data';

describe('ProfileCard', () => {
  it('renders personal name and title', () => {
    render(<ProfileCard profile={personalProfile} />);
    expect(screen.getByText(personalProfile.name)).toBeInTheDocument();
    expect(screen.getByText(personalProfile.title)).toBeInTheDocument();
  });

  it('displays all social links', () => {
    render(<ProfileCard profile={personalProfile} />);
    personalProfile.socialLinks.forEach((link) => {
      expect(
        screen.getByRole('link', { name: new RegExp(link.platform) })
      ).toBeInTheDocument();
    });
  });

  it('calls onDownloadCV when button clicked', () => {
    const onDownloadCV = jest.fn();
    render(
      <ProfileCard profile={personalProfile} onDownloadCV={onDownloadCV} />
    );
    const button = screen.getByRole('button');
    button.click();
    expect(onDownloadCV).toHaveBeenCalled();
  });
});
```

---

## 樣式系統

### tailwindCSS 設計系統

所有組件使用 tailwindCSS 實用類，定義如下色彩系統：

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // 藍色
        secondary: '#64748b', // 灰色
        success: '#22c55e', // 綠色
        warning: '#eab308', // 黃色
        error: '#ef4444', // 紅色
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## 無障礙 (A11y) 檢查清單

每個組件都應通過以下檢查：

- [ ] 語義化 HTML 結構 (`<section>`, `<article>`, `<nav>`)
- [ ] 完整的 `alt` 屬性（圖片）
- [ ] `aria-label` 或 `aria-labelledby`（當 label 不夠明確時）
- [ ] 鍵盤導航支持（Tab、Enter、Space）
- [ ] 焦點指示器清晰可見
- [ ] 顏色對比度 ≥ 4.5:1 (WCAG AA)
- [ ] 屏幕閱讀器相容性（tested with NVDA/JAWS）
- [ ] 無 `autoplay` 內容
- [ ] 表單標籤正確關聯 (`<label htmlFor>`)

---

**契約完成日期**: 2025-12-22  
**審查狀態**: 待批准 → Phase 2 任務生成  
**下一步**: 執行 `/speckit.tasks` 生成詳細任務清單
