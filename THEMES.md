# MARSHALL AI — Theme Engine

## Overview

Marshall AI uses a **CSS custom property (variable) driven multi-theme engine**. Three visual themes transform the entire application into distinct futuristic operating systems while preserving shared layout, routing, and business logic.

| Theme | ID | Inspiration |
|-------|-----|-------------|
| **NEXUS** (default) | `nexus` | OpenAI, AI research labs, premium dashboards |
| **JARVIS** | `jarvis` | Iron Man, Stark Industries, arc reactor HUD |
| **CYBERPUNK** | `cyberpunk` | Cyberpunk 2077, Night City, neon hacker UIs |

---

## Architecture

```
User selects theme (Settings)
        ↓
settingsStore (Zustand) → localStorage
        ↓
ThemeApplicator → useTheme()
        ↓
<html data-theme="nexus|jarvis|cyberpunk">
        ↓
CSS [data-theme] selectors override --theme-* tokens
        ↓
All components auto-update via var(--accent), var(--surface-*), etc.
```

### Key principle

Components **never** hardcode theme colors. They consume semantic tokens (`--accent`, `--surface-panel`, `--border-default`, etc.). Theme files override the underlying `--theme-*` palette tokens.

---

## CSS Variable System

### Token layers

| Layer | Variables | Set by |
|-------|-----------|--------|
| **Theme palette** | `--theme-primary`, `--theme-secondary`, `--theme-glow`, `--theme-*-rgb` | `[data-theme]` CSS files |
| **User accent** | `--user-accent`, `--user-accent-rgb`, `--user-accent-glow`, `--user-accent-dim` | `useTheme()` inline (accent picker) |
| **Resolved accent** | `--accent`, `--accent-rgb`, `--accent-glow`, `--accent-dim` | `var(--user-accent, var(--theme-primary))` chain |
| **Surfaces** | `--surface-bg`, `--surface-panel`, `--surface-elevated`, `--surface-overlay` | Per-theme |
| **Borders** | `--border-subtle`, `--border-default`, `--border-accent` | Per-theme |
| **Text** | `--text-primary`, `--text-secondary`, `--text-muted`, `--text-dim` | Global + light mode |
| **Effects** | `--shadow-neon`, `--shadow-glow`, `--glow-intensity`, `--glass-blur` | Per-theme |
| **Background** | `--particle-color-*`, `--particle-glow-*`, `--grid-color`, `--bg-gradient-*` | Per-theme |
| **Avatar** | `--avatar-core-glow`, `--avatar-ring-opacity`, `--avatar-pulse-color` | Per-theme |

### Theme attribute

Themes are applied via the `data-theme` attribute on `<html>`:

```css
[data-theme='nexus']   { --theme-primary: #00d4ff; ... }
[data-theme='jarvis']  { --theme-primary: #00f5ff; ... }
[data-theme='cyberpunk'] { --theme-primary: #ff0080; ... }
```

Legacy `theme-*` classes are still applied for backward compatibility but `data-theme` is the source of truth.

---

## Theme Switching Flow

1. **Settings → Theme Preview cards** — user clicks NEXUS, JARVIS, or CYBERPUNK
2. `settingsStore.updateSettings({ visualTheme, accentColor })` — also sets theme-default accent
3. Settings persist to `localStorage` (`nexus_settings`)
4. `ThemeApplicator` (mounted in `App.tsx`) calls `useTheme()`
5. `useTheme()` effect:
   - Sets `data-theme` on `<html>`
   - Applies font size, color mode classes
   - Sets `--user-accent*` from accent picker
   - Adds `theme-transitioning` class for 600ms smooth CSS transition
6. All CSS variables cascade; no component re-render required

### Migration

Saved settings with `visualTheme: "default"` are automatically migrated to `"nexus"` via `normalizeVisualTheme()`.

---

## Theme Visual Identity

