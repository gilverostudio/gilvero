"use client";

import { ArrowUp, MessageCircle, Phone } from "lucide-react";

import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

/** Floating back-to-top, call and WhatsApp actions pinned to the corner. */
type FloatingActionsProps = { phone: string; whatsapp: string; whatsappLabel: string };

function FloatingActions({ phone, whatsapp, whatsappLabel }: FloatingActionsProps) {
  const showTop = useScrolled(600);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "glass grid size-11 cursor-pointer place-items-center rounded-full text-primary transition-all duration-500",
          showTop ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="size-4" />
      </button>
      <a
        aria-label="Call the studio"
        href={`tel:${phone}`}
        className="glass grid size-11 place-items-center rounded-full text-foreground/80 transition-colors hover:text-primary"
      >
        <Phone className="size-4" />
      </a>
      <a
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.78_0.12_84)] to-[oklch(0.88_0.1_92)] px-4 py-3 text-sm font-medium text-on-gold shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="size-4" />
        <span className="hidden sm:inline">{whatsappLabel}</span>
      </a>
    </div>
  );
}

export { FloatingActions };
