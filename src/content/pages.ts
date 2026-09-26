import { aboutHeader } from "@/content/about";
import { bookingHeader } from "@/content/booking";
import { careersHeader } from "@/content/careers";
import { clientAreaHeader } from "@/content/client-area";
import { contactHeader } from "@/content/contact";
import { faqHeader } from "@/content/faq";
import { privacyPolicy, termsOfService } from "@/content/legal";
import { storeCta, storeHeader } from "@/content/store";
import { type PageDefaults } from "@/lib/data/page-meta";

/**
 * Built-in SEO, header and closing banner for every page — used when the CMS
 * is off or a field is left empty in the admin (Pages & SEO).
 * Detail templates use {placeholders} filled per item.
 */

const defaultCta = {
  title: "Let's make something worth keeping.",
  copy: "Tell us about the project. You will hear back from a producer within one working day.",
  primary: { label: "Book a Shoot", href: "/booking" },
  secondary: { label: "Get a Quote", href: "/contact" },
};

export const pageDefaults = {
  home: {
    seoTitle: "GILVERO — Capture. Create. Inspire. | Photography, Film & Design",
    seoDescription:
      "Gilvero is a luxury creative media company: cinematic photography, film production, brand design, a professional academy and archival fine-art printing.",
    cta: defaultCta,
  },
  about: {
    seoTitle: "About Gilvero — Creative Media House in Lahore",
    seoDescription:
      "The story, team, studio and equipment behind Gilvero — a premium creative media company built on craft, restraint and repeat clients.",
    header: { eyebrow: aboutHeader.eyebrow, title: aboutHeader.title, copy: aboutHeader.copy, crumb: aboutHeader.crumbLabel, image: "studio" },
    cta: { ...defaultCta, title: "Work with the studio." },
  },
  services: {
    seoTitle: "Services — Photography, Film & Creative Studio | Gilvero",
    seoDescription:
      "Wedding, corporate, product, food, architecture and fashion photography, cinema-grade film production, drone work, branding, design and post production.",
    header: {
      eyebrow: "Services",
      title: "Everything from the first frame to the framed print.",
      copy: "Three disciplines, seventy specialisms, one accountable producer per project.",
      crumb: "Services",
      image: "product",
      actions: [
        { label: "Get a Quote", href: "/booking", variant: "gold" },
        { label: "See the Work", href: "/portfolio", variant: "quiet" },
      ],
    },
    cta: { ...defaultCta, title: "Tell us what you're making." },
  },
  portfolio: {
    seoTitle: "Portfolio — Selected Work | Gilvero",
    seoDescription:
      "Weddings, campaigns, hospitality, property, fashion and film — selected Gilvero commissions with full case studies.",
    header: {
      eyebrow: "Portfolio",
      title: "Selected work, with the reasoning intact.",
      copy: "Each case study includes the brief, the constraint, the approach and the result.",
      crumb: "Portfolio",
      image: "wedding",
    },
    cta: { ...defaultCta, title: "Your project could be next." },
  },
  "portfolio-detail": {
    seoTitle: "{title} — {category} Case Study | Gilvero",
    seoDescription: "{story}",
    cta: defaultCta,
  },
  academy: {
    seoTitle: "Gilvero Academy — Photography, Film & Design Courses",
    seoDescription:
      "A professional creative institute: photography, cinematography, editing, design, drone and freelancing courses with certification and placement support.",
    header: {
      eyebrow: "Gilvero Academy",
      title: "Learn the craft inside a working studio.",
      copy: "Small cohorts, real client briefs, industry trainers and a graded portfolio review at the end of every course.",
      crumb: "Academy",
      image: "academy",
      actions: [
        { label: "Enroll Now", href: "/academy", variant: "gold" },
        { label: "Talk to an Advisor", href: "/contact", variant: "quiet" },
      ],
    },
    cta: {
      title: "Applications for the next cohort are open.",
      copy: "Send an application and our academy team will call you within one working day.",
      primary: { label: "Enroll Now", href: "/academy/photography-mastery" },
      secondary: { label: "Contact Academy", href: "/contact" },
    },
  },
  "academy-detail": {
    seoTitle: "{title} — Gilvero Academy",
    seoDescription: "{summary}",
    header: { crumb: "Academy", image: "academy" },
    cta: null,
  },
  blog: {
    seoTitle: "Journal — Photography, Editing & Creative Business | Gilvero",
    seoDescription:
      "Photography tips, camera reviews, editing technique, pricing and creative business writing from the Gilvero studio.",
    header: {
      eyebrow: "Journal",
      title: "Notes from inside the studio.",
      copy: "Technique, gear, pricing and the occasional set diary — written by the people doing the work.",
      crumb: "Journal",
      image: "studio",
    },
    cta: {
      title: "Want this in your inbox?",
      copy: "One considered email a month — technique, gear and studio notes.",
      primary: { label: "Contact the Studio", href: "/contact" },
      secondary: { label: "Visit the Academy", href: "/academy" },
    },
  },
  "blog-detail": {
    seoTitle: "{title} — Gilvero Journal",
    seoDescription: "{excerpt}",
    header: { crumb: "Journal", image: "academy" },
    cta: defaultCta,
  },
  store: {
    seoTitle: "Print Store — Fine Art Prints, Frames & Albums | Gilvero",
    seoDescription:
      "Archival photo prints, canvas, acrylic, luxury frames, albums and passport photos. Upload your image, choose size, paper and frame.",
    header: {
      eyebrow: storeHeader.eyebrow,
      title: storeHeader.title,
      copy: storeHeader.copy,
      crumb: "Print Store",
      image: "store",
      actionLabel: storeHeader.action,
    },
    cta: storeCta,
  },
  booking: {
    seoTitle: "Book a Shoot — Gilvero Creative Media",
    seoDescription:
      "Book photography, film or design work with Gilvero. Choose service, date, city and budget — a producer replies within one working day.",
    header: { eyebrow: bookingHeader.eyebrow, title: bookingHeader.title, copy: bookingHeader.copy, crumb: bookingHeader.crumbLabel, image: "wedding" },
    cta: null,
  },
  contact: {
    seoTitle: "Contact Gilvero — Studio in Lahore | Enquiries & Quotes",
    seoDescription:
      "Call, WhatsApp, email or visit the Gilvero Creative House in Lahore. Written quotes within one working day.",
    header: { eyebrow: contactHeader.eyebrow, title: contactHeader.title, copy: contactHeader.copy, crumb: contactHeader.crumbLabel, image: "studio" },
    cta: null,
  },
  careers: {
    seoTitle: "Careers — Join the Gilvero Team",
    seoDescription:
      "Open roles at Gilvero Creative House in Lahore — photographers, cinematographers, retouchers, producers and Academy trainers. Send a portfolio and join the credits.",
    header: { eyebrow: careersHeader.eyebrow, title: careersHeader.title, copy: careersHeader.copy, crumb: "Careers", image: "studio" },
    cta: {
      title: "Don't see your role?",
      copy: "We keep a shortlist for every discipline. Send a portfolio, tell us what you'd own, and we will reach out when the seat opens.",
      primary: { label: "Contact the Studio", href: "/contact" },
      secondary: { label: "About Gilvero", href: "/about" },
    },
  },
  faq: {
    seoTitle: "FAQ — Studio, Academy & Print Questions | Gilvero",
    seoDescription:
      "Answers to the questions we hear most — engagement pricing, travel, delivery timelines, RAW files, Academy courses, certificates, print orders and client galleries.",
    header: { eyebrow: faqHeader.eyebrow, title: faqHeader.title, copy: faqHeader.copy, crumb: "FAQ", image: "studio" },
    cta: {
      title: "Still weighing something up?",
      copy: "If your question isn't answered here, a producer will answer it directly — usually within one working day.",
      primary: { label: "Book a Shoot", href: "/booking" },
      secondary: { label: "Ask the Studio", href: "/contact" },
    },
  },
  "client-area": {
    seoTitle: "Client Area — Private Galleries & Downloads | Gilvero",
    seoDescription:
      "Sign in to view private galleries, approve selects, download final files and track print orders.",
    header: {
      eyebrow: clientAreaHeader.eyebrow,
      title: clientAreaHeader.title,
      copy: clientAreaHeader.copy,
      crumb: clientAreaHeader.crumbLabel,
      image: "studio",
    },
    cta: null,
  },
  privacy: {
    seoTitle: "Privacy Policy | Gilvero",
    seoDescription:
      "How Gilvero Creative Media collects, uses and protects your information — bookings, client galleries, Academy enrolment, print orders and your rights over your data.",
    header: { eyebrow: privacyPolicy.eyebrow, title: privacyPolicy.title, crumb: privacyPolicy.crumb, image: "studio" },
    cta: null,
  },
  terms: {
    seoTitle: "Terms of Service | Gilvero",
    seoDescription:
      "The terms that govern Gilvero engagements — bookings and retainers, payments, delivery timelines, image rights and usage licences, Academy enrolment and print orders.",
    header: { eyebrow: termsOfService.eyebrow, title: termsOfService.title, crumb: termsOfService.crumb, image: "studio" },
    cta: null,
  },
} satisfies Record<string, PageDefaults>;

export type PageSlug = keyof typeof pageDefaults;
