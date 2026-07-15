// data/resources.ts
import type { CategoryMeta, Resource, ResourceCategory } from "@/types/resource";

export const categories: CategoryMeta[] = [
  {
    slug: "personal-branding",
    label: "Personal Branding",
    headline: "Become the founder nobody can ignore.",
    description:
      "Positioning, content, and visibility systems that turn your name into your best sales asset.",
  },
  {
    slug: "ai-automation",
    label: "AI Automation",
    headline: "Let systems do the repetitive work.",
    description:
      "Practical AI workflows that save hours every week without an engineering team.",
  },
  {
    slug: "crm",
    label: "CRM & Pipelines",
    headline: "Never lose a lead again.",
    description:
      "Pipeline structures and follow up systems that turn conversations into clients.",
  },
  {
    slug: "digital-marketing",
    label: "Digital Marketing",
    headline: "Turn attention into pipeline.",
    description:
      "SEO, content, and campaign systems built for founders and B2B service businesses.",
  },
  {
    slug: "staffing",
    label: "Staffing & Hiring",
    headline: "Hire right the first time.",
    description:
      "Scorecards and hiring systems that protect you from expensive hiring mistakes.",
  },
];

export const resources: Resource[] = [
  {
    slug: "founder-linkedin-profile-checklist",
    title: "The Founder LinkedIn Profile Checklist",
    promise:
      "Turn your LinkedIn profile into an inbound lead machine in 12 minutes with the exact 21 point audit we run for clients.",
    description:
      "Most founder profiles read like resumes. Buyers do not hire resumes, they hire authority. This checklist walks you through the 21 fixes we make on every client profile: the headline formula, banner, featured section, about section story arc, and the credibility signals buyers scan for in the first 8 seconds.",
    category: "personal-branding",
    type: "Checklist",
    time: "12 min",
    bullets: [
      "The headline formula that says what you do and who it is for in under 120 characters",
      "The 8 second test: the 3 things buyers check before they read anything else",
      "The about section story arc that turns visitors into DMs",
      "A featured section setup that does the selling while you sleep",
      "21 checkboxes you can finish top to bottom in 12 minutes",
    ],
    whoFor: [
      "Founders who get profile views but no conversations",
      "Consultants whose profile still reads like a CV",
      "Anyone posting content that leads to a weak profile",
    ],
    whoNotFor: [
      "People looking for follower growth hacks",
      "Brands without a real service or offer yet",
    ],
    faqs: [
      {
        question: "Is this really free?",
        answer:
          "Yes. It is the same audit we run in paid engagements. We give it away because founders who fix their profile usually want help with the next step, which is content.",
      },
      {
        question: "How long does it take to implement?",
        answer:
          "12 minutes for the essential fixes. The full 21 points take about an hour.",
      },
    ],
    related: ["100-linkedin-hooks", "founder-story-framework"],
    featured: true,
    filePath: "resources/founder-linkedin-profile-checklist.pdf",
    keywords: ["linkedin", "profile", "personal branding", "founder", "audit"],
  },
  {
    slug: "100-linkedin-hooks",
    title: "100 LinkedIn Hooks That Stop the Scroll",
    promise:
      "Never stare at a blank page again. 100 proven first lines, organized by post type, ready to steal.",
    description:
      "The first line decides whether your post lives or dies. We collected and categorized 100 hooks from top performing founder content: story hooks, contrarian hooks, list hooks, and result hooks. You can open every post with a line that earns the click on see more.",
    category: "personal-branding",
    type: "Swipe File",
    time: "5 min",
    bullets: [
      "100 hooks across 8 categories: story, contrarian, result, mistake, list, question, statistic, and POV",
      "A fill in the blanks format so you can swap in your industry and post",
      "The 3 hook mistakes that kill reach instantly",
      "Works for LinkedIn, X, and newsletter intros",
    ],
    whoFor: [
      "Founders who know what to say but not how to start",
      "Anyone whose posts die at 5 likes",
      "Ghostwriters and marketers writing for executives",
    ],
    whoNotFor: ["People who want AI to write entire posts for them"],
    faqs: [
      {
        question: "Are these copied from viral posts?",
        answer:
          "They are patterns, not copies. Each hook is a reusable structure with the specifics stripped out, so it becomes yours when you fill it in.",
      },
    ],
    related: ["founder-linkedin-profile-checklist", "30-day-content-calendar"],
    filePath: "resources/100-linkedin-hooks.pdf",
    keywords: ["hooks", "linkedin", "content", "writing", "viral"],
  },
  {
    slug: "founder-story-framework",
    title: "The Founder Story Framework",
    promise:
      "Turn your background into a story buyers remember with the 5 part narrative worksheet from our positioning sprints.",
    description:
      "People forget features. They remember stories. This worksheet extracts the one founder story you should be telling: the struggle, the shift, and the system. Then it shapes that story into an about section, a keynote intro, and a pinned post.",
    category: "personal-branding",
    type: "Worksheet",
    time: "20 min",
    bullets: [
      "The 5 part arc: context, struggle, shift, system, stakes",
      "12 extraction questions that surface stories you forgot you had",
      "Three output formats: LinkedIn about section, short bio, and pinned post",
      "A real before and after example included",
    ],
    whoFor: [
      "Founders who freeze when asked about their story",
      "Experts whose credentials are strong but forgettable",
      "Anyone building a brand on trust",
    ],
    whoNotFor: ["Companies wanting corporate brand messaging, this one is personal"],
    faqs: [
      {
        question: "What if my story feels ordinary?",
        answer:
          "Ordinary stories told with structure beat dramatic stories told badly. The framework works precisely because it does not need drama.",
      },
    ],
    related: ["founder-linkedin-profile-checklist", "100-linkedin-hooks"],
    filePath: "resources/founder-story-framework.pdf",
    keywords: ["story", "storytelling", "positioning", "founder", "brand"],
  },
  {
    slug: "ai-readiness-self-audit",
    title: "The AI Readiness Self Audit",
    promise:
      "Find out which parts of your business AI can automate today. Score yourself across 6 areas in 10 minutes.",
    description:
      "Most businesses either overhype AI or ignore it. This audit cuts through both. Score your operations across 6 areas: lead handling, content, admin, reporting, support, and follow up. You get a clear picture of where automation pays off first.",
    category: "ai-automation",
    type: "Worksheet",
    time: "10 min",
    bullets: [
      "A 6 area scoring system with clear 1 to 5 criteria",
      "The automation priority matrix: impact versus effort",
      "Red flags that mean you are not ready to automate yet",
      "The first 3 automations that pay for themselves fastest",
    ],
    whoFor: [
      "Founders drowning in repetitive admin work",
      "Teams curious about AI but unsure where to start",
      "Businesses with leads slipping through the cracks",
    ],
    whoNotFor: ["Developers looking for technical AI implementation guides"],
    faqs: [
      {
        question: "Do I need technical skills to use this?",
        answer:
          "None. It is a business audit, not a technical one. You score how work happens today and the matrix shows where automation helps most.",
      },
    ],
    related: ["founder-gpt-prompt-pack", "crm-implementation-checklist"],
    filePath: "resources/ai-readiness-self-audit.pdf",
    keywords: ["ai", "automation", "audit", "operations", "efficiency"],
  },
  {
    slug: "founder-gpt-prompt-pack",
    title: "The Founder GPT Prompt Pack",
    promise:
      "25 copy and paste prompts that make ChatGPT work like a strategist, ghostwriter, and analyst instead of a generic intern.",
    description:
      "Generic prompts get generic output. This pack contains 25 battle tested prompts we use daily for positioning, content repurposing, offer copy, competitor analysis, and follow up emails. Each one includes the context structure that makes AI output actually usable.",
    category: "ai-automation",
    type: "Prompt Pack",
    time: "5 min",
    bullets: [
      "25 prompts across strategy, content, sales, and operations",
      "The CRIT structure: context, role, instructions, tone",
      "A repurposing chain that turns 1 long post into 10 pieces of content",
      "Works with ChatGPT, Claude, and Gemini",
    ],
    whoFor: [
      "Founders using AI but unhappy with generic output",
      "Solo marketers doing the work of a full team",
      "Anyone repurposing content across channels",
    ],
    whoNotFor: ["Prompt engineers, this pack is practical rather than technical"],
    faqs: [
      {
        question: "Which AI tools does this work with?",
        answer:
          "All major ones. The prompts are structured around context and instructions, which every model responds to.",
      },
    ],
    related: ["ai-readiness-self-audit", "30-day-content-calendar"],
    filePath: "resources/founder-gpt-prompt-pack.pdf",
    keywords: ["prompts", "chatgpt", "ai", "content", "productivity"],
  },
  {
    slug: "sales-pipeline-template",
    title: "The Service Business Sales Pipeline Template",
    promise:
      "The exact 7 stage pipeline we install for clients, with stage definitions, exit criteria, and follow up timing.",
    description:
      "Most service businesses track deals in their head and lose them there. This template gives you the 7 stages, what must happen before a deal moves forward, and the follow up cadence that revives stalled conversations.",
    category: "crm",
    type: "Template",
    time: "15 min",
    bullets: [
      "7 stages from first touch to closed, each with clear exit criteria",
      "The follow up cadence: day 2, day 5, day 12, day 30",
      "Deal health signals that tell you when to push and when to walk away",
      "Works in any CRM: HubSpot, Notion, Pipedrive, or a spreadsheet",
    ],
    whoFor: [
      "Founders closing deals from memory and losing track",
      "Service businesses with leads that go silent",
      "Teams setting up their first real CRM",
    ],
    whoNotFor: ["Online stores, this template is built for service sales"],
    faqs: [
      {
        question: "Do I need a specific CRM tool?",
        answer:
          "No. The template defines the process. You can run it in any CRM or even a spreadsheet. The stages and criteria are what matter.",
      },
    ],
    related: ["crm-implementation-checklist", "ai-readiness-self-audit"],
    filePath: "resources/sales-pipeline-template.pdf",
    keywords: ["sales", "pipeline", "crm", "follow up", "deals"],
  },
  {
    slug: "crm-implementation-checklist",
    title: "The CRM Implementation Checklist",
    promise:
      "Set up a CRM your team actually uses. The 18 steps that separate adopted systems from abandoned ones.",
    description:
      "Most CRMs fail in month two. Not because of the tool, but because of the setup. This checklist covers the 18 implementation steps we follow on client projects: field structure, pipeline design, automation rules, and the adoption rituals that keep data clean.",
    category: "crm",
    type: "Checklist",
    time: "10 min",
    bullets: [
      "18 steps across setup, migration, automation, and adoption",
      "The 5 fields every lead record needs and the 10 you should delete",
      "Automation rules that save 3 or more hours every week",
      "The weekly ritual that keeps your CRM alive",
    ],
    whoFor: [
      "Businesses setting up their first CRM",
      "Teams whose CRM became a graveyard of stale data",
      "Founders switching CRM tools",
    ],
    whoNotFor: ["Enterprise teams with dedicated RevOps staff"],
    faqs: [
      {
        question: "Which CRM is this for?",
        answer:
          "It works with any tool. The steps apply to HubSpot, Zoho, Pipedrive, Salesforce, and Notion based systems alike.",
      },
    ],
    related: ["sales-pipeline-template", "ai-readiness-self-audit"],
    filePath: "resources/crm-implementation-checklist.pdf",
    keywords: ["crm", "implementation", "setup", "hubspot", "automation"],
  },
  {
    slug: "service-business-seo-checklist",
    title: "The Service Business SEO Checklist",
    promise:
      "Rank for searches your buyers actually make. 25 fixes covering technical SEO, content, and AI search visibility.",
    description:
      "Service business SEO is not about traffic. It is about the 50 searches a month that turn into calls. This checklist covers the 25 highest leverage fixes: site structure, service page optimization, local signals, and the structured data that gets you cited by ChatGPT and AI Overviews.",
    category: "digital-marketing",
    type: "Checklist",
    time: "15 min",
    bullets: [
      "25 fixes ranked by impact so you can start at the top",
      "A service page structure that converts searchers into callers",
      "AI search visibility: get cited by ChatGPT and Google AI Overviews",
      "The 10 minute technical audit anyone can run",
    ],
    whoFor: [
      "Service businesses invisible on Google",
      "Founders paying for ads because organic brings nothing",
      "Marketers adapting to AI search",
    ],
    whoNotFor: ["Content sites chasing traffic volume"],
    faqs: [
      {
        question: "How long until results show?",
        answer:
          "Technical fixes can move rankings in weeks. Content gains typically compound over 3 to 6 months.",
      },
    ],
    related: ["30-day-content-calendar", "founder-linkedin-profile-checklist"],
    filePath: "resources/service-business-seo-checklist.pdf",
    keywords: ["seo", "search", "google", "ai search", "ranking"],
  },
  {
    slug: "30-day-content-calendar",
    title: "The 30 Day Founder Content Calendar",
    promise:
      "A month of content mapped out. 30 post prompts across 5 proven formats so you never skip a day for lack of ideas.",
    description:
      "Consistency beats brilliance. This calendar gives you 30 days of specific post prompts rotating through 5 formats: story, lesson, framework, opinion, and proof. Your content builds authority instead of noise.",
    category: "digital-marketing",
    type: "Template",
    time: "10 min",
    bullets: [
      "30 specific prompts instead of vague themes",
      "A 5 format rotation that balances authority and relatability",
      "The 20 minute batching system: write a week in one sitting",
      "A repurposing map that turns every post into 3 pieces",
    ],
    whoFor: [
      "Founders who post for 2 weeks then vanish",
      "Anyone who spends more time deciding than writing",
      "Marketers managing the presence of an executive",
    ],
    whoNotFor: ["Brands that need daily video scripts, this calendar is text first"],
    faqs: [
      {
        question: "Which platforms does this cover?",
        answer:
          "Built for LinkedIn first, but the prompts work on X and in newsletters with minor tweaks.",
      },
    ],
    related: ["100-linkedin-hooks", "founder-gpt-prompt-pack"],
    filePath: "resources/30-day-content-calendar.pdf",
    keywords: ["content", "calendar", "linkedin", "consistency", "posts"],
  },
  {
    slug: "hiring-scorecard",
    title: "The Hiring Scorecard Template",
    promise:
      "Stop hiring on gut feeling. The scoring system that catches red flags before they cost you 6 months of salary.",
    description:
      "A bad hire costs 3 to 6 months of salary and a year of momentum. This scorecard forces clarity before interviews: outcomes over responsibilities, weighted scoring criteria, and the structured questions that reveal how candidates actually work.",
    category: "staffing",
    type: "Template",
    time: "15 min",
    bullets: [
      "Outcome based role definition: what success looks like at 90 days",
      "Weighted scoring across skills, drive, and culture fit",
      "12 structured interview questions with notes on what to listen for",
      "The red flag checklist most interviewers miss",
    ],
    whoFor: [
      "Founders making their first key hires",
      "Businesses burned by a recent bad hire",
      "Teams scaling fast without an HR department",
    ],
    whoNotFor: ["Enterprise recruiters with existing ATS scorecards"],
    faqs: [
      {
        question: "Does this work for freelancers and contractors too?",
        answer:
          "Yes. Shorten the 90 day outcomes to 30 days and the same scoring applies.",
      },
    ],
    related: ["crm-implementation-checklist", "ai-readiness-self-audit"],
    filePath: "resources/hiring-scorecard.pdf",
    keywords: ["hiring", "recruitment", "scorecard", "interview", "staffing"],
  },
];

/* ---------- Helpers ---------- */

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return resources.filter((r) => r.category === category);
}

export function getFeaturedResource(): Resource {
  return resources.find((r) => r.featured) ?? resources[0];
}

export function getRelatedResources(resource: Resource): Resource[] {
  return resource.related
    .map((slug) => getResource(slug))
    .filter((r): r is Resource => Boolean(r));
}

export function getCategoryMeta(slug: ResourceCategory): CategoryMeta {
  return categories.find((c) => c.slug === slug) ?? categories[0];
}
