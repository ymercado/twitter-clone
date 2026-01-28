---
status: resolved
priority: p1
issue_id: "004"
tags: [code-review, accessibility, keyboard, wcag]
dependencies: []
---

# Tweet Article Not Keyboard Accessible

## Problem Statement

The tweet `<article>` element has `cursor-pointer` styling suggesting it's clickable, but it cannot be focused or activated via keyboard, creating an accessibility barrier.

## Findings

**Source:** Accessibility Review

### Location
`src/components/tweet.tsx` (line 51)
```tsx
<article className="px-4 py-3 border-b border-border hover-surface transition-colors cursor-pointer">
```

### Impact
- Keyboard users cannot navigate to tweets
- Screen reader users cannot interact with tweet as a whole
- WCAG 2.1.1 (Keyboard) violation

## Proposed Solutions

### Option A: Make Article Focusable with Keyboard Handler
```tsx
<article
  tabIndex={0}
  role="article"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // Navigate to tweet detail
    }
  }}
  className="... focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
>
```

**Pros:** Simple fix
**Cons:** Slightly unusual pattern
**Effort:** Small (30 min)
**Risk:** Low

### Option B: Wrap in Link Component (Recommended)
```tsx
<Link href={`/${author.handle}/status/${tweet.id}`} className="block">
  <article className="...">
```

**Pros:** Semantic, proper navigation, SEO benefits
**Cons:** Requires tweet detail page to exist
**Effort:** Medium (1 hour)
**Risk:** Low

### Option C: Use Button with Article Role
```tsx
<button role="article" onClick={handleClick} className="text-left w-full">
```

**Pros:** Keyboard accessible by default
**Cons:** Unusual semantics
**Effort:** Small (20 min)
**Risk:** Low

## Recommended Action
Option A for now (quick fix), Option B when tweet detail page exists

## Technical Details

**Affected Files:**
- src/components/tweet.tsx

## Acceptance Criteria

- [ ] Tweet can be focused via Tab key
- [ ] Enter/Space activates the tweet
- [ ] Focus indicator visible when tweet is focused
- [ ] Screen reader announces tweet appropriately

## Work Log

| Date | Action | Notes |
|------|--------|-------|
| 2026-01-28 | Created | Critical a11y barrier |

## Resources

- WCAG 2.1.1: https://www.w3.org/WAI/WCAG21/Understanding/keyboard
