"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchDialog } from "@/components/layout/search-dialog";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/content/navigation";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

/** Nav items that expand the mega menu on hover. */
const MEGA_MENU_ITEMS = new Set(["Services"]);

function Header() {
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
            GILVERO
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <div
              key={item.label}
              onMouseEnter={() =>
                setOpenMenu(MEGA_MENU_ITEMS.has(item.label) ? item.label : null)
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
          <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
            <Link href="/booking">Book a Shoot</Link>
          </Button>
          <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen}>
            <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
              <Menu />
            </Button>
          </MobileMenu>
        </div>
      </div>

      <MegaMenu open={openMenu === "Services"} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

export { Header };
