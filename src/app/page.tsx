import { type Metadata } from "next";

import { AcademyPreview } from "@/components/sections/home/academy-preview";
import { BrandMarquee } from "@/components/sections/home/brand-marquee";
import { FeaturedWork } from "@/components/sections/home/featured-work";
import { LatestFilms } from "@/components/sections/home/films";
import { Hero } from "@/components/sections/home/hero";
import { InstagramFeed } from "@/components/sections/home/instagram-feed";
import { JournalFaq } from "@/components/sections/home/journal-faq";
import { Recognition } from "@/components/sections/home/recognition";
import { ServicesOverview } from "@/components/sections/home/services-overview";
import { StatsBand } from "@/components/sections/home/stats";
import { StorePreview } from "@/components/sections/home/store-preview";
import { Testimonials } from "@/components/sections/home/testimonials";
import { CtaBand } from "@/components/shared/cta-band";
import { getHomeContent } from "@/lib/data/home";
import { getPageCta } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "GILVERO — Capture. Create. Inspire. | Photography, Film & Design",
  description:
    "Gilvero is a luxury creative media company: cinematic photography, film production, brand design, a professional academy and archival fine-art printing.",
};

export default async function HomePage() {
  const [content, cta] = await Promise.all([getHomeContent(), getPageCta("home")]);

  return (
    <>
      <Hero hero={content.hero} />
      <BrandMarquee brands={content.brands} />
      <ServicesOverview services={content.services} />
      <FeaturedWork section={content.featured} />
      <LatestFilms films={content.films} />
      <AcademyPreview academy={content.academy} />
      <StorePreview store={content.store} />
      <StatsBand stats={content.stats} />
      <Testimonials testimonials={content.testimonials} />
      <Recognition recognition={content.recognition} />
      <InstagramFeed instagram={content.instagram} />
      <JournalFaq copy={content.journalFaq} />
      {cta === null ? null : <CtaBand {...(cta ?? {})} />}
    </>
  );
}
