# Telemetry App Design Guidelines

## Design Approach: Carbon Design System Foundation
**Justification**: For data-intensive telemetry applications, Carbon Design System provides optimal patterns for dashboards, data visualization, and real-time monitoring interfaces. Drawing inspiration from industry leaders like Grafana and Datadog.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**
- Background Primary: 220 15% 8%
- Background Secondary: 220 15% 12%
- Background Elevated: 220 15% 16%
- Text Primary: 210 15% 95%
- Text Secondary: 210 10% 70%
- Border: 220 15% 25%

**Light Mode**
- Background Primary: 210 20% 98%
- Background Secondary: 210 20% 95%
- Text Primary: 220 15% 15%
- Border: 220 15% 85%

**Semantic Colors**
- Primary (Info): 217 91% 60%
- Success: 142 71% 45%
- Warning: 38 92% 50%
- Error: 0 84% 60%
- Neutral: 215 14% 34%

### B. Typography

**Font Families**
- Primary: 'Inter', system-ui, sans-serif (via Google Fonts)
- Monospace: 'JetBrains Mono', monospace (for metrics/code)

**Scale**
- Display: 32px/2rem, weight 600
- H1: 24px/1.5rem, weight 600
- H2: 20px/1.25rem, weight 600
- H3: 18px/1.125rem, weight 500
- Body: 14px/0.875rem, weight 400
- Caption: 12px/0.75rem, weight 400
- Code/Metrics: 13px/0.8125rem, weight 400, monospace

### C. Layout System

**Spacing Units**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component padding: p-4 to p-6
- Section spacing: py-8 to py-12
- Card spacing: p-4 to p-6
- Grid gaps: gap-4 to gap-6

**Container Widths**
- Dashboard: w-full with px-6
- Cards: max-w-full within grid
- Modals: max-w-2xl to max-w-4xl

### D. Component Library

**Navigation**
- Top navbar: Dark background with height 60px, contains app logo, breadcrumbs, user profile
- Sidebar (collapsible): 240px width when expanded, 60px when collapsed, displays navigation tree
- Secondary tabs for section navigation

**Data Display**
- Cards: Elevated background, rounded-lg, border with subtle shadow
- Metric tiles: Large monospace numbers, descriptive labels, trend indicators
- Tables: Striped rows, sortable headers, sticky header on scroll, row hover states
- Charts: Use chart.js/recharts integration, consistent color scheme

**Forms & Controls**
- Input fields: Outlined style, focus states with primary color
- Buttons: Solid primary, ghost secondary, icon-only for actions
- Filters: Chips for active filters, dropdown menus for selection
- Date/time pickers: Inline calendar, time range presets

**Status Indicators**
- Status badges: Rounded-full pills with semantic colors
- Loading states: Skeleton screens for data tables, spinner for actions
- Empty states: Icon + descriptive text + action button

**Overlays**
- Modals: Centered, dimmed backdrop, max-width constraints
- Tooltips: Dark background, white text, arrow pointer
- Notifications/Toasts: Top-right corner, auto-dismiss, semantic colors

### E. Animations

**Minimal Motion**
- Page transitions: None
- Component mount: Fade-in only (150ms)
- Hover states: No animation, instant color change
- Loading indicators: Subtle pulse/spin only

## Images

**No Hero Images**: Telemetry dashboards launch directly into functional interface
**Dashboard Icons**: Use Heroicons for metrics, alerts, and navigation (via CDN)
**Empty State Illustrations**: Placeholder comments for custom illustrations where data is absent

## Key Patterns

**Dashboard Layout**: Grid-based metric tiles above tabular data, responsive from 1-4 columns based on viewport
**Real-time Updates**: Visual pulse indicator for live data streams, timestamp display
**Multi-level Navigation**: Breadcrumbs for hierarchy, sidebar for primary nav, tabs for sections
**Data Density Options**: Toggle between compact/comfortable view modes