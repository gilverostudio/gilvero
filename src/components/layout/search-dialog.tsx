"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { type NavLink } from "@/content/navigation";
import type { ChromeCopy } from "@/lib/data/site";

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: NavLink[];
  copy: ChromeCopy["search"];
};

/** Site-wide quick search over key destinations. */
function SearchDialog({ open, onOpenChange, links: searchLinks, copy }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  const results = searchLinks.filter((link) =>
    link.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border-border/60 bg-card/95 backdrop-blur-xl">
        <DialogTitle className="eyebrow">{copy.title}</DialogTitle>
        <Input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.placeholder}
          className="h-12 rounded-full border-border/70 bg-background/60"
        />
        <ul className="max-h-72 space-y-1 overflow-y-auto">
          {results.map((link) => (
            <li key={`${link.label}-${link.href}`}>
              <Link
                href={link.href}
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
              >
                {link.label}
                <ArrowRight className="size-4 opacity-50" />
              </Link>
            </li>
          ))}
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted-foreground">{copy.empty}</li>
          ) : null}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export { SearchDialog };
