/**
 * CVDownloadButton 組件
 * 下載 CV/簡歷檔案的按鈕
 *
 * @component
 * @example
 * <CVDownloadButton 
 *   cvUrl="/cv/cv-2025.pdf"
 *   variant="primary"
 *   onDownload={() => console.log('Downloaded')}
 * />
 */

import type { ReactElement, AnchorHTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

export type ButtonVariant = 'primary' | 'secondary' | 'outline'

export interface CVDownloadButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  /**
   * CV 檔案 URL
   */
  cvUrl: string

  /**
   * 按鈕樣式變體
   * @default 'primary'
   */
  variant?: ButtonVariant

  /**
   * 按鈕文本標籤
   * @default '下載 CV'
   */
  label?: string

  /**
   * 文件名稱（用於下載屬性）
   * @default 'CV.pdf'
   */
  fileName?: string

  /**
   * 下載完成的回調
   */
  onDownload?: () => void

  /**
   * CSS className 附加類名
   */
  className?: string
}

/**
 * 獲取按鈕變體對應的 CSS 類名
 */
function getVariantClass(variant: ButtonVariant): string {
  const variantMap: Record<ButtonVariant, string> = {
    primary: `
      bg-primary-600 text-white
      hover:bg-primary-700
      active:bg-primary-800
    `,
    secondary: `
      bg-slate-200 text-slate-900
      hover:bg-slate-300
      active:bg-slate-400
    `,
    outline: `
      border-2 border-primary-600 text-primary-600
      hover:bg-primary-50
      active:bg-primary-100
    `,
  }
  return variantMap[variant]
}

/**
 * CVDownloadButton 組件
 * 下載 CV 檔案，支持多種按鈕樣式、無障礙支持
 */
export function CVDownloadButton({
  cvUrl,
  variant = 'primary',
  label = '下載 CV',
  fileName = 'CV.pdf',
  onDownload,
  className = '',
  ...props
}: CVDownloadButtonProps): ReactElement {
  const variantClass = getVariantClass(variant)

  const handleDownload = () => {
    onDownload?.()
  }

  return (
    <a
      href={cvUrl}
      download={fileName}
      onClick={handleDownload}
      className={`
        inline-flex items-center gap-2
        px-4 py-2
        rounded-lg
        font-medium
        transition-colors duration-200
        focus:outline-2 focus:outline-offset-2 focus:outline-primary-600
        ${variantClass}
        ${className}
      `}
      aria-label={`下載我的 CV (${fileName})`}
      role="link"
      {...props}
    >
      <FontAwesomeIcon icon={faDownload} size="sm" aria-hidden="true" />
      <span>{label}</span>
    </a>
  )
}
