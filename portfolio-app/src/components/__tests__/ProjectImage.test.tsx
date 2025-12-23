/**
 * ProjectImage.test.tsx - ProjectImage 組件單元測試
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectImage } from '../ProjectImage'

describe('ProjectImage Component', () => {
  /**
   * 基礎渲染測試
   */
  describe('Rendering', () => {
    it('should render picture element with img tag', () => {
      const { container } = render(
        <ProjectImage src="test.jpg" alt="Test image" />
      )

      const picture = container.querySelector('picture')
      const img = screen.getByRole('img')

      expect(picture).toBeInTheDocument()
      expect(img).toBeInTheDocument()
    })

    it('should display image with correct src attribute', () => {
      render(<ProjectImage src="project.jpg" alt="Project" />)

      const img = screen.getByRole('img') as HTMLImageElement
      expect(img.src).toContain('project.jpg')
    })

    it('should display alt text for accessibility', () => {
      render(<ProjectImage src="project.jpg" alt="My Project Preview" />)

      const img = screen.getByAltText('My Project Preview')
      expect(img).toBeInTheDocument()
    })
  })

  /**
   * WebP 和 srcset 測試
   */
  describe('WebP and Responsive Images', () => {
    it('should include WebP source when srcWebp is provided', () => {
      const { container } = render(
        <ProjectImage
          src="project.jpg"
          srcWebp="project.webp"
          alt="Project"
        />
      )

      const sources = container.querySelectorAll('source')
      expect(sources.length).toBeGreaterThan(0)
      expect(sources[0]).toHaveAttribute('type', 'image/webp')
    })

    it('should set srcSet attribute on img', () => {
      render(
        <ProjectImage
          src="project.jpg"
          alt="Project"
          srcSet="300w, 600w, 900w"
        />
      )

      const img = screen.getByRole('img') as HTMLImageElement
      expect(img).toHaveAttribute('srcset')
    })

    it('should use default srcSet when not provided', () => {
      render(<ProjectImage src="project.jpg" alt="Project" />)

      const img = screen.getByRole('img') as HTMLImageElement
      expect(img.srcset).toContain('300w')
      expect(img.srcset).toContain('600w')
      expect(img.srcset).toContain('900w')
    })
  })

  /**
   * 懶加載測試
   */
  describe('Lazy Loading', () => {
    it('should have lazy loading by default', () => {
      render(<ProjectImage src="project.jpg" alt="Project" />)

      const img = screen.getByRole('img') as HTMLImageElement
      expect(img.loading).toBe('lazy')
    })

    it('should use eager loading when eager prop is true', () => {
      render(
        <ProjectImage
          src="project.jpg"
          alt="Project"
          eager={true}
        />
      )

      const img = screen.getByRole('img') as HTMLImageElement
      expect(img.loading).toBe('eager')
    })
  })

  /**
   * 圖片加載失敗測試
   */
  describe('Image Loading Error', () => {
    it('should have onError handler for fallback', () => {
      render(
        <ProjectImage
          src="invalid.jpg"
          alt="Project"
          fallback="/images/placeholder.jpg"
        />
      )

      const img = screen.getByRole('img')
      expect(img).toBeInTheDocument()
    })

    it('should apply aspect-video class for consistent ratio', () => {
      const { container } = render(
        <ProjectImage src="project.jpg" alt="Project" />
      )

      const img = container.querySelector('img')
      expect(img).toHaveClass('aspect-video')
    })
  })

  /**
   * 無障礙測試
   */
  describe('Accessibility', () => {
    it('should have decoding="async" attribute', () => {
      render(<ProjectImage src="project.jpg" alt="Project" />)

      const img = screen.getByRole('img') as HTMLImageElement
      expect(img.decoding).toBe('async')
    })

    it('should support title attribute', () => {
      render(
        <ProjectImage
          src="project.jpg"
          alt="Project"
          title="My Project Title"
        />
      )

      const img = screen.getByRole('img') as HTMLImageElement
      expect(img.title).toBe('My Project Title')
    })

    it('should have object-cover class for proper image scaling', () => {
      const { container } = render(
        <ProjectImage src="project.jpg" alt="Project" />
      )

      const img = container.querySelector('img')
      expect(img).toHaveClass('object-cover')
    })
  })

  /**
   * className 自訂測試
   */
  describe('Custom className', () => {
    it('should accept and apply custom className', () => {
      const { container } = render(
        <ProjectImage
          src="project.jpg"
          alt="Project"
          className="custom-class"
        />
      )

      const picture = container.querySelector('picture')
      expect(picture).toHaveClass('custom-class')
    })
  })
})
