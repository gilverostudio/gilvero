import Link from "next/link";

import { Button } from "@/components/ui/button";
import { megaMenu } from "@/content/navigation";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  open: boolean;
};

/** Desktop mega menu panel that slides open below the header. */
function MegaMenu({ open }: MegaMenuProps) {
  return (
    <div
      className={cn(
        "hidden overflow-hidden border-border/60 bg-background/95 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block",
        open ? "max-h-[420px] border-t opacity-100" : "pointer-events-none max-h-0 opacity-0",
      )}
    >
      <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-8 py-10 md:grid-cols-4">
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
