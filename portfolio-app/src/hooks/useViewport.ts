/**
 * useViewport Hook
 * 實現視口大小偵測，返回當前設備類型和螢幕寬度
 * 用於響應式設計決策
 */

import { useState, useEffect } from 'react'
import { DEVICE_TYPE_THRESHOLDS } from '../utils/constants'
import type { DeviceType, ViewportSize } from '../types/models'

/**
 * 根據視口寬度判斷設備類型
 * @param width 視口寬度（像素）
 * @returns 設備類型
 */
function getDeviceType(width: number): DeviceType {
  if (width < DEVICE_TYPE_THRESHOLDS.mobile) {
    return 'mobile'
  }
  if (width < DEVICE_TYPE_THRESHOLDS.tablet) {
    return 'tablet'
  }
  return 'desktop'
}

/**
 * useViewport Hook
 * 追蹤視口大小並提供設備類型信息
 *
 * @example
 * const viewport = useViewport()
 * console.log(viewport.deviceType) // 'mobile' | 'tablet' | 'desktop'
 * console.log(viewport.isMobile) // boolean
 * console.log(viewport.width) // number
 *
 * @returns ViewportSize 對象，包含寬度、高度、設備類型和便捷布爾值
 */
export function useViewport(): ViewportSize {
  const [viewport, setViewport] = useState<ViewportSize>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 0
    const height = typeof window !== 'undefined' ? window.innerHeight : 0
    const deviceType = getDeviceType(width)

    return {
      width,
      height,
      deviceType,
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet',
      isDesktop: deviceType === 'desktop',
    }
  })

  useEffect(() => {
    /**
     * 處理視口大小變化
     */
    function handleResize() {
      const width = window.innerWidth
      const height = window.innerHeight
      const deviceType = getDeviceType(width)

      setViewport({
        width,
        height,
        deviceType,
        isMobile: deviceType === 'mobile',
        isTablet: deviceType === 'tablet',
        isDesktop: deviceType === 'desktop',
      })
    }

    // 添加監聽器
    window.addEventListener('resize', handleResize)

    // 清理
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return viewport
}

/**
 * useMediaQuery Hook
 * 使用 CSS Media Query 檢查特定的視口條件
 *
 * @example
 * const isSmallScreen = useMediaQuery('(max-width: 768px)')
 *
 * @param query CSS Media Query 字符串
 * @returns 布爾值，表示是否匹配
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    /**
     * 監聽 Media Query 變化
     */
    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches)
    }

    // 添加監聽器（支持舊版本瀏覽器）
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // 舊版本 API
      mediaQuery.addListener(handleChange)
    }

    // 清理
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        // 舊版本 API
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [query])

  return matches
}
