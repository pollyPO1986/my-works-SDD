import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // GitHub Pages 部署配置
  // 如果倉庫不是 <username>.github.io，需要設置 base
  // 例如：倉庫名是 'portfolio'，則設置為 '/portfolio/'
  base: process.env.VITE_BASE_URL || '/',

  // 構建優化
  build: {
    // 生成的文件在 dist 目錄中
    outDir: 'dist',

    // 啟用源映射以便於調試
    sourcemap: false,

    // 最小化輸出體積
    minify: 'terser',

    // Rollup 選項
    rollupOptions: {
      output: {
        // 分割代碼以優化加載
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          vendor: ['@fortawesome/fontawesome-svg-core', '@fortawesome/react-fontawesome'],
        },
      },
    },
  },

  // 開發服務器配置
  server: {
    port: 5173,
    strictPort: false,
    open: true, // 自動打開瀏覽器
  },

  // 預覽服務器配置（用於測試生產構建）
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
  },
});
