/** Frequently asked questions, recovered in full from the original site bundle. */

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqGroup = {
  topic: string;
  items: FaqItem[];
};

export const faqHeader = {
  eyebrow: "Questions",
  title: "Answers before you ask.",
  copy: "Pricing, delivery, the Academy and the print atelier — the questions every client and student asks, answered straight.",
} as const;

export const faqGroups: FaqGroup[] = [
  {
    topic: "Studio & Delivery",
    items: [
      {
        question: "What does a Gilvero engagement typically cost?",
        answer:
          "Every project is scoped individually. Wedding coverage, brand campaigns and property libraries each carry their own crew, gear and post requirements — send a brief and you will receive a written quote within 24 hours.",
      },
      {
        question: "Do you travel outside Pakistan?",
        answer:
          "Yes. We have delivered work in 18 countries. Travel, visa and accommodation are quoted separately and transparently.",
      },
      {
        question: "How long is delivery?",
        answer:
          "Commercial stills: 5–10 working days. Wedding photography: 21 days. Films: 4–6 weeks. Rush delivery is available on request.",
      },
      {
        question: "Do you shoot RAW files over to clients?",
        answer:
          "Selected RAW hand-over is possible on commercial contracts. For most engagements we deliver fully graded, retouched masters plus web-optimised sets.",
      },
    ],
  },
  {
    topic: "Academy",
    items: [
      {
        question: "Is the Academy suitable for complete beginners?",
        answer:
          "Most of our courses start from zero. You need a willingness to shoot every week — equipment can be borrowed from the studio during class hours.",
      },
      {
        question: "Do Academy students receive a certificate?",
        answer:
          "Yes. Every course ends with a graded portfolio review and a Gilvero Academy certificate, plus placement support with our partner studios.",
      },
    ],
  },
  {
    topic: "Prints & Client Area",
    items: [
      {
        question: "Can I order prints from my own photographs?",
        answer:
          "Absolutely. Upload your file in the Print Store, choose size, paper and frame, and we will send a soft proof before printing.",
      },
      {
        question: "How do I access my client gallery?",
        answer:
          "Every project comes with a private Client Area login containing galleries, invoices, downloads and delivery status.",
      },
    ],
  },
];
