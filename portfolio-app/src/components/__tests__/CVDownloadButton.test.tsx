/**
 * CVDownloadButton 組件單元測試
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CVDownloadButton } from '../CVDownloadButton'

describe('CVDownloadButton Component', () => {
  const testCVUrl = '/cv/test-cv.pdf'
  const testFileName = 'Test-CV-2025.pdf'

  it('應該正確渲染按鈕文本', () => {
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
        label="下載 CV"
      />
    )

    expect(screen.getByText('下載 CV')).toBeInTheDocument()
  })

  it('應該設置正確的 href 和 download 屬性', () => {
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
        fileName={testFileName}
      />
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', testCVUrl)
    expect(link).toHaveAttribute('download', testFileName)
  })

  it('應該設置 aria-label 無障礙屬性', () => {
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
        fileName={testFileName}
      />
    )

    expect(screen.getByLabelText(/下載我的 CV/)).toBeInTheDocument()
  })

  it('primary 變體應該應用正確的 CSS 類', () => {
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
        variant="primary"
      />
    )

    const link = screen.getByRole('link')
    expect(link.className).toContain('bg-primary-600')
    expect(link.className).toContain('text-white')
  })

  it('secondary 變體應該應用正確的 CSS 類', () => {
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
        variant="secondary"
      />
    )

    const link = screen.getByRole('link')
    expect(link.className).toContain('bg-slate-200')
    expect(link.className).toContain('text-slate-900')
  })

  it('outline 變體應該應用正確的 CSS 類', () => {
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
        variant="outline"
      />
    )

    const link = screen.getByRole('link')
    expect(link.className).toContain('border-2')
    expect(link.className).toContain('border-primary-600')
    expect(link.className).toContain('text-primary-600')
  })

  it('應該在點擊時調用 onDownload 回調', () => {
    const mockOnDownload = vi.fn()
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
        onDownload={mockOnDownload}
      />
    )

    const link = screen.getByRole('link')
    link.click()

    expect(mockOnDownload).toHaveBeenCalled()
  })

  it('應該使用自訂 label', () => {
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
        label="取得簡歷"
      />
    )

    expect(screen.getByText('取得簡歷')).toBeInTheDocument()
  })

  it('應該使用自訂 fileName', () => {
    const customFileName = 'my-resume.pdf'
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
        fileName={customFileName}
      />
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('download', customFileName)
  })

  it('應該支持自訂 className', () => {
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
        className="custom-class"
      />
    )

    const link = screen.getByRole('link')
    expect(link.className).toContain('custom-class')
  })

  it('應該設置 role="link"', () => {
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
      />
    )

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })

  it('應該有焦點可視化樣式', () => {
    render(
      <CVDownloadButton
        cvUrl={testCVUrl}
      />
    )

    const link = screen.getByRole('link')
    expect(link.className).toContain('focus:outline')
  })
})
