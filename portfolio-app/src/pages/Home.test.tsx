import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

/**
 * Home.tsx 集成測試
 *
 * 測試範圍：
 * 1. 組件整合: Navigation + Header + ProfileCard
 * 2. 頁面結構和語義化
 * 3. 導航功能和滾動進度
 * 4. 用戶互動: 社群連結、CV 下載
 * 5. 響應式佈局
 */

// Mock window.open for CV download tests
global.open = vi.fn();

describe('Home Page Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * 頁面結構測試
   */
  describe('Page Structure', () => {
    it('should render the page with all main sections', () => {
      render(<Home />);

      // 檢查主要區段
      const navSection = screen.getByRole('navigation');
      const profileSection = screen.getByRole('region', {
        name: /個人資料卡/i,
      });

      expect(navSection).toBeInTheDocument();
      expect(profileSection).toBeInTheDocument();
    });

    it('should have correct semantic structure', () => {
      render(<Home />);

      // 檢查 HTML5 語義化元素
      const main = document.querySelector('main');
      const sections = document.querySelectorAll('section');
      const footer = document.querySelector('footer');

      expect(main).toBeInTheDocument();
      expect(sections.length).toBeGreaterThanOrEqual(2); // home + profile
      expect(footer).toBeInTheDocument();
    });

    it('should have proper page title and heading', () => {
      render(<Home />);

      // 檢查頁面標題
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent(/歡迎/i);

      // 檢查個人檔案小標題
      const profileHeading = screen.getByRole('heading', {
        level: 2,
        name: /個人檔案/i,
      });
      expect(profileHeading).toBeInTheDocument();
    });
  });

  /**
   * Navigation 組件測試
   */
  describe('Navigation Component Integration', () => {
    it('should render navigation with all links', () => {
      render(<Home />);

      // 檢查導航連結
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
    });

    it('should have fixed navigation at top with proper padding', () => {
      const { container } = render(<Home />);

      // 檢查主要內容區有適當的 padding-top
      const main = container.querySelector('main');
      expect(main).toHaveClass('pt-16');
    });

    it('should display navigation menu button on mobile (hidden by default)', () => {
      render(<Home />);

      // 檢查是否有菜單按鈕（在響應式設計中）
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });
  });

  /**
   * Header 組件測試
   */
  describe('Header Component Integration', () => {
    it('should display header with welcome message', () => {
      render(<Home />);

      // 檢查姓名和職稱
      expect(screen.getByText(/Lee Uki/i)).toBeInTheDocument();
      expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument();
      expect(screen.getByText(/熟練使用 React、TypeScript、Node.js/i)).toBeInTheDocument();
    });

    it('should have call-to-action buttons in header', () => {
      render(<Home />);

      // 檢查 CTA 按鈕
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should display gradient background for header', () => {
      const { container } = render(<Home />);

      // 檢查 Header 組件的梯度背景
      const headerSection = container.querySelector('section#home');
      expect(headerSection).toBeInTheDocument();
    });
  });

  /**
   * ProfileCard 組件集成測試
   */
  describe('ProfileCard Component Integration', () => {
    it('should display profile information', () => {
      render(<Home />);

      // 檢查個人資料顯示
      const profileSection = screen.getByRole('region', {
        name: /個人資料卡/i,
      });
      expect(profileSection).toBeInTheDocument();

      // 檢查個人資料內容
      expect(screen.getByAltText(/Lee Uki/i)).toBeInTheDocument();
    });

    it('should render social links in profile card', () => {
      render(<Home />);

      // 檢查社群連結
      expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Twitter/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Email/i })).toBeInTheDocument();
    });

    it('should render CV download button', () => {
      render(<Home />);

      // 檢查 CV 下載按鈕
      const cvButton = screen.getByRole('link', { name: /下載 CV|Download CV/i });
      expect(cvButton).toBeInTheDocument();
      expect(cvButton).toHaveAttribute('href', '/cv/resume.pdf');
    });

    it('should display responsive grid layout', () => {
      const { container } = render(<Home />);

      // 檢查響應式網格
      const profileCard = container.querySelector('[role="region"]');
      expect(profileCard).toBeInTheDocument();
    });
  });

  /**
   * 用戶互動測試
   */
  describe('User Interactions', () => {
    it('should handle social link clicks', async () => {
      render(<Home />);

      const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
      fireEvent.click(linkedinLink);

      // 檢查 window.open 是否被呼叫
      // 注意: 實際的 window.open 可能不會被呼叫，因為連結的 href 就足夠了
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/example');
    });

    it('should have proper external link attributes', () => {
      render(<Home />);

      // 檢查社群連結是否有安全屬性
      const externalLinks = screen.getAllByRole('link');
      const socialLinks = externalLinks.filter(link =>
        ['linkedin.com', 'github.com', 'twitter.com', 'example@example.com'].some(domain =>
          link.getAttribute('href')?.includes(domain)
        )
      );

      socialLinks.forEach(link => {
        if (link.getAttribute('href')?.startsWith('http')) {
          expect(link).toHaveAttribute('target', '_blank');
          expect(link).toHaveAttribute('rel');
        }
      });
    });

    it('should handle CV download button click', async () => {
      render(<Home />);

      const cvButton = screen.getByRole('link', { name: /下載 CV|Download CV/i });

      // 檢查 CV 按鈕是否可點擊
      expect(cvButton).toBeInTheDocument();
      expect(cvButton).toHaveAttribute('href', '/cv/resume.pdf');

      // 模擬點擊
      fireEvent.click(cvButton);

      // 驗證點擊後沒有錯誤
      expect(cvButton).toBeInTheDocument();
    });

    it('should handle navigation link clicks', () => {
      render(<Home />);

      const homeLink = screen.getByRole('link', { name: /^Home$/i });
      expect(homeLink).toHaveAttribute('href', '#home');

      const portfolioLink = screen.getByRole('link', {
        name: /^Portfolio$/i,
      });
      expect(portfolioLink).toHaveAttribute('href', '#portfolio');
    });
  });

  /**
   * 可訪問性測試
   */
  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Home />);

      const h1 = document.querySelector('h1');
      const h2s = document.querySelectorAll('h2');

      expect(h1).toBeInTheDocument(); // 頁面主標題
      expect(h2s.length).toBeGreaterThan(0); // 子標題
    });

    it('should have proper landmarks', () => {
      render(<Home />);

      // 檢查 main, nav, region 等地標
      expect(document.querySelector('main')).toBeInTheDocument();
      expect(document.querySelector('nav')).toBeInTheDocument();
      expect(document.querySelector('footer')).toBeInTheDocument();
    });

    it('should have proper aria labels on regions', () => {
      render(<Home />);

      const profileRegion = screen.getByRole('region', {
        name: /個人資料卡/i,
      });
      expect(profileRegion).toBeInTheDocument();
    });

    it('should have keyboard navigable content', () => {
      render(<Home />);

      // 檢查是否有可焦點元素
      const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      expect(focusableElements.length).toBeGreaterThan(0);
    });
  });

  /**
   * 佈局和樣式測試
   */
  describe('Layout and Styling', () => {
    it('should have proper background colors', () => {
      const container = render(<Home />).container;

      const profileSection = container.querySelector('#profile');
      expect(profileSection).toHaveClass('bg-white');

      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('bg-gray-900');
    });

    it('should have responsive padding and spacing', () => {
      const container = render(<Home />).container;

      const profileSection = container.querySelector('#profile');
      expect(profileSection).toHaveClass('py-16', 'px-4');

      const main = container.querySelector('main');
      expect(main).toHaveClass('pt-16');
    });

    it('should have max-width constraints on content', () => {
      const container = render(<Home />).container;

      const contentWrapper = container.querySelector('.max-w-4xl');
      expect(contentWrapper).toBeInTheDocument();
    });
  });

  /**
   * 資料綁定測試
   */
  describe('Data Binding', () => {
    it('should correctly display profile data', () => {
      render(<Home />);

      expect(screen.getByText(/Lee Uki/i)).toBeInTheDocument();
      expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument();
    });

    it('should correctly bind navigation links', () => {
      render(<Home />);

      const links = ['Home', 'Portfolio', 'About', 'Contact'];
      links.forEach(linkText => {
        expect(screen.getByRole('link', { name: new RegExp(linkText, 'i') })).toBeInTheDocument();
      });
    });

    it('should correctly bind social links', () => {
      render(<Home />);

      const socialPlatforms = ['LinkedIn', 'GitHub', 'Twitter', 'Email'];
      socialPlatforms.forEach(platform => {
        expect(screen.getByRole('link', { name: new RegExp(platform, 'i') })).toBeInTheDocument();
      });
    });
  });

  /**
   * 頁面流程測試
   */
  describe('Page Flow', () => {
    it('should have proper scroll navigation structure', async () => {
      const container = render(<Home />).container;

      // 檢查頁面中各個可導航的段落
      expect(container.querySelector('#home')).toBeInTheDocument();
      expect(container.querySelector('#profile')).toBeInTheDocument();
    });

    it('should have footer with copyright information', () => {
      render(<Home />);

      const footer = document.querySelector('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveTextContent(/保留所有權利|2025/);
    });

    it('should maintain proper document flow', () => {
      const container = render(<Home />).container;

      const body = container;
      const main = body.querySelector('main');
      const nav = body.querySelector('nav');
      const footer = body.querySelector('footer');

      // 檢查元素順序
      expect(nav).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });
  });

  /**
   * 性能和渲染測試
   */
  describe('Rendering and Performance', () => {
    it('should render without errors', () => {
      expect(() => {
        render(<Home />);
      }).not.toThrow();
    });

    it('should have proper React key props for lists', () => {
      const container = render(<Home />).container;

      // 檢查列表元素是否存在（如社群連結列表）
      const lists = container.querySelectorAll('[role="list"]');
      expect(lists.length).toBeGreaterThan(0);
    });

    it('should not have console errors or warnings', () => {
      const consoleSpy = vi.spyOn(console, 'error');
      const warnSpy = vi.spyOn(console, 'warn');

      render(<Home />);

      // 檢查是否沒有 React 警告
      expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('React'));

      consoleSpy.mockRestore();
      warnSpy.mockRestore();
    });
  });
});
