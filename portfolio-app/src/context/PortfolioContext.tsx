/**
 * PortfolioProvider 組件
 * 提供全局數據存儲（個人資料、作品集、技能）
 * 便於所有組件訪問，無需逐層傳遞 props
 */

import { type ReactNode } from 'react'
import type { PortfolioState } from '../types/models'
import { PortfolioContext } from './PortfolioContextDefinition'
import { personalProfile, portfolioItems, skills } from '../data/portfolio'

/**
 * PortfolioProvider Props
 */
interface PortfolioProviderProps {
  children: ReactNode
  locale?: 'zh-TW' | 'en'
}

/**
 * PortfolioProvider 組件
 * 在應用根部包裝以提供全局狀態
 *
 * @example
 * <PortfolioProvider>
 *   <App />
 * </PortfolioProvider>
 *
 * @param props 組件 props
 * @returns JSX.Element
 */
export function PortfolioProvider({
  children,
  locale = 'zh-TW',
}: PortfolioProviderProps): JSX.Element {
  const value: PortfolioState = {
    profile: personalProfile,
    portfolioItems,
    skills,
    locale,
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

