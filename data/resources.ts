// data/resources.ts

import type { CategoryMeta, Resource } from "@/types/resource";

export const categories: CategoryMeta[] = [
  {
    slug: "personal-branding",
    label: "Personal Branding",
    headline: "Become the founder buyers already trust before the first call.",
    description:
      "Profile systems, content frameworks, and storytelling tools that turn your name into your best sales channel.",
  },
  {
    slug: "ai-automation",
    label: "AI Automation",
    headline: "Put your business on autopilot without losing the human touch.",
    description:
      "Audits, prompts, and playbooks that show you exactly where AI saves you hours every single week.",
  },
  {
    slug: "crm",
    label: "CRM Systems",
    headline: "Stop losing deals in spreadsheets and forgotten follow ups.",
    description:
      "Pipeline templates and implementation systems that make sure no lead ever slips through the cracks again.",
  },
  {
    slug: "digital-marketing",
    label: "Digital Marketing",
    headline: "Build growth systems that compound while you sleep.",
    description:
      "SEO checklists and content systems built for service businesses that want inbound leads, not vanity metrics.",
  },
  {
    slug: "staffing",
    label: "Staffing",
    headline: "Hire people who perform, not people who interview well.",
    description:
      "Scorecards and hiring systems that take the guesswork and gut feeling out of building your team.",
  },
];

