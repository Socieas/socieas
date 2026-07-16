// data/linkedin-audit.ts

import type {
  PillarMeta,
  AuditQuestion,
  TextCheck,
  FixCopy,
  ScoreBandMeta,
} from "@/types/linkedin-score";

/* ------------------------------------------------------------ */
/* PILLARS (weights add up to exactly 100)                       */
/* ------------------------------------------------------------ */

export const pillars: PillarMeta[] = [
  {
    id: "first-impression",
    label: "First Impression",
    weight: 20,
    description:
      "What a stranger decides about you in the first 5 seconds: banner, photo, and the opening lines of your about section.",
  },
  {
    id: "positioning",
    label: "Positioning",
    weight: 25,
    description:
      "Whether your headline and about section say who you help, what changes for them, and why anyone should believe you.",
  },
  {
    id: "content-engine",
    label: "Content Engine",
    weight: 25,
    description:
      "How consistently you show up in the feed. Profiles get discovered through content, not search.",
  },
  {
    id: "social-proof",
    label: "Social Proof",
    weight: 15,
    description:
      "Evidence that real people got real results from you: recommendations, featured wins, client outcomes.",
  },
  {
    id: "conversion",
    label: "Conversion",
    weight: 15,
    description:
      "Whether a visitor who is impressed knows exactly what to do next, or just leaves.",
  },
];

/* ------------------------------------------------------------ */
/* THE 12 QUESTIONS (factual, not opinions)                      */
/* ------------------------------------------------------------ */

