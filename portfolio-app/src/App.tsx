/**
 * App 組件 - 頁面容器
 * 職責：載入數據、管理全局狀態、組織主要佈局
 */

import './App.css';

/**
 * 根應用組件
 * 使用 Context Provider 包裝整個應用
 * 提供頂級結構：Header → Main → Footer
 *
 * @component
 * @example
 * <App />
 *
 * @returns JSX.Element
 */
function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* 品牌 Logo */}
          <div className="text-xl font-bold text-slate-900">李昱琨</div>

          {/* 導航連結 */}
          <ul className="hidden md:flex gap-8">
            <li>
              <a
                href="#portfolio"
                className="text-slate-600 hover:text-primary-600 transition-colors"
              >
                作品集
              </a>
            </li>
            <li>
              <a href="#skills" className="text-slate-600 hover:text-primary-600 transition-colors">
                技能
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-slate-600 hover:text-primary-600 transition-colors"
              >
                聯繫
              </a>
            </li>
          </ul>

          {/* 移動端菜單按鈕 */}
          <button className="md:hidden text-slate-600 hover:text-slate-900" aria-label="打開菜單">
            ☰
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* 個人資料卡 */}
        <section id="profile" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-12">
          <div className="md:col-span-1 flex justify-center">
            <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
              頭像
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">李昱琨</h1>
            <p className="text-xl text-slate-600">前端工程師 | React 專家</p>
            <p className="text-base text-slate-700 leading-relaxed max-w-prose">
              熱情的 React 和 TypeScript 開發者，擁有 5
              年前端工程經驗。專注於構建高性能、可訪問性強的用戶界面。喜歡開源貢獻和技術寫作。
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/leeuki/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/leeuki/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                GitHub
              </a>
              <a
                href="/cv/cv-2025-zh.pdf"
                download
                className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors"
              >
                下載 CV
              </a>
            </div>
          </div>
        </section>

        {/* 作品集區域 */}
        <section id="portfolio" className="py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">精選作品</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="aspect-video bg-slate-200 flex items-center justify-center text-slate-500">
                  項目 {i} 圖片
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">項目標題 {i}</h3>
                  <p className="text-sm text-slate-600 mb-4">項目簡介文字...</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                      React
                    </span>
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                      TypeScript
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/portfolio"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors inline-block"
            >
              查看所有作品
            </a>
          </div>
        </section>

        {/* 技能區域 */}
        <section id="skills" className="py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">技能標籤</h2>
          <div className="flex flex-wrap gap-4">
            {[
              'React',
              'TypeScript',
              'Vite',
              'tailwindCSS',
              'Node.js',
              'Express',
              'PostgreSQL',
              'Git',
              'Docker',
              'Testing',
            ].map(skill => (
              <span
                key={skill}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* 號召性用語 */}
        <section id="contact" className="py-12 text-center bg-primary-50 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">讓我們合作</h2>
          <p className="text-lg text-slate-600 mb-6 max-w-prose mx-auto">
            有任何合作、問題或建議？歡迎通過社群媒體聯繫我！
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://www.linkedin.com/in/leeuki/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/leeuki/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">李昱琨</h3>
              <p className="text-slate-300">前端工程師 | React 專家 | 開源貢獻者</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">快速連結</h3>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#portfolio" className="hover:text-white transition-colors">
                    作品集
                  </a>
                </li>
                <li>
                  <a href="#skills" className="hover:text-white transition-colors">
                    技能
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    聯繫
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">社群</h3>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a
                    href="https://www.linkedin.com/in/leeuki/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/leeuki/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-300">
            <p>© 2025 李昱琨. Built with React + TypeScript + Vite + tailwindCSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
