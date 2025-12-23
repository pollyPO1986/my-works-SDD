/**
 * ProjectTags.test.tsx - ProjectTags 組件單元測試
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectTags } from '../ProjectTags'

describe('ProjectTags Component', () => {
  const mockTags = ['React', 'TypeScript', 'Tailwind', 'Vite', 'Jest']

  /**
   * 基礎渲染測試
   */
  describe('Rendering', () => {
    it('should render list element', () => {
      render(<ProjectTags tags={mockTags} />)

      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument()
      expect(list).toHaveAttribute('aria-label', '項目技術標籤')
    })

    it('should render all tags when below maxTags', () => {
      render(<ProjectTags tags={mockTags.slice(0, 3)} maxTags={4} />)

      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Tailwind')).toBeInTheDocument()
    })

    it('should render tags as list items', () => {
      render(<ProjectTags tags={['React']} />)

      const listItems = screen.getAllByRole('listitem')
      expect(listItems.length).toBeGreaterThan(0)
    })

    it('should display each tag as a span element', () => {
      const { container } = render(<ProjectTags tags={['React', 'TypeScript']} />)

      const spans = container.querySelectorAll('span')
      expect(spans.length).toBeGreaterThanOrEqual(2)
    })
  })

  /**
   * maxTags 限制測試
   */
  describe('maxTags Limit', () => {
    it('should limit displayed tags to maxTags', () => {
      render(<ProjectTags tags={mockTags} maxTags={3} />)

      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Tailwind')).toBeInTheDocument()
      expect(screen.queryByText('Vite')).not.toBeInTheDocument()
    })

    it('should show default maxTags of 4', () => {
      render(<ProjectTags tags={mockTags} />)

      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Tailwind')).toBeInTheDocument()
      expect(screen.getByText('Vite')).toBeInTheDocument()
      expect(screen.queryByText('Jest')).not.toBeInTheDocument()
    })

    it('should calculate correct remaining count', () => {
      render(<ProjectTags tags={mockTags} maxTags={3} />)

      expect(screen.getByText('+2')).toBeInTheDocument()
    })

    it('should not show +N when all tags are within maxTags', () => {
      render(<ProjectTags tags={['React', 'TypeScript']} maxTags={3} />)

      expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument()
    })

    it('should not show +0', () => {
      render(<ProjectTags tags={['React']} maxTags={3} />)

      expect(screen.queryByText('+0')).not.toBeInTheDocument()
    })
  })

  /**
   * 樣式變體測試
   */
  describe('Style Variants', () => {
    it('should apply default blue variant classes', () => {
      const { container } = render(<ProjectTags tags={['React']} />)

      const tag = container.querySelector('span')
      expect(tag).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    it('should apply purple variant when specified', () => {
      const { container } = render(
        <ProjectTags tags={['React']} variant="purple" />
      )

      const tag = container.querySelector('span')
      expect(tag).toHaveClass('bg-purple-100', 'text-purple-800')
    })

    it('should apply green variant when specified', () => {
      const { container } = render(
        <ProjectTags tags={['React']} variant="green" />
      )

      const tag = container.querySelector('span')
      expect(tag).toHaveClass('bg-green-100', 'text-green-800')
    })

    it('should apply orange variant when specified', () => {
      const { container } = render(
        <ProjectTags tags={['React']} variant="orange" />
      )

      const tag = container.querySelector('span')
      expect(tag).toHaveClass('bg-orange-100', 'text-orange-800')
    })
  })

  /**
   * 尺寸測試
   */
  describe('Size Variants', () => {
    it('should apply small size classes', () => {
      const { container } = render(
        <ProjectTags tags={['React']} size="sm" />
      )

      const tag = container.querySelector('span')
      expect(tag).toHaveClass('px-2', 'py-1', 'text-xs')
    })

    it('should apply medium size classes by default', () => {
      const { container } = render(<ProjectTags tags={['React']} />)

      const tag = container.querySelector('span')
      expect(tag).toHaveClass('px-3', 'py-1.5', 'text-sm')
    })

    it('should apply large size classes', () => {
      const { container } = render(
        <ProjectTags tags={['React']} size="lg" />
      )

      const tag = container.querySelector('span')
      expect(tag).toHaveClass('px-4', 'py-2', 'text-base')
    })
  })

  /**
   * 無障礙測試
   */
  describe('Accessibility', () => {
    it('should have aria-label on list', () => {
      render(<ProjectTags tags={['React']} />)

      const list = screen.getByRole('list')
      expect(list).toHaveAttribute('aria-label')
    })

    it('should have aria-label on each list item', () => {
      render(<ProjectTags tags={['React']} />)

      const listItem = screen.getByRole('listitem')
      expect(listItem).toHaveAttribute('aria-label')
    })

    it('should have aria-label on +N indicator', () => {
      render(<ProjectTags tags={mockTags} maxTags={2} />)

      const plusIndicator = screen.getByRole('listitem', {
        name: /還有 \d+ 個標籤/,
      })
      expect(plusIndicator).toBeInTheDocument()
    })

    it('should have title attribute on +N for full tag list', () => {
      const { container } = render(
        <ProjectTags tags={mockTags} maxTags={3} />
      )

      const plusTag = Array.from(container.querySelectorAll('span')).find(
        (el) => el.textContent === '+2'
      )
      expect(plusTag).toHaveAttribute('title')
    })
  })

  /**
   * 邊界情況測試
   */
  describe('Edge Cases', () => {
    it('should handle empty tags array', () => {
      const { container } = render(<ProjectTags tags={[]} />)

      const list = container.querySelector('[role="list"]')
      expect(list).toBeInTheDocument()
      // 列表應該存在，但沒有子項
      expect(list?.children.length).toBe(0)
    })

    it('should handle single tag', () => {
      render(<ProjectTags tags={['React']} />)

      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument()
    })

    it('should handle maxTags equal to tags length', () => {
      const tags = ['React', 'TypeScript', 'Tailwind']
      render(<ProjectTags tags={tags} maxTags={3} />)

      tags.forEach((tag) => {
        expect(screen.getByText(tag)).toBeInTheDocument()
      })
      expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument()
    })

    it('should handle maxTags of 0', () => {
      render(<ProjectTags tags={mockTags} maxTags={0} />)

      expect(screen.getByText('+5')).toBeInTheDocument()
    })

    it('should handle very large number of tags', () => {
      const manyTags = Array.from({ length: 20 }, (_, i) => `Tag${i + 1}`)
      render(<ProjectTags tags={manyTags} maxTags={4} />)

      expect(screen.getByText('+16')).toBeInTheDocument()
    })
  })

  /**
   * className 自訂測試
   */
  describe('Custom className', () => {
    it('should accept and apply custom className', () => {
      const { container } = render(
        <ProjectTags tags={['React']} className="custom-class" />
      )

      const list = container.querySelector('[role="list"]')
      expect(list).toHaveClass('custom-class')
    })
  })
})
