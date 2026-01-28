---
status: pending
priority: p2
issue_id: "008"
tags: [code-review, react, performance, best-practices]
dependencies: []
---

# Using Array Index as Key for Images

## Problem Statement

Tweet images use array index as React key, which is an anti-pattern that can cause visual glitches and wasted re-renders if the list is reordered.

## Findings

**Source:** TypeScript Review, Performance Review

### Location
`src/components/tweet.tsx` (lines 100-101)
```tsx
{tweet.images.map((image, index) => (
  <img
    key={index}  // Anti-pattern!
    src={image}
    ...
  />
))}
```

### Impact
- React may reuse DOM nodes incorrectly if images are reordered
- Can cause visual glitches or stale state
- Potential wasted re-renders

## Proposed Solutions

### Option A: Use Image URL as Key (Recommended)
```tsx
{tweet.images.map((image) => (
  <img
    key={image}  // URL is stable and unique
    src={image}
    ...
  />
))}
```

**Pros:** Simple, URLs are unique identifiers
**Cons:** None
**Effort:** Trivial (5 min)
**Risk:** None

## Recommended Action
Option A - Use image URL as key

## Technical Details

**Affected Files:**
- src/components/tweet.tsx

## Acceptance Criteria

- [ ] Images use URL as key instead of index
- [ ] No React key warnings in console

## Work Log

| Date | Action | Notes |
|------|--------|-------|
| 2026-01-28 | Created | React best practice violation |