export const questions: AuditQuestion[] = [
  {
    id: "q-banner",
    pillar: "first-impression",
    question: "What does your banner image look like right now?",
    helper: "The banner is the large image behind your profile photo.",
    maxPoints: 8,
    options: [
      {
        value: "designed",
        label: "Custom designed with my positioning or offer on it",
        points: 8,
        feedback:
          "Your banner works as a billboard. That is exactly what the top 1 percent of profiles do.",
      },
      {
        value: "photo",
        label: "A nice photo, but no message on it",
        points: 4,
        feedback:
          "Your banner looks good but says nothing. It is prime space that currently sells nothing.",
      },
      {
        value: "default",
        label: "The default blue background",
        points: 0,
        feedback:
          "A default banner signals an inactive profile before anyone reads a single word.",
      },
    ],
  },
  {
    id: "q-photo",
    pillar: "first-impression",
    question: "What is your profile photo?",
    maxPoints: 6,
    options: [
      {
        value: "professional",
        label: "A clear, well lit headshot of my face",
        points: 6,
        feedback:
          "A clear headshot builds instant trust. This box is ticked.",
      },
      {
        value: "casual",
        label: "A casual or group photo",
        points: 3,
        feedback:
          "A casual photo is better than nothing, but faces that fill the frame with good lighting convert measurably better.",
      },
      {
        value: "none",
        label: "A logo, avatar, or no photo",
        points: 0,
        feedback:
          "People connect with faces, not logos. Profiles without a real photo get dramatically fewer accepted connections.",
      },
    ],
  },
  {
    id: "q-url",
    pillar: "first-impression",
    question: "Is your profile URL customized?",
    helper: "Example: linkedin.com/in/yourname instead of linkedin.com/in/xyz123456.",
    maxPoints: 2,
    options: [
      {
        value: "yes",
        label: "Yes, it is my name",
        points: 2,
        feedback: "Clean URL. Small detail, professional signal.",
      },
      {
        value: "no",
        label: "No, it still has random numbers",
        points: 0,
        feedback:
          "A default URL with random numbers looks unpolished on resumes, decks, and email signatures. It takes 60 seconds to fix.",
      },
    ],
  },
  {
    id: "q-frequency",
    pillar: "content-engine",
    question: "How often do you post on LinkedIn?",
    maxPoints: 8,
    options: [
      {
        value: "high",
        label: "3 or more times per week",
        points: 8,
        feedback:
          "You post at the frequency where compounding starts. Very few people sustain this.",
      },
      {
        value: "medium",
        label: "1 to 2 times per week",
        points: 5,
        feedback:
          "A steady rhythm. Moving to 3 posts per week is where reach typically compounds fastest.",
      },
      {
        value: "low",
        label: "A few times per month",
        points: 2,
        feedback:
          "Occasional posting keeps you technically active but invisible. The algorithm rewards rhythm, not bursts.",
      },
      {
        value: "never",
        label: "Rarely or never",
        points: 0,
        feedback:
          "Without content, your profile only works when someone already searches for you. You are missing the entire discovery side of LinkedIn.",
      },
    ],
  },
  {
    id: "q-formats",
    pillar: "content-engine",
    question: "Which content formats do you use?",
    maxPoints: 5,
    options: [
      {
        value: "mixed",
        label: "A mix: text posts plus carousels, images, or video",
        points: 5,
        feedback:
          "Format variety multiplies reach because different formats win with different audiences.",
      },
      {
        value: "single",
        label: "Mostly one format only",
        points: 2,
        feedback:
          "One format caps your reach. Repurposing one idea into a second format is the cheapest growth available to you.",
      },
      {
        value: "none",
        label: "I do not really post",
        points: 0,
        feedback:
          "No formats in play yet. When you start, text plus one visual format is the proven combination.",
      },
    ],
  },
  {
    id: "q-commenting",
    pillar: "content-engine",
    question: "How often do you comment on other people's posts?",
    maxPoints: 5,
    options: [
      {
        value: "daily",
        label: "Most days, with real thoughts",
        points: 5,
        feedback:
          "Smart commenting is borrowed reach. You are using the fastest free growth lever on the platform.",
      },
      {
        value: "sometimes",
        label: "Sometimes",
        points: 2,
        feedback:
          "Occasional comments help, but 10 thoughtful comments a day on bigger accounts is how small profiles grow fast.",
      },
      {
        value: "never",
        label: "Almost never",
        points: 0,
        feedback:
          "You are leaving the fastest free growth lever untouched. Comments put your name in front of audiences you have not earned yet.",
      },
    ],
  },
  {
    id: "q-consistency",
    pillar: "content-engine",
    question: "In the last 90 days, how consistent was your activity?",
    maxPoints: 5,
    options: [
      {
        value: "weekly",
        label: "Active every single week",
        points: 5,
        feedback:
          "Consistency over 90 days is what separates operators from tourists. Well done.",
      },
      {
        value: "gaps",
        label: "Active, but with gaps of weeks",
        points: 2,
        feedback:
          "Gaps reset your momentum with both the algorithm and your audience. A lighter but unbroken rhythm beats intense bursts.",
      },
      {
        value: "inactive",
        label: "Mostly inactive",
        points: 0,
        feedback:
          "90 quiet days tells visitors the lights are off. Reactivating with a steady weekly rhythm fixes this fast.",
      },
    ],
  },
  {
    id: "q-creator",
    pillar: "content-engine",
    question: "Is the Follow button the main button on your profile?",
    helper: "This comes from turning on creator mode or setting Follow as primary.",
    maxPoints: 2,
    options: [
      {
        value: "yes",
        label: "Yes, people see Follow first",
        points: 2,
        feedback:
          "Follow first means strangers can subscribe to you without a decision. Good setup for audience building.",
      },
      {
        value: "no",
        label: "No, they see Connect first",
        points: 0,
        feedback:
          "Connect first adds friction for strangers. Follow first turns your profile into a subscribable channel.",
      },
    ],
  },
  {
    id: "q-featured",
    pillar: "social-proof",
    question: "What is in your Featured section?",
    maxPoints: 6,
    options: [
      {
        value: "strategic",
        label: "My best work, results, or a free resource",
        points: 6,
        feedback:
          "A strategic Featured section is your shop window and yours is dressed properly.",
      },
      {
        value: "something",
        label: "Some old posts or links, not curated",
        points: 3,
        feedback:
          "Your Featured section exists but is not selling for you. Curate it like a shop window: best proof first.",
      },
      {
        value: "empty",
        label: "It is empty or I do not use it",
        points: 0,
        feedback:
          "An empty Featured section wastes the most visible real estate below your headline. Even one strong item changes how visitors judge you.",
      },
    ],
  },
  {
    id: "q-recommendations",
    pillar: "social-proof",
    question: "How many written recommendations do you have?",
    maxPoints: 6,
    options: [
      {
        value: "many",
        label: "5 or more",
        points: 6,
        feedback:
          "5 plus recommendations is real third party proof. Most profiles never get there.",
      },
      {
        value: "few",
        label: "1 to 4",
        points: 3,
        feedback:
          "You have proof, just not enough of it. Two short messages to past clients or colleagues would double it this week.",
      },
      {
        value: "none",
        label: "None yet",
        points: 0,
        feedback:
          "Zero recommendations means every claim on your profile is unverified. Even 2 changes how trustworthy you look.",
      },
    ],
  },
  {
    id: "q-contact",
    pillar: "conversion",
    question: "Can a visitor contact or book you without effort?",
    maxPoints: 5,
    options: [
      {
        value: "clear",
        label: "Yes, a booking link or email is clearly visible",
        points: 5,
        feedback:
          "Frictionless contact. Interested visitors can act on the moment instead of losing it.",
      },
      {
        value: "dm",
        label: "They would have to send me a DM",
        points: 2,
        feedback:
          "DM only means only the boldest visitors reach out. A visible booking link or email captures the quiet majority.",
      },
      {
        value: "none",
        label: "There is no obvious way",
        points: 0,
        feedback:
          "Visitors who want to work with you currently have no door to knock on. This single fix pays for the entire audit.",
      },
    ],
  },
  {
    id: "q-openprofile",
    pillar: "conversion",
    question: "Can people outside your network message you?",
    helper: "Open profile or visible contact info makes this possible.",
    maxPoints: 2,
    options: [
      {
        value: "yes",
        label: "Yes",
        points: 2,
        feedback: "No walls between you and inbound opportunities. Good.",
      },
      {
        value: "no",
        label: "No, or I am not sure",
        points: 0,
        feedback:
          "If strangers cannot message you, your best inbound leads silently bounce off. Check your messaging settings today.",
      },
    ],
  },
];

