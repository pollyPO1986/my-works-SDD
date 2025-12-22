/**
 * Header 組件
 * 頁面標題和介紹區域，通常在導航下方
 *
 * @component
 * @example
 * <Header />
 */

import type { ReactElement } from 'react'
import { useProfile } from '../portfolio-context'

export interface HeaderProps {
  /**
   * CSS className 附加類名
   */
  className?: string
}

/**
 * Header 組件
 * 顯示頁面標題和歡迎信息
 */
export function Header({
  className = '',
}: HeaderProps): ReactElement {
  const profile = useProfile()

  return (
    <header
      className={`
        bg-gradient-to-br from-primary-50 to-slate-50
        py-12 md:py-20
        border-b border-slate-200
        ${className}
      `}
      id="header"
      role="banner"
    >
      <div className="safe-area container-wide">
        <div className="max-w-4xl mx-auto text-center">
          {/* 歡迎標題 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            歡迎！👋
          </h1>

          {/* 副標題 */}
          <p className="text-lg md:text-xl text-slate-600 mb-6">
            我是 <span className="font-semibold text-primary-600">{profile.name}</span>
          </p>

          {/* 職稱 */}
          <p className="text-xl md:text-2xl text-primary-600 font-semibold mb-8">
            {profile.title}
          </p>

          {/* 簡短介紹 */}
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {profile.bio}
          </p>

          {/* 號召性用語 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href="#portfolio"
              className="btn-primary"
              aria-label="查看我的作品集"
            >
              查看我的作品集
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              aria-label="聯繫我"
            >
              聯繫我
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
