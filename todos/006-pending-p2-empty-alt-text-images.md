---
status: pending
priority: p2
issue_id: "006"
tags: [code-review, accessibility, images, wcag]
dependencies: []
---

# Empty Alt Text on Tweet Images

## Problem Statement

Tweet images have empty alt text (`alt=""`), treating them as decorative when they often contain meaningful content.

## Findings

**Source:** Accessibility Review

### Location
`src/components/tweet.tsx` (lines 100-109)
```tsx
<img
  key={index}
  src={image}
  alt=""
  className="w-full max-h-[510px] object-cover"
  loading="lazy"
/>
```

### Impact
- Screen reader users miss image content entirely
- WCAG 1.1.1 (Non-text Content) potential violation

## Proposed Solutions

### Option A: Generic Description (Quick Fix)
```tsx
alt={`Image ${index + 1} in tweet by ${author.name}`}
```

**Pros:** Quick fix, better than nothing
**Cons:** Not descriptive of actual content
**Effort:** Small (10 min)
**Risk:** Low

### Option B: Add Alt Text to Tweet Model (Recommended)
```typescript
interface Tweet {
  images?: Array<{
    url: string;
    alt?: string;
  }>;
}
```

**Pros:** Proper solution, allows user-generated alt text
**Cons:** Requires data model change
**Effort:** Medium (1 hour)
**Risk:** Low

## Recommended Action
Option A now, Option B when building image upload

## Technical Details

**Affected Files:**
- src/components/tweet.tsx
- src/lib/types.ts (for Option B)
- src/lib/data.ts (update mock data for Option B)

## Acceptance Criteria

- [ ] Images have non-empty alt text
- [ ] Screen readers announce image presence
- [ ] Alt text provides context about the image

## Work Log

| Date | Action | Notes |
|------|--------|-------|
| 2026-01-28 | Created | Accessibility issue |

## Resources

- WCAG 1.1.1: https://www.w3.org/WAI/WCAG21/Understanding/non-text-content