export const resources: Resource[] = [
  {
    slug: "founder-linkedin-profile-checklist",
    title: "The Founder LinkedIn Profile Checklist",
    promise:
      "21 fixes that turn your LinkedIn profile into a lead machine. Most founders can finish all of them in one afternoon.",
    description:
      "Buyers check your LinkedIn profile before they ever reply to you. This checklist walks through the 21 elements that decide whether they see an authority or just another vendor, from your banner and headline to your featured section and credibility signals.",
    category: "personal-branding",
    type: "Checklist",
    time: "15 min",
    bullets: [
      "The 8 Second Test buyers run on every profile they visit",
      "A headline formula that sells outcomes instead of job titles",
      "The 3 featured slots that quietly book calls for you",
      "A scoring system that tells you exactly what to fix first",
    ],
    whoFor: [
      "Founders whose profile still reads like a resume",
      "Consultants and agency owners who sell with trust",
      "Anyone posting content that gets views but no leads",
    ],
    whoNotFor: [
      "Anyone looking for follower growth hacks",
      "Founders who never plan to use LinkedIn for business",
    ],
    faqs: [
      {
        question: "How long does it take to complete?",
        answer:
          "About 15 minutes to score yourself and one afternoon to apply every fix. Most items take under 10 minutes each.",
      },
      {
        question: "Does this work if I have a small network?",
        answer:
          "Yes. Your profile converts visitors regardless of your follower count. A strong profile with 500 connections outperforms a weak profile with 20,000.",
      },
      {
        question: "Is this really free?",
        answer:
          "Completely. No payment step, no trial. We share our systems openly because some readers later become clients.",
      },
    ],
    related: ["100-linkedin-hooks", "founder-story-framework"],
    featured: true,
    filePath: "/resources/view/founder-linkedin-profile-checklist",
    keywords: [
      "linkedin profile checklist",
      "founder personal branding",
      "linkedin for founders",
      "optimize linkedin profile",
    ],
  },
  {
    slug: "100-linkedin-hooks",
    title: "100 LinkedIn Hooks That Stop the Scroll",
    promise:
      "100 proven first lines across 8 categories. Fill in the blanks and never stare at a blank post again.",
    description:
      "The first line decides whether your post lives or dies. This swipe file gives you 100 field tested hook patterns across story, contrarian, result, mistake, list, question, statistic, and point of view formats, each stripped to a template you can make yours in seconds.",
    category: "personal-branding",
    type: "Swipe File",
    time: "10 min",
    bullets: [
      "8 hook categories matched to 8 types of posts",
      "The 3 hook mistakes that quietly kill your reach",
      "Fill in the blank patterns you can use today",
      "Works for founders in any industry",
    ],
    whoFor: [
      "Founders who post but get ignored",
      "Anyone who spends 30 minutes writing a first line",
      "Ghostwriters and marketers writing for executives",
    ],
    whoNotFor: [
      "Anyone looking for copy paste viral posts",
      "People who post without a business goal",
    ],
    faqs: [
      {
        question: "Are these hooks proven?",
        answer:
          "Every pattern is modeled on formats that consistently perform on LinkedIn. The specifics are yours, which is exactly why they work.",
      },
      {
        question: "Will my posts sound like everyone else?",
        answer:
          "No. These are structures, not scripts. Two founders using the same pattern with their own stories produce completely different posts.",
      },
      {
        question: "How should I use the file?",
        answer:
          "Pick the category that matches your post, choose a hook, fill in the blanks, then write the post to pay off the promise the hook makes.",
      },
    ],
    related: ["founder-linkedin-profile-checklist", "30-day-content-calendar"],
    filePath: "/resources/view/100-linkedin-hooks",
    keywords: [
      "linkedin hooks",
      "linkedin post ideas",
      "content hooks swipe file",
      "linkedin first line",
    ],
  },
  {
    slug: "founder-story-framework",
    title: "The Founder Story Framework",
    promise:
      "Turn your journey into a story buyers remember and repeat. One worksheet, one afternoon, one story you will use for years.",
    description:
      "People forget features and prices. They remember stories. This worksheet walks you through the exact narrative arc used by the most trusted founders online, then helps you compress it into versions for your About section, your bio, and your sales calls.",
    category: "personal-branding",
    type: "Worksheet",
    time: "20 min",
    bullets: [
      "The 5 beat story arc that builds instant trust",
      "Prompts that surface the moments worth telling",
      "Short, medium, and long versions of your story",
      "Where to deploy each version for maximum effect",
    ],
    whoFor: [
      "Founders who freeze when asked to talk about themselves",
      "Anyone whose About section reads like a job description",
      "Experts who feel invisible next to louder competitors",
    ],
    whoNotFor: [
      "Anyone looking to invent a fake origin story",
      "Brands with no individual founder face",
    ],
    faqs: [
      {
        question: "What if my story feels ordinary?",
        answer:
          "Ordinary stories told with specificity beat dramatic stories told vaguely. The worksheet is designed to find the specifics that make yours land.",
      },
      {
        question: "Do I need to share personal struggles?",
        answer:
          "Only what you are comfortable with. The framework works with professional turning points just as well as personal ones.",
      },
      {
        question: "How long until I can use it?",
        answer:
          "One sitting. Around 20 minutes of guided questions, then a short edit pass to tighten your three versions.",
      },
    ],
    related: ["founder-linkedin-profile-checklist", "100-linkedin-hooks"],
    filePath: "/resources/view/founder-story-framework",
    keywords: [
      "founder story framework",
      "personal brand storytelling",
      "about section template",
      "founder narrative",
    ],
  },
  {
    slug: "ai-readiness-self-audit",
    title: "The AI Readiness Self Audit",
    promise:
      "Find out exactly where AI can save you 10+ hours a week, and where it would just create expensive noise.",
    description:
      "Most founders either fear AI or buy tools they never use. This self audit walks through your operations area by area, scores your automation potential, and shows you which 3 processes to automate first for the fastest payback.",
    category: "ai-automation",
    type: "Worksheet",
    time: "15 min",
    bullets: [
      "A process map of the 6 areas AI helps service businesses most",
      "A scoring grid that ranks your automation opportunities",
      "The 3 signs a task should stay human",
      "Your personal automate first shortlist",
    ],
    whoFor: [
      "Founders drowning in repetitive admin work",
      "Teams curious about AI but unsure where to start",
      "Businesses that bought AI tools that now sit unused",
    ],
    whoNotFor: [
      "Anyone expecting AI to replace client relationships",
      "Teams looking for a specific tool review",
    ],
    faqs: [
      {
        question: "Do I need technical skills?",
        answer:
          "None. The audit is about your processes, not code. The output is a prioritized list you can act on with simple tools.",
      },
      {
        question: "Which AI tools does it recommend?",
        answer:
          "It is tool agnostic on purpose. Tools change monthly. The audit finds the processes worth automating, which stays true no matter which tool you pick.",
      },
      {
        question: "How accurate is the scoring?",
        answer:
          "It uses the same criteria we apply in client automation projects: frequency, time cost, error risk, and judgment required.",
      },
    ],
    related: ["founder-gpt-prompt-pack", "crm-implementation-checklist"],
    filePath: "/resources/view/ai-readiness-self-audit",
    keywords: [
      "ai readiness audit",
      "business automation assessment",
      "ai for service business",
      "what to automate first",
    ],
  },
  {
    slug: "founder-gpt-prompt-pack",
    title: "The Founder GPT Prompt Pack",
    promise:
      "Battle tested prompts that turn AI into your content writer, strategist, and analyst. Copy, paste, get results.",
    description:
      "Generic prompts get generic output. This pack contains the exact prompts we use for founder content, offer positioning, competitor analysis, and client communication, each with the context structure that makes AI output sound like you instead of a robot.",
    category: "ai-automation",
    type: "Prompt Pack",
    time: "10 min",
    bullets: [
      "Content prompts that keep your voice intact",
      "Strategy prompts for positioning and offers",
      "Analysis prompts that summarize calls and research",
      "The context recipe that makes every prompt sharper",
    ],
    whoFor: [
      "Founders using AI but underwhelmed by the output",
      "Solo operators who need leverage without hiring",
      "Marketers producing founder led content",
    ],
    whoNotFor: [
      "Anyone wanting AI to fully replace their judgment",
      "Teams with strict no AI policies",
    ],
    faqs: [
      {
        question: "Which AI tools do the prompts work with?",
        answer:
          "Any modern chat AI. The pack is written for ChatGPT style tools but the structure works everywhere.",
      },
      {
        question: "Will the output sound robotic?",
        answer:
          "That is exactly what the context recipe prevents. Each prompt forces the AI to use your voice, your audience, and your positioning.",
      },
      {
        question: "How is this different from free prompt lists?",
        answer:
          "These are complete working systems with context, constraints, and output formats, not one line instructions.",
      },
    ],
    related: ["ai-readiness-self-audit", "30-day-content-calendar"],
    filePath: "/resources/view/founder-gpt-prompt-pack",
    keywords: [
      "chatgpt prompts for founders",
      "ai prompt pack",
      "business prompts",
      "founder content prompts",
    ],
  },
  {
    slug: "sales-pipeline-template",
    title: "The Sales Pipeline Template",
    promise:
      "A ready to use pipeline with the exact stages, fields, and follow up rules that stop deals from dying in silence.",
    description:
      "Most service businesses do not lose deals to competitors. They lose them to forgotten follow ups. This template gives you a proven pipeline structure with clear stage definitions, the fields that actually matter, and follow up timing rules you can copy into any CRM or even a spreadsheet.",
    category: "crm",
    type: "Template",
    time: "25 min",
    bullets: [
      "7 pipeline stages with clear entry and exit rules",
      "The follow up cadence that revives silent deals",
      "The 5 fields worth tracking and the 20 that waste time",
      "Works in any CRM or a simple spreadsheet",
    ],
    whoFor: [
      "Founders managing deals from memory and inbox",
      "Teams whose CRM is a graveyard of stale leads",
      "Agencies and consultants with long sales cycles",
    ],
    whoNotFor: [
      "High volume ecommerce businesses",
      "Teams with a mature, working sales process",
    ],
    faqs: [
      {
        question: "Which CRM does this require?",
        answer:
          "None specifically. The structure works in HubSpot, Pipedrive, Notion, or a spreadsheet. The system matters more than the software.",
      },
      {
        question: "We have very few leads. Is this overkill?",
        answer:
          "The opposite. When leads are scarce, losing one to a forgotten follow up hurts more. This system makes every lead count.",
      },
      {
        question: "How long does setup take?",
        answer:
          "About 25 minutes to adapt the stages and rules to your business, then it runs as part of your normal week.",
      },
    ],
    related: ["crm-implementation-checklist", "hiring-scorecard"],
    filePath: "/resources/view/sales-pipeline-template",
    keywords: [
      "sales pipeline template",
      "crm pipeline stages",
      "follow up system",
      "service business sales process",
    ],
  },
  {
    slug: "crm-implementation-checklist",
    title: "The CRM Implementation Checklist",
    promise:
      "Roll out a CRM your team will actually use. Avoid the 8 mistakes that kill most implementations by month two.",
    description:
      "Most CRM projects fail quietly: the tool gets bought, half configured, then abandoned. This checklist sequences your rollout the right way, from data cleanup and stage design to team adoption and the weekly rituals that keep the system alive.",
    category: "crm",
    type: "Checklist",
    time: "20 min",
    bullets: [
      "The pre launch cleanup that prevents garbage data",
      "A rollout order that gets team buy in early",
      "The 8 mistakes that kill CRM adoption",
      "Weekly rituals that keep your pipeline honest",
    ],
    whoFor: [
      "Founders about to choose or switch CRMs",
      "Teams whose current CRM is half abandoned",
      "Operations leads tasked with making it stick",
    ],
    whoNotFor: [
      "Solo founders with fewer than 5 active deals",
      "Teams happy with their current working system",
    ],
    faqs: [
      {
        question: "Does this help me choose a CRM?",
        answer:
          "It includes the criteria that matter for service businesses, but its real job is making whichever CRM you pick actually work.",
      },
      {
        question: "We already failed once with a CRM. Will this be different?",
        answer:
          "Failed rollouts almost always skip the same steps: data cleanup, stage clarity, and adoption rituals. This checklist exists to force those steps.",
      },
      {
        question: "How long does a proper implementation take?",
        answer:
          "For most small teams, two focused weeks. The checklist spreads the work so nothing lands on one painful weekend.",
      },
    ],
    related: ["sales-pipeline-template", "ai-readiness-self-audit"],
    filePath: "/resources/view/crm-implementation-checklist",
    keywords: [
      "crm implementation checklist",
      "crm rollout plan",
      "crm adoption",
      "crm setup for small business",
    ],
  },
  {
    slug: "service-business-seo-checklist",
    title: "The Service Business SEO Checklist",
    promise:
      "The exact SEO actions that bring service businesses inbound leads, ranked by impact so you never waste a weekend on the wrong task.",
    description:
      "SEO advice is written for bloggers and ecommerce stores, not service businesses. This checklist covers what actually moves the needle for firms that sell expertise: service page structure, local signals, proof content, and the technical basics that quietly decide your rankings.",
    category: "digital-marketing",
    type: "Checklist",
    time: "30 min",
    bullets: [
      "Service page structure that ranks and converts",
      "The local and trust signals Google rewards",
      "Content types that attract buyers, not just readers",
      "Technical basics explained in plain language",
    ],
    whoFor: [
      "Founders whose website brings zero inbound leads",
      "Service businesses competing against bigger firms",
      "Marketers who inherited a site that never ranked",
    ],
    whoNotFor: [
      "Ecommerce stores and content publishers",
      "Anyone expecting rankings within a week",
    ],
    faqs: [
      {
        question: "How technical is this?",
        answer:
          "Every item is written in plain language with the why attached. If something needs a developer, the checklist says so explicitly.",
      },
      {
        question: "How long until results?",
        answer:
          "SEO compounds. Most service businesses see movement in 8 to 12 weeks when the fundamentals in this checklist are in place.",
      },
      {
        question: "Does AI search change this?",
        answer:
          "The fundamentals in this checklist, clear services, strong proof, and structured pages, are exactly what AI search engines cite too.",
      },
    ],
    related: ["30-day-content-calendar", "founder-linkedin-profile-checklist"],
    filePath: "/resources/view/service-business-seo-checklist",
    keywords: [
      "seo checklist service business",
      "local seo checklist",
      "seo for agencies",
      "service page seo",
    ],
  },
  {
    slug: "30-day-content-calendar",
    title: "The 30 Day Content Calendar",
    promise:
      "A full month of founder content planned in one sitting. Every day mapped to a post type, an angle, and a business goal.",
    description:
      "Consistency beats brilliance in content, but consistency needs a system. This calendar gives you 30 days of mapped content: which format to post, which angle to take, and which business goal each post serves, so you never open LinkedIn wondering what to say.",
    category: "digital-marketing",
    type: "Template",
    time: "20 min",
    bullets: [
      "30 days mapped to formats, angles, and goals",
      "The weekly rhythm that balances value and selling",
      "Batching instructions that fit in 2 hours a week",
      "Pairs perfectly with the 100 hooks swipe file",
    ],
    whoFor: [
      "Founders who post in bursts then vanish for weeks",
      "Anyone who wants leads from content, not just likes",
      "Marketers running founder led content programs",
    ],
    whoNotFor: [
      "Anyone unwilling to post at least twice a week",
      "Brands with no individual voice behind them",
    ],
    faqs: [
      {
        question: "Which platforms does it cover?",
        answer:
          "It is built for LinkedIn first, but the structure adapts cleanly to X, newsletters, and even short video.",
      },
      {
        question: "What if I fall behind?",
        answer:
          "The calendar is a rhythm, not a prison. Skip a day, keep the rhythm. The batching system makes catching up painless.",
      },
      {
        question: "Do I need a big audience for this to work?",
        answer:
          "No. Consistent, goal mapped content is exactly how small audiences become pipelines.",
      },
    ],
    related: ["100-linkedin-hooks", "founder-gpt-prompt-pack"],
    filePath: "/resources/view/30-day-content-calendar",
    keywords: [
      "content calendar template",
      "30 day content plan",
      "linkedin content calendar",
      "founder content system",
    ],
  },
  {
    slug: "hiring-scorecard",
    title: "The Hiring Scorecard",
    promise:
      "Stop hiring people who interview well and start hiring people who perform. One scorecard, zero gut feeling regrets.",
    description:
      "A bad hire costs multiples of their salary, and most bad hires interviewed brilliantly. This scorecard forces clarity before you post the role, structures your interviews around evidence instead of charm, and gives every candidate a comparable score.",
    category: "staffing",
    type: "Template",
    time: "15 min",
    bullets: [
      "Define the outcomes of the role before the interview",
      "Evidence based questions that expose real ability",
      "A scoring grid that makes candidates comparable",
      "The 5 red flags most founders notice too late",
    ],
    whoFor: [
      "Founders making their first key hires",
      "Teams burned by a recent hiring mistake",
      "Agencies scaling delivery teams fast",
    ],
    whoNotFor: [
      "Enterprise HR teams with mature processes",
      "Anyone hiring purely on referrals and trust",
    ],
    faqs: [
      {
        question: "Does this work for freelancers and contractors?",
        answer:
          "Yes. The outcome definition and scoring grid work identically. Only the commitment length changes.",
      },
      {
        question: "Will structure scare off good candidates?",
        answer:
          "The opposite. Strong candidates respect a clear process. Only weak candidates prefer vibes based interviews.",
      },
      {
        question: "How long does it take to set up per role?",
        answer:
          "About 15 minutes to define outcomes and pick questions. That small investment routinely saves months of regret.",
      },
    ],
    related: ["sales-pipeline-template", "crm-implementation-checklist"],
    filePath: "/resources/view/hiring-scorecard",
    keywords: [
      "hiring scorecard template",
      "structured interview template",
      "how to hire first employee",
      "hiring for agencies",
    ],
  },
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getFeaturedResource(): Resource {
  return resources.find((r) => r.featured) ?? resources[0];
}

export function getRelatedResources(resource: Resource): Resource[] {
  return resource.related
    .map((slug) => getResource(slug))
    .filter((r): r is Resource => Boolean(r));
}

export function getCategoryMeta(slug: string): CategoryMeta {
  return categories.find((c) => c.slug === slug) ?? categories[0];
}
