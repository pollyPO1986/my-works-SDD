import type { ReactElement } from 'react';
import { Navigation } from '../components/Navigation';
import { Header } from '../components/Header';
import { ProfileCard } from '../components/ProfileCard';
import { PortfolioSection } from '../components/PortfolioSection';
import type { PersonalProfile, PortfolioItem } from '../types/models';

/**
 * Home Page - 整合所有 US1 個人資料卡組件的首頁
 *
 * 頁面結構：
 * 1. Navigation - 固定頂部導航，包含品牌、連結、進度條和移動菜單
 * 2. Header - 歡迎區域，個人簡介和號召性用語
 * 3. ProfileCard - 個人資料卡，包含頭像、社群連結和 CV 下載
 */
export default function Home(): ReactElement {
  /**
   * 模擬個人資料數據
   * 在實際應用中，這些數據可能來自 API 或靜態配置
   */
  const profile: PersonalProfile = {
    name: 'Lee Uki',
    title: 'Full Stack Developer',
    bio: '熟練使用 React、TypeScript、Node.js 構建現代化 Web 應用。',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lee',
    socialLinks: [
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/example',
        label: 'LinkedIn',
      },
      {
        platform: 'github',
        url: 'https://github.com/example',
        label: 'GitHub',
      },
      {
        platform: 'twitter',
        url: 'https://twitter.com/example',
        label: 'Twitter',
      },
      {
        platform: 'email',
        url: 'mailto:example@example.com',
        label: 'Email',
      },
    ],
    cvUrl: '/cv/resume.pdf',
  };

  /**
   * 導航連結數據
   */
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  /**
   * 示例作品集項目
   * 在實際應用中，這些數據可能來自 API 或靜態配置
   */
  const portfolioItems: PortfolioItem[] = [
    {
      id: 'proj-001',
      title: '個人作品集網站',
      description: '使用 React 18 + TypeScript 構建的現代化個人作品集，展示前端開發技能。',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=337&fit=crop',
      featured: true,
      order: 1,
      projectUrl: 'https://portfolio.example.com',
      repositoryUrl: 'https://github.com/leeuki/portfolio',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    },
    {
      id: 'proj-002',
      title: '電商平台前端',
      description: '為中小企業開發的電商平台前端，支持商品展示、購物車和支付集成。',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-aaf4a91ee0a4?w=600&h=337&fit=crop',
      featured: true,
      order: 2,
      projectUrl: 'https://ecommerce-demo.vercel.app',
      repositoryUrl: 'https://github.com/leeuki/ecommerce',
      tags: ['React', 'Redux', 'Payment API', 'Responsive'],
    },
    {
      id: 'proj-003',
      title: '實時聊天應用',
      description: '基於 WebSocket 的實時聊天應用，支持一對一消息、群組聊天和通知推送。',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=600&h=337&fit=crop',
      featured: true,
      order: 3,
      projectUrl: 'https://chat-app-demo.vercel.app',
      repositoryUrl: 'https://github.com/leeuki/chat-app',
      tags: ['Node.js', 'React', 'Socket.io', 'MongoDB'],
    },
    {
      id: 'proj-004',
      title: '資料分析儀表板',
      description: '互動式資料分析儀表板，提供實時數據可視化和深入分析功能。',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=337&fit=crop',
      featured: true,
      order: 4,
      projectUrl: 'https://dashboard-demo.vercel.app',
      repositoryUrl: 'https://github.com/leeuki/analytics-dashboard',
      tags: ['React', 'D3.js', 'Chart.js', 'Data Visualization'],
    },
    {
      id: 'proj-005',
      title: '行動待辦應用',
      description: '輕量級待辦事項應用，支持離線使用、同步和本地存儲。',
      thumbnail: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=337&fit=crop',
      featured: true,
      order: 5,
      projectUrl: 'https://todo-app-demo.vercel.app',
      repositoryUrl: 'https://github.com/leeuki/todo-app',
      tags: ['React Native', 'Redux', 'LocalStorage', 'PWA'],
    },
  ];

  /**
   * 處理社群連結點擊事件
   */
  const handleSocialClick = (url: string): void => {
    console.log('Opening social link:', url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  /**
   * 處理 CV 下載事件
   */
  const handleCVDownload = (): void => {
    console.log('Downloading CV from:', profile.cvUrl);
  };

  /**
   * 處理作品集項目卡片點擊事件
   */
  const handlePortfolioCardClick = (project: PortfolioItem): void => {
    console.log('Portfolio card clicked:', project.id, project.title);
    // 在實際應用中，可能導航到項目詳情頁
    // router.push(`/portfolio/${project.id}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* 固定導航 */}
      <Navigation navLinks={navLinks} />

      {/* 主要內容區域，需要考慮固定導航的高度 */}
      <main className="pt-16">
        {/* 歡迎區域 */}
        <section id="home" className="w-full">
          <Header />
        </section>

        {/* 個人資料卡 */}
        <section
          id="profile"
          className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8"
          role="region"
          aria-label="個人資料卡"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">個人檔案</h2>

            <ProfileCard
              profile={profile}
              onSocialClick={handleSocialClick}
              onCVDownload={handleCVDownload}
            />
          </div>
        </section>

        {/* 精選作品集區域 */}
        <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <PortfolioSection
              items={portfolioItems}
              maxFeatured={5}
              onCardClick={handlePortfolioCardClick}
              portfolioUrl="#portfolio"
              showViewAllLink={true}
              emptyMessage="暫無精選項目，敬請期待。"
            />
          </div>
        </section>

        {/* 頁腳 */}
        <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-gray-400">© 2025 {profile.name}. 保留所有權利。</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
