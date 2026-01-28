---
status: resolved
priority: p1
issue_id: "005"
tags: [code-review, security, xss, validation]
dependencies: []
---

# Unvalidated User Website URLs (XSS Risk)

## Problem Statement

User-provided website URLs are rendered as clickable links without validation, allowing potential XSS attacks via `javascript:` or `data:` protocol URLs.

## Findings

**Source:** Security Review

### Location
`src/components/profile-header.tsx` (lines 139-148)
```tsx
<a
  href={user.website}
  target="_blank"
  rel="noopener noreferrer"
>
```

### Attack Vectors
1. `javascript:alert(document.cookie)` - Execute arbitrary JavaScript
2. `data:text/html,<script>...</script>` - Embed malicious HTML/JS
3. Phishing URLs that look legitimate

### Note
`rel="noopener noreferrer"` helps prevent tab-napping but does NOT prevent `javascript:` protocol attacks.

## Proposed Solutions

### Option A: URL Validation Helper (Recommended)
```typescript
const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

// In component
{user.website && isValidUrl(user.website) && (
  <a href={user.website} ...>
)}
```

**Pros:** Simple, secure, reusable
**Cons:** None
**Effort:** Small (20 min)
**Risk:** Low

### Option B: Content Security Policy
Add CSP header to block javascript: URLs.

**Pros:** Defense in depth
**Cons:** Doesn't fix root cause, CSP can be complex
**Effort:** Medium
**Risk:** Low

## Recommended Action
Option A - Add URL validation helper to lib/utils.ts

## Technical Details

**Affected Files:**
- src/lib/utils.ts (add isValidUrl helper)
- src/components/profile-header.tsx
- src/lib/data.ts (validate mock data)

## Acceptance Criteria

- [ ] javascript: URLs are not rendered as links
- [ ] data: URLs are not rendered as links
- [ ] Only http:// and https:// URLs are clickable
- [ ] Invalid URLs show as plain text or are hidden

## Work Log

| Date | Action | Notes |
|------|--------|-------|
| 2026-01-28 | Created | Security vulnerability identified |

## Resources

- OWASP XSS Prevention: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
