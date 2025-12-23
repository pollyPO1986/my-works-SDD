/**
 * 應用路由配置 (可選功能)
 * 定義所有頁面路由和嵌套路由
 *
 * 使用 React Router DOM 實現:
 * - npm install react-router-dom
 * - 配置主應用入口點以使用 BrowserRouter
 * - 應用這個路由配置
 *
 * 路由結構:
 * - / (Home) - 首頁，展示個人資料和精選作品集
 * - /portfolio (PortfolioAll) - 完整作品集頁面，支持搜索、篩選、排序、分頁
 * - /portfolio/:id (PortfolioDetail) - 單個項目詳情頁
 * - 404 (NotFoundPage) - 頁面未找到
 */

/**
 * 實現示例 (使用 React Router v6+):
 *
 * import { createBrowserRouter } from 'react-router-dom';
 * import Home from './pages/Home';
 * import PortfolioAll from './pages/PortfolioAll';
 * import PortfolioDetail from './pages/PortfolioDetail';
 *
 * export const router = createBrowserRouter([
 *   {
 *     path: '/',
 *     element: <Home />,
 *   },
 *   {
 *     path: '/portfolio',
 *     element: <PortfolioAll />,
 *   },
 *   {
 *     path: '/portfolio/:id',
 *     element: <PortfolioDetail />,
 *   },
 *   {
 *     path: '*',
 *     element: <NotFoundPage />,
 *   },
 * ]);
 */

// 路由配置類型定義
export interface RouteConfig {
  path: string;
  component: string;
  label: string;
  description: string;
}

export const routeConfigs: RouteConfig[] = [
  {
    path: '/',
    component: 'Home',
    label: '首頁',
    description: '展示個人資料和精選作品集',
  },
  {
    path: '/portfolio',
    component: 'PortfolioAll',
    label: '完整作品集',
    description: '展示所有項目，支持搜索、篩選、排序',
  },
  {
    path: '/portfolio/:id',
    component: 'PortfolioDetail',
    label: '項目詳情',
    description: '單個項目的詳細信息',
  },
];

// 輔助函數：獲取路由標簽
export function getRouteLabel(pathname: string): string {
  const config = routeConfigs.find(r => r.path === pathname || r.path.includes(':'));
  return config?.label || '未知頁面';
}

// 輔助函數：檢查路由是否有效
export function isValidRoute(pathname: string): boolean {
  return routeConfigs.some(r => r.path === pathname || r.path.includes(':'));
}
