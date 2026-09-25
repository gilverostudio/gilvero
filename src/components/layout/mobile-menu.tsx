"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type NavLink } from "@/content/navigation";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  siteName: string;
  links: NavLink[];
  bookLabel: string;
  bookHref: string;
  /** The trigger button. */
  children: ReactNode;
};

/** Slide-in navigation drawer for small screens. */
function MobileMenu({ open, onOpenChange, siteName, links, bookLabel, bookHref, children }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-[88vw] max-w-sm border-border/60 bg-card p-0">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
            <span className="font-display text-sm tracking-[0.4em]">{siteName}</span>
            <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => onOpenChange(false)}>
              <X />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {links.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="flex items-center justify-between border-b border-border/40 py-4 font-display text-xl tracking-tight text-foreground/90 transition-colors hover:text-primary"
              >
                {item.label}
                <ArrowRight className="size-4 text-primary/60" />
              </Link>
            ))}
          </div>
          <div className="border-t border-border/60 p-6">
            <Button asChild variant="gold" size="lg" className="w-full">
              <Link href={bookHref}>{bookLabel}</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { MobileMenu };
