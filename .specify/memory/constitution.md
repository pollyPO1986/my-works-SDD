<!--
Sync Impact Report:
- Version change: [CONSTITUTION_VERSION] → 1.0.0
- List of modified principles:
    - [PRINCIPLE_1_NAME] → 程式品質 (Code Quality)
    - [PRINCIPLE_2_NAME] → 測試標準 (Testing Standards)
    - [PRINCIPLE_3_NAME] → 使用者體驗一致性 (UX Consistency)
    - [PRINCIPLE_4_NAME] → 效能需求 (Performance Requirements)
- Added sections: 語言規範 (Language Specification) 納入治理規則。
- Removed sections: [PRINCIPLE_5_NAME]
- Templates requiring updates:
    - .specify/templates/plan-template.md (✅ 已檢查)
    - .specify/templates/spec-template.md (✅ 已檢查)
    - .specify/templates/tasks-template.md (✅ 已檢查)
- Follow-up TODOs: 無。
-->

# portfolio-app 章程

## 核心原則

### I. 程式品質 (Code Quality)

程式碼必須易於閱讀、維護且符合專案規範。必須使用 ESLint 和 Prettier 確保風格一致
。所有 PR 必須通過靜態分析檢查。

### II. 測試標準 (Testing Standards)

所有新功能與修復必須包含對應的單元測試或整合測試。測試必須在實作前或實作過程中完
成，確保功能符合預期。

### III. 使用者體驗一致性 (UX Consistency)

介面設計與互動邏輯必須保持一致。遵循 Tailwind CSS 的設計規範，確保在不同裝置與頁
面間提供統一的視覺與操作體驗。

### IV. 效能需求 (Performance Requirements)

確保應用程式載入快速（LCP < 2.5s），互動反應即時。優化資源使用，避免不必要的重新
渲染與大型依賴包。

## 語言規範

本專案所有 Markdown 文件 (`.md`) 的撰寫、註解、說明以及 AI 的回答都必須使用**正
體中文**進行。

## 治理

章程優於所有其他開發實踐。任何違反章程的變更必須有充分理由並經過審查。

[治理規則]

1. 所有 PR 與審查必須驗證是否符合核心原則。
2. 複雜的實作必須提供正當理由。
3. 語言規範為強制性要求，不符合規範的文件將不予合併。

**版本**: 1.0.0 | **批准日期**: 2026-01-04 | **最後修訂日期**: 2026-01-04
