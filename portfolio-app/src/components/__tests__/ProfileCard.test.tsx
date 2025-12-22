/**
 * ProfileCard 組件測試
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProfileCard } from '../ProfileCard'
import type { PersonalProfile } from '../../types/models'

describe('ProfileCard Component', () => {
  const testProfile: PersonalProfile = {
    name: '李昱琨',
    title: '前端工程師',
    bio: '熱情的 React 開發者',
    avatar: '/avatar.jpg',
    cvUrl: '/cv/cv.pdf',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/test' },
      { platform: 'github', url: 'https://github.com/test' },
    ],
    locale: 'zh-TW',
  }

  it('應該正確顯示個人名稱', () => {
    render(<ProfileCard profile={testProfile} />)
    expect(screen.getByText(testProfile.name)).toBeInTheDocument()
  })

  it('應該正確顯示職稱', () => {
    render(<ProfileCard profile={testProfile} />)
    expect(screen.getByText(testProfile.title)).toBeInTheDocument()
  })

  it('應該正確顯示簡介', () => {
    render(<ProfileCard profile={testProfile} />)
    expect(screen.getByText(testProfile.bio)).toBeInTheDocument()
  })

  it('應該顯示所有社群連結', () => {
    render(<ProfileCard profile={testProfile} />)

    expect(screen.getByLabelText(/訪問我的 LinkedIn/)).toBeInTheDocument()
    expect(screen.getByLabelText(/訪問我的 GitHub/)).toBeInTheDocument()
  })

  it('CV 下載按鈕應該存在且可點擊', () => {
    render(<ProfileCard profile={testProfile} />)

    const cvButton = screen.getByRole('link', { name: /下載我的 CV/ })
    expect(cvButton).toBeInTheDocument()
    expect(cvButton).toHaveAttribute('href', testProfile.cvUrl)
  })

  it('頭像應該正確渲染', () => {
    render(<ProfileCard profile={testProfile} />)

    const avatar = screen.getByAltText(testProfile.name)
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', testProfile.avatar)
  })

  it('應該在沒有社群連結時不顯示社群連結區域', () => {
    const profileNoSocial: PersonalProfile = {
      ...testProfile,
      socialLinks: [],
    }

    render(<ProfileCard profile={profileNoSocial} />)

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('應該在沒有 CV URL 時不顯示下載按鈕', () => {
    const profileNoCV: PersonalProfile = {
      ...testProfile,
      cvUrl: '',
    }

    render(<ProfileCard profile={profileNoCV} />)

    expect(screen.queryByRole('link', { name: /下載/ })).not.toBeInTheDocument()
  })

  it('應該在點擊社群連結時調用 onSocialClick 回調', () => {
    const mockOnSocialClick = vi.fn()
    render(
      <ProfileCard
        profile={testProfile}
        onSocialClick={mockOnSocialClick}
      />
    )

    const linkedinLink = screen.getByLabelText(/訪問我的 LinkedIn/)
    linkedinLink.click()

    expect(mockOnSocialClick).toHaveBeenCalledWith('linkedin')
  })

  it('應該在點擊 CV 下載時調用 onCVDownload 回調', () => {
    const mockOnCVDownload = vi.fn()
    render(
      <ProfileCard
        profile={testProfile}
        onCVDownload={mockOnCVDownload}
      />
    )

    const cvButton = screen.getByRole('link', { name: /下載/ })
    cvButton.click()

    expect(mockOnCVDownload).toHaveBeenCalled()
  })

  it('應該有正確的 section id 用於導航', () => {
    const { container } = render(<ProfileCard profile={testProfile} />)

    const section = container.querySelector('section')
    expect(section).toHaveAttribute('id', 'profile')
  })

  it('應該設置 aria-label 用於無障礙', () => {
    render(<ProfileCard profile={testProfile} />)

    expect(screen.getByLabelText('個人資料卡')).toBeInTheDocument()
  })

  it('應該支持自訂 className', () => {
    const { container } = render(
      <ProfileCard profile={testProfile} className="custom-class" />
    )

    const section = container.querySelector('section')
    expect(section?.className).toContain('custom-class')
  })
})
