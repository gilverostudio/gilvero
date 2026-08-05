export type Course = {
  slug: string;
  title: string;
  level: string;
  duration: string;
  fee: string;
  batch: string;
  trainer: string;
  summary: string;
  curriculum: string[];
  careers: string[];
};

export type AcademyHighlight = {
  icon: "users" | "award" | "clock";
  title: string;
  copy: string;
};

export type StudentOutcome = {
  quote: string;
  attribution: string;
};

export const courses: Course[] = [
  {
    slug: "photography-mastery",
    title: "Photography Mastery",
    level: "Beginner → Pro",
    duration: "16 weeks",
    fee: "Fee on request",
    batch: "Mon / Wed / Fri · 6–9 PM",
    trainer: "Hamza Gill",
    summary:
      "Camera control, studio lighting and composition taught the way working photographers actually shoot.",
    curriculum: [
      "Camera Basics & Exposure",
      "Studio Lighting",
      "Composition & Framing",
      "Portrait Direction",
      "Wedding Photography",
      "Commercial Photography",
      "Lightroom Workflow",
      "Portfolio Building",
    ],
    careers: ["Studio Photographer", "Wedding Photographer", "Commercial Shooter"],
  },
  {
    slug: "cinematography-filmmaking",
    title: "Cinematography & Filmmaking",
    level: "Intermediate",
    duration: "20 weeks",
    fee: "Fee on request",
    batch: "Tue / Thu · 6–9 PM",
    trainer: "Rameez Ahsan",
    summary:
      "From camera movement and lens language to sound, edit and delivery of a finished short film.",
    curriculum: [
      "Lens Language",
      "Camera Movement & Gimbal",
      "Cinematic Lighting",
      "Sound for Film",
      "Premiere Pro",
      "DaVinci Resolve",
      "Colour Grading",
      "Drone Training",
    ],
    careers: ["Cinematographer", "Camera Operator", "Colourist"],
  },
  {
    slug: "video-editing-post",
    title: "Video Editing & Post",
    level: "Beginner → Pro",
    duration: "12 weeks",
    fee: "Fee on request",
    batch: "Sat / Sun · 11 AM–3 PM",
    trainer: "Zoya Kamal",
    summary:
      "Story-first editing across long form and short form, finished with motion graphics and grade.",
    curriculum: [
      "Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Motion Graphics",
      "Short Form Editing",
      "YouTube Editing",
      "Commercial Editing",
      "Delivery & Codecs",
    ],
    careers: ["Video Editor", "Motion Designer", "Content Producer"],
  },
  {
    slug: "graphic-design-brand",
    title: "Graphic Design & Brand Identity",
    level: "Beginner → Pro",
    duration: "14 weeks",
    fee: "Fee on request",
    batch: "Mon / Wed · 6–9 PM",
    trainer: "Areeba Naveed",
    summary:
      "Type, grid and identity systems built in Photoshop and Illustrator, ending with a full brand book.",
    curriculum: [
      "Adobe Photoshop",
      "Illustrator",
      "Typography & Grid",
      "Logo Design",
      "Brand Identity Systems",
      "Packaging",
      "Social Media Design",
      "Presentation Design",
    ],
    careers: ["Brand Designer", "Studio Designer", "Art Director"],
  },
  {
    slug: "content-creation-freelancing",
    title: "Content Creation & Freelancing",
    level: "All levels",
    duration: "8 weeks",
    fee: "Fee on request",
    batch: "Sat · 11 AM–4 PM",
    trainer: "Bilal Sohail",
    summary:
      "Build an audience, price your work properly and run a creative practice like a business.",
    curriculum: [
      "Content Strategy",
      "Shooting for Social",
      "Client Handling",
      "Pricing Your Work",
      "Marketing Yourself",
      "Contracts & Invoicing",
      "Portfolio Building",
      "Freelance Platforms",
    ],
    careers: ["Content Creator", "Freelance Creative", "Social Media Manager"],
  },
  {
    slug: "drone-aerial",
    title: "Drone & Aerial Cinematography",
    level: "Intermediate",
    duration: "6 weeks",
    fee: "Fee on request",
    batch: "Sun · 10 AM–2 PM",
    trainer: "Rameez Ahsan",
    summary:
      "Flight discipline, regulation, aerial composition and cinematic movement for commercial work.",
    curriculum: [
      "Flight Fundamentals",
      "Airspace & Regulation",
      "Aerial Composition",
      "Cinematic Moves",
      "Real Estate Aerials",
      "Post & Stabilisation",
    ],
    careers: ["Drone Operator", "Aerial Cinematographer"],
  },
];

export const courseSlugs = courses.map((course) => course.slug);

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export const academyHighlights: AcademyHighlight[] = [
  {
    icon: "users",
    title: "Cohorts of 12",
    copy: "Every student gets camera time and feedback.",
  },
  {
    icon: "award",
    title: "Certification",
    copy: "Graded portfolio review and Gilvero certificate.",
  },
  {
    icon: "clock",
    title: "Evening batches",
    copy: "Designed around jobs and university schedules.",
  },
];

export const coursesHeading = {
  eyebrow: "Courses",
  title: "Six programmes, one standard",
  copy: "Each programme includes overview, curriculum, duration, batch timing, trainer, certification and career routes.",
};

export const studentOutcomesHeading = {
  eyebrow: "Student outcomes",
  title: "940 graduates. 68% working within a year.",
};

export const studentOutcomes: StudentOutcome[] = [
  {
    quote: "The client-handling module is the reason I stopped underquoting.",
    attribution: "Fatima Noor · Design, 2025",
  },
  {
    quote: "I shot my first hotel campaign eight weeks after graduating.",
    attribution: "Ahsan Raza · Photography, 2024",
  },
  {
    quote: "My reels went from 2k to 400k views in three months.",
    attribution: "Hassan Ali · Content, 2025",
  },
];

export const certificationCopy =
  "Every graduate completes a supervised final project, receives a graded portfolio review and a Gilvero Academy certificate. Top performers are invited to assist on live commercial shoots.";

export const studentProjectsCopy =
  "Recent cohort work includes a restaurant menu campaign, a 90-second brand film for a local retailer, and a full identity system for a bakery — all shot and delivered to real clients.";
