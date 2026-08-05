export type PostCategory =
  | "Photography Tips"
  | "Camera Reviews"
  | "Editing Tips"
  | "Business"
  | "Student Stories"
  | "Behind the Scenes";

export type Post = {
  slug: string;
  title: string;
  category: PostCategory;
  date: string;
  read: string;
  excerpt: string;
};

export type ArticleBlock =
  | { type: "lead"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string };

export const blogCategories = [
  "All",
  "Photography Tips",
  "Camera Reviews",
  "Editing Tips",
  "Business",
  "Student Stories",
  "Behind the Scenes",
] as const;

export type BlogCategoryFilter = (typeof blogCategories)[number];

export const posts: Post[] = [
  {
    slug: "lighting-for-black-on-black",
    title: "Lighting for Black on Black",
    category: "Photography Tips",
    date: "12 July 2026",
    read: "7 min",
    excerpt:
      "How to keep texture alive when the garment, the backdrop and the mood are all the same colour.",
  },
  {
    slug: "camera-review-full-frame-2026",
    title: "The Full-Frame Bodies We Actually Shoot in 2026",
    category: "Camera Reviews",
    date: "28 June 2026",
    read: "9 min",
    excerpt: "Four bodies, 300 shoot days, and the honest verdict on each of them.",
  },
  {
    slug: "pricing-creative-work",
    title: "Pricing Creative Work Without Apologising",
    category: "Business",
    date: "09 June 2026",
    read: "6 min",
    excerpt: "A pricing framework for photographers who keep undercharging out of politeness.",
  },
  {
    slug: "grading-warm-neutrals",
    title: "Grading Warm Neutrals That Survive Print",
    category: "Editing Tips",
    date: "22 May 2026",
    read: "8 min",
    excerpt: "Screen-to-paper colour management, explained without the jargon.",
  },
  {
    slug: "from-student-to-studio",
    title: "From Student to Studio in Fourteen Months",
    category: "Student Stories",
    date: "03 May 2026",
    read: "5 min",
    excerpt: "Ahsan enrolled with a borrowed body. Here is exactly what he did next.",
  },
  {
    slug: "behind-the-obsidian-shoot",
    title: "Behind the Obsidian Hotel Shoot",
    category: "Behind the Scenes",
    date: "17 April 2026",
    read: "10 min",
    excerpt: "Nine nights, one occupied property and a very specific lighting rule.",
  },
];

/**
 * The original site renders one shared editorial body for every journal entry —
 * the per-post data carries only the card/header meta above.
 */
export const articleBody: ArticleBlock[] = [
  {
    type: "lead",
    text: "Most of what makes an image work happens before the shutter — in the decision about where the light comes from, and what it is allowed to touch.",
  },
  { type: "heading", text: "Start with the constraint" },
  {
    type: "paragraph",
    text: "Every brief carries one hard limitation: a room you cannot relight, a fabric that eats detail, a schedule that will not move. Naming that constraint out loud, on the call, is what separates a production from a hopeful afternoon.",
  },
  {
    type: "paragraph",
    text: "Once it is named, the approach usually follows. Hard light for texture. Negative fill for separation. A longer lens when the room refuses to cooperate.",
  },
  { type: "heading", text: "Then build the frame backwards" },
  {
    type: "paragraph",
    text: "We block the final composition first and work back to the lighting, not the other way around. It is slower for the first twenty minutes and considerably faster for the remaining six hours.",
  },
  { type: "quote", text: "If the frame only works because of the grade, it does not work." },
  { type: "heading", text: "Finish in the room it will live in" },
  {
    type: "paragraph",
    text: "Screen-referred work looks different on paper. We soft proof against the intended paper profile before signing anything off — which is exactly why the print atelier exists in the same building as the grading suite.",
  },
];

export const postSlugs = posts.map((post) => post.slug);

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
