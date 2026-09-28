"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchDialog } from "@/components/layout/search-dialog";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { type NavLink } from "@/content/navigation";
import { useScrolled } from "@/hooks/use-scrolled";
import type { ChromeCopy, Navigation } from "@/lib/data/site";
import { cn } from "@/lib/utils";

type HeaderProps = {
  siteName: string;
  nav: Pick<Navigation, "main" | "mega" | "search" | "mobile">;
  chrome: Pick<ChromeCopy, "bookLabel" | "bookHref" | "search">;
};

/** Pages that open on a full-bleed photo (a dark island, see globals.css). */
function opensOnPhoto(pathname: string) {
  return pathname === "/" || /^\/portfolio\/[^/]+$/.test(pathname);
}

/** The nav item that expands the mega menu on hover: the one linking where the mega menu's CTA goes. */
function opensMegaMenu(item: NavLink, nav: HeaderProps["nav"]) {
  return item.href === nav.mega.intro.cta.href;
}

function Header({ siteName, nav, chrome }: HeaderProps) {
  const scrolled = useScrolled(24);
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close any open menu when the route changes.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  return (
    <header
      // Over a hero photo the transparent header stays dark in either theme.
      data-theme={!scrolled && opensOnPhoto(pathname) ? "dark" : undefined}
      onMouseLeave={() => setOpenMenu(null)}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-background/70 to-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="font-display text-lg tracking-[0.42em] text-foreground transition-colors group-hover:text-primary">
            {siteName}
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.main.map((item) => (
            <div
              key={item.label}
              onMouseEnter={() =>
                setOpenMenu(opensMegaMenu(item, nav) ? "mega" : null)
              }
            >
              <Link
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[0.8rem] font-medium tracking-wide text-foreground/75 transition-colors hover:text-primary",
                  pathname === item.href && "text-primary",
                )}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="text-foreground/70"
            onClick={() => setSearchOpen(true)}
          >
            <Search />
          </Button>
          <ThemeToggle />
          <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
            <Link href={chrome.bookHref}>{chrome.bookLabel}</Link>
          </Button>
          <MobileMenu
            open={mobileOpen}
            onOpenChange={setMobileOpen}
            siteName={siteName}
            links={[...nav.main, ...nav.mobile]}
            bookLabel={chrome.bookLabel}
            bookHref={chrome.bookHref}
          >
            <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
              <Menu />
            </Button>
          </MobileMenu>
        </div>
      </div>

      <MegaMenu open={openMenu === "mega"} menu={nav.mega} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} links={nav.search} copy={chrome.search} />
    </header>
  );
}

export { Header };
