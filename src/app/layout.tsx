import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";

import { FloatingActions } from "@/components/layout/floating-actions";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemedToaster } from "@/components/theme/themed-toaster";
import { getChromeCopy, getNavigation, getSettings } from "@/lib/data/site";
import { THEME_SCRIPT } from "@/lib/theme";

import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(settings.url),
    title: {
      default: settings.title,
      template: "%s",
    },
    description: settings.description,
    authors: [{ name: settings.name }],
    openGraph: {
      siteName: settings.name,
      type: "website",
      title: settings.seo.ogTitle,
      description: settings.seo.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, nav, chrome] = await Promise.all([getSettings(), getNavigation(), getChromeCopy()]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.name,
    slogan: settings.tagline,
    description: settings.seo.organizationDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.seo.addressLocality,
      addressCountry: settings.seo.addressCountry,
    },
  };

  return (
    // data-theme is set by THEME_SCRIPT before hydration, hence suppressHydrationWarning.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header siteName={settings.name} nav={nav} chrome={chrome} />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingActions phone={settings.phone} whatsapp={settings.whatsapp} whatsappLabel={chrome.whatsappLabel} />
        <ThemedToaster />
      </body>
    </html>
  );
}
