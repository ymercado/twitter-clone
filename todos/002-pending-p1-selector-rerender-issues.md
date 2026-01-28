---
status: resolved
priority: p1
issue_id: "002"
tags: [code-review, performance, zustand, re-renders]
dependencies: []
---

# Zustand Selectors Cause Unnecessary Re-renders

## Problem Statement

Multiple Zustand selectors return new references on every call, causing unnecessary re-renders across the entire application. This is a critical performance issue that will scale poorly.

## Findings

**Source:** Performance Review, Architecture Review, TypeScript Review

### Problem Selectors

1. **`useTweets()`** - Returns entire array, any tweet change re-renders all
   ```typescript
   export const useTweets = () => useStore((state) => state.tweets);
   ```

2. **`useUsers()`** - Same problem with users array

3. **`useCurrentUser()`** - `.find()` returns new reference each time
   ```typescript
   export const useCurrentUser = () =>
     useStore((state) => state.users.find((u) => u.id === state.currentUserId));
   ```

4. **`useTweetsByUser()`** - `.filter()` creates new array each call

### Impact
- O(n) re-renders for O(1) state changes
- With 100 tweets, liking one tweet causes 100+ component re-renders
- RightSidebar recalculates suggestedUsers on every render

## Proposed Solutions

### Option A: Use useShallow from Zustand (Recommended)
```typescript
import { useShallow } from 'zustand/react/shallow';

export const useTweets = () =>
  useStore(useShallow((state) => state.tweets));
```

**Pros:** Simple fix, minimal code change
**Cons:** Shallow comparison only
**Effort:** Small (30 min)
**Risk:** Low

### Option B: Normalize Data Structure
Convert arrays to `byId`/`allIds` pattern for O(1) lookups.

**Pros:** Solves root cause, faster lookups
**Cons:** Requires significant refactor
**Effort:** Large (2-3 hours)
**Risk:** Medium

### Option C: Memoize with React.memo + Component-level Selectors
Wrap Tweet component in memo and pass only the tweet ID.

**Pros:** Granular re-render control
**Cons:** More complex patterns
**Effort:** Medium (1 hour)
**Risk:** Low

## Recommended Action
Start with Option A (useShallow) + Option C (memo Tweet component)

## Technical Details

**Affected Files:**
- src/lib/store/index.ts
- src/components/tweet.tsx
- src/app/(main)/home/page.tsx

## Acceptance Criteria

- [ ] Liking a tweet only re-renders that tweet
- [ ] Following a user doesn't re-render entire feed
- [ ] React DevTools shows minimal re-renders
- [ ] Build passes

## Work Log

| Date | Action | Notes |
|------|--------|-------|
| 2026-01-28 | Created | Identified in performance review |

## Resources

- Zustand shallow docs: https://docs.pmnd.rs/zustand/guides/prevent-rerenders-with-use-shallow
