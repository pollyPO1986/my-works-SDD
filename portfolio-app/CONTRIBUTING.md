# 貢獻指南 (CONTRIBUTING.md)

感謝您有興趣為本項目做出貢獻！本文檔描述了我們的開發工作流程和貢獻標準。

## 📋 貢獻流程

### 1. 報告問題 (Issues)

發現 bug 或有新功能建議？請提交 GitHub Issue！

**提交 Issue 前，請檢查：**

- 類似的 Issue 是否已存在
- Issue 是否已在討論中或已關閉

**Issue 應包含：**

- 清晰的標題
- 詳細的問題描述
- 複現步驟（對於 Bug）
- 預期行為 vs 實際行為
- 您的環境信息（Node 版本、操作系統等）
- 相關代碼片段或截圖

### 2. Fork 和克隆倉庫

```bash
# Fork 倉庫到您的帳戶
# 然後克隆您的 Fork
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# 添加 upstream 遠程以保持同步
git remote add upstream https://github.com/leeuki/portfolio.git
```

### 3. 創建特性分支

```bash
# 從 main 分支更新
git fetch upstream
git checkout main
git merge upstream/main

# 創建您的特性分支
git checkout -b feature/your-feature-name
```

**分支命名規範：**

- 特性: `feature/feature-name`
- 修復: `fix/bug-name`
- 文檔: `docs/doc-name`
- 測試: `test/test-name`
- 性能: `perf/optimization-name`

### 4. 開發和提交

#### 開發環境設置

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 運行測試（開發模式）
npm run test -- --watch

# 檢查代碼質量
npm run lint
npm run format
```

#### 提交代碼

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**類型 (type)：**

- `feat`: 新功能
- `fix`: Bug 修復
- `docs`: 文檔更新
- `test`: 測試更新
- `perf`: 性能優化
- `refactor`: 代碼重構
- `chore`: 配置或依賴更新
- `ci`: CI/CD 配置更新

**示例：**

```
feat(portfolio): add project filtering functionality

- Implement filter component
- Add filter state management
- Update tests with new scenarios

Closes #123
```

**提交信息檢查清單：**

- ✅ 類型和範圍正確
- ✅ 主題行小寫開頭
- ✅ 無句號結尾
- ✅ Body 清晰解釋更改
- ✅ 關聯 Issue（如有）

### 5. 保持分支最新

```bash
# 定期同步 upstream 的最新更改
git fetch upstream
git rebase upstream/main
```

### 6. 測試您的更改

**運行完整測試套件：**

```bash
# 所有測試
npm run test

# 檢查覆蓋率
npm run test:coverage

# 檢查代碼質量
npm run lint

# 格式化代碼
npm run format
```

**測試要求：**

- 新功能必須有相應的測試
- 測試覆蓋率應 ≥ 80%
- 所有測試應通過
- 沒有 ESLint 警告或錯誤

### 7. 推送到您的 Fork

```bash
git push origin feature/your-feature-name
```

### 8. 開啟 Pull Request (PR)

**PR 應包含：**

- 清晰的標題
- 詳細的描述：
  - 解決的問題
  - 做出的更改
  - 測試方法
- 關聯的 Issue (#123)
- 更改的文件列表

**PR 檢查清單：**

- ✅ 基於最新的 `main` 分支
- ✅ 分支名稱清晰
- ✅ 提交信息清晰
- ✅ 本地測試通過
- ✅ 代碼格式正確
- ✅ 文檔已更新
- ✅ 沒有合併衝突

## 📝 代碼標準

### 代碼風格

使用 **ESLint** 和 **Prettier** 進行統一的代碼風格：

```bash
# 檢查代碼
npm run lint

# 自動格式化
npm run format
```

**遵循的規則：**

- 使用 2 個空格縮進
- 使用單引號 `'`
- 行尾無分號（Prettier 配置）
- 最大行寬 100 字符

### TypeScript 標準

- **Strict Mode 開啟**
- 為所有函數添加類型註釋
- 為 React 組件定義 Props interface
- 使用 `type` 定義而非 `interface`（對於簡單對象）

**示例：**

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps): ReactElement {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### React 組件標準

1. **組件結構：**
   - 函數組件優先
   - 使用 Hooks（useState, useEffect 等）
   - 為組件和 Props 添加 JSDoc

2. **JSDoc 示例：**

```typescript
/**
 * 個人資料卡組件 - 展示用戶基本信息
 *
 * @param props - 組件屬性
 * @param props.profile - 個人資料對象
 * @param props.onSocialClick - 社群連結點擊回調
 * @returns React 元素
 */
export function ProfileCard({ profile, onSocialClick }: ProfileCardProps): ReactElement {
  // ...
}
```

3. **無障礙性：**
   - 使用語義化 HTML (`button`, `nav`, `section` 等)
   - 添加 ARIA 標籤和角色
   - 確保鍵盤可導航
   - 維持足夠的色彩對比度

### 測試標準

**測試命名：**

```typescript
describe('ComponentName', () => {
  it('should render successfully', () => {
    // ...
  });

  it('should handle click events', () => {
    // ...
  });

  it('should display error message when data is invalid', () => {
    // ...
  });
});
```

**測試覆蓋：**

- 邊界情況
- 錯誤場景
- 用戶交互
- Props 組合

## 🚫 不能接受的貢獻

以下類型的貢獻將被拒絕：

- ❌ 代碼包含 console.log 調試語句
- ❌ 未經測試的更改
- ❌ 違反代碼風格的代碼
- ❌ 缺少 JSDoc 文檔的公開 API
- ❌ 破壞性更改（無詳細說明）
- ❌ 依賴版本隨意更新

## 📚 資源

### 有用的文檔

- [React 文檔](https://react.dev)
- [TypeScript 文檔](https://www.typescriptlang.org)
- [Tailwind CSS 文檔](https://tailwindcss.com)
- [Vitest 文檔](https://vitest.dev)
- [Vite 文檔](https://vitejs.dev)

### 開發命令速查

```bash
npm run dev              # 開發服務器
npm run build            # 生產構建
npm run preview          # 預覽構建
npm run test             # 運行測試
npm run test:watch       # 監視模式測試
npm run test:ui          # UI 模式測試
npm run test:coverage    # 覆蓋率報告
npm run lint             # 檢查代碼
npm run format           # 格式化代碼
```

## 🎓 PR 審查流程

### 審查標準

- ✅ 代碼質量
- ✅ 測試覆蓋
- ✅ 文檔完整性
- ✅ 性能影響
- ✅ 安全性考量
- ✅ 無障礙性

### 預期時間

- 小更改（< 100 行）: 1-2 天
- 中等更改（100-500 行）: 2-4 天
- 大型更改（> 500 行）: 4-7 天

## 🏆 貢獻者指南

### 如何開始

1. **查找簡單的 Issue**：標記為 `good-first-issue` 的 Issue 適合新貢獻者
2. **詢問澄清**：在 Issue 中評論以獲取幫助
3. **分享想法**：在實現前討論您的方案

### 被接受後

貢獻被合併後，您將：

- 被添加到貢獻者列表
- 在新版本發布時被提及
- 可能獲得貢獻者徽章

## 📞 聯繫方式

- **Discord**: [服務器連結]
- **Email**: contribution@leeuki.com
- **Issues**: 使用 GitHub Issues 討論

## ⚖️ 許可協議

提交 PR 即表示您同意將貢獻發佈在 MIT 許可證下。

---

**感謝您的貢獻！** 🙌

一起讓這個項目更好！
