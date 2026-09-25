import { Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Container } from "@/components/shared/container";
import { getChromeCopy, getNavigation, getSettings } from "@/lib/data/site";

async function Footer() {
  const [siteConfig, nav, chrome] = await Promise.all([getSettings(), getNavigation(), getChromeCopy()]);
  const footerNav = nav.footer;
  const socialLinks = [
    { label: "Instagram", href: siteConfig.social.instagram, Icon: Instagram },
    { label: "YouTube", href: siteConfig.social.youtube, Icon: Youtube },
    { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
  ].filter((link) => link.href && link.href !== "#");

  return (
    <footer className="border-t border-border/60 bg-ink">
      <Container className="py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.4em]">{siteConfig.name}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {chrome.footer.blurb}
            </p>
            <NewsletterForm {...chrome.newsletter} />
            <div className="mt-8 flex gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-border/70 text-foreground/70 transition-all hover:border-primary/60 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-4">
            {footerNav.map((column) => (
              <div key={column.title}>
                <p className="font-display text-xs tracking-[0.28em] text-primary uppercase">
                  {column.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${link.label}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="font-display text-xs tracking-[0.28em] text-primary uppercase">
                {chrome.footer.contactTitle}
              </p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>{siteConfig.address}</li>
                <li>
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-foreground">
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                    {siteConfig.email}
                  </a>
                </li>
                <li>{siteConfig.hours}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">
              {chrome.footer.privacyLabel}
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              {chrome.footer.termsLabel}
            </Link>
            <span className="tracking-[0.3em] text-primary/70">
              {siteConfig.tagline.toUpperCase()}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
