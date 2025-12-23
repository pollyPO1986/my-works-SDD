import type { ReactElement } from 'react';
import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { PortfolioCard } from '../components/PortfolioCard';
import type { PortfolioItem } from '../types/models';

/**
 * 完整作品集頁面
 * 展示所有項目（已發佈和正在進行的）
 *
 * 路由: /portfolio
 * 特性:
 * - 搜索和篩選功能
 * - 排序選項
 * - 分頁顯示
 */
export default function PortfolioAll(): ReactElement {
  /**
   * 完整項目列表
   */
  const allProjects: PortfolioItem[] = [
    {
      id: 'proj-001',
      title: '個人作品集網站',
      description: '使用 React 18 + TypeScript 構建的現代化個人作品集',
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
      description: '為中小企業開發的電商平台前端',
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
      description: '基於 WebSocket 的實時聊天應用',
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
      description: '互動式資料分析儀表板',
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
      description: '輕量級待辦事項應用',
      thumbnail: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=337&fit=crop',
      featured: true,
      order: 5,
      projectUrl: 'https://todo-app-demo.vercel.app',
      repositoryUrl: 'https://github.com/leeuki/todo-app',
      tags: ['React Native', 'Redux', 'LocalStorage', 'PWA'],
    },
    {
      id: 'proj-006',
      title: '社群媒體管理工具',
      description: '多平台社群媒體內容管理和發布工具',
      thumbnail: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=600&h=337&fit=crop',
      featured: false,
      order: 6,
      projectUrl: 'https://social-tool-demo.vercel.app',
      repositoryUrl: 'https://github.com/leeuki/social-media-tool',
      tags: ['React', 'TypeScript', 'Social API', 'Scheduling'],
    },
    {
      id: 'proj-007',
      title: '天氣預報應用',
      description: '實時天氣預報和天氣趨勢分析',
      thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=337&fit=crop',
      featured: false,
      order: 7,
      projectUrl: 'https://weather-app-demo.vercel.app',
      repositoryUrl: 'https://github.com/leeuki/weather-app',
      tags: ['React', 'Weather API', 'Maps', 'Geolocation'],
    },
    {
      id: 'proj-008',
      title: '線上教育平台',
      description: '支持視頻課程、課程跟蹤和評估的線上教育平台',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=337&fit=crop',
      featured: false,
      order: 8,
      projectUrl: 'https://education-platform-demo.vercel.app',
      repositoryUrl: 'https://github.com/leeuki/education-platform',
      tags: ['React', 'Node.js', 'Video Streaming', 'Database'],
    },
  ];

  // 搜索和排序狀態
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'trending'>('date');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // 獲取所有獨特的技術標籤用於篩選
  const allTags = Array.from(
    new Set(allProjects.flatMap((p) => p.tags))
  ).sort();

  // 篩選和排序邏輯
  const filteredProjects = allProjects
    .filter((project) => {
      // 搜索篩選
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // 分類篩選
      const matchesCategory =
        filterCategory === 'all' || project.tags.includes(filterCategory);

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'trending':
          return (b.order || 0) - (a.order || 0);
        case 'date':
        default:
          return (b.order || 0) - (a.order || 0);
      }
    });

  // 分頁邏輯
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleCardClick = (project: PortfolioItem) => {
    console.log('Project clicked:', project.id);
    // 實際應用中導航到詳情頁: router.push(`/portfolio/${project.id}`)
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* 導航 */}
      <Navigation navLinks={navLinks} />

      <main className="pt-16">
        {/* 頁面標題 */}
        <section className="bg-white border-b border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">完整作品集</h1>
            <p className="text-lg text-gray-600">
              展示我在過去幾年開發的所有項目和案例研究。
            </p>
          </div>
        </section>

        {/* 搜索和篩選區域 */}
        <section className="bg-white py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
          <div className="mx-auto max-w-6xl">
            {/* 搜索框 */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="搜索項目名稱、描述或技術..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // 重置分頁
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 排序和分類選項 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 排序下拉菜單 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  排序方式
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as 'date' | 'name' | 'trending');
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">按日期（最新優先）</option>
                  <option value="name">按名稱（A-Z）</option>
                  <option value="trending">按熱門度</option>
                </select>
              </div>

              {/* 分類篩選 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  技術分類
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">全部技術</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              {/* 結果數量 */}
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  找到 <span className="font-semibold">{filteredProjects.length}</span> 個項目
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 項目網格 */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {paginatedProjects.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedProjects.map((project) => (
                    <PortfolioCard
                      key={project.id}
                      project={project}
                      onClick={() => handleCardClick(project)}
                      showFeaturedBadge={true}
                    />
                  ))}
                </div>

                {/* 分頁控制 */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      上一頁
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      下一頁
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  未找到匹配的項目
                </h3>
                <p className="text-gray-600 mb-6">
                  嘗試調整搜索條件或篩選器。
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterCategory('all');
                    setCurrentPage(1);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  重置篩選
                </button>
              </div>
            )}
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
