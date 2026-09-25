import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type ReactNode } from "react";

import { Container } from "@/components/shared/container";
import { focalStyle, images, type ImageKey, type SiteImage } from "@/lib/images";

type Crumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  /** Background image: a registry key or a CMS image. */
  image?: ImageKey | SiteImage;
  /** Breadcrumb trail after "Home". */
  crumbs?: Crumb[];
  actions?: ReactNode;
};

/** Inner-page hero with breadcrumbs, faded background image and headline. */
function PageHeader({
  eyebrow,
  title,
  copy,
  image = "studio",
  crumbs = [],
  actions,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden pt-[72px]">
      <div className="absolute inset-0">
        <Image
          src={typeof image === "string" ? images[image] : image.src}
          alt=""
          fill
          sizes="100vw"
          style={typeof image === "string" ? undefined : focalStyle(image)}
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      </div>
      <Container className="relative py-20 sm:py-28">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-2">
              <ChevronRight className="size-3 text-primary/50" />
              {crumb.href ? (
                <Link href={crumb.href} className="text-muted-foreground hover:text-primary">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground/80">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        <p className="eyebrow mt-10">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.03] sm:text-6xl lg:text-7xl">{title}</h1>
        {copy ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy}
          </p>
        ) : null}
        {actions ? <div className="mt-10 flex flex-wrap gap-3">{actions}</div> : null}
      </Container>
    </header>
  );
}

export { PageHeader };
