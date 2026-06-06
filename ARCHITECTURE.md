# MARSHALL AI — Frontend Architecture

Production-grade frontend foundation for the future AI Content Operating System. This document describes the current structure, patterns, and expansion strategy.

---

## Pre-refactor analysis (Step 1)

### Duplicate code

| Area | Issue |
|------|--------|
| Corner brackets | `corner-bracket` (Auth, initializing card) vs `holo-panel-bracket` (HoloPanel) — same visual pattern, two class sets |
| Page motion | Identical Framer Motion `initial` / `animate` / `exit` blocks in every view and `ViewWrapper` |
| Auth forms | Shared `auth-form-group`, `auth-input`, labels duplicated across Login and Signup |
| Accent colors | Hex map defined in both `SettingsContext` and `SettingsView` |

### Repeated styles

- Inline `style={{}}` blocks in `MockViews`, `TopNav` notifications, `LogsView`, `SettingsView`
- Duplicate `src/App.css` (orphan) vs `src/styles/App.css` (active)
- Status dots / pulse indicators repeated (`initializing-dot`, `avatar-sync-dot`, `topnav-status-dot`)

### Repeated UI patterns

- Dropdown menus in TopNav (system, notifications, profile) share the same motion + `clip-angled` structure
- HoloPanel vs Auth card vs initializing card — holographic framed containers
- Mock module pages all use `ViewWrapper` + `HoloPanel` grid

### Architectural weaknesses (addressed)

| Weakness | Resolution |
|----------|------------|
| No URL routing — `useState('Mission Control')` | React Router v7 with nested layouts |
| Types colocated in contexts | Centralized `src/types/` |
| No global UI state layer | Zustand stores (`ui`, `navigation`, `system`, `settings`, notifications) |
| No error boundaries | `AppErrorBoundary`, `RouteErrorBoundary`, `UIErrorBoundary` |
| No design-system primitives | `src/components/ui/` |
| Theme logic only in Context | `useTheme` + `settingsStore` + CSS theme files |
| Monolithic `App.tsx` switch | Route-based pages under `src/pages/` |

---

## Folder structure

```
src/
├── app/                    # Application bootstrap
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers.tsx
│   ├── ThemeApplicator.tsx
│   └── GlobalModalHost.tsx
├── components/
│   ├── ui/                 # Design primitives
│   ├── layout/             # Main, Auth, Dashboard, MissionControl layouts
│   ├── navigation/         # TopNav
│   ├── avatar/             # AIAvatar (neural core)
│   ├── panels/             # HoloPanel, ParticleField
│   ├── notifications/
│   └── errors/
├── pages/
│   ├── mission-control/
│   ├── profile/
│   ├── settings/
│   ├── logs/
│   ├── auth/
│   └── modules/            # Trend Radar, Simulation, etc.
├── hooks/
├── contexts/               # Auth + Logs (local mock persistence)
├── services/               # API placeholders
├── store/                  # Zustand
├── types/
├── constants/
├── utils/
├── styles/
│   ├── themes/
│   └── ui/
└── assets/
```

---

## Component hierarchy

```
App (AppErrorBoundary)
└── BrowserRouter
    └── AppProviders (Auth, Logs)
        └── ThemeApplicator
        └── Routes
            └── MainLayout
                ├── ParticleField
                ├── GlobalNotificationArea
                ├── GlobalModalHost
                ├── LoadingOverlay
                └── [AuthLayout | DashboardLayout]
                    ├── AuthLayout → LoginPage | SignupPage
                    └── DashboardLayout
                        ├── TopNav
                        └── PageContainer (AnimatePresence + Outlet)
                            ├── MissionControlLayout → MissionControlPage → AIAvatar
                            ├── Module pages (Trend Radar, …)
                            ├── ProfilePage
                            ├── SettingsPage
                            └── LogsPage
```

---

## State management design

### Zustand (global UI / placeholders)

| Store | Responsibility |
|-------|----------------|
| `uiStore` | Global loading, modal id, sidebar |
| `navigationStore` | Last path, breadcrumbs |
| `systemStore` | Placeholder diagnostics (temp, memory, uplink) |
| `settingsStore` | Accent, color mode, visual theme, font size, language |
| `notificationStore` | Toast queue (success / warning / error / info) |

### React Context (session / mock data)

| Context | Responsibility |
|---------|----------------|
| `AuthContext` | Mock login/signup via `localStorage` (no external provider) |
| `LogsContext` | Mock audit log persistence |

**Rule:** New cross-cutting UI state → Zustand. Session-specific mock data may remain in context until backend SDK lands.

---

## Routing design

| Path | Page |
|------|------|
| `/` | Mission Control |
| `/trend-radar` | Trend Radar |
| `/simulation-center` | Simulation Center |
| `/content-lab` | Content Lab |
| `/analytics-center` | Analytics Center |
| `/security-center` | Security Center |
| `/profile` | Profile |
| `/settings` | Settings |
| `/logs` | Logs |
| `/login` | Login |
| `/signup` | Signup |

- Unauthenticated users hitting dashboard routes → redirect `/login`
- Authenticated users hitting auth routes → redirect `/`
- Unknown paths → redirect based on auth state

---

## Theme management

- **Color mode:** `dark` | `light` | `system` (class on `<html>`)
- **Visual theme:** `default` | `cyberpunk` | `jarvis` (CSS files in `styles/themes/`)
- **Accent:** Dynamic CSS variables via `settingsStore` + `useTheme`
- **Future custom themes:** Add entry to `VISUAL_THEME_CLASS` + new CSS file; extend `VisualTheme` type

---

## Layout system

| Layout | Use |
|--------|-----|
| `MainLayout` | Shell: particles, toasts, modals, loading |
| `AuthLayout` | Login / signup outlet |
| `DashboardLayout` | TopNav + animated page container |
| `MissionControlLayout` | Full-height neural core wrapper |

---

## Error boundaries

- **AppErrorBoundary** — catastrophic failures, full-screen recovery
- **RouteErrorBoundary** — per-route render errors inside `PageContainer`
- **UIErrorBoundary** — isolates widgets (e.g. Mission Control avatar)

---

## Notification system

- `notify(variant, title, message)` or `useNotificationStore().push()`
- `GlobalNotificationArea` — top-right animated toasts
- TopNav bell integrates store + legacy placeholder alerts

---

## Future expansion strategy

1. **API layer** — Implement `src/services/*` with typed clients; keep components store-agnostic
2. **Agents** — Use `types/Agent.ts`; add `agentsStore` and mission-control sub-panels
3. **Real auth** — Replace `AuthContext` internals; keep route guards
4. **Code splitting** — `React.lazy()` per `pages/modules/*` route
5. **Testing** — Vitest + RTL on `components/ui` and stores
6. **Design tokens** — Move remaining inline styles into CSS modules or token files
7. **MARSHALL branding** — Rename display strings when product marketing locks identity (UI copy unchanged in this pass)

---

## Key dependencies

- React 19 + Vite 8
- React Router 7
- Framer Motion 12
- Zustand
- Lucide React

---

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview dist
```
