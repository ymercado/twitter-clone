---
status: pending
priority: p3
issue_id: "011"
tags: [code-review, cleanup, icons, organization]
dependencies: ["001"]
---

# Extract Inline SVG Icons to Shared Components

## Problem Statement

Multiple inline SVG icons are scattered throughout the codebase instead of being extracted to reusable icon components, creating inconsistency and code duplication.

## Findings

**Source:** Code Simplicity Review

### Inline SVGs Found

1. **X Logo** - `src/components/sidebar.tsx` (lines 30-32)
2. **GIF Icon** - `src/components/compose.tsx` (lines 129-131)
3. **Poll Icon** - `src/components/compose.tsx` (lines 137-139)
4. **Views/Analytics Icon** - `src/components/tweet.tsx` (lines 207-212)
5. **Dropdown Arrow** - `src/components/compose.tsx` (lines 80-82)
6. **More Dots** - `src/components/profile-header.tsx` (lines 94-95)
7. **Mobile Nav Icons** - `src/app/(main)/layout.tsx` (lines 64-87)

### Inconsistency
Some icons use Lucide React while others are inline SVGs.

## Proposed Solutions

### Option A: Create Icons Directory (Recommended)
```
src/components/icons/
├── x-logo.tsx
├── gif-icon.tsx
├── poll-icon.tsx
├── views-icon.tsx
└── index.ts
```

**Pros:** Organized, reusable, consistent
**Cons:** More files
**Effort:** Medium (1 hour)
**Risk:** Low

### Option B: Use Lucide for All
Find equivalent Lucide icons where possible.

**Pros:** Consistency with existing usage
**Cons:** Custom X logo and some icons don't exist in Lucide
**Effort:** Medium
**Risk:** Low

## Recommended Action
Option A - Create icons directory for custom icons

## Technical Details

**New Files:**
- src/components/icons/x-logo.tsx
- src/components/icons/gif-icon.tsx
- src/components/icons/poll-icon.tsx
- src/components/icons/views-icon.tsx

**Files to Update:**
- src/components/sidebar.tsx
- src/components/compose.tsx
- src/components/tweet.tsx
- src/app/(main)/layout.tsx

## Acceptance Criteria

- [ ] All custom SVG icons in dedicated components
- [ ] No inline SVGs longer than 2-3 lines
- [ ] Icons are importable from @/components/icons

## Work Log

| Date | Action | Notes |
|------|--------|-------|
| 2026-01-28 | Created | Code organization improvement |
