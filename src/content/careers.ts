import { siteConfig } from "@/lib/site-config";

export type OpenRole = {
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
};

export const careersHeader = {
  eyebrow: "Careers",
  title: "Do the best work of your career.",
  copy: "Gilvero is a small, obsessive team of photographers, filmmakers, designers and educators. We hire slowly, train relentlessly and put every name in the credits.",
} as const;

export const careersIntro = {
  eyebrow: "Open roles",
  title: "Who we're looking for",
  copy: "Every role is based at the Creative House in Gulberg III, Lahore. Send a portfolio with your application — it matters more to us than the CV.",
} as const;

export const applyEmail = siteConfig.email;

const location = "Lahore · On-site";
const fullTime = "Full-time";

export const openRoles: OpenRole[] = [
  {
    title: "Retoucher",
    team: "Post Production",
    location,
    type: fullTime,
    summary:
      "High-end skin, product and architecture retouching to the studio's grading standard. You will work directly with the Head of Post Production on commercial masters.",
  },
  {
    title: "Wedding Cinematographer",
    team: "Films",
    location,
    type: fullTime,
    summary:
      "Own coverage on multi-day weddings — from first light to the last dance. Gimbal fluency and a calm presence in crowded rooms are non-negotiable.",
  },
  {
    title: "Producer",
    team: "Production",
    location,
    type: fullTime,
    summary:
      "Scope, schedule and run commercial shoots end to end: crew, locations, permits, client comms and delivery. You are the reason nothing slips.",
  },
  {
    title: "Academy Trainer (Editing)",
    team: "Academy",
    location,
    type: fullTime,
    summary:
      "Teach the editing and post-production track — grading, retouching and delivery workflows — and run the graded portfolio reviews each cohort ends with.",
  },
  {
    title: "Studio Coordinator",
    team: "Studio Operations",
    location,
    type: fullTime,
    summary:
      "Keep the Creative House running: studio bookings, gear check-outs, client visits and print atelier hand-offs. Equal parts host and logistician.",
  },
];
