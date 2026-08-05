import { type GalleryItem } from "@/components/shared/gallery";
import { siteConfig } from "@/lib/site-config";

export type ContactChannelIcon = "map-pin" | "phone" | "mail" | "message-circle" | "clock";

export type ContactChannel = {
  icon: ContactChannelIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export type ContactFormContent = {
  eyebrow: string;
  title: string;
  fields: {
    name: string;
    phone: string;
    email: string;
    message: string;
  };
  submitLabel: string;
  whatsappLabel: string;
  toastMessage: string;
};

export const contactHeader = {
  eyebrow: "Contact",
  title: "Come to the studio, or start with a message.",
  copy: "Enquiries are answered by a producer, not a bot. Expect a written response within one working day.",
  crumbLabel: "Contact",
} as const;

export const contactChannels: ContactChannel[] = [
  { icon: "map-pin", label: "Studio", value: siteConfig.address },
  { icon: "phone", label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
  { icon: "mail", label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    icon: "message-circle",
    label: "WhatsApp",
    value: "Message the studio",
    href: siteConfig.whatsapp,
    external: true,
  },
  { icon: "clock", label: "Hours", value: siteConfig.hours },
];

export const contactForm: ContactFormContent = {
  eyebrow: "Enquiry",
  title: "Send a message",
  fields: {
    name: "Name",
    phone: "Phone",
    email: "Email",
    message: "Project details",
  },
  submitLabel: "Send Enquiry",
  whatsappLabel: "WhatsApp Instead",
  toastMessage: "Message sent. A producer will reply within one working day.",
};

export const studioGallery: GalleryItem[] = [
  { key: "studio", caption: "Reception & lounge" },
  { key: "academy", caption: "Academy floor" },
  { key: "store", caption: "Print atelier" },
];

export const studioGalleryTitle = "The studio";

export const mapSection = {
  title: "Find us",
  iframeTitle: "Gilvero studio location",
  src: "https://www.google.com/maps?q=Gulberg%20III%20Lahore&output=embed",
} as const;
