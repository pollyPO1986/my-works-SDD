/**
 * usePortfolioContext Hook
 * 從 PortfolioContext 提供的自訂 Hook
 */

import { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContextDefinition'
import type { PortfolioState } from '../types/models'

/**
 * usePortfolio Hook
 * 在任何組件中使用此 Hook 訪問 Portfolio 全局狀態
 *
 * @example
 * const { profile, portfolioItems, skills } = usePortfolio()
 *
 * @returns PortfolioState 對象
 * @throws 如果在 PortfolioProvider 外部使用會拋出錯誤
 */
export function usePortfolio(): PortfolioState {
  const context = useContext(PortfolioContext)

  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider')
  }

  return context
}

/**
 * useProfile Hook
 * 訪問個人資料信息
 *
 * @example
 * const profile = useProfile()
 *
 * @returns PersonalProfile 對象
 */
export function useProfile() {
  const { profile } = usePortfolio()
  return profile
}

/**
 * usePortfolioItems Hook
 * 訪問作品集項目列表
 *
 * @example
 * const items = usePortfolioItems()
 *
 * @returns PortfolioItem[] 陣列
 */
export function usePortfolioItems() {
  const { portfolioItems } = usePortfolio()
  return portfolioItems
}

/**
 * useFeaturedPortfolioItems Hook
 * 訪問精選作品集項目（featured = true）
 *
 * @example
 * const featuredItems = useFeaturedPortfolioItems()
 *
 * @returns 精選 PortfolioItem[] 陣列
 */
export function useFeaturedPortfolioItems() {
  const { portfolioItems } = usePortfolio()
  return portfolioItems.filter(item => item.featured)
}

/**
 * useSkills Hook
 * 訪問技能列表
 *
 * @example
 * const skills = useSkills()
 *
 * @returns Skill[] 陣列
 */
export function useSkills() {
  const { skills } = usePortfolio()
  return skills
}

/**
 * useSkillsByCategory Hook
 * 按分類訪問技能
 *
 * @example
 * const frontendSkills = useSkillsByCategory('frontend')
 *
 * @param category 技能分類
 * @returns 該分類的 Skill[] 陣列
 */
export function useSkillsByCategory(
  category: 'frontend' | 'backend' | 'fullstack' | 'devops' | 'tools' | 'other'
) {
  const { skills } = usePortfolio()
  return skills.filter(skill => skill.category === category)
}

/**
 * useLocale Hook
 * 訪問當前語言設定
 *
 * @example
 * const locale = useLocale()
 *
 * @returns 'zh-TW' | 'en'
 */
export function useLocale() {
  const { locale } = usePortfolio()
  return locale
}