/* ------------------------------------------------------------ */
/* TEXT ANALYSIS CHECKS                                          */
/* The engine replaces [HEADLINE] with the person's own words.   */
/* ------------------------------------------------------------ */

export const textChecks: TextCheck[] = [
  {
    id: "t-hook",
    pillar: "first-impression",
    target: "about",
    maxPoints: 4,
    passFeedback:
      "The opening of your about section earns the click on See more. That is exactly what the first 3 lines are for.",
    failFeedback:
      "LinkedIn cuts your about section after roughly 3 lines. Yours opens without a number, a question, or a bold claim, so most visitors never click See more and never read the rest.",
  },
  {
    id: "t-jobtitle",
    pillar: "positioning",
    target: "headline",
    maxPoints: 5,
    passFeedback:
      "Your headline is built as a message, not just a job title. Good.",
    failFeedback:
      "Your headline [HEADLINE] reads as a job title, not a promise. Titles describe you. Great headlines describe what changes for the reader.",
  },
  {
    id: "t-audience",
    pillar: "positioning",
    target: "headline",
    maxPoints: 5,
    passFeedback:
      "Your headline names who you help, which instantly filters in the right visitors.",
    failFeedback:
      "Your headline [HEADLINE] never says who you help. If a perfect fit visitor cannot see themselves in your headline, they scroll past.",
  },
  {
    id: "t-outcome",
    pillar: "positioning",
    target: "headline",
    maxPoints: 5,
    passFeedback:
      "Your headline promises an outcome. That is what turns profile views into interest.",
    failFeedback:
      "Your headline [HEADLINE] does not name a result. People do not buy activities, they buy outcomes: growth, revenue, leads, time back.",
  },
  {
    id: "t-headlineproof",
    pillar: "positioning",
    target: "headline",
    maxPoints: 3,
    passFeedback:
      "There are numbers in your headline. Specific beats impressive, and you have specifics.",
    failFeedback:
      "No numbers in your headline. One concrete figure, clients served, years, results delivered, makes every claim more believable.",
  },
  {
    id: "t-buzzwords",
    pillar: "positioning",
    target: "headline",
    maxPoints: 3,
    passFeedback:
      "No filler buzzwords in your headline. It reads like an operator, not a brochure.",
    failFeedback:
      "Your headline leans on filler words like passionate, guru, or motivated. These words are so overused they now signal the opposite of what they say.",
  },
  {
    id: "t-aboutproof",
    pillar: "positioning",
    target: "about",
    maxPoints: 4,
    passFeedback:
      "Your about section carries real numbers. Proof density is what separates claims from credibility.",
    failFeedback:
      "Your about section has almost no numbers. Without figures, results, timelines, clients, it reads as opinion. With them, it reads as evidence.",
  },
  {
    id: "t-aboutresults",
    pillar: "social-proof",
    target: "about",
    maxPoints: 3,
    passFeedback:
      "You talk about client outcomes in your about section, which quietly does your selling for you.",
    failFeedback:
      "Your about section never mentions clients or the results you got them. One or two lines of client outcomes would add proof exactly where visitors look for it.",
  },
  {
    id: "t-aboutcta",
    pillar: "conversion",
    target: "about",
    maxPoints: 5,
    passFeedback:
      "Your about section ends with a clear next step. Interested readers know exactly what to do.",
    failFeedback:
      "Your about section ends without telling the reader what to do next. Every convinced reader currently hits a dead end. One closing line fixes it.",
  },
  {
    id: "t-headlinecta",
    pillar: "conversion",
    target: "headline",
    maxPoints: 3,
    passFeedback:
      "Your headline points people to an action. That is rare and effective.",
    failFeedback:
      "Your headline gives visitors nowhere to go. A short pointer like DM me the word GROW or link below turns attention into conversations.",
  },
];

