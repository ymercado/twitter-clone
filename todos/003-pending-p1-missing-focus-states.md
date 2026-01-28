---
status: resolved
priority: p1
issue_id: "003"
tags: [code-review, accessibility, wcag, keyboard]
dependencies: []
---

# Missing Visible Focus States (Accessibility Barrier)

## Problem Statement

The application has no custom focus styles defined globally. The `outline-none` class is used on interactive elements, removing focus indicators and making the app unusable for keyboard users.

## Findings

**Source:** Accessibility Review

### Issues Found

1. **No global focus styles** in `globals.css`
2. **`outline-none` on compose textarea** (line 94) removes focus indicator
3. **Navigation links/buttons lack visible focus states** despite having hover states
4. **Focus ring variable defined but unused** (`--ring: #1D9BF0`)

### WCAG Violation
- WCAG 2.1 Success Criterion 2.4.7 (Focus Visible) - Level AA

## Proposed Solutions

### Option A: Add Global Focus-Visible Styles (Recommended)
```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/* Override outline-none with focus-visible */
.outline-none:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

**Pros:** Fixes entire app at once, minimal code
**Cons:** None
**Effort:** Small (15 min)
**Risk:** Low

### Option B: Component-by-Component Focus States
Add focus classes to each interactive element.

**Pros:** More control per component
**Cons:** Tedious, easy to miss elements
**Effort:** Large (2 hours)
**Risk:** Medium (incomplete coverage)

## Recommended Action
Option A - Add global focus-visible styles to globals.css

## Technical Details

**Affected Files:**
- src/app/globals.css
- src/components/compose.tsx (remove outline-none or override)

## Acceptance Criteria

- [ ] Tab through entire app shows visible focus on all interactive elements
- [ ] Focus ring uses accent color (#1D9BF0)
- [ ] Focus is visible on buttons, links, inputs, tabs
- [ ] No interactive element has invisible focus

## Work Log

| Date | Action | Notes |
|------|--------|-------|
| 2026-01-28 | Created | Critical a11y barrier identified |

## Resources

- WCAG 2.4.7: https://www.w3.org/WAI/WCAG21/Understanding/focus-visible
