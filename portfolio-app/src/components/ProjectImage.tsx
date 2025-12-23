/**
 * ProjectImage 組件
 * 響應式項目圖片，支持 WebP、lazy loading、srcset
 *
 * @component
 * @example
 * <ProjectImage
 *   src="project.jpg"
 *   alt="Project preview"
 *   title="My Project"
 * />
 */

import type { ReactElement } from 'react'

export interface ProjectImageProps {
  /**
   * 主要圖片 URL (JPEG/PNG)
   */
  src: string

  /**
   * WebP 格式圖片 URL (可選)
   */
  srcWebp?: string

  /**
   * 圖片替代文字（無障礙）
   */
  alt: string

  /**
   * 圖片標題
   */
  title?: string

  /**
   * 響應式 srcset
   * 例如: "300w, 600w, 900w"
   * @default "300w, 600w, 900w"
   */
  srcSet?: string

  /**
   * 預加載提示
   * @default false
   */
  eager?: boolean

  /**
   * CSS className 附加類名
   */
  className?: string

  /**
   * 圖片加載失敗時的備用內容
   */
  fallback?: string
}

/**
 * ProjectImage 組件
 * 顯示響應式項目圖片，支持 WebP 現代格式和 fallback
 *
 * 特性:
 * - WebP 自動降級到 JPEG/PNG
 * - 懶加載優化性能
 * - 響應式圖片（srcset）
 * - 無障礙支持（alt 文字）
 * - 圖片加載失敗備用顯示
 */
export function ProjectImage({
  src,
  srcWebp,
  alt,
  title,
  srcSet = '300w, 600w, 900w',
  eager = false,
  className = '',
  fallback = '/images/placeholder.jpg',
}: ProjectImageProps): ReactElement {
  return (
    <picture className={`w-full overflow-hidden bg-gray-200 ${className}`}>
      {/* WebP 現代格式 */}
      {srcWebp && (
        <source
          srcSet={srcWebp}
          type="image/webp"
          media="(min-width: 0px)"
        />
      )}

      {/* JPEG/PNG 後備格式 */}
      <source
        srcSet={srcSet}
        type="image/jpeg"
      />

      {/* img 標籤：主要圖片 */}
      <img
        src={src}
        alt={alt}
        title={title}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="w-full h-auto object-cover aspect-video"
        onError={(e) => {
          const img = e.target as HTMLImageElement
          if (img.src !== fallback) {
            img.src = fallback
          }
        }}
      />
    </picture>
  )
}
