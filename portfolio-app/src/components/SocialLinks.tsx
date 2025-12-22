/**
 * SocialLinks 組件
 * 顯示社群連結列表（LinkedIn、GitHub 等），使用 FontAwesome 圖標
 *
 * @component
 * @example
 * <SocialLinks 
 *   links={[
 *     { platform: 'linkedin', url: 'https://linkedin.com/in/user' },
 *     { platform: 'github', url: 'https://github.com/user' }
 *   ]}
 *   layout="horizontal"
 *   size="medium"
 * />
 */

import type { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { type SocialLink } from '../types/models'

export type SocialLinksLayout = 'horizontal' | 'vertical'
export type SocialLinksSize = 'small' | 'medium' | 'large'

export interface SocialLinksProps {
  /**
   * 社群連結陣列
   */
  links: SocialLink[]

  /**
   * 佈局方式：水平或垂直
   * @default 'horizontal'
   */
  layout?: SocialLinksLayout

  /**
   * 圖標尺寸
   * @default 'medium'
   */
  size?: SocialLinksSize

  /**
   * 是否顯示標籤文字
   * @default false
   */
  showLabels?: boolean

  /**
   * CSS className 附加類名
   */
  className?: string

  /**
   * 點擊連結的回調
   */
  onClick?: (platform: string) => void
}

/**
 * 獲取平台對應的 FontAwesome 圖標
 */
function getIconForPlatform(platform: string) {
  type IconType = typeof faLinkedin
  const iconMap: Record<string, IconType> = {
    linkedin: faLinkedin,
    github: faGithub,
    twitter: faTwitter,
    email: faEnvelope,
    mail: faEnvelope,
  }
  return iconMap[platform.toLowerCase()] || faEnvelope
}

/**
 * 獲取平台顯示名稱
 */
function getPlatformLabel(platform: string): string {
  const labelMap: Record<string, string> = {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    twitter: 'Twitter/X',
    email: 'Email',
    mail: 'Email',
  }
  return labelMap[platform.toLowerCase()] || platform
}

/**
 * 獲取圖標尺寸對應的 FontAwesome 大小
 */
function getIconSize(size: SocialLinksSize): '1x' | 'sm' | 'lg' | '2x' {
  const sizeMap: Record<SocialLinksSize, '1x' | 'sm' | 'lg' | '2x'> = {
    small: 'sm',
    medium: 'lg',
    large: '2x',
  }
  return sizeMap[size]
}

/**
 * SocialLinks 組件
 * 顯示社群連結列表，支持水平/垂直佈局、多種尺寸、標籤顯示
 */
export function SocialLinks({
  links,
  layout = 'horizontal',
  size = 'medium',
  showLabels = false,
  className = '',
  onClick,
}: SocialLinksProps): ReactElement {
  const containerClass =
    layout === 'horizontal' ? 'flex gap-4' : 'flex flex-col gap-3'
  const linkClass =
    size === 'small' ? 'p-1' : size === 'medium' ? 'p-2' : 'p-3'
  const iconSize = getIconSize(size)

  return (
    <div
      className={`${containerClass} ${className}`}
      role="list"
      aria-label="社群媒體連結"
    >
      {links.map(link => (
        <a
          key={`${link.platform}-${link.url}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${linkClass}
            text-slate-600 hover:text-primary-600
            transition-colors duration-200
            rounded-lg hover:bg-slate-100
            inline-flex items-center gap-2
            focus:outline-2 focus:outline-offset-2 focus:outline-primary-600
          `}
          aria-label={`訪問我的 ${getPlatformLabel(link.platform)}`}
          role="listitem"
          onClick={() => onClick?.(link.platform)}
        >
          <FontAwesomeIcon
            icon={getIconForPlatform(link.platform)}
            size={iconSize}
            aria-hidden="true"
          />
          {showLabels && (
            <span className="text-sm font-medium">
              {getPlatformLabel(link.platform)}
            </span>
          )}
        </a>
      ))}
    </div>
  )
}
