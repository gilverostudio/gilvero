import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { MegaMenuData } from "@/lib/data/site";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  open: boolean;
  menu: MegaMenuData;
};

/** Desktop mega menu panel that slides open below the header. */
function MegaMenu({ open, menu: megaMenu }: MegaMenuProps) {
  return (
    <div
      className={cn(
        "hidden overflow-hidden px-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block",
        open ? "max-h-[480px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
      )}
    >
      <div className="mx-auto mt-2 mb-6 grid w-full max-w-[1240px] gap-10 rounded-[1.75rem] border border-border/60 bg-background/85 px-10 py-10 shadow-[0_24px_60px_-28px_oklch(0%_0_0/0.5)] backdrop-blur-2xl backdrop-saturate-150 md:grid-cols-4">
        <div>
          <p className="eyebrow">{megaMenu.intro.eyebrow}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {megaMenu.intro.description}
          </p>
          <Button asChild variant="quiet" size="sm" className="mt-6">
            <Link href={megaMenu.intro.cta.href}>{megaMenu.intro.cta.label}</Link>
          </Button>
        </div>
        {megaMenu.columns.map((column) => (
          <div key={column.title}>
            <p className="font-display text-xs tracking-[0.28em] text-foreground/60 uppercase">
              {column.title}
            </p>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MegaMenu };