/* ------------------------------------------------------------ */
/* FIX LIBRARY (why + how for every failing check)               */
/* ------------------------------------------------------------ */

export const fixes: FixCopy[] = [
  {
    checkId: "q-banner",
    title: "Turn your banner into a billboard",
    why: "It is the single largest visual on your profile and right now it sells nothing.",
    how: "Create a simple banner with one line: who you help and the outcome you deliver, plus your website. Free tools like Canva have LinkedIn banner templates ready.",
  },
  {
    checkId: "q-photo",
    title: "Upgrade your profile photo",
    why: "Faces build trust. Weak photos quietly reduce connection acceptance and reply rates.",
    how: "Use a phone in daylight, face filling about 60 percent of the frame, plain background, slight smile. No sunglasses, no group crops.",
  },
  {
    checkId: "q-url",
    title: "Claim your custom URL",
    why: "Random numbers in your URL look unfinished everywhere you share it.",
    how: "On your profile, open public profile settings and edit your custom URL to your name. Takes 60 seconds.",
  },
  {
    checkId: "q-frequency",
    title: "Build a posting rhythm",
    why: "Reach on LinkedIn compounds with rhythm. Silence resets the compounding.",
    how: "Start with 2 posts per week on a fixed schedule. Batch write both in one 45 minute session so consistency never depends on mood.",
  },
  {
    checkId: "q-formats",
    title: "Add a second content format",
    why: "Each format reaches people the others miss. One format caps your ceiling.",
    how: "Take your best text post from the last month and turn it into a simple carousel or a 60 second talking video. Same idea, doubled reach.",
  },
  {
    checkId: "q-commenting",
    title: "Comment your way into new audiences",
    why: "Comments put your name in front of audiences you have not built yet. It is free borrowed reach.",
    how: "Pick 10 accounts your ideal clients follow. Leave one genuinely useful comment on each, daily, for 2 weeks. Watch profile views climb.",
  },
  {
    checkId: "q-consistency",
    title: "Protect an unbroken weekly streak",
    why: "Gaps reset trust with the algorithm and your audience. Unbroken light activity beats heavy bursts.",
    how: "Set a minimum viable week: 1 post plus 5 comments. Never go below it, even in busy weeks.",
  },
  {
    checkId: "q-creator",
    title: "Make Follow your primary button",
    why: "Strangers will follow you long before they are ready to connect.",
    how: "In settings, turn on creator mode or set Follow as your primary button. Instant, free, done once.",
  },
  {
    checkId: "q-featured",
    title: "Curate your Featured section like a shop window",
    why: "It is the most visible block after your headline and it should sell your best proof.",
    how: "Pin 3 items: your best result or case study, your most valuable post, and one free resource with a clear title. Remove everything else.",
  },
  {
    checkId: "q-recommendations",
    title: "Collect 3 recommendations this week",
    why: "Third party words outweigh anything you can say about yourself.",
    how: "Message 3 past clients or colleagues: I am updating my profile, would you write 3 lines about the result we got together? Offer to write one back.",
  },
  {
    checkId: "q-contact",
    title: "Open a clear door for visitors",
    why: "Interested visitors act in the moment or not at all. No visible door means lost leads.",
    how: "Add a free booking link, like a Cal.com page, to your Featured section and contact info, and mention it at the end of your about section.",
  },
  {
    checkId: "q-openprofile",
    title: "Let strangers message you",
    why: "Your best future clients are usually not in your network yet.",
    how: "Check messaging settings and make sure people outside your network can reach you, or put an email in your about section.",
  },
  {
    checkId: "t-hook",
    title: "Rewrite your first 3 lines",
    why: "LinkedIn truncates your about section. If line one is weak, the rest is never read.",
    how: "Open with a number, a question, or a bold claim about your reader's problem. Example: Most founders post for a year and get zero clients from it. Here is why.",
  },
  {
    checkId: "t-jobtitle",
    title: "Turn your headline from title into promise",
    why: "A title says what you are. A promise says what the reader gets. Promises win.",
    how: "Use this formula: I help [who] get [outcome] with [method]. Then add one proof point.",
  },
  {
    checkId: "t-audience",
    title: "Name your audience in the headline",
    why: "People scan for themselves. If they do not see themselves, they leave.",
    how: "Add who you serve: founders, clinics, B2B SaaS teams, agencies. Specific beats broad every time.",
  },
  {
    checkId: "t-outcome",
    title: "Put a result in your headline",
    why: "Outcomes create desire. Activities create indifference.",
    how: "Name what actually changes for clients: more inbound leads, faster hiring, higher revenue, visibility that compounds.",
  },
  {
    checkId: "t-headlineproof",
    title: "Add one number to your headline",
    why: "Numbers stop the scroll and make claims believable.",
    how: "Clients served, years in the game, results generated. One figure is enough: 120 plus founders, 8 years, 3x pipeline.",
  },
  {
    checkId: "t-buzzwords",
    title: "Cut the buzzwords",
    why: "Words like passionate and guru are invisible from overuse and quietly lower your credibility.",
    how: "Replace each buzzword with something checkable. Instead of passionate about marketing, write helped 40 brands grow organic traffic.",
  },
  {
    checkId: "t-aboutproof",
    title: "Add proof density to your about section",
    why: "Numbers turn your story from opinion into evidence.",
    how: "Add 3 concrete figures: results you delivered, clients served, timeframes. Real numbers, even small ones, beat vague claims.",
  },
  {
    checkId: "t-aboutresults",
    title: "Show client outcomes in your story",
    why: "Visitors trust what you did for others more than what you say about yourself.",
    how: "Add 2 lines: the client, the problem, the result with a number. Example: Helped a staffing firm double qualified leads in 90 days.",
  },
  {
    checkId: "t-aboutcta",
    title: "End your about section with a next step",
    why: "A convinced reader with no instruction simply leaves.",
    how: "Close with one line: Want [outcome]? DM me the word [WORD] or book a call at [link].",
  },
  {
    checkId: "t-headlinecta",
    title: "Give your headline a pointer",
    why: "Attention without direction evaporates.",
    how: "End your headline with a short action cue: DM me GROW, or link below. Only do this once your positioning is sharp.",
  },
];

