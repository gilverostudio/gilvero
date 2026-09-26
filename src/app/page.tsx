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
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getPage("home", pageDefaults.home));
}

export default async function HomePage() {
  const [content, page] = await Promise.all([getHomeContent(), getPage("home", pageDefaults.home)]);

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
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
