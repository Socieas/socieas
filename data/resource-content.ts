// data/resource-content.ts

export type ChecklistItem = {
  title: string;
  text: string;
};

export type ContentSection = {
  title: string;
  intro?: string;
  numbered?: string[];
  checklist?: ChecklistItem[];
};

export type ScoreBand = {
  range: string;
  label: string;
  text: string;
};

export type ResourceContent = {
  slug: string;
  intro: string[];
  sections: ContentSection[];
  scoring?: {
    title: string;
    intro: string;
    bands: ScoreBand[];
  };
};

export const resourceContents: ResourceContent[] = [
  {
    slug: "founder-linkedin-profile-checklist",
    intro: [
      "A buyer who lands on your profile decides in about 8 seconds whether to keep reading or leave. Everything in this checklist strengthens what they see in those 8 seconds. Work top to bottom and tick each box as you go.",
    ],
    sections: [
      {
        title: "Before you start: The 8 Second Test",
        intro:
          "In their first 8 seconds, buyers check exactly 3 things:",
        numbered: [
          "Your photo and banner. Do you look like someone worth listening to?",
          "Your headline. Do you solve a problem they have?",
          "Your proof. Featured section, activity, and social signals.",
        ],
      },
      {
        title: "Part 1: The First Impression",
        checklist: [
          {
            title: "Profile photo passes the stranger test",
            text: "Your face fills about 60 percent of the frame, the background is clean, and you are looking at the camera. No logos, no sunglasses, no cropped group photos.",
          },
          {
            title: "Banner states your positioning",
            text: "One sentence about who you help and the outcome you deliver, plus one proof point. Make it free in Canva at 1584 x 396 pixels. An empty banner is a billboard you are paying for and leaving blank.",
          },
          {
            title: "Headline follows the formula",
            text: "I help [WHO] get [OUTCOME] through [SYSTEM]. Under 120 characters. Include the keyword your buyers search, like CRM, personal branding, or AI automation. Job titles do not sell. Outcomes sell.",
          },
          {
            title: "Name field contains only your name",
            text: "No emojis, no CEO | Visionary | Speaker. Every extra word makes you look less senior, not more.",
          },
          {
            title: "Custom URL is claimed",
            text: "linkedin.com/in/yourname. Takes 30 seconds in settings and looks professional everywhere you share it.",
          },
          {
            title: "Follow button is set as primary",
            text: "This turns profile visitors into an audience that sees your content, even when they are not ready to connect.",
          },
        ],
      },
      {
        title: "Part 2: The About Section",
        checklist: [
          {
            title: "The first 3 lines hook",
            text: "Only the first 3 lines show before see more. Name the problem your buyer wakes up with. Never open with I am a passionate professional.",
          },
          {
            title: "Your story follows the arc",
            text: "Three short paragraphs: the struggle you saw, the shift you made, the system you built. People forget titles. They remember stories.",
          },
          {
            title: "One paragraph of proof",
            text: "Numbers, client types, results. We have built pipelines for 40+ service businesses beats we are experts in CRM.",
          },
          {
            title: "Formatting is skimmable",
            text: "One to two line paragraphs with white space between them. A wall of text is a wall people walk away from.",
          },
          {
            title: "It ends with one clear next step",
            text: "Tell readers exactly what to do: message you, visit your site, or grab a free resource. One CTA, not three.",
          },
          {
            title: "Keywords appear naturally",
            text: "LinkedIn search is a lead source. Weave in the 3 terms your buyers actually search for.",
          },
        ],
      },
      {
        title: "Part 3: Featured and Experience",
        checklist: [
          {
            title: "Featured slot 1 is a free resource",
            text: "Give value before you ask for anything. A checklist or template with your branding works best.",
          },
          {
            title: "Featured slot 2 is proof",
            text: "A case study, a testimonial, or your best performing post.",
          },
          {
            title: "Featured slot 3 is a way to book a call",
            text: "Make the path from interested to booked as short as possible.",
          },
          {
            title: "Experience shows outcomes, not duties",
            text: "Each role lists one result with a number. Grew inbound leads 3x in 6 months beats a paragraph of responsibilities.",
          },
          {
            title: "Your current role links to a real company page",
            text: "A blank grey building icon quietly costs you trust.",
          },
        ],
      },
      {
        title: "Part 4: Credibility Signals",
        checklist: [
          {
            title: "At least 3 recent recommendations",
            text: "Ask your last 3 happy clients this week. Most people never ask. That is why most profiles have none.",
          },
          {
            title: "Top 3 skills match your positioning",
            text: "Pin the skills you want to be hired for, not everything you have ever done.",
          },
          {
            title: "Your last post is under 2 weeks old",
            text: "An inactive profile tells buyers you are not really in the game. Consistency is a credibility signal.",
          },
          {
            title: "Contact info is complete",
            text: "Email visible, website linked. Never make an interested buyer hunt for a way to reach you.",
          },
        ],
      },
    ],
    scoring: {
      title: "Your Score",
      intro: "Count your checkmarks above:",
      bands: [
        {
          range: "0 to 10",
          label: "Invisible",
          text: "Your profile is costing you deals right now. Fix Part 1 today.",
        },
        {
          range: "11 to 17",
          label: "Solid foundation",
          text: "You look credible but you are leaking leads. Finish Parts 3 and 4 this week.",
        },
        {
          range: "18 to 21",
          label: "Lead machine",
          text: "Your profile works while you sleep. Now the bottleneck is content.",
        },
      ],
    },
  },
];

export function getResourceContent(slug: string): ResourceContent | undefined {
  return resourceContents.find((c) => c.slug === slug);
}
