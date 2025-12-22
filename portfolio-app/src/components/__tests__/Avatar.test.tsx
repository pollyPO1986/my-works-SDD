/**
 * Avatar 組件單元測試
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar } from '../Avatar'

describe('Avatar Component', () => {
  it('應該正確渲染圖片和 alt 文字', () => {
    render(
      <Avatar
        src="/test-avatar.jpg"
        alt="測試用戶"
      />
    )

    const img = screen.getByAltText('測試用戶')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test-avatar.jpg')
  })

  it('應該設置懶加載屬性', () => {
    render(
      <Avatar
        src="/test-avatar.jpg"
        alt="測試用戶"
        lazy={true}
      />
    )

    const img = screen.getByAltText('測試用戶')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('應該設置主動加載（eager）', () => {
    render(
      <Avatar
        src="/test-avatar.jpg"
        alt="測試用戶"
        lazy={false}
      />
    )

    const img = screen.getByAltText('測試用戶')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  it('small 尺寸應該應用正確的 CSS 類', () => {
    render(
      <Avatar
        src="/test-avatar.jpg"
        alt="測試用戶"
        size="small"
      />
    )

    const img = screen.getByAltText('測試用戶')
    expect(img.className).toContain('w-12')
    expect(img.className).toContain('h-12')
  })

  it('medium 尺寸應該應用正確的 CSS 類', () => {
    render(
      <Avatar
        src="/test-avatar.jpg"
        alt="測試用戶"
        size="medium"
      />
    )

    const img = screen.getByAltText('測試用戶')
    expect(img.className).toContain('w-24')
    expect(img.className).toContain('h-24')
  })

  it('large 尺寸應該應用正確的 CSS 類', () => {
    render(
      <Avatar
        src="/test-avatar.jpg"
        alt="測試用戶"
        size="large"
      />
    )

    const img = screen.getByAltText('測試用戶')
    expect(img.className).toContain('w-32')
    expect(img.className).toContain('h-32')
  })

  it('應該應用圓形邊框類名', () => {
    render(
      <Avatar
        src="/test-avatar.jpg"
        alt="測試用戶"
        rounded={true}
      />
    )

    const img = screen.getByAltText('測試用戶')
    expect(img.className).toContain('rounded-full')
  })

  it('應該應用矩形邊框類名', () => {
    render(
      <Avatar
        src="/test-avatar.jpg"
        alt="測試用戶"
        rounded={false}
      />
    )

    const img = screen.getByAltText('測試用戶')
    expect(img.className).toContain('rounded-lg')
  })

  it('應該支持自訂 className', () => {
    render(
      <Avatar
        src="/test-avatar.jpg"
        alt="測試用戶"
        className="custom-class"
      />
    )

    const img = screen.getByAltText('測試用戶')
    expect(img.className).toContain('custom-class')
  })

  it('應該設置 aria-label 無障礙屬性', () => {
    render(
      <Avatar
        src="/test-avatar.jpg"
        alt="測試用戶"
      />
    )

    const img = screen.getByAltText('測試用戶')
    expect(img).toHaveAttribute('aria-label', '測試用戶')
  })
})
