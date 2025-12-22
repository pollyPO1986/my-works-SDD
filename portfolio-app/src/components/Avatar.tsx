/**
 * Avatar 組件
 * 顯示個人頭像，支持多種尺寸和樣式
 *
 * @component
 * @example
 * <Avatar src="/avatar.jpg" alt="John Doe" size="large" />
 */

import type { ReactElement } from 'react'
import { ImgHTMLAttributes } from 'react'

export type AvatarSize = 'small' | 'medium' | 'large'

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  /**
   * 頭像圖片 URL
   */
  src: string

  /**
   * 圖片替代文字（無障礙）
   */
  alt: string

  /**
   * 頭像尺寸
   * @default 'medium'
   */
  size?: AvatarSize

  /**
   * 圖片是否使用圓形邊框
   * @default true
   */
  rounded?: boolean

  /**
   * 是否使用懶加載
   * @default true
   */
  lazy?: boolean

  /**
   * CSS className 附加類名
   */
  className?: string
}

/**
 * 獲取頭像尺寸對應的 CSS 類名
 */
function getSizeClass(size: AvatarSize): string {
  const sizeMap: Record<AvatarSize, string> = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  }
  return sizeMap[size]
}

/**
 * Avatar 組件
 * 顯示個人頭像，支持多種尺寸、懶加載、圓形邊框
 */
export function Avatar({
  src,
  alt,
  size = 'medium',
  rounded = true,
  lazy = true,
  className = '',
  ...props
}: AvatarProps): ReactElement {
  const sizeClass = getSizeClass(size)
  const roundedClass = rounded ? 'rounded-full' : 'rounded-lg'
  const combinedClassName = `
    ${sizeClass}
    ${roundedClass}
    object-cover
    border-4 border-slate-200
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ')

  return (
    <img
      src={src}
      alt={alt}
      loading={lazy ? 'lazy' : 'eager'}
      className={combinedClassName}
      aria-label={alt}
      {...props}
    />
  )
}
