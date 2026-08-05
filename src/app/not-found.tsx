import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="pointer-events-none absolute top-1/3 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <div className="relative max-w-xl text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 text-[5rem] leading-none sm:text-[8rem]">
          <span className="gold-text">404</span>
        </h1>
        <h2 className="mt-4 text-2xl">This frame doesn&apos;t exist.</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The page has been moved, retired, or never made the final cut. Let&apos;s get you back to
          the work.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[oklch(0.78_0.12_84)] to-[oklch(0.88_0.1_92)] px-8 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Back to Home
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm font-medium text-foreground/85 transition-colors hover:border-primary/60 hover:text-primary"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