### NEXUS
- Teal/cyan palette (#00D4FF, #00FFCC, #00F5FF)
- Soft glassmorphism, holographic panel shimmer
- Subtle AI grid, floating teal particles
- Calm AI core glow

### JARVIS
- Arc reactor cyan (#00F5FF, #009DFF, #00FFFF)
- Rotating HUD rings, radar sweep scanner
- Military-precision borders and command center feel
- Arc reactor avatar with dual rotating HUD rings

### CYBERPUNK
- Neon magenta/purple/cyan (#FF0080, #A000FF, #00FFFF)
- Animated scanlines, glitch pulse effects
- Neon borders with magenta glow trails
- Neon energy core avatar with glitch text

---

## Files Modified

### Core engine
| File | Change |
|------|--------|
| `src/types/Settings.ts` | `default` → `nexus` theme type |
| `src/constants/themes.ts` | Theme metadata, palette, migration helper |
| `src/constants/index.ts` | Export theme constants |
| `src/hooks/useTheme.ts` | `data-theme` attribute, user accent vars, transition class |
| `src/store/settingsStore.ts` | Default `nexus`, migration on load |
| `src/pages/settings/SettingsPage.tsx` | Theme preview cards with animated selection |

### CSS
| File | Change |
|------|--------|
| `src/styles/variables.css` | Full semantic token system |
| `src/styles/themes/nexus.css` | **New** — NEXUS theme tokens |
| `src/styles/themes/jarvis.css` | Expanded JARVIS tokens + HUD/avatar effects |
| `src/styles/themes/cyberpunk.css` | Expanded CYBERPUNK tokens + glitch/scanlines |
| `src/styles/themes/effects.css` | **New** — shared background effect animations |
| `src/index.css` | Import new theme files, variable-driven globals |
| `src/styles/base.css` | Semantic tokens for scrollbar, text |
| `src/styles/App.css` | Surface/border tokens |
| `src/styles/ui/primitives.css` | Buttons, modals, toasts, badges |
| `src/styles/TopNav.css` | Semantic text/surface tokens |
| `src/styles/HoloPanel.css` | Theme-aware panel tokens |
| `src/styles/AIAvatar.css` | Per-theme avatar glow and filters |
| `src/styles/ParticleField.css` | Theme-driven particles and glows |
| `src/styles/Views.css` | Theme preview card styles |

### Components
| File | Change |
|------|--------|
| `src/components/panels/ParticleField.tsx` | CSS-variable particles, HUD rings, scanlines |

---

## Future Expansion Strategy

### Adding a new theme

1. Add theme ID to `VisualTheme` type in `src/types/Settings.ts`
2. Add metadata to `THEME_META` in `src/constants/themes.ts`
3. Create `src/styles/themes/<name>.css` with `[data-theme='<name>']` overrides
4. Import in `src/index.css`
5. Add preview card styles in `Views.css` (`.theme-preview-card--<name>`)
6. Add any unique background effects in `effects.css` or the theme file

### Recommended new tokens

When adding themes, override at minimum:
- `--theme-primary`, `--theme-secondary`, `--theme-glow` (+ rgb variants)
- `--surface-bg`, `--surface-panel`
- `--particle-color-*`, `--particle-glow-*`, `--grid-color`
- `--avatar-core-glow`, `--avatar-pulse-color`
- Theme-specific decorative selectors (`.holo-panel`, `.topnav`, `.avatar-*`)

### Performance guidelines

- Use `transform` and `opacity` for animations (GPU-friendly)
- Prefer CSS variables over inline styles or JS theme checks
- Use `will-change` sparingly on animated background elements
- Avoid reading CSS variables in React — let CSS cascade handle updates

---

## Root Cause (Previous Identical Themes)

1. **`useTheme()` overwrote theme accents** — inline `--accent` from accent picker beat CSS class rules
2. **No `theme-default` / `nexus` CSS file** — default theme had zero overrides
3. **Minimal theme files** — only 4–5 variables changed per theme
4. **Hardcoded hex colors** — particles, scrollbars, body bg ignored themes
5. **Static particle field** — same cyan/purple glows regardless of theme
6. **Surface tokens never changed** — nav, panels, modals looked identical

The new engine fixes this by: separating user accent from theme palette, defining comprehensive per-theme tokens, using `data-theme` selectors, and making all major surfaces/effects variable-driven.
