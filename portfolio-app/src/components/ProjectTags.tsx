/**
 * ProjectTags 組件
 * 項目技術標籤展示，支持數量限制和溢出指示
 *
 * @component
 * @example
 * <ProjectTags
 *   tags={["React", "TypeScript", "Tailwind"]}
 *   maxTags={4}
 * />
 */

import type { ReactElement } from 'react';

export interface ProjectTagsProps {
  /**
   * 標籤陣列
   */
  tags: string[];

  /**
   * 最大顯示標籤數量
   * 超出數量時顯示 "+N"
   * @default 4
   */
  maxTags?: number;

  /**
   * 標籤大小
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 標籤顏色方案
   * @default 'blue'
   */
  variant?: 'blue' | 'purple' | 'green' | 'orange';

  /**
   * 是否顯示圖標或 badge 樣式
   * @default false
   */
  badge?: boolean;

  /**
   * CSS className 附加類名
   */
  className?: string;
}

/**
 * 獲取標籤樣式類名
 */
function getTagClasses(size: 'sm' | 'md' | 'lg', variant: string): string {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variantClasses = {
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    green: 'bg-green-100 text-green-800',
    orange: 'bg-orange-100 text-orange-800',
  };

  return `${sizeClasses[size]} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.blue}`;
}

/**
 * ProjectTags 組件
 * 顯示項目技術標籤列表，支持數量限制
 *
 * 特性:
 * - 限制顯示標籤數量（預設 4）
 * - 超出數量時顯示 "+N" 指示
 * - 多種樣式變體和尺寸
 * - 響應式設計
 * - 無障礙支持
 */
export function ProjectTags({
  tags,
  maxTags = 4,
  size = 'md',
  variant = 'blue',
  badge = false,
  className = '',
}: ProjectTagsProps): ReactElement {
  const displayTags = tags.slice(0, maxTags);
  const remainingCount = tags.length - maxTags;

  const tagClasses = getTagClasses(size, variant);
  const baseClasses = `inline-block rounded-full font-medium transition-colors duration-200 ${tagClasses}`;

  const hoverClasses = badge
    ? 'hover:shadow-md hover:scale-105'
    : 'hover:bg-opacity-80 hover:-translate-y-0.5';

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="list" aria-label="項目技術標籤">
      {displayTags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className={`${baseClasses} ${hoverClasses} cursor-default`}
          role="listitem"
          aria-label={`技術標籤：${tag}`}
        >
          {tag}
        </span>
      ))}

      {remainingCount > 0 && (
        <span
          className={`${baseClasses} font-bold bg-gray-200 text-gray-700 hover:bg-gray-300`}
          role="listitem"
          aria-label={`還有 ${remainingCount} 個標籤`}
          title={tags.slice(maxTags).join('、')}
        >
          +{remainingCount}
        </span>
      )}
    </div>
  );
}
