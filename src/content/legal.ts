import { siteConfig } from "@/lib/site-config";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDoc = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  crumb: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDoc = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  crumb: "Privacy Policy",
  updated: "Last updated · January 2026",
  intro:
    "Gilvero Creative Media (“Gilvero”, “we”, “us”) respects the trust involved in handing a studio your wedding, your brand or your likeness. This policy explains what we collect, why we collect it, and the choices you have.",
  sections: [
    {
      heading: "Information we collect",
      paragraphs: [
        "We collect only what a working studio needs to deliver:",
      ],
      bullets: [
        "Contact details — name, email, phone and billing address when you enquire, book a shoot, enrol in the Academy or order a print.",
        "Project details — dates, venues, briefs, shot lists and creative references you share with our producers.",
        "Payment information — processed by our payment partners; we never store full card numbers on our own systems.",
        "Imagery — the photographs and films we produce for you, and any files you upload to the Print Store for reproduction.",
        "Usage data — basic analytics about how the site is used, collected in aggregate.",
      ],
    },
    {
      heading: "How we use your information",
      paragraphs: [
        "Your information is used to scope and quote projects, schedule crews, deliver galleries and films, process Academy enrolments and print orders, issue invoices, and respond to enquiries. If you subscribe to our newsletter we will send occasional studio updates — every email includes an unsubscribe link.",
        "We do not sell, rent or trade personal information. Data is shared only with the service providers required to deliver the work — payment processors, couriers for print orders and secure gallery hosting — under confidentiality obligations.",
      ],
    },
    {
      heading: "Client galleries & your images",
      paragraphs: [
        "Every project is delivered through a private, password-protected Client Area. Galleries are visible only to you and the people you share access with.",
        "We showcase selected work in our portfolio, journal and social channels only with your consent, which is agreed in your booking contract. You may withdraw portfolio consent at any time by writing to us, and we will remove the imagery from channels we control.",
      ],
    },
    {
      heading: "Academy enrolment",
      paragraphs: [
        "For Academy students we additionally hold enrolment records, attendance, graded portfolio reviews and certification history. Student work is shown publicly (for example in student showcases) only with the student's permission.",
      ],
    },
    {
      heading: "Print Store orders",
      paragraphs: [
        "Files you upload for printing are used solely to produce your order and its soft proof. Upload files are deleted from our production systems within 90 days of delivery unless you ask us to keep them on file for reorders.",
      ],
    },
    {
      heading: "Retention & security",
      paragraphs: [
        "Delivered project masters are archived so you can re-order prints and request files years later; you may ask us to delete your archive at any time. Contracts and invoices are retained as long as law and accounting standards require.",
        "Galleries and archives are stored on access-controlled, encrypted systems. Only team members who need your project to do their job can open it.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "You may request a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it where we have no continuing legal obligation to keep it. We answer every request within 30 days.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Questions about this policy or your data can be sent to ${siteConfig.email} or posted to ${siteConfig.address}.`,
      ],
    },
  ],
};

export const termsOfService: LegalDoc = {
  eyebrow: "Legal",
  title: "Terms of Service",
  crumb: "Terms of Service",
  updated: "Last updated · January 2026",
  intro:
    "These terms govern every engagement with Gilvero Creative Media — photography and film commissions, Academy enrolment and Print Store orders. Booking a shoot, enrolling or placing an order means you accept them.",
  sections: [
    {
      heading: "Bookings & retainers",
      paragraphs: [
        "A booking is confirmed when the signed engagement and the retainer stated in your quote are both received. Retainers reserve the crew and date and are non-refundable within 30 days of the shoot date.",
        "Quotes are valid for 30 days. Scope changes after confirmation — additional days, venues or deliverables — are quoted and agreed in writing before the shoot.",
      ],
    },
    {
      heading: "Payments & cancellations",
      paragraphs: [
        "The balance is due before final delivery unless your contract states otherwise. Cancellations more than 30 days before the shoot forfeit the retainer only; later cancellations may be charged for committed crew, travel and rentals.",
        "If Gilvero must cancel for reasons within our control, everything you have paid is refunded in full, or the booking is moved to a date you approve.",
      ],
    },
    {
      heading: "Deliverables & timelines",
      paragraphs: [
        "Standard delivery timelines are 5–10 working days for commercial stills, 21 days for wedding photography and 4–6 weeks for films, counted from the final shoot day. Rush delivery is available by prior agreement.",
        "Deliverables are fully graded, retouched masters plus web-optimised sets. RAW files are not included unless your commercial contract states a selected RAW hand-over.",
      ],
    },
    {
      heading: "Image rights & usage",
      paragraphs: [
        "Gilvero retains copyright in the work it creates. Your contract grants you a licence covering the uses you booked for — personal use for private clients, and the agreed media, territory and term for commercial clients.",
        "Portfolio use of selected images by Gilvero is agreed in your booking contract and can be declined or withdrawn as described in our Privacy Policy. Neither party may resell or sublicense the work beyond the agreed licence.",
      ],
    },
    {
      heading: "Client Area & galleries",
      paragraphs: [
        "Gallery credentials are personal to you; you are responsible for who you share them with. Galleries remain online for at least 12 months after delivery, and archived masters can be requested afterwards.",
      ],
    },
    {
      heading: "Academy terms",
      paragraphs: [
        "Course fees are payable before the cohort starts; a place is held only once payment clears. Fees are refundable in full up to 14 days before the start date and non-refundable afterwards, though you may move to a later cohort once at no charge.",
        "Certificates are issued on completing the course and the graded portfolio review. Studio equipment borrowed during class hours must be returned in the condition it left; students are liable for loss or negligent damage.",
      ],
    },
    {
      heading: "Print Store orders",
      paragraphs: [
        "Every order receives a soft proof before printing; production begins once you approve it. Because each print is made to order, orders cannot be cancelled after proof approval.",
        "Prints that arrive damaged or with a production fault are reprinted or refunded — notify us with photographs within 7 days of delivery. Colour variance within industry-standard tolerance between screen and print is not a fault.",
        "You must own or hold rights to any file you upload for printing. Gilvero may decline to reproduce material that infringes copyright or that we judge unlawful.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "Gilvero's total liability under any engagement is limited to the fees paid for that engagement. We are not liable for indirect or consequential loss, or for delays caused by events beyond our reasonable control — though we will always propose a remedy, including reshoots where practicable.",
      ],
    },
    {
      heading: "Governing law & changes",
      paragraphs: [
        "These terms are governed by the laws of Pakistan, and disputes fall to the courts of Lahore. We may update these terms from time to time; the version in force when you book is the one that applies to your engagement.",
        `Questions about these terms can be sent to ${siteConfig.email}.`,
      ],
    },
  ],
};
