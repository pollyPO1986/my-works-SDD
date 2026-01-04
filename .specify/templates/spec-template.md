# 功能規格：[功能名稱]

**功能分支**: `[###-feature-name]`  
**建立日期**: [日期]  
**狀態**: 草稿  
**輸入**: 使用者描述："$ARGUMENTS"

## 使用者情境與測試 _(強制性)_

<!--
  重要：使用者故事應按重要性排序。
  每個使用者故事/旅程必須是可獨立測試的 - 這意味著如果你只實作其中一個，
  你仍然應該有一個可以交付價值的可行 MVP。

  為每個故事分配優先級（P1, P2, P3 等），其中 P1 最為關鍵。
  將每個故事視為一個獨立的功能切片，可以：
  - 獨立開發
  - 獨立測試
  - 獨立部署
  - 獨立向使用者展示
-->

### 使用者故事 1 - [簡短標題] (優先級: P1)

[用平實的語言描述這個使用者旅程]

**為什麼是這個優先級**: [解釋其價值以及為什麼分配此優先級]

**獨立測試**: [描述如何獨立測試此功能 - 例如：「可以透過 [特定動作] 進行完整測試
並交付 [特定價值]」]

**驗收情境**:

1. **假設 (Given)** [初始狀態], **當 (When)** [動作], **那麼 (Then)** [預期結果]
2. **假設 (Given)** [初始狀態], **當 (When)** [動作], **那麼 (Then)** [預期結果]

---

### 使用者故事 2 - [簡短標題] (優先級: P2)

[用平實的語言描述這個使用者旅程]

**為什麼是這個優先級**: [解釋其價值以及為什麼分配此優先級]

**獨立測試**: [描述如何獨立測試此功能]

**驗收情境**:

1. **假設 (Given)** [初始狀態], **當 (When)** [動作], **那麼 (Then)** [預期結果]

---

### 使用者故事 3 - [簡短標題] (優先級: P3)

[用平實的語言描述這個使用者旅程]

**為什麼是這個優先級**: [解釋其價值以及為什麼分配此優先級]

**獨立測試**: [描述如何獨立測試此功能]

**驗收情境**:

1. **假設 (Given)** [初始狀態], **當 (When)** [動作], **那麼 (Then)** [預期結果]

---

[根據需要添加更多使用者故事，每個故事都分配一個優先級]

### 邊緣情況 (Edge Cases)

<!--
  需要執行：此部分內容代表佔位符。
  請填寫正確的邊緣情況。
-->

- 當 [邊界條件] 時會發生什麼？
- 系統如何處理 [錯誤情境]？

## 需求 _(強制性)_

<!--
  需要執行：此部分內容代表佔位符。
  請填寫正確的功能需求。
-->

### 功能需求 (Functional Requirements)

- **FR-001**: 系統必須 [特定能力，例如：「允許使用者建立帳號」]
- **FR-002**: 系統必須 [特定能力，例如：「驗證電子郵件地址」]
- **FR-003**: 使用者必須能夠 [關鍵互動，例如：「重設密碼」]
- **FR-004**: 系統必須 [數據要求，例如：「持久化使用者偏好」]
- **FR-005**: 系統必須 [行為，例如：「記錄所有安全事件」]

_標記不明確需求的範例：_

- **FR-006**: 系統必須透過 [需要澄清：未指定身份驗證方法 -
  電子郵件/密碼、SSO、OAuth？] 驗證使用者
- **FR-007**: 系統必須保留使用者數據 [需要澄清：未指定保留期限]

### 關鍵實體 (Key Entities) _(如果功能涉及數據則包含)_

- **[實體 1]**: [它代表什麼，關鍵屬性，不涉及實作細節]
- **[Entity 2]**: [What it represents, relationships to other entities]

## Success Criteria _(mandatory)_

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in
  under 2 minutes"]
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users
  without degradation"]
- **SC-003**: [User satisfaction metric, e.g., "90% of users successfully
  complete primary task on first attempt"]
- **SC-004**: [Business metric, e.g., "Reduce support tickets related to [X] by
  50%"]
