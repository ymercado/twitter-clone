---
status: pending
priority: p2
issue_id: "007"
tags: [code-review, typescript, type-safety]
dependencies: []
---

# Branded Type Bypass in Selectors

## Problem Statement

Selector functions accept `string` instead of branded `TweetId`/`UserId` types, defeating the purpose of having branded types for type safety.

## Findings

**Source:** TypeScript Review

### Location
`src/lib/store/index.ts` (lines 165-172)
```typescript
export const useTweetById = (tweetId: string) =>  // Should be TweetId
  useStore((state) => state.tweets.find((t) => t.id === tweetId));

export const useUserById = (userId: string) =>    // Should be UserId
  useStore((state) => state.users.find((u) => u.id === userId));

export const useTweetsByUser = (userId: string) => // Should be UserId
  useStore((state) => state.tweets.filter((t) => t.authorId === userId));
```

### Impact
- Can accidentally pass wrong ID type (user ID to tweet lookup)
- Loses compile-time safety that branded types provide
- Inconsistent with the rest of the type system

## Proposed Solutions

### Option A: Fix Selector Signatures (Recommended)
```typescript
import type { TweetId, UserId } from "@/lib/types";

export const useTweetById = (tweetId: TweetId) =>
  useStore((state) => state.tweets.find((t) => t.id === tweetId));

export const useUserById = (userId: UserId) =>
  useStore((state) => state.users.find((u) => u.id === userId));
```

**Pros:** Consistent type safety, catches bugs at compile time
**Cons:** May require type assertions at call sites
**Effort:** Small (20 min)
**Risk:** Low

## Recommended Action
Option A - Fix selector type signatures

## Technical Details

**Affected Files:**
- src/lib/store/index.ts

## Acceptance Criteria

- [ ] Selectors use branded types in signatures
- [ ] TypeScript catches incorrect ID type usage
- [ ] No `any` or `string` bypass for ID parameters

## Work Log

| Date | Action | Notes |
|------|--------|-------|
| 2026-01-28 | Created | Type safety issue |
