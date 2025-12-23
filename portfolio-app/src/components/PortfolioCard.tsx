/**
 * PortfolioCard 組件
 * 項目卡片，包含圖片、標題、簡介、標籤和操作按鈕
 *
 * @component
 * @example
 * <PortfolioCard
 *   project={portfolioItem}
 *   onClick={() => console.log('clicked')}
 * />
 */

import type { ReactElement } from 'react';
import { ProjectImage } from './ProjectImage';
import { ProjectTags } from './ProjectTags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import type { PortfolioItem } from '../types/models';

export interface PortfolioCardProps {
  /**
   * 項目資料對象
   */
  project: PortfolioItem;

  /**
   * 點擊卡片時的回調
   */
  onClick?: (project: PortfolioItem) => void;

  /**
   * 是否在卡片頂部顯示「精選」標籤
   * @default true（當 project.featured 為 true 時）
   */
  showFeaturedBadge?: boolean;

  /**
   * CSS className 附加類名
   */
  className?: string;
}

/**
 * PortfolioCard 組件
 * 顯示單個項目卡片，包含圖片、標題、簡介、技術標籤和操作按鈕
 *
 * 特性:
 * - 響應式設計，適配各種屏幕尺寸
 * - Hover 效果：陰影擴大、圖片縮放
 * - 鍵盤導航支持（Tab 和 Enter）
 * - 「精選」標籤展示
 * - 技術標籤和 GitHub 連結
 * - 無障礙支持
 */
export function PortfolioCard({
  project,
  onClick,
  showFeaturedBadge = true,
  className = '',
}: PortfolioCardProps): ReactElement {
  const handleCardClick = (): void => {
    onClick?.(project);
    if (project.projectUrl) {
      window.open(project.projectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-blue-300 ${className}`}
      role="article"
      aria-label={`項目卡片：${project.title}`}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      {/* 圖片容器 */}
      <div className="relative w-full overflow-hidden bg-gray-100">
        <ProjectImage
          src={project.thumbnail}
          alt={`${project.title} 項目預覽圖片`}
          title={project.title}
          className="transition-transform duration-300 group-hover:scale-110"
          eager={false}
        />

        {/* 精選標籤 */}
        {project.featured && showFeaturedBadge && (
          <div
            className="absolute right-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900 shadow-lg"
            aria-label="精選項目"
          >
            精選
          </div>
        )}

        {/* 覆蓋漸變 (hover 效果) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* 內容區域 */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* 標題 */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>

        {/* 簡介 */}
        <p className="text-sm text-gray-600 line-clamp-2 flex-grow">{project.description}</p>

        {/* 技術標籤 */}
        {project.tags && project.tags.length > 0 && (
          <ProjectTags tags={project.tags} maxTags={3} size="sm" variant="blue" />
        )}
      </div>

      {/* 操作按鈕 */}
      <div className="flex gap-2 border-t border-gray-100 bg-gray-50 p-3">
        {/* 查看項目按鈕 */}
        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`查看 ${project.title} 項目`}
          >
            <span>查看項目</span>
            <FontAwesomeIcon icon={faExternalLinkAlt} className="h-3 w-3" aria-hidden="true" />
          </a>
        )}

        {/* GitHub 連結按鈕 */}
        {project.repositoryUrl && (
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`查看 ${project.title} 的 GitHub 倉庫`}
          >
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        )}
      </div>
    </article>
  );
}
