/**
 * React 應用進入點
 * 掛載 React 應用到 DOM，配置 React 18 的 createRoot
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PortfolioProvider } from './context/PortfolioContext.tsx'

/**
 * 掛載應用到 #root DOM 元素
 */
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </StrictMode>
)
