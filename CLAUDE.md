# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 App Router project with React 19, Tailwind CSS 4, and TypeScript.

- **app/**: App Router pages and layouts
  - `layout.tsx`: Root layout with Geist font configuration
  - `page.tsx`: Home page component
  - `globals.css`: Tailwind CSS imports and CSS variables for theming
- **public/**: Static assets (SVGs, favicon)

### Path Aliases

Use `@/*` to import from the project root (configured in tsconfig.json).

### Styling

Tailwind CSS 4 with CSS variables for dark mode support:
- `--background` / `--foreground` for theme colors
- `--font-geist-sans` / `--font-geist-mono` for typography
