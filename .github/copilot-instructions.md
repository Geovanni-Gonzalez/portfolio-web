# Portfolio Web - AI Agent Instructions

## 🏗 Project Architecture
- **Framework**: Astro 5.0 with React integration (`@astrojs/react`).
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with CSS variables for theming.
- **Deployment**: Vercel (`@astrojs/vercel`).
- **Internationalization**: Custom implementation.
  - Dictionary: `src/i18n/ui.ts`
  - Utilities: `src/i18n/utils.ts` (`getLangFromUrl`, `useTranslations`)
  - Routing: `src/pages/[lang]/index.astro` (e.g., `src/pages/es/index.astro`)
  - Root `src/pages/index.astro` redirects to default locale (`/es/`).

## 🧩 Component Patterns
- **Hybrid Components**: 
  - Use `.astro` for static layout and data fetching.
  - Use `.jsx/.tsx` (React) for interactive elements (e.g., `ProjectCarousel.jsx`, `WarpBackground.tsx`).
  - **Critical**: React components must use `client:*` directives (e.g., `client:load`) in Astro files to be interactive.
- **Layouts**: `src/layouts/BaseLayout.astro` is the single source of truth for `<head>`, metadata, and global styles.
- **Data Fetching**:
  - `Projects.astro` fetches data from GitHub API at build time.
  - Expects `project-info.json` in target repositories for metadata (tech stack, localized descriptions).
  - Requires `GITHUB_TOKEN` in environment variables.

## 🎨 Styling & Theming
- **Tailwind v4**: Configuration via CSS imports in `src/styles/global.css`.
- **Theme Variables**: Defined in `src/styles/global.css` (`--color-bg`, `--color-text`, `--color-accent`).
- **Fonts**: `Geist` font configured in `astro.config.mjs` and mapped to `--font-sans`.
- **Animations**: 
  - `AOS` (Animate On Scroll) for scroll animations.
  - `framer-motion` for complex React component animations.

## 🛠 Developer Workflow
- **Commands**:
  - Dev: `npm run dev`
  - Build: `npm run build`
  - Preview: `npm run preview`
- **Environment**: Ensure `.env` contains `GITHUB_TOKEN` for project data fetching.

## 📂 Key Files
- `astro.config.mjs`: Integrations (React, Tailwind, Vercel) and i18n config.
- `src/i18n/ui.ts`: Central translation dictionary.
- `src/components/Projects.astro`: Example of server-side data fetching + client-side React hydration.
- `src/layouts/BaseLayout.astro`: Global layout structure.
