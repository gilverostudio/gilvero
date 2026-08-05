export type BookingFormContent = {
  service: { label: string; placeholder: string };
  date: { label: string; placeholder: string };
  city: { label: string; placeholder: string };
  budget: { label: string; placeholder: string };
  phone: { label: string };
  email: { label: string };
  reference: { label: string; prompt: string };
  message: { label: string; placeholder: string };
  submitLabel: string;
  whatsappLabel: string;
  toastMessage: string;
};

export const bookingHeader = {
  eyebrow: "Booking",
  title: "Reserve a date with the studio.",
  copy: "Six fields, one minute. A producer confirms availability and sends a written quote within one working day.",
  crumbLabel: "Booking",
} as const;

export const services: string[] = [
  "Wedding Photography",
  "Wedding Film",
  "Corporate & Portrait",
  "Product Photography",
  "Food & Restaurant",
  "Hotel & Hospitality",
  "Architecture & Real Estate",
  "Fashion & Editorial",
  "Brand Film / Commercial",
  "Drone Cinematography",
  "Event Coverage",
  "Design & Branding",
];

export const cities: string[] = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Faisalabad",
  "Multan",
  "Abroad / Destination",
];

export const budgets: string[] = [
  "Under PKR 100,000",
  "PKR 100,000 – 300,000",
  "PKR 300,000 – 700,000",
  "PKR 700,000 – 1,500,000",
  "Above PKR 1,500,000",
];

export const bookingForm: BookingFormContent = {
  service: { label: "Service", placeholder: "Select a service" },
  date: { label: "Preferred date", placeholder: "Pick a date" },
  city: { label: "City", placeholder: "Select a city" },
  budget: { label: "Budget range", placeholder: "Select a range" },
  phone: { label: "Phone" },
  email: { label: "Email" },
  reference: {
    label: "Reference images",
    prompt: "Upload moodboard or reference images (optional)",
  },
  message: {
    label: "Message",
    placeholder: "Tell us about the project, the venue and the deliverables you need.",
  },
  submitLabel: "Request Booking",
  whatsappLabel: "Instant WhatsApp",
  toastMessage: "Booking request received. We'll confirm availability shortly.",
};

export const bookingSteps: string[] = [
  "A producer checks crew and date availability.",
  "You receive a written scope and fixed quote.",
  "A 40% retainer confirms the date.",
  "Pre-production call, moodboard and shot list.",
];

export const bookingAside = {
  eyebrow: "What happens next",
  talkPrompt: "Prefer to talk?",
} as const;