/* ------------------------------------------------------------ */
/* SCORE BANDS                                                   */
/* ------------------------------------------------------------ */

export const scoreBands: ScoreBandMeta[] = [
  {
    min: 90,
    label: "Elite",
    headline: "Your profile is in the top 1 percent.",
    message:
      "Everything works together: positioning, proof, content, and conversion. Your next wins come from scale, not fixes. Protect your consistency and keep raising proof density.",
  },
  {
    min: 75,
    label: "Strong",
    headline: "Your profile works. Now make it compound.",
    message:
      "The foundations are genuinely good. A few targeted fixes below separate you from the top 1 percent, and most of them take under an hour.",
  },
  {
    min: 60,
    label: "Solid but leaking",
    headline: "Good bones, but attention is leaking out.",
    message:
      "People find you, but too many leave without acting. Your fixes below are mostly about proof and conversion, the cheapest points you can win back.",
  },
  {
    min: 40,
    label: "Under leveraged",
    headline: "You are invisible to most of the people who need you.",
    message:
      "The raw material is there, but your profile is not doing its job yet. The 3 fixes below will move your score fastest. Most people at this level jump 20 points in 2 weeks.",
  },
  {
    min: 0,
    label: "Invisible",
    headline: "Your profile is costing you opportunities every day.",
    message:
      "Right now your profile only works for people who already know you. The good news: from here, every fix below produces a visible jump. Start with fix number 1 today.",
  },
];

