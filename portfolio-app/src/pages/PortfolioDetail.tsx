import type { ReactElement } from 'react';
import { Navigation } from '../components/Navigation';
import { ProjectImage } from '../components/ProjectImage';
import { ProjectTags } from '../components/ProjectTags';
import type { PortfolioItem } from '../types/models';

/**
 * 作品集詳情頁 (可選功能)
 * 展示單個項目的完整信息
 *
 * 路由: /portfolio/:id
 * 使用: 在實現 React Router 後配置路由
 */
export default function PortfolioDetail(): ReactElement {
  /**
   * 模擬項目詳情數據
   * 實際應用中應從 URL 參數或 API 獲取
   */
  const project: PortfolioItem = {
    id: 'proj-001',
    title: '個人作品集網站',
    description: '使用 React 18 + TypeScript 構建的現代化個人作品集，展示前端開發技能。',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-aaf4a91ee0a4?w=1200&h=675&fit=crop',
    ],
    featured: true,
    order: 1,
    projectUrl: 'https://portfolio.example.com',
    repositoryUrl: 'https://github.com/leeuki/portfolio',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Web Design', 'Responsive'],
    startDate: '2024-01',
    endDate: '2024-03',
    status: 'active',
    fullDescription: `
      這是一個展示個人技能和經驗的現代化作品集網站。
      
      **主要特性:**
      - 響應式設計，支持所有設備
      - 無障礙 (WCAG 2.1 Level AA)
      - SEO 優化
      - 快速加載速度 (Lighthouse 95+)
      - 暗模式支持
      
      **技術棧:**
      - React 18 with TypeScript
      - Tailwind CSS for styling
      - Vite for fast builds
      
      **成果:**
      - 完成時間: 3 個月
      - 頁面加載時間: < 1s
      - Lighthouse 性能分數: 98/100
      - 無障礙評分: 100/100
    `,
    highlights: [
      '響應式設計支持所有屏幕尺寸',
      'WCAG 2.1 Level AA 無障礙合規',
      'Lighthouse 性能分數 95+',
      '優化的圖片加載和 WebP 支持',
      '實時項目計數器和進度指示',
    ],
    metrics: {
      performance: {
        lighthouse: 98,
        fcp: 800,
        pagespeed: 97,
      },
      accessibility: {
        wcagLevel: 'AA',
      },
      adoption: {
        users: 1000,
        github_stars: 45,
      },
    },
  };

  /**
   * 導航連結
   */
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* 導航 */}
      <Navigation navLinks={navLinks} />

      {/* 主要內容 */}
      <main className="pt-16">
        {/* 返回按鈕 */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
            >
              ← 返回作品集
            </a>
          </div>
        </div>

        {/* 項目大圖 */}
        <section className="bg-white py-8">
          <div className="mx-auto max-w-4xl px-4">
            <ProjectImage
              src={project.thumbnail}
              alt={project.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* 項目詳情 */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-4xl px-4">
            {/* 標題和元數據 */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <p className="text-lg text-gray-600 mb-8">{project.description}</p>

            {/* 日期和狀態 */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
              {project.startDate && (
                <span>
                  📅 時期: {project.startDate} ~ {project.endDate || '進行中'}
                </span>
              )}
              {project.status && (
                <span>🔴 狀態: {project.status === 'active' ? '進行中' : project.status}</span>
              )}
            </div>

            {/* 標籤 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">技術棧</h3>
              <ProjectTags tags={project.tags} maxTags={10} variant="blue" size="md" />
            </div>

            {/* 亮點 */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">項目亮點</h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 詳細描述 */}
            {project.fullDescription && (
              <div className="mb-8 prose prose-sm max-w-none">
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {project.fullDescription}
                </div>
              </div>
            )}

            {/* 成果指標 */}
            {project.metrics && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">成果指標</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.metrics.performance?.lighthouse && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        {project.metrics.performance.lighthouse}
                      </div>
                      <div className="text-sm text-gray-600">Lighthouse 性能分數</div>
                    </div>
                  )}
                  {project.metrics.adoption?.github_stars && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">
                        {project.metrics.adoption.github_stars}
                      </div>
                      <div className="text-sm text-gray-600">GitHub Stars</div>
                    </div>
                  )}
                  {project.metrics.adoption?.users && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">
                        {project.metrics.adoption.users}
                      </div>
                      <div className="text-sm text-gray-600">用戶數</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 外部連結 */}
            <div className="flex flex-wrap gap-4">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  查看線上項目 →
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  GitHub 倉庫
                </a>
              )}
            </div>
          </div>
        </section>

        {/* 更多項目 */}
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">查看更多項目</h2>
            <a
              href="/"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              返回作品集
            </a>
          </div>
        </section>
      </main>

      {/* 頁腳 */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gray-400">© 2025 Lee Uki. 保留所有權利。</p>
        </div>
      </footer>
    </div>
  );
}
