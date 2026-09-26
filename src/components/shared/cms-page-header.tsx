import { Play } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { type PageContent } from "@/lib/data/page-meta";

type CmsPageHeaderProps = {
  page: PageContent;
  /** Breadcrumbs before the page's own crumb (e.g. Academy › Course). */
  parents?: { label: string; href: string }[];
  /** Overrides for detail pages (item title, summary…). */
  eyebrow?: string;
  title?: string;
  copy?: string;
  /** Replaces the header buttons (e.g. the store's Shop Now). */
  actions?: ReactNode;
};

/** PageHeader driven by the page's CMS fields. */
export function CmsPageHeader({ page, parents = [], eyebrow, title, copy, actions }: CmsPageHeaderProps) {
  const { header } = page;
  const buttons =
    actions ??
    (header.actions.length ? (
      <>
        {header.actions.map((action) => (
          <Button key={`${action.label}-${action.href}`} asChild variant={action.variant} size="lg">
            <Link href={action.href}>
              {action.variant === "hero" ? <Play aria-hidden /> : null}
              {action.label}
            </Link>
          </Button>
        ))}
      </>
    ) : undefined);

  const crumbs = [...parents, ...(title ? [{ label: title }] : header.crumb ? [{ label: header.crumb }] : [])];

  return (
    <PageHeader
      eyebrow={eyebrow ?? header.eyebrow}
      title={title ?? header.title}
      copy={copy ?? (header.copy || undefined)}
      image={header.image}
      crumbs={crumbs}
      actions={buttons}
    />
  );
}
