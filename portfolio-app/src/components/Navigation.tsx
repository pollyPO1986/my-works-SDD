/**
 * Navigation 組件
 * 導航菜單，包含品牌、導航連結和滾動進度條
 *
 * @component
 * @example
 * <Navigation />
 */

import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

export interface NavigationProps {
  /**
   * 品牌/網站名稱
   * @default '我的作品集'
   */
  brandName?: string

  /**
   * 導航連結陣列
   */
  navLinks?: Array<{ label: string; href: string }>

  /**
   * CSS className 附加類名
   */
  className?: string
}

/**
 * Navigation 組件
 * 顯示固定頂部導航，包含品牌、導航連結、進度條和移動菜單
 */
export function Navigation({
  brandName = '我的作品集',
  navLinks = [
    { label: '個人資料', href: '#profile' },
    { label: '作品集', href: '#portfolio' },
    { label: '技能', href: '#skills' },
    { label: '聯繫我', href: '#contact' },
  ],
  className = '',
}: NavigationProps): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // 計算滾動進度
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 點擊導航連結時關閉菜單
  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`
        sticky top-0 z-50
        bg-white border-b border-slate-200
        shadow-sm
        ${className}
      `}
      role="navigation"
      aria-label="主導航"
    >
      {/* 導航欄內容 */}
      <div className="safe-area">
        <div className="flex items-center justify-between py-4">
          {/* 品牌 */}
          <a
            href="#top"
            className={`
              text-xl md:text-2xl font-bold text-primary-600
              hover:text-primary-700 transition-colors
              focus:outline-2 focus:outline-offset-2 focus:outline-primary-600
            `}
            aria-label="回到頁面頂部"
          >
            {brandName}
          </a>

          {/* 桌機導航連結 */}
          <nav className="hidden md:flex gap-6" aria-label="導航連結">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`
                  text-slate-600 hover:text-primary-600
                  transition-colors duration-200
                  font-medium
                  focus:outline-2 focus:outline-offset-2 focus:outline-primary-600
                `}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 移動端菜單按鈕 */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-primary-600 focus:outline-2 focus:outline-offset-2 focus:outline-primary-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? '關閉菜單' : '打開菜單'}
            aria-expanded={isMenuOpen}
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              size="lg"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* 移動菜單 */}
        {isMenuOpen && (
          <nav
            className="md:hidden border-t border-slate-200 py-4"
            aria-label="移動導航"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`
                    px-4 py-2 rounded-lg
                    text-slate-600 hover:text-primary-600 hover:bg-slate-50
                    transition-colors duration-200
                    font-medium
                    focus:outline-2 focus:outline-offset-2 focus:outline-primary-600
                  `}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* 滾動進度條 */}
      <div
        className="h-1 bg-primary-600 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="頁面滾動進度"
      />
    </header>
  )
}
