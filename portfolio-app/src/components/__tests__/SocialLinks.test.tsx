/**
 * SocialLinks 組件單元測試
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SocialLinks } from '../SocialLinks'
import type { SocialLink } from '../../types/models'

describe('SocialLinks Component', () => {
  const testLinks: SocialLink[] = [
    { platform: 'linkedin', url: 'https://linkedin.com/in/user' },
    { platform: 'github', url: 'https://github.com/user' },
  ]

  it('應該渲染所有傳入的社群連結', () => {
    render(<SocialLinks links={testLinks} />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(testLinks.length)
  })

  it('應該設置正確的 href 和 target="_blank"', () => {
    render(<SocialLinks links={testLinks} />)

    const linkedInLink = screen.getByLabelText(/LinkedIn/)
    expect(linkedInLink).toHaveAttribute('href', testLinks[0].url)
    expect(linkedInLink).toHaveAttribute('target', '_blank')
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('應該設置 aria-label 無障礙屬性', () => {
    render(<SocialLinks links={testLinks} />)

    expect(screen.getByLabelText(/訪問我的 LinkedIn/)).toBeInTheDocument()
    expect(screen.getByLabelText(/訪問我的 GitHub/)).toBeInTheDocument()
  })

  it('水平佈局應該應用正確的 CSS 類', () => {
    const { container } = render(
      <SocialLinks links={testLinks} layout="horizontal" />
    )

    const div = container.querySelector('[role="list"]')
    expect(div?.className).toContain('flex')
    expect(div?.className).toContain('gap-4')
  })

  it('垂直佈局應該應用正確的 CSS 類', () => {
    const { container } = render(
      <SocialLinks links={testLinks} layout="vertical" />
    )

    const div = container.querySelector('[role="list"]')
    expect(div?.className).toContain('flex-col')
    expect(div?.className).toContain('gap-3')
  })

  it('應該在 showLabels 為 true 時顯示標籤文字', () => {
    render(<SocialLinks links={testLinks} showLabels={true} />)

    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('應該在 showLabels 為 false 時不顯示標籤文字', () => {
    render(<SocialLinks links={testLinks} showLabels={false} />)

    expect(screen.queryByText('LinkedIn')).not.toBeInTheDocument()
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
  })

  it('應該正確應用 size 參數的 CSS 類', () => {
    const { container: smallContainer } = render(
      <SocialLinks links={testLinks} size="small" />
    )
    expect(smallContainer.querySelector('a')?.className).toContain('p-1')

    const { container: mediumContainer } = render(
      <SocialLinks links={testLinks} size="medium" />
    )
    expect(mediumContainer.querySelector('a')?.className).toContain('p-2')

    const { container: largeContainer } = render(
      <SocialLinks links={testLinks} size="large" />
    )
    expect(largeContainer.querySelector('a')?.className).toContain('p-3')
  })

  it('應該在點擊連結時調用 onClick 回調', () => {
    const mockOnClick = vi.fn()
    render(<SocialLinks links={testLinks} onClick={mockOnClick} />)

    const linkedInLink = screen.getByLabelText(/訪問我的 LinkedIn/)
    linkedInLink.click()

    expect(mockOnClick).toHaveBeenCalledWith('linkedin')
  })

  it('應該設置 role="list" 和 role="listitem"', () => {
    render(<SocialLinks links={testLinks} />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(testLinks.length)
  })

  it('應該支持自訂 className', () => {
    const { container } = render(
      <SocialLinks links={testLinks} className="custom-class" />
    )

    const div = container.querySelector('[role="list"]')
    expect(div?.className).toContain('custom-class')
  })
})
