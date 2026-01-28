---
status: pending
priority: p2
issue_id: "009"
tags: [code-review, cleanup, dead-code]
dependencies: []
---

# Remove Dead Code and Unused Components

## Problem Statement

Several components, hooks, and functions are defined but never used in the codebase, adding unnecessary noise and bundle size.

## Findings

**Source:** Code Simplicity Review

### Dead Code Identified

1. **StoreHydration component** - Returns null, does nothing
   - `src/components/store-hydration.tsx`
   - Also imported in `src/app/layout.tsx`

2. **Unused Avatar exports**
   - `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount` in `src/components/ui/avatar.tsx`

3. **Unused Textarea component**
   - `src/components/ui/textarea.tsx` - Never imported anywhere

4. **Unused store hooks**
   - `useHasHydrated` (line 163)
   - `useTweetById` (lines 165-166)
   - `useTweetsByUser` (lines 171-172)

5. **Unused helper function**
   - `getUserById` in `src/lib/data.ts` (lines 189-192)

## Proposed Solutions

### Option A: Remove All Dead Code (Recommended)
Delete unused components and exports.

**Pros:** Cleaner codebase, smaller bundle
**Cons:** None
**Effort:** Small (30 min)
**Risk:** Low

### Option B: Add ESLint Rule
Add `no-unused-vars` to catch future dead code.

**Pros:** Prevents future issues
**Cons:** Doesn't fix current issues
**Effort:** Small (10 min)
**Risk:** None

## Recommended Action
Option A + Option B

## Technical Details

**Files to modify:**
- src/components/store-hydration.tsx (delete or repurpose)
- src/app/layout.tsx (remove StoreHydration import/usage)
- src/components/ui/avatar.tsx (remove unused exports)
- src/components/ui/textarea.tsx (delete if unused)
- src/lib/store/index.ts (remove unused hooks)
- src/lib/data.ts (remove getUserById)

## Acceptance Criteria

- [ ] No unused exports remain
- [ ] No unused functions remain
- [ ] ESLint configured to catch unused code
- [ ] Build passes

## Work Log

| Date | Action | Notes |
|------|--------|-------|
| 2026-01-28 | Created | Code cleanup |