/* ------------------------------------------------------------ */
/* WORD LISTS used by the scoring engine (Batch 2)               */
/* ------------------------------------------------------------ */

export const audienceWords: string[] = [
  "founder", "founders", "ceo", "ceos", "entrepreneur", "entrepreneurs",
  "startup", "startups", "business", "businesses", "brand", "brands",
  "coach", "coaches", "consultant", "consultants", "agency", "agencies",
  "saas", "b2b", "b2c", "ecommerce", "clinic", "clinics", "creator",
  "creators", "professional", "professionals", "leader", "leaders",
  "team", "teams", "client", "clients", "company", "companies",
];

export const outcomeWords: string[] = [
  "grow", "growth", "revenue", "leads", "sales", "scale", "scaling",
  "visibility", "pipeline", "clients", "customers", "profit", "roi",
  "hire", "hiring", "authority", "audience", "inbound", "convert",
  "conversion", "traffic", "results", "impact", "freedom", "time",
];

export const buzzwords: string[] = [
  "passionate", "guru", "ninja", "rockstar", "visionary", "motivated",
  "hardworking", "hard-working", "enthusiast", "thought leader",
  "results-driven", "results driven", "dynamic", "synergy", "go-getter",
];

export const ctaWords: string[] = [
  "dm me", "dm ", "message me", "book a call", "book a", "reach out",
  "let's talk", "lets talk", "get in touch", "email me", "link below",
  "link in", "follow for", "subscribe", "download", "free",
];

export const clientProofWords: string[] = [
  "client", "clients", "helped", "worked with", "case study",
  "results for", "generated", "delivered", "grew", "scaled",
];

export const jobTitlePattern: string =
  "^(founder|co founder|co-founder|ceo|cto|coo|cmo|director|manager|owner|president|vp|head)\\b.{0,30}(at|@|\\|)";
