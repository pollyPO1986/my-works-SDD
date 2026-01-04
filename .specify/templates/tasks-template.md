---
description: '功能實作的任務清單模板'
---

# 任務：[功能名稱]

**輸入**: 來自 `/specs/[###-feature-name]/` 的設計文件 **前提條件**: plan.md (必
須), spec.md (使用者故事必須), research.md, data-model.md, contracts/

**測試**: 下面的範例包含測試任務。測試是可選的 - 僅在功能規格中明確要求時才包含
。

**組織**: 任務按使用者故事分組，以便對每個故事進行獨立實作和測試。

## 格式：`[ID] [P?] [Story] 描述`

- **[P]**: 可以並行執行（不同文件，無依賴關係）
- **[Story]**: 此任務屬於哪個使用者故事（例如：US1, US2, US3）
- 在描述中包含確切的文件路徑

## 路徑慣例

- **單一專案**: `src/`, `tests/` 位於儲存庫根目錄
- **Web 應用程式**: `backend/src/`, `frontend/src/`
- **路徑範例**: 下面顯示的路徑假設為單一專案 - 請根據 plan.md 結構進行調整

<!--
  ============================================================================
  重要：下面的任務僅為說明用的範例任務。

  /speckit.tasks 命令必須根據以下內容替換這些任務：
  - 來自 spec.md 的使用者故事（及其優先級 P1, P2, P3...）
  - 來自 plan.md 的功能需求
  - 來自 data-model.md 的實體
  - 來自 contracts/ 的端點

  任務必須按使用者故事組織，以便每個故事可以：
  - 獨立實作
  - 獨立測試
  - 作為 MVP 增量交付

  請勿在生成的 tasks.md 文件中保留這些範例任務。
  ============================================================================
-->

## 第一階段：設定 (共享基礎設施)

**目的**: 專案初始化與基本結構

- [ ] T001 根據實作計畫建立專案結構
- [ ] T002 使用 [框架] 依賴項初始化 [語言] 專案
- [ ] T003 [P] 設定 linting 和格式化工具

---

## 第二階段：基礎 (阻塞性前提條件)

**目的**: 在實作任何使用者故事之前必須完成的核心基礎設施

**⚠️ 關鍵**: 在此階段完成之前，不能開始任何使用者故事的工作

基礎任務範例（根據您的專案進行調整）：

- [ ] T004 設定資料庫架構與遷移框架
- [ ] T005 [P] 實作身份驗證/授權框架
- [ ] T006 [P] 設定 API 路由與中間件結構
- [ ] T007 建立所有故事都依賴的基礎模型/實體
- [ ] T008 設定錯誤處理與日誌基礎設施
- [ ] T009 設定環境變數管理

**檢查點**: 基礎已就緒 - 現在可以並行開始使用者故事的實作

---

## 第三階段：使用者故事 1 - [標題] (優先級: P1) 🎯 MVP

**目標**: [簡要描述此故事交付的內容]

**獨立測試**: [如何驗證此故事可以獨立運作]

### 使用者故事 1 的測試 (可選 - 僅在要求測試時) ⚠️

> **注意：先編寫這些測試，確保在實作前測試失敗**

- [ ] T010 [P] [US1] 在 tests/contract/test\_[name].py 中為 [端點] 進行合約測試
- [ ] T011 [P] [US1] 在 tests/integration/test\_[name].py 中為 [使用者旅程] 進行
      整合測試

### 使用者故事 1 的實作

- [ ] T012 [P] [US1] 在 src/models/[entity1].py 中建立 [Entity1] 模型
- [ ] T013 [P] [US1] 在 src/models/[entity2].py 中建立 [Entity2] 模型
- [ ] T014 [US1] 在 src/services/[service].py 中實作 [Service] (依賴 T012, T013)
- [ ] T015 [US1] 在 src/[location]/[file].py 中實作 [端點/功能]
- [ ] T016 [US1] 添加驗證與錯誤處理
- [ ] T017 [US1] 為使用者故事 1 的操作添加日誌

**檢查點**: 此時，使用者故事 1 應該功能齊全且可以獨立測試

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Contract test for [endpoint] in
      tests/contract/test\_[name].py
- [ ] T019 [P] [US2] Integration test for [user journey] in
      tests/integration/test\_[name].py

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create [Entity] model in src/models/[entity].py
- [ ] T021 [US2] Implement [Service] in src/services/[service].py
- [ ] T022 [US2] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T023 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work
independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T024 [P] [US3] Contract test for [endpoint] in
      tests/contract/test\_[name].py
- [ ] T025 [P] [US3] Integration test for [user journey] in
      tests/integration/test\_[name].py

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create [Entity] model in src/models/[entity].py
- [ ] T027 [US3] Implement [Service] in src/services/[service].py
- [ ] T028 [US3] Implement [endpoint/feature] in src/[location]/[file].py

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests (if requested) in tests/unit/
- [ ] TXXX Security hardening
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user
  stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No
  dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate
  with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate
  with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if
  team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break
  independence
