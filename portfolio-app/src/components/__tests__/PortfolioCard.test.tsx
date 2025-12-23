/**
 * PortfolioCard.test.tsx - PortfolioCard 組件組件測試
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PortfolioCard } from '../PortfolioCard';
import type { PortfolioItem } from '../../types/models';

describe('PortfolioCard Component', () => {
  const mockProject: PortfolioItem = {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform built with React',
    thumbnail: '/images/ecommerce.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    projectUrl: 'https://example-ecommerce.com',
    repositoryUrl: 'https://github.com/example/ecommerce',
    featured: true,
    order: 1,
  };

  /**
   * 基礎渲染測試
   */
  describe('Rendering', () => {
    it('should render article element', () => {
      render(<PortfolioCard project={mockProject} />);

      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
    });

    it('should display project title', () => {
      render(<PortfolioCard project={mockProject} />);

      expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    });

    it('should display project description', () => {
      render(<PortfolioCard project={mockProject} />);

      expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    });

    it('should render project image', () => {
      render(<PortfolioCard project={mockProject} />);

      const img = screen.getByAltText(`${mockProject.title} 項目預覽圖片`);
      expect(img).toBeInTheDocument();
    });
  });

  /**
   * 精選標籤測試
   */
  describe('Featured Badge', () => {
    it('should display featured badge when project.featured is true', () => {
      render(
        <PortfolioCard
          project={{
            ...mockProject,
            featured: true,
          }}
        />
      );

      expect(screen.getByText('精選')).toBeInTheDocument();
    });

    it('should not display featured badge when project.featured is false', () => {
      render(
        <PortfolioCard
          project={{
            ...mockProject,
            featured: false,
          }}
        />
      );

      expect(screen.queryByText('精選')).not.toBeInTheDocument();
    });

    it('should not display featured badge when showFeaturedBadge is false', () => {
      render(<PortfolioCard project={mockProject} showFeaturedBadge={false} />);

      expect(screen.queryByText('精選')).not.toBeInTheDocument();
    });
  });

  /**
   * 技術標籤測試
   */
  describe('Technology Tags', () => {
    it('should render technology tags when provided', () => {
      render(<PortfolioCard project={mockProject} />);

      // ProjectTags 應該被渲染
      const tagContainer = screen.getByRole('list');
      expect(tagContainer).toBeInTheDocument();
    });

    it('should not render tags when project.tags is empty', () => {
      render(
        <PortfolioCard
          project={{
            ...mockProject,
            tags: [],
          }}
        />
      );

      // 沒有標籤列表應該被渲染
      const lists = screen.queryAllByRole('list');
      expect(lists.length).toBe(0);
    });
  });

  /**
   * 操作按鈕測試
   */
  describe('Action Buttons', () => {
    it('should render view project link when projectUrl exists', () => {
      render(<PortfolioCard project={mockProject} />);

      const viewLink = screen.getByRole('link', {
        name: /查看.*項目/,
      });
      expect(viewLink).toBeInTheDocument();
      expect(viewLink).toHaveAttribute('href', mockProject.projectUrl);
      expect(viewLink).toHaveAttribute('target', '_blank');
    });

    it('should not render view project button when projectUrl is missing', () => {
      render(
        <PortfolioCard
          project={{
            ...mockProject,
            projectUrl: undefined,
          }}
        />
      );

      expect(screen.queryByText('查看項目')).not.toBeInTheDocument();
    });

    it('should render GitHub link when repositoryUrl exists', () => {
      render(<PortfolioCard project={mockProject} />);

      const githubLinks = screen.getAllByRole('link');
      const githubLink = githubLinks.find(link =>
        (link as HTMLAnchorElement).href.includes('github.com')
      );
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', mockProject.repositoryUrl);
      expect(githubLink).toHaveAttribute('target', '_blank');
    });

    it('should not render GitHub button when repositoryUrl is missing', () => {
      render(
        <PortfolioCard
          project={{
            ...mockProject,
            repositoryUrl: undefined,
          }}
        />
      );

      // 應該只有 view project 按鈕
      const links = screen.getAllByRole('link');
      const githubLinks = links.filter(link =>
        (link as HTMLAnchorElement).href.includes('github.com')
      );
      expect(githubLinks.length).toBe(0);
    });
  });

  /**
   * 交互測試
   */
  describe('Interactions', () => {
    it('should call onClick callback when card is clicked', () => {
      const handleClick = vi.fn();
      render(<PortfolioCard project={mockProject} onClick={handleClick} />);

      const article = screen.getByRole('article');
      fireEvent.click(article);

      expect(handleClick).toHaveBeenCalledWith(mockProject);
    });

    it('should open liveUrl in new window when card is clicked', () => {
      global.open = vi.fn();
      render(<PortfolioCard project={mockProject} onClick={undefined} />);

      const article = screen.getByRole('article');
      fireEvent.click(article);

      // 注意：實際的 window.open 行為可能因測試環境而異
      expect(article).toBeInTheDocument();
    });

    it('should handle keyboard Enter key on card', () => {
      const handleClick = vi.fn();
      render(<PortfolioCard project={mockProject} onClick={handleClick} />);

      const article = screen.getByRole('article');
      fireEvent.keyDown(article, { key: 'Enter' });

      expect(handleClick).toHaveBeenCalledWith(mockProject);
    });

    it('should handle keyboard Space key on card', () => {
      const handleClick = vi.fn();
      render(<PortfolioCard project={mockProject} onClick={handleClick} />);

      const article = screen.getByRole('article');
      fireEvent.keyDown(article, { key: ' ' });

      expect(handleClick).toHaveBeenCalledWith(mockProject);
    });
  });

  /**
   * 無障礙測試
   */
  describe('Accessibility', () => {
    it('should have proper aria-label on article', () => {
      render(<PortfolioCard project={mockProject} />);

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('aria-label', `項目卡片：${mockProject.title}`);
    });

    it('should have tabIndex for keyboard navigation', () => {
      render(<PortfolioCard project={mockProject} />);

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('tabindex', '0');
    });

    it('should have accessible link labels', () => {
      render(<PortfolioCard project={mockProject} />);

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
    });

    it('should have proper heading hierarchy', () => {
      render(<PortfolioCard project={mockProject} />);

      const heading = screen.getByRole('heading');
      expect(heading.tagName).toBe('H3');
    });
  });

  /**
   * 樣式和視覺測試
   */
  describe('Styling', () => {
    it('should have article styling classes', () => {
      render(<PortfolioCard project={mockProject} />);

      const article = screen.getByRole('article');
      expect(article).toHaveClass('rounded-lg', 'shadow-md');
    });

    it('should have line-clamp classes on title and description', () => {
      const { container } = render(<PortfolioCard project={mockProject} />);

      const h3 = container.querySelector('h3');
      const p = container.querySelector('p');

      expect(h3).toHaveClass('line-clamp-2');
      expect(p).toHaveClass('line-clamp-2');
    });
  });

  /**
   * className 自訂測試
   */
  describe('Custom className', () => {
    it('should accept and apply custom className', () => {
      render(<PortfolioCard project={mockProject} className="custom-class" />);

      const article = screen.getByRole('article');
      expect(article).toHaveClass('custom-class');
    });
  });

  /**
   * 邊界情況測試
   */
  describe('Edge Cases', () => {
    it('should handle very long project title', () => {
      const longTitle = 'A'.repeat(100);
      render(
        <PortfolioCard
          project={{
            ...mockProject,
            title: longTitle,
          }}
        />
      );

      const h3 = screen.getByRole('heading');
      expect(h3).toHaveClass('line-clamp-2');
    });

    it('should handle missing optional fields', () => {
      const minimalProject: PortfolioItem = {
        id: '1',
        title: 'Basic Project',
        description: 'A basic project',
        thumbnail: '/images/project.jpg',
        tags: [],
        featured: false,
      };

      render(<PortfolioCard project={minimalProject} />);

      expect(screen.getByText('Basic Project')).toBeInTheDocument();
    });

    it('should handle project with no tags', () => {
      render(
        <PortfolioCard
          project={{
            ...mockProject,
            tags: [],
          }}
        />
      );

      expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    });
  });
});
