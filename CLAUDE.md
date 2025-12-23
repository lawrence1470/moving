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

This is a Next.js 16 App Router project for "Walk-up Experts" - an NYC evening moving service landing page. Built with React 19, Tailwind CSS 4, and TypeScript.

### Animation System

The project uses a dual animation approach:

- **Framer Motion**: Declarative animations via reusable components in `app/components/animations/`
  - `FadeIn` - Viewport-triggered fade with configurable direction/distance
  - `StaggerContainer` - Orchestrates child animation timing
  - `HeroText` - Line-by-line text reveal
  - `ParallaxImage` - Scroll-linked parallax effect
  - `ScrollReveal`, `TextReveal` - Additional scroll-triggered animations

- **GSAP + ScrollTrigger**: Complex scroll-pinned animations
  - Registered client-side only (`if typeof window !== "undefined"`)
  - Used for video parallax in hero, card animations in `CardFan.tsx` and `TestimonialCards.tsx`

### Component Organization

```
app/components/
├── animations/      # Reusable Framer Motion animation wrappers (barrel export via index.ts)
├── pricing/         # ReceiptTape.tsx - pricing section with receipt tape visual
├── CardFan.tsx      # Horizontal train scroll animation for features
├── TestimonialCards.tsx  # Magnetic pull testimonial cards
├── Doodles.tsx      # HeroDoodles, Mascot, SectionDoodles - NYC-themed decorative elements
└── WhyMovingSucks.tsx    # GSAP-animated pain points section
```

### Key Patterns

- All page components use `"use client"` directive for client-side interactivity
- GSAP ScrollTrigger instances return cleanup functions in useEffect
- Animation components accept `triggerRef` props for GSAP scroll-pinned sections
- NYC/yellow cab theme: `yellow-400` as primary accent, black backgrounds

### Path Aliases

Use `@/*` to import from the project root (configured in tsconfig.json).
