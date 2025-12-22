/**
 * PortfolioContext - 僅包含 Context 定義
 * 避免 React Fast Refresh 警告
 */

import { createContext } from 'react'
import type { PortfolioState } from '../types/models'

/**
 * Portfolio Context 類型定義
 */
export type PortfolioContextType = PortfolioState

/**
 * 創建 Context
 */
export const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
)
