/**
 * ProfileCard 組件
 * 展示個人資料卡，包含頭像、名稱、職稱、簡介、社群連結和 CV 下載按鈕
 *
 * @component
 * @example
 * <ProfileCard profile={personalProfile} />
 */

import type { ReactElement } from 'react'
import { Avatar } from './Avatar'
import { SocialLinks } from './SocialLinks'
import { CVDownloadButton } from './CVDownloadButton'
import type { PersonalProfile } from '../types/models'

export interface ProfileCardProps {
  /**
   * 個人資料對象
   */
  profile: PersonalProfile

  /**
   * 點擊社群連結的回調
   */
  onSocialClick?: (platform: string) => void

  /**
   * 下載 CV 的回調
   */
  onCVDownload?: () => void

  /**
   * CSS className 附加類名
   */
  className?: string
}

/**
 * ProfileCard 組件
 * 顯示個人資料卡，包含頭像、基本信息、社群連結、CV 下載等
 * 響應式設計：mobile 1 列，desktop 3 列（1/3 頭像 + 2/3 文本）
 */
export function ProfileCard({
  profile,
  onSocialClick,
  onCVDownload,
  className = '',
}: ProfileCardProps): ReactElement {
  return (
    <section
      className={`
        card
        p-6 md:p-8
        ${className}
      `}
      id="profile"
      aria-label="個人資料卡"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* 頭像部分 */}
        <div className="flex justify-center md:justify-start">
          <Avatar
            src={profile.avatar}
            alt={profile.name}
            size="large"
            rounded={true}
            className="shadow-lg"
          />
        </div>

        {/* 文本內容部分 */}
        <div className="md:col-span-2 flex flex-col justify-center gap-4">
          {/* 名稱和職稱 */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {profile.name}
            </h1>
            <p className="text-lg md:text-xl text-primary-600 font-medium mb-4">
              {profile.title}
            </p>
          </div>

          {/* 簡介 */}
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-prose">
            {profile.bio}
          </p>

          {/* 社群連結 */}
          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="pt-4">
              <SocialLinks
                links={profile.socialLinks}
                layout="horizontal"
                size="medium"
                onClick={onSocialClick}
                className="flex-wrap"
              />
            </div>
          )}

          {/* CV 下載按鈕 */}
          {profile.cvUrl && profile.cvUrl.trim() !== '' && (
            <div className="pt-4">
              <CVDownloadButton
                cvUrl={profile.cvUrl}
                variant="primary"
                label="下載我的 CV"
                fileName={`${profile.name}-CV-${new Date().getFullYear()}.pdf`}
                onDownload={onCVDownload}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
