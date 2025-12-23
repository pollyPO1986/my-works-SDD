import type { ReactElement } from 'react';
import { Navigation } from '../components/Navigation';
import { Header } from '../components/Header';
import { ProfileCard } from '../components/ProfileCard';
import type { PersonalProfile } from '../types/models';

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
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              個人檔案
            </h2>

            <ProfileCard
              profile={profile}
              onSocialClick={handleSocialClick}
              onCVDownload={handleCVDownload}
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
