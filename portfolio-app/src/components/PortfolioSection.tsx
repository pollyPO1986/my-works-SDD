/**
 * PortfolioSection 組件
 * 精選作品集展示區，包含多個項目卡片和查看完整作品集連結
 *
 * @component
 * @example
 * <PortfolioSection
 *   items={portfolioItems}
 *   maxFeatured={5}
 * />
 */

import type { ReactElement } from 'react';
import { PortfolioCard } from './PortfolioCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import type { PortfolioItem } from '../types/models';

export interface PortfolioSectionProps {
  /**
   * 項目列表
   */
  items: PortfolioItem[];

  /**
   * 最多顯示的精選項目數量
   * @default 5
   */
  maxFeatured?: number;

  /**
   * 點擊項目卡片時的回調
   */
  onCardClick?: (item: PortfolioItem) => void;

  /**
   * 查看完整作品集的連結 URL
   */
  portfolioUrl?: string;

  /**
   * 是否顯示「查看完整作品集」連結
   * @default true
   */
  showViewAllLink?: boolean;

  /**
   * 無項目時的提示信息
   * @default '暫無作品項目'
   */
  emptyMessage?: string;

  /**
   * CSS className 附加類名
   */
  className?: string;
}

/**
 * PortfolioSection 組件
 * 顯示精選作品集，支持響應式網格佈局和查看完整作品集導航
 *
 * 特性:
 * - 過濾並顯示 featured: true 的項目
 * - 按 order 欄位排序
 * - 最多顯示 maxFeatured 個項目
 * - 響應式網格：mobile 1 列、tablet 2 列、desktop 3 列
 * - 提供「查看完整作品集」導航連結
 * - 無項目時顯示 fallback 消息
 * - 無障礙支持
 */
export function PortfolioSection({
  items,
  maxFeatured = 5,
  onCardClick,
  portfolioUrl = '#portfolio',
  showViewAllLink = true,
  emptyMessage = '暫無作品項目',
  className = '',
}: PortfolioSectionProps): ReactElement {
  // 過濾並排序項目：只顯示 featured: true，按 order 排序
  const featuredItems = items
    .filter(item => item.featured === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, maxFeatured);

  return (
    <section
      className={`w-full bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      id="portfolio"
      role="region"
      aria-label="精選作品集"
    >
      <div className="mx-auto max-w-6xl">
        {/* 標題 */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">精選作品</h2>
          <p className="text-lg text-gray-600">展示我最近完成的優秀項目案例</p>
        </div>

        {/* 項目網格 */}
        {featuredItems.length > 0 ? (
          <>
            <div
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
              aria-label="項目卡片列表"
            >
              {featuredItems.map(item => (
                <div key={item.id} role="listitem">
                  <PortfolioCard project={item} onClick={onCardClick} showFeaturedBadge={true} />
                </div>
              ))}
            </div>

            {/* 查看完整作品集連結 */}
            {showViewAllLink && (
              <div className="mt-12 text-center">
                <a
                  href={portfolioUrl}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="查看完整作品集"
                >
                  <span>查看完整作品集</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            )}
          </>
        ) : (
          // 無項目時的 fallback
          <div
            className="rounded-lg border border-dashed border-gray-300 bg-gray-50 py-12 text-center"
            role="status"
            aria-label="暫無項目"
          >
            <p className="text-lg text-gray-500">{emptyMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}
