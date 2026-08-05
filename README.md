# GILVERO — Premium Creative Media House

A luxury creative media company website — photography, film, design, academy and archival print — built with Next.js.

## Stack

- **Next.js 16** (App Router, React Server Components, static generation)
- **TypeScript** (strict)
- **Tailwind CSS v4** (design tokens as CSS variables, `@theme` config in `globals.css`)
- **Radix UI** primitives (accordion, dialog/sheet) with shadcn-style wrappers
- **lucide-react** icons, **sonner** toasts, **class-variance-authority** for component variants
- **next/font** (Sora display + Manrope body — self-hosted, zero layout shift)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages statically generated)
```

## Project structure

```
src/
├── app/                    # Routes: one folder per page, metadata per page
│   ├── layout.tsx          # Root layout: fonts, header, footer, floating actions
│   ├── page.tsx            # Home
│   ├── portfolio/[slug]/   # Dynamic case studies (generateStaticParams)
│   ├── academy/[slug]/     # Dynamic course pages
│   ├── blog/[slug]/        # Dynamic journal posts
│   └── not-found.tsx       # 404
├── components/
│   ├── layout/             # Header, mega menu, mobile menu, search, footer
│   ├── sections/<page>/    # Page-specific sections (server components by default)
│   ├── shared/             # Section, Container, SectionHeading, Reveal, PageHeader,
│   │                       # CtaBand, Gallery — the reusable building blocks
│   └── ui/                 # Design-system primitives (button, input, accordion…)
├── content/                # ALL site copy & data, typed. Edit content here —
│                           # no JSX changes needed to update text/prices/courses.
├── hooks/                  # use-in-view, use-scrolled, use-counter…
└── lib/                    # site-config (contact details), images registry, utils
```

## Editing content

- **Company details** (phone, email, WhatsApp, address, hours): `src/lib/site-config.ts`
- **Images**: drop files in `public/images/` and update `src/lib/images.ts`
- **Page copy, courses, projects, posts, products**: the matching file in `src/content/`
- **Design tokens** (colors, radius, easing, shadows): `src/app/globals.css` `:root` block

## Conventions

- Server components by default; `"use client"` only on the smallest interactive island
  (forms, filters, counters, lightboxes) with business logic in `src/hooks/`.
- Component variants via `cva` (see `components/ui/button.tsx`).
- Every page exports `metadata`; dynamic routes use `generateMetadata` + `generateStaticParams`.
- Forms currently confirm via toast — wire them to an API route or server action in
  `src/app/api/` when a backend is ready.
