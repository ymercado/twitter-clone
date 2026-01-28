---
status: resolved
priority: p1
issue_id: "001"
tags: [code-review, architecture, dry-violation]
dependencies: []
---

# Duplicate VerificationBadge Component (DRY Violation)

## Problem Statement

The `VerificationBadge` component is identically defined in THREE separate files, creating a significant DRY violation that will cause maintenance headaches and inconsistencies.

## Findings

**Source:** TypeScript Review, Architecture Review, Code Simplicity Review

### Locations
1. `src/components/tweet.tsx` (lines 242-261)
2. `src/components/profile-header.tsx` (lines 171-190)
3. `src/components/right-sidebar.tsx` (lines 127-146)

All three implementations are identical ~20 lines of code.

## Proposed Solutions

### Option A: Extract to Shared UI Component (Recommended)
Create `src/components/ui/verification-badge.tsx` and import where needed.

**Pros:** Clean separation, single source of truth, follows existing ui/ pattern
**Cons:** None
**Effort:** Small (15 min)
**Risk:** Low

### Option B: Create Icons Directory
Create `src/components/icons/verification-badge.tsx` with other custom icons.

**Pros:** Groups all custom SVG icons together
**Cons:** Creates new directory pattern
**Effort:** Small (20 min)
**Risk:** Low

## Recommended Action
Option A - Extract to `src/components/ui/verification-badge.tsx`

## Technical Details

**Affected Files:**
- src/components/tweet.tsx
- src/components/profile-header.tsx
- src/components/right-sidebar.tsx
- src/components/ui/verification-badge.tsx (new)

## Acceptance Criteria

- [ ] Single VerificationBadge component exists in ui/ directory
- [ ] All three original files import from shared component
- [ ] No duplicate code remains
- [ ] Build passes
- [ ] Visual appearance unchanged

## Work Log

| Date | Action | Notes |
|------|--------|-------|
| 2026-01-28 | Created | Identified in code review |

## Resources

- Code Review: TypeScript, Architecture, Simplicity agents
