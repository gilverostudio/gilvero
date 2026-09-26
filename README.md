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

All content is managed in the **Gilvero admin** ([gilverostudio/gilvero-admin](https://github.com/gilverostudio/gilvero-admin)),
which stores it in Supabase. The site reads it through `src/lib/data/*` (cached with `fetch`, and
refreshed on demand via `POST /api/revalidate` whenever something is saved in the admin).

- `src/content/*` and `src/lib/site-config.ts` are the **built-in fallback**, used when the
  Supabase variables aren't set (local work without the CMS, preview builds).
- Website forms post to `src/app/actions/forms.ts`, which saves them to the admin Inbox.
  Email alerts are optional (see `.env.example`).
- **Design tokens** (colors, radius, easing, shadows): `src/app/globals.css` `:root` block

See `.env.example` for the environment variables.

### Deploys and Netlify's contributor limit

On Netlify's free plan, a **private** repo only deploys when the GitHub account that **pushed** the
commit is the Netlify owner (`gilverostudio`). Pushes from any other account fail with
"unrecognized Git contributor". The current workflow: make the repo **public** while pushing and
deploying, then switch it back to private. Longer-term options are linking the pushing GitHub
account in Netlify (**Link Git account**) or upgrading to Pro.

## Conventions

- Server components by default; `"use client"` only on the smallest interactive island
  (forms, filters, counters, lightboxes) with business logic in `src/hooks/`.
- Component variants via `cva` (see `components/ui/button.tsx`).
- Every page exports `metadata`; dynamic routes use `generateMetadata` + `generateStaticParams`.
- Forms submit through the server action in `src/app/actions/forms.ts` (validation, honeypot,
  database-side rate limiting).
