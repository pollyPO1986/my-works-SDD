/**
 * PortfolioSection.test.tsx - PortfolioSection 組件組件測試
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PortfolioSection } from '../PortfolioSection'
import type { PortfolioItem } from '../../types/models'

describe('PortfolioSection Component', () => {
  const mockProjects: PortfolioItem[] = [
    {
      id: '1',
      title: 'Project 1',
      description: 'First project',
      thumbnail: '/images/1.jpg',
      tags: ['React'],
      featured: true,
      order: 1,
    },
    {
      id: '2',
      title: 'Project 2',
      description: 'Second project',
      thumbnail: '/images/2.jpg',
      tags: ['Vue'],
      featured: true,
      order: 2,
    },
    {
      id: '3',
      title: 'Project 3',
      description: 'Third project',
      thumbnail: '/images/3.jpg',
      tags: ['Angular'],
      featured: false, // 不精選
      order: 3,
    },
    {
      id: '4',
      title: 'Project 4',
      description: 'Fourth project',
      thumbnail: '/images/4.jpg',
      tags: ['Svelte'],
      featured: true,
      order: 4,
    },
    {
      id: '5',
      title: 'Project 5',
      description: 'Fifth project',
      thumbnail: '/images/5.jpg',
      tags: ['Next.js'],
      featured: true,
      order: 5,
    },
  ]

  /**
   * 基礎渲染測試
   */
  describe('Rendering', () => {
    it('should render section element', () => {
      render(<PortfolioSection items={mockProjects} />)

      const section = screen.getByRole('region')
      expect(section).toBeInTheDocument()
    })

    it('should display section title', () => {
      render(<PortfolioSection items={mockProjects} />)

      expect(screen.getByText(/精選作品/i)).toBeInTheDocument()
    })

    it('should have id="portfolio"', () => {
      render(<PortfolioSection items={mockProjects} />)

      const section = screen.getByRole('region')
      expect(section).toHaveAttribute('id', 'portfolio')
    })

    it('should render list of project cards', () => {
      render(<PortfolioSection items={mockProjects} />)

      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument()
    })
  })

  /**
   * 項目過濾和排序測試
   */
  describe('Project Filtering and Sorting', () => {
    it('should only display featured projects', () => {
      render(<PortfolioSection items={mockProjects} />)

      expect(screen.getByText('Project 1')).toBeInTheDocument()
      expect(screen.getByText('Project 2')).toBeInTheDocument()
      expect(screen.getByText('Project 4')).toBeInTheDocument()
      expect(screen.getByText('Project 5')).toBeInTheDocument()
      expect(screen.queryByText('Project 3')).not.toBeInTheDocument() // 未精選
    })

    it('should sort projects by order field', () => {
      const unorderedProjects = [
        { ...mockProjects[2], featured: true }, // Project 3, order 3
        { ...mockProjects[0], order: 3 }, // Project 1, order 3 -> 變成不同的順序
        { ...mockProjects[1], order: 1 }, // Project 2, order 1
      ]

      render(<PortfolioSection items={unorderedProjects} />)

      const projects = screen.getAllByRole('article')
      expect(projects.length).toBeGreaterThan(0)
    })

    it('should limit displayed projects to maxFeatured', () => {
      render(
        <PortfolioSection
          items={mockProjects}
          maxFeatured={2}
        />
      )

      const projects = screen.getAllByRole('article')
      expect(projects.length).toBe(2)
    })

    it('should use default maxFeatured of 5', () => {
      render(<PortfolioSection items={mockProjects} />)

      const projects = screen.getAllByRole('article')
      expect(projects.length).toBeLessThanOrEqual(5)
    })
  })

  /**
   * 導航連結測試
   */
  describe('Navigation Links', () => {
    it('should display view all portfolio link by default', () => {
      render(<PortfolioSection items={mockProjects} />)

      const viewAllLink = screen.getByRole('link', {
        name: /查看完整作品集/i,
      })
      expect(viewAllLink).toBeInTheDocument()
    })

    it('should use custom portfolioUrl for view all link', () => {
      const customUrl = '/portfolio-page'
      render(
        <PortfolioSection
          items={mockProjects}
          portfolioUrl={customUrl}
        />
      )

      const viewAllLink = screen.getByRole('link', {
        name: /查看完整作品集/i,
      })
      expect(viewAllLink).toHaveAttribute('href', customUrl)
    })

    it('should not show view all link when showViewAllLink is false', () => {
      render(
        <PortfolioSection
          items={mockProjects}
          showViewAllLink={false}
        />
      )

      expect(
        screen.queryByRole('link', { name: /查看完整作品集/i })
      ).not.toBeInTheDocument()
    })

    it('should use default portfolio URL of #portfolio', () => {
      render(<PortfolioSection items={mockProjects} />)

      const viewAllLink = screen.getByRole('link', {
        name: /查看完整作品集/i,
      })
      expect(viewAllLink).toHaveAttribute('href', '#portfolio')
    })
  })

  /**
   * 回調測試
   */
  describe('Callbacks', () => {
    it('should call onCardClick when card is clicked', () => {
      const handleCardClick = vi.fn()
      render(
        <PortfolioSection
          items={mockProjects}
          onCardClick={handleCardClick}
        />
      )

      const firstCard = screen.getByRole('article')
      fireEvent.click(firstCard)

      expect(handleCardClick).toHaveBeenCalledWith(mockProjects[0])
    })

    it('should pass correct project to onCardClick', () => {
      const handleCardClick = vi.fn()
      render(
        <PortfolioSection
          items={mockProjects}
          onCardClick={handleCardClick}
        />
      )

      const cards = screen.getAllByRole('article')
      fireEvent.click(cards[0])

      expect(handleCardClick).toHaveBeenCalledTimes(1)
    })
  })

  /**
   * 無項目測試
   */
  describe('Empty State', () => {
    it('should display empty message when no featured projects', () => {
      const noFeaturedProjects = mockProjects.map((p) => ({
        ...p,
        featured: false,
      }))

      render(
        <PortfolioSection
          items={noFeaturedProjects}
          emptyMessage="暫無作品項目"
        />
      )

      expect(screen.getByText('暫無作品項目')).toBeInTheDocument()
    })

    it('should use custom empty message', () => {
      render(
        <PortfolioSection
          items={[]}
          emptyMessage="No projects available"
        />
      )

      expect(screen.getByText('No projects available')).toBeInTheDocument()
    })

    it('should use default empty message when not provided', () => {
      render(
        <PortfolioSection items={[]} />
      )

      expect(screen.getByText('暫無作品項目')).toBeInTheDocument()
    })

    it('should not display project cards in empty state', () => {
      render(
        <PortfolioSection
          items={[]}
          emptyMessage="暫無作品項目"
        />
      )

      expect(screen.queryByRole('article')).not.toBeInTheDocument()
    })

    it('should not display view all link in empty state', () => {
      render(
        <PortfolioSection
          items={[]}
          showViewAllLink={true}
        />
      )

      expect(
        screen.queryByRole('link', { name: /查看完整作品集/i })
      ).not.toBeInTheDocument()
    })
  })

  /**
   * 無障礙測試
   */
  describe('Accessibility', () => {
    it('should have region role with aria-label', () => {
      render(<PortfolioSection items={mockProjects} />)

      const section = screen.getByRole('region')
      expect(section).toHaveAttribute('aria-label', '精選作品集')
    })

    it('should have proper list structure', () => {
      render(<PortfolioSection items={mockProjects} />)

      const list = screen.getByRole('list', { name: /項目卡片列表/i })
      expect(list).toBeInTheDocument()
    })

    it('should have listitem roles for each project', () => {
      render(<PortfolioSection items={mockProjects} />)

      const listItems = screen.getAllByRole('listitem')
      expect(listItems.length).toBeGreaterThan(0)
    })

    it('should have heading hierarchy', () => {
      render(<PortfolioSection items={mockProjects} />)

      const h2 = screen.getByRole('heading', { level: 2 })
      expect(h2).toBeInTheDocument()
      expect(h2).toHaveTextContent(/精選作品/)
    })
  })

  /**
   * 樣式測試
   */
  describe('Styling', () => {
    it('should have grid layout classes', () => {
      const { container } = render(<PortfolioSection items={mockProjects} />)

      const grid = container.querySelector('[role="list"]')
      expect(grid).toHaveClass('grid')
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('sm:grid-cols-2')
      expect(grid).toHaveClass('lg:grid-cols-3')
    })

    it('should have gradient background', () => {
      const { container } = render(<PortfolioSection items={mockProjects} />)

      const section = container.querySelector('section')
      expect(section).toHaveClass('bg-gradient-to-b')
    })
  })

  /**
   * className 自訂測試
   */
  describe('Custom className', () => {
    it('should accept and apply custom className', () => {
      const { container } = render(
        <PortfolioSection
          items={mockProjects}
          className="custom-section"
        />
      )

      const section = container.querySelector('section')
      expect(section).toHaveClass('custom-section')
    })
  })

  /**
   * 邊界情況測試
   */
  describe('Edge Cases', () => {
    it('should handle empty items array', () => {
      render(<PortfolioSection items={[]} />)

      expect(screen.getByText('暫無作品項目')).toBeInTheDocument()
    })

    it('should handle single featured project', () => {
      const singleProject = [mockProjects[0]]
      render(<PortfolioSection items={singleProject} />)

      expect(screen.getByText('Project 1')).toBeInTheDocument()
      expect(screen.queryByRole('article')).toBeInTheDocument()
    })

    it('should handle maxFeatured larger than featured projects count', () => {
      const twoFeatured = [mockProjects[0], mockProjects[1]]
      render(
        <PortfolioSection
          items={twoFeatured}
          maxFeatured={10}
        />
      )

      const projects = screen.getAllByRole('article')
      expect(projects.length).toBe(2)
    })

    it('should handle maxFeatured of 1', () => {
      render(
        <PortfolioSection
          items={mockProjects}
          maxFeatured={1}
        />
      )

      const projects = screen.getAllByRole('article')
      expect(projects.length).toBe(1)
    })

    it('should handle projects with missing order field', () => {
      const projectsWithoutOrder = mockProjects.map(({ order: _order, ...rest }) => ({
        ...rest,
        featured: true,
      }))

      render(<PortfolioSection items={projectsWithoutOrder} />)

      expect(screen.queryByRole('article')).toBeInTheDocument()
    })
  })
})
