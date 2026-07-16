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
  {
    slug: "100-linkedin-hooks",
    intro: [
      "The first line decides whether your post lives or dies. Below are 100 proven hook patterns organized into 8 categories. The specifics are stripped out, so every hook becomes yours the moment you fill in the blanks.",
      "How to use this: pick the category that matches your post, choose a hook, replace the [BLANKS] with your details, and write the rest of the post to pay off the promise the hook makes.",
    ],
    sections: [
      {
        title: "First: the 3 hook mistakes that kill reach",
        numbered: [
          "Warming up. Your first line is not an introduction, it is the whole audition. Never open with context, open with tension.",
          "Giving away the ending. If line one answers everything, nobody clicks see more. Create a gap, then close it in the post.",
          "Writing for everyone. A hook that speaks to everybody stops nobody. Name the specific person or problem.",
        ],
      },
      {
        title: "Story Hooks (1 to 14)",
        intro:
          "Best for: lessons learned, behind the scenes, founder journey posts.",
        numbered: [
          "I [DID UNUSUAL THING] for [TIME PERIOD]. Here is what nobody tells you.",
          "In [YEAR] I almost quit [FIELD]. One conversation changed everything.",
          "My first [PROJECT] made exactly zero. My tenth made [RESULT].",
          "A client fired me in [YEAR]. It was the best thing that happened to my business.",
          "I spent [AMOUNT] learning this lesson. You can have it in 60 seconds.",
          "Everyone saw the launch. Nobody saw the 14 months before it.",
          "Three years ago I could not [SKILL]. Yesterday [MILESTONE].",
          "The email said no. Here is what I did next.",
          "I watched a competitor copy my entire strategy. Then something strange happened.",
          "The worst advice I ever followed came from the smartest person I know.",
          "I lost my biggest client on a Tuesday. By Friday I understood why it had to happen.",
          "Nobody clapped when I started. That turned out to be an advantage.",
          "My mentor told me one sentence in [YEAR]. I still run my business on it.",
          "I said yes to everything for one year. Here is what it cost me.",
        ],
      },
      {
        title: "Contrarian Hooks (15 to 27)",
        intro:
          "Best for: challenging common advice, positioning yourself against the default.",
        numbered: [
          "Unpopular opinion: [COMMON PRACTICE] is keeping you stuck.",
          "Everyone tells you to [COMMON ADVICE]. Everyone is wrong.",
          "Stop [POPULAR ACTIVITY]. It is not working and you know it.",
          "[POPULAR TOOL] will not fix your business. Here is what will.",
          "The best [ROLE] I know do the opposite of what the gurus teach.",
          "Hard truth: your problem is not [ASSUMED PROBLEM]. It is [REAL PROBLEM].",
          "You do not need more [RESOURCE]. You need [ALTERNATIVE].",
          "Hot take: [TREND] is a distraction for most founders.",
          "I refuse to [COMMON PRACTICE]. My results doubled.",
          "The advice that built businesses in [PAST YEAR] is quietly killing them in [CURRENT YEAR].",
          "Most [TOPIC] advice is written by people who never [DID THE THING].",
          "Being good at [SKILL] is overrated. Being consistent at it is not.",
          "Your competitors are not beating you with talent. They are beating you with [SYSTEM].",
        ],
      },
      {
        title: "Result Hooks (28 to 40)",
        intro:
          "Best for: case studies, proof posts, breakdowns of what worked.",
        numbered: [
          "[NUMBER] leads in [TIME PERIOD]. Zero ads. Here is the system.",
          "We took a client from [BEFORE] to [AFTER] in [TIME]. The playbook:",
          "This one change added [RESULT] to our pipeline.",
          "[METRIC] grew [PERCENT] in [TIME]. I did exactly 3 things.",
          "One post brought [NUMBER] inbound calls. Let me break it down.",
          "From [LOW POINT] to [HIGH POINT] in [TIME]. No shortcuts, one system.",
          "My best month ever came after my worst quarter ever. Here is what changed.",
          "We tested [NUMBER] versions of [ASSET]. Only one worked. This one.",
          "[CLIENT TYPE] came to us with [PROBLEM]. 90 days later: [RESULT].",
          "I doubled [METRIC] by deleting half of what I was doing.",
          "The [SYSTEM] that runs itself brought [RESULT] while I was on holiday.",
          "Every [TIME PERIOD] this one email brings us [NUMBER] replies.",
          "Proof beats promises: here are the numbers from our last [PROJECT].",
        ],
      },
      {
        title: "Mistake Hooks (41 to 52)",
        intro:
          "Best for: vulnerability posts that teach. These build trust faster than wins.",
        numbered: [
          "I wasted [TIME] on [ACTIVITY]. Save yourself the detour.",
          "The [AMOUNT] mistake I made so you do not have to.",
          "5 mistakes I made building [PROJECT]. Number 3 still hurts.",
          "I ignored [SIGNAL] for months. It cost me [COST].",
          "My biggest hiring mistake interviewed brilliantly.",
          "I built the wrong thing for the right audience. Twice.",
          "The mistake was not the strategy. It was who I listened to.",
          "I priced my services wrong for 2 years. Here is the math that woke me up.",
          "Everything in my business broke at [MILESTONE]. Because I designed it that way without knowing.",
          "I confused being busy with being effective. A calendar audit fixed it.",
          "We launched too early. Then I learned launching late is worse.",
          "The feedback I ignored was the feedback I needed most.",
        ],
      },
      {
        title: "List Hooks (53 to 64)",
        intro:
          "Best for: value posts, frameworks, tool stacks. Easy to write, easy to save.",
        numbered: [
          "7 [TOOLS OR HABITS] that quietly run my business.",
          "10 lessons from [NUMBER] years of [FIELD]. Free to steal.",
          "5 questions I ask before taking any client.",
          "The 3 systems every [ROLE] needs before scaling.",
          "8 things I stopped doing that improved everything.",
          "6 signs your [ASSET] needs a rebuild.",
          "4 emails that do most of our selling.",
          "9 habits of founders whose content actually converts.",
          "The 5 tools I would keep if I lost everything else.",
          "3 numbers to check every Monday morning.",
          "7 sentences that close more deals than any pitch deck.",
          "5 boring habits that outperform every growth hack I tried.",
        ],
      },
      {
        title: "Question Hooks (65 to 76)",
        intro:
          "Best for: engagement posts and making readers feel seen.",
        numbered: [
          "What would your business look like if [BOTTLENECK] disappeared tomorrow?",
          "Why do buyers trust [COMPETITOR TYPE] more than you?",
          "When did you last audit your [ASSET]? Be honest.",
          "What if the problem is not your offer but where people find you?",
          "How many leads did your website bring last month? Exactly.",
          "Would you follow you? Look at your profile and answer honestly.",
          "What is your plan for when [CHANNEL] stops working?",
          "Who told you [BELIEF]? And why did you believe them?",
          "If you stopped posting today, would anyone notice?",
          "Which task do you repeat daily that a system could do better?",
          "What is the real cost of staying invisible for another year?",
          "Do you have a pipeline or a pile of maybes?",
        ],
      },
      {
        title: "Statistic Hooks (77 to 88)",
        intro:
          "Best for: authority posts. Numbers stop the scroll because they feel objective.",
        numbered: [
          "[PERCENT] of [AUDIENCE] never [ACTION]. Be the exception.",
          "Buyers see [NUMBER] pieces of content before they ever book a call.",
          "[PERCENT] of B2B deals now start with a search. Where do you show up?",
          "The average founder spends [HOURS] a week on tasks a system could do.",
          "[NUMBER] of every 10 CRM setups get abandoned by month two. Here is why.",
          "A bad hire costs [MULTIPLE] of their salary. The math nobody does.",
          "[PERCENT] of searches now end without a click. Your strategy needs to know this.",
          "Companies that post weekly grow [MULTIPLE] faster. The data:",
          "It takes [NUMBER] touches to close a modern B2B deal. Most stop at 2.",
          "[PERCENT] of your website visitors leave without a trace. Fix the leak.",
          "One stat changed our roadmap: [STATISTIC].",
          "[NUMBER] hours. That is what this one automation saves us every month.",
        ],
      },
      {
        title: "POV Hooks (89 to 100)",
        intro:
          "Best for: thought leadership. Plant a flag and defend it.",
        numbered: [
          "After [NUMBER] years in [FIELD], one belief survived everything.",
          "The founders winning right now share one boring trait.",
          "In 5 years, [PREDICTION]. Position yourself now.",
          "The market does not reward the best product. It rewards the clearest message.",
          "Watch what top [ROLE] do, not what they say.",
          "Personal brands will outlive company brands. Here is why I am certain.",
          "Trust is the only channel that never changes its algorithm.",
          "AI will not replace [ROLE]. But a [ROLE] using AI will replace one who does not.",
          "Visibility is a system, not a personality trait.",
          "Your network is not who you know. It is who remembers you.",
          "The next decade belongs to founders who teach in public.",
          "Distribution beats perfection. Every single time.",
        ],
      },
    ],
  },
  {
    slug: "founder-story-framework",
    intro: [
      "Buyers forget features, prices, and titles. They remember stories. The founders who feel magnetic online are not better at their craft than you. They simply packaged their journey into a story that buyers can retell.",
      "This worksheet builds yours in about 20 minutes. Grab a notes app or a piece of paper, answer the prompts in each beat, then assemble your three versions at the end.",
    ],
    sections: [
      {
        title: "Why your story is a business asset",
        numbered: [
          "Facts get filed away. Stories get retold. When a client repeats your story to a colleague, you just acquired a lead while doing nothing.",
          "A story creates trust before the first call. People feel they already know you, so the sales conversation starts warm.",
          "In a market full of lookalike services, your story is the one thing no competitor can copy.",
        ],
      },
      {
        title: "The 5 Beat Story Arc",
        intro:
          "Every memorable founder story follows the same skeleton. Yours will too:",
        numbered: [
          "The Before: the world you were living in when the story starts.",
          "The Struggle: the problem you kept running into or kept watching others suffer from.",
          "The Shift: the moment or insight that changed how you saw everything.",
          "The Build: what you created because of that insight.",
          "The Now: who you help today and the outcome you deliver.",
        ],
      },
      {
        title: "Beat 1: The Before",
        intro:
          "Set the scene. Answer in 2 to 3 sentences:",
        numbered: [
          "What were you doing before this business existed? Be specific: the job, the city, the daily routine.",
          "What did you believe back then that turned out to be wrong?",
          "What did a normal Tuesday look like? Small concrete details make stories feel real.",
        ],
      },
      {
        title: "Beat 2: The Struggle",
        intro:
          "This is where readers lean in. The struggle is the villain of your story, and the villain is always a problem, never a person:",
        numbered: [
          "What problem kept showing up again and again, for you or for people around you?",
          "What did that problem actually cost? Money, sleep, confidence, time with family. Name the real price.",
          "What did you try first that did not work? Failed attempts make the eventual answer believable.",
        ],
      },
      {
        title: "Beat 3: The Shift",
        intro:
          "Every great story has a turning point. Find yours:",
        numbered: [
          "Was there a specific moment, conversation, book, or client that changed how you saw the problem?",
          "What did you suddenly understand that most people around you still did not?",
          "Complete this sentence: I realized the real problem was not [WHAT EVERYONE THINKS], it was [WHAT YOU DISCOVERED].",
        ],
      },
      {
        title: "Beat 4: The Build",
        intro:
          "Now show what you did about it:",
        numbered: [
          "What did you build, start, or change because of that realization?",
          "What was the first small win that told you it was working?",
          "What does your approach do differently from the standard way? One clear contrast is enough.",
        ],
      },
      {
        title: "Beat 5: The Now",
        intro:
          "Land the plane. This beat connects your past to your reader:",
        numbered: [
          "Who exactly do you help today? Name the person, not a vague market.",
          "What outcome do they get? Use a number or a before and after if you can.",
          "Why does this work still matter to you personally? One honest sentence beats three polished ones.",
        ],
      },
      {
        title: "Assemble your three versions",
        intro:
          "Now compress your answers into three sizes. You will use all three constantly:",
        numbered: [
          "The One Liner (1 sentence): After [THE STRUGGLE], I built [THE BUILD] that helps [WHO] get [OUTCOME]. Use it in intros, bios, and networking.",
          "The Short Version (3 to 4 sentences): Before + Shift + Now. Use it for podcast intros, speaker bios, and guest posts.",
          "The Full Version (5 short paragraphs, one per beat): Use it for your LinkedIn About section and your website about page.",
        ],
      },
      {
        title: "Quality check before you publish",
        checklist: [
          {
            title: "The specificity test",
            text: "Your story contains at least 3 concrete details: a year, a place, a number, a real moment. Vague stories sound invented.",
          },
          {
            title: "The villain test",
            text: "The enemy in your story is a problem or a broken way of doing things, never a former boss, client, or competitor by name.",
          },
          {
            title: "The humility test",
            text: "You are the guide who found a way, not the hero who was always right. Readers root for learners, not legends.",
          },
          {
            title: "The outcome test",
            text: "A stranger reading your story can finish this sentence: this person helps [WHO] get [OUTCOME]. If they cannot, sharpen Beat 5.",
          },
          {
            title: "The retell test",
            text: "Read it out loud once. If you cannot retell it from memory in 30 seconds, it is too complicated to spread.",
          },
        ],
      },
      {
        title: "Where to deploy each version",
        checklist: [
          {
            title: "LinkedIn About section",
            text: "Paste the Full Version. Put Beat 2 in the first 3 lines so the hook shows before the see more fold.",
          },
          {
            title: "Website about page",
            text: "Full Version plus a photo of you. About pages are usually the second most visited page on a service website.",
          },
          {
            title: "Sales calls",
            text: "When a prospect asks how you got started, tell the Short Version. Practiced, it takes 40 seconds and builds instant trust.",
          },
          {
            title: "Podcast and event intros",
            text: "Send hosts the Short Version so they introduce you the way you want to be remembered.",
          },
          {
            title: "Content",
            text: "Each beat is a standalone LinkedIn post. Beat 2 and Beat 3 usually perform best. That is 5 posts already written.",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-readiness-self-audit",
    intro: [
      "Most founders either fear AI or buy tools they never open again. Both groups skip the same step: finding out where automation would actually pay off in their specific business.",
      "This audit fixes that in 15 minutes. Below are 20 statements across the 6 areas where AI helps service businesses most. Tick every statement that is true for you. Every tick is a process quietly eating your week, and your score at the end tells you exactly where to start.",
    ],
    sections: [
      {
        title: "How this audit works",
        numbered: [
          "Read each statement and tick it only if it is true for your business today.",
          "Be honest. The audit only works if the ticks reflect reality, not ambition.",
          "At the end, count your ticks and read your score band. Then build your shortlist in the final section.",
        ],
      },
      {
        title: "Area 1: Leads and follow up",
        checklist: [
          {
            title: "Leads reach me through email, DMs, and forms with no single collection point",
            text: "Scattered lead capture is the number one source of silently lost revenue in service businesses.",
          },
          {
            title: "I sometimes reply to new enquiries more than a day later",
            text: "Speed wins deals. An automated instant acknowledgment plus a fast personal follow up routinely lifts conversion.",
          },
          {
            title: "Nobody follows up if a prospect goes quiet",
            text: "A simple automated nudge sequence revives deals that would otherwise die in silence.",
          },
          {
            title: "I write similar answers to the same 5 questions again and again",
            text: "Repeated answers are templates waiting to exist. AI can draft personalized versions in seconds.",
          },
        ],
      },
      {
        title: "Area 2: Content and marketing",
        checklist: [
          {
            title: "I create every post, email, and page from a blank screen",
            text: "Blank screens are the most expensive real estate in your business. AI drafts, you edit and approve.",
          },
          {
            title: "I post inconsistently because content takes too long",
            text: "Consistency is a systems problem, not a discipline problem. Batching with AI support fixes it.",
          },
          {
            title: "I never repurpose content across formats",
            text: "One strong post can become an email, a carousel, and a script. AI makes repurposing nearly free.",
          },
          {
            title: "I do not know which content actually brings leads",
            text: "Without a simple tracking habit, you are guessing. This is measurement, and it automates well.",
          },
        ],
      },
      {
        title: "Area 3: Client onboarding",
        checklist: [
          {
            title: "I send onboarding info manually to every new client",
            text: "Welcome emails, questionnaires, and kickoff scheduling are the easiest automations in any service business.",
          },
          {
            title: "Clients often ask questions my onboarding should have answered",
            text: "Repeated confusion means the process lives in your head instead of in a system.",
          },
          {
            title: "Onboarding steps sometimes get skipped when I am busy",
            text: "Anything that breaks when you are busy is a process wearing a founder costume.",
          },
        ],
      },
      {
        title: "Area 4: Delivery and reporting",
        checklist: [
          {
            title: "I build client reports or updates by hand",
            text: "Status updates and reports are structured, repetitive, and perfect for automation with a human review pass.",
          },
          {
            title: "I summarize calls and meetings from memory or messy notes",
            text: "AI meeting summaries capture decisions and action items better than memory ever will.",
          },
          {
            title: "Project handoffs between people require verbal explanation",
            text: "If work cannot move without a conversation, your delivery depends on availability instead of systems.",
          },
        ],
      },
      {
        title: "Area 5: Admin, scheduling, and money",
        checklist: [
          {
            title: "Booking a meeting with me takes back and forth messages",
            text: "A scheduling link ends the email tennis permanently. This is a 10 minute fix.",
          },
          {
            title: "I create invoices manually or forget to send them on time",
            text: "Late invoices are free loans to your clients. Recurring invoicing automates cleanly.",
          },
          {
            title: "I copy the same data between two or more tools",
            text: "Human copy paste between tools is the clearest automation signal that exists.",
          },
        ],
      },
      {
        title: "Area 6: Knowledge and communication",
        checklist: [
          {
            title: "Important know how lives only in my head",
            text: "Undocumented knowledge caps your growth at the size of your own calendar.",
          },
          {
            title: "My team or freelancers ask me the same questions repeatedly",
            text: "Recurring questions are documentation requests in disguise. Write once, answer forever.",
          },
          {
            title: "Finding an old file, decision, or message takes more than 2 minutes",
            text: "Search time is invisible but constant. Organized, searchable knowledge pays back daily.",
          },
        ],
      },
      {
        title: "The 3 signs a task should stay human",
        intro:
          "Not everything belongs to a machine. Keep a task human when:",
        numbered: [
          "It builds a relationship. Sales conversations, difficult client moments, and celebrations lose their power when automated.",
          "It requires real judgment. Strategy, pricing, and hiring decisions need context no tool fully holds.",
          "Errors are expensive and hard to reverse. Automate the draft, keep the human approval.",
        ],
      },
      {
        title: "Build your automate first shortlist",
        intro:
          "Do not automate everything at once. Do this instead:",
        numbered: [
          "Look at your ticked boxes and pick the 3 that happen most frequently.",
          "For each, score 1 to 5 on four things: how often it happens, how long it takes, how costly a mistake would be, and how much judgment it needs.",
          "Automate the one with high frequency, high time cost, and low judgment first. That is your fastest payback.",
          "Give it one week, measure hours saved, then move to the next. One automation running beats ten planned.",
        ],
      },
    ],
    scoring: {
      title: "Your Automation Score",
      intro: "Count your ticks across all 6 areas:",
      bands: [
        {
          range: "0 to 6",
          label: "Light lifter",
          text: "Your operations are already lean. Automate opportunistically when a ticked item starts hurting.",
        },
        {
          range: "7 to 13",
          label: "Time leaker",
          text: "Roughly a full workday every week is trapped in manual work. Build your shortlist today and automate your top 3.",
        },
        {
          range: "14 to 20",
          label: "Automation goldmine",
          text: "You are likely losing 10+ hours weekly to repeatable tasks. Systematic automation will feel like hiring a new team member for free.",
        },
      ],
    },
  },
  {
    slug: "founder-gpt-prompt-pack",
    intro: [
      "Generic prompts produce generic output. That is why most founders are underwhelmed by AI: they type one line and expect magic. The prompts below are complete working systems with a role, context, constraints, and an output format built in.",
      "Copy any prompt, fill in the [BLANKS], and paste it into ChatGPT or any modern AI chat. Start with the context recipe below. It makes every single prompt in this pack sharper.",
    ],
    sections: [
      {
        title: "First: the context recipe",
        intro:
          "Save this block in your notes and paste it at the start of every new AI chat. It is the difference between output that sounds like a robot and output that sounds like you:",
        numbered: [
          "WHO I AM: I am the founder of [BUSINESS]. We help [WHO] get [OUTCOME] through [METHOD].",
          "MY AUDIENCE: [Describe your ideal buyer in one sentence: role, business size, biggest pain.]",
          "MY VOICE: Direct and warm. Short sentences. Plain language. No jargon, no buzzwords, no emojis, no hashtags. Confident but never salesy.",
          "MY PROOF: [1 to 3 results or credentials you can honestly claim.]",
          "Always keep this context in mind for everything you write in this chat.",
        ],
      },
      {
        title: "Content prompts",
        numbered: [
          "The Opinion Post. You are my LinkedIn ghostwriter. I believe [YOUR OPINION ABOUT YOUR INDUSTRY]. Write a post arguing this in my voice. Open with one line that creates tension. Support it with 3 concrete points from these notes: [YOUR ROUGH NOTES]. End with one question to the reader. Under 200 words. Give me 2 versions.",
          "The Story Post. Here are rough notes about something that happened in my business: [NOTES]. Turn this into a LinkedIn story post using this arc: hook, situation, struggle, turning point, lesson for the reader. Keep every sentence under 15 words. Under 220 words.",
          "The Repurposer. Here is my best performing post: [PASTE POST]. Repurpose it into 3 formats: a 150 word email to my list, an outline for a 6 slide carousel, and a 45 second video script written the way people actually speak.",
          "The Brutal Editor. Act as a brutally honest LinkedIn editor who has seen 10,000 posts. Here is my draft: [PASTE DRAFT]. Score it 1 to 10 on hook strength, clarity, and payoff. Tell me exactly what is weak and why. Then rewrite it once, keeping my voice and facts.",
          "The Idea Machine. Based on my context, generate 30 LinkedIn post ideas: 10 lessons from experience, 10 opinions I could argue, 10 questions my buyers ask before hiring someone like me. Format each as a ready to use first line, not a topic.",
        ],
      },
      {
        title: "Strategy and positioning prompts",
        numbered: [
          "The Positioning Sharpener. Act as a positioning strategist. Interview me one question at a time, maximum 8 questions, until you can write a positioning statement a stranger understands in 5 seconds. Then give me 3 versions: one safe, one bold, one unexpected.",
          "The Offer Builder. I sell [SERVICE] at [PRICE] to [WHO]. Help me package it as a productized offer: give it a name, define exactly what is included, what is excluded, the timeline, and the outcome promise. Then list the 3 biggest risks a buyer would worry about and how the offer design answers each one.",
          "The Objection Map. List the 10 most likely objections [MY BUYER] has before hiring [MY TYPE OF SERVICE]. For each, write a 2 sentence response that is honest and confident, never defensive. Mark which objections should be answered in my content before the sales call even happens.",
          "The Competitor Gap. Here is how my top 3 competitors describe themselves: [PASTE THEIR HEADLINES OR ABOUT TEXT]. Identify what they all say, what none of them say, and where my honest strengths let me claim ground they have left empty.",
        ],
      },
      {
        title: "Analysis and research prompts",
        numbered: [
          "The Meeting Squeezer. Here is a transcript or my raw notes from a call: [PASTE]. Extract: every decision made, every action item with its owner, every risk or concern raised, and anything I promised to send. Then draft a short follow up email confirming it all.",
          "The Research Digest. Here is an article or report: [PASTE OR LINK TEXT]. Give me the 5 insights most relevant to my business, one sentence each. Then tell me the single action worth taking this week based on it, and one idea for a LinkedIn post reacting to it.",
          "The Pattern Finder. Here are notes or messages from my last several clients: [PASTE]. Find the patterns: which words do they use to describe their problem, what results do they praise most, and what almost stopped them from buying. Give me their exact phrases where possible, because those phrases belong in my marketing.",
          "The Devils Advocate. I am about to make this decision: [DESCRIBE DECISION]. Argue against it as sharply as you can: what am I not seeing, what could go wrong, and what would a smart skeptic say? Then tell me what evidence would settle the question.",
        ],
      },
      {
        title: "Client communication prompts",
        numbered: [
          "The Difficult Email. I need to tell a client that [THE SITUATION, for example a deadline will slip]. Write an email that states the issue in the first 2 lines without excuses, explains the plan to fix it, and protects the relationship. Calm, direct, professional. Under 150 words.",
          "The Deal Reviver. This prospect went quiet after [LAST INTERACTION]. Write 3 short follow up messages I can send a week apart: the first adds a useful insight, the second shares a relevant result or example, the third politely closes the loop and leaves the door open. No guilt, no pressure.",
          "The Testimonial Getter. Write a short message asking [CLIENT NAME] for a testimonial after we achieved [RESULT]. Make it effortless: include 3 specific questions they can answer in 2 minutes that will naturally produce a story shaped testimonial with numbers.",
          "The Scope Guardian. A client asked for [EXTRA REQUEST] which is outside our agreement. Write a friendly reply that appreciates the idea, clearly names it as an addition, and offers 2 options: add it for [PRICE] or schedule it for a later phase. Warm tone, zero apology.",
        ],
      },
      {
        title: "How to get 10x more from any prompt",
        numbered: [
          "Never accept the first draft. Reply with: make it sharper, cut 30 percent, and make the hook more specific. The second version is almost always better.",
          "Ask for variety, not perfection. Request 3 versions and steal the best lines from each.",
          "Feed it your real material. Your actual client phrases, real numbers, and true stories are what make output impossible to distinguish from you.",
          "When output sounds generic, the fix is almost never a better tool. It is more context. Go back to the context recipe and add detail.",
        ],
      },
    ],
  },
  {
    slug: "sales-pipeline-template",
    intro: [
      "Service businesses rarely lose deals to competitors. They lose them to silence: the follow up that never happened, the proposal nobody chased, the warm lead that went cold in a busy week.",
      "This template fixes that with structure. Copy the 7 stages, 5 fields, and follow up rules below into any CRM or even a plain spreadsheet. The system matters far more than the software.",
    ],
    sections: [
      {
        title: "How to use this template",
        numbered: [
          "Create the 7 stages below as columns in your CRM or spreadsheet. Use the exact entry rules so there is never a debate about where a deal belongs.",
          "Add the 5 fields to every deal. Resist adding more. Fields you do not fill in are worse than fields that do not exist.",
          "Adopt the one golden rule: every open deal has a next action with a date. A deal without a next action is not a deal, it is a hope.",
        ],
      },
      {
        title: "The 7 pipeline stages",
        intro:
          "Each stage has an entry rule, so a deal only moves forward when something real happened:",
        numbered: [
          "New Lead. Entry: someone showed interest but you have not spoken yet. A form fill, a DM, a referral intro. Exit within 48 hours, no exceptions.",
          "Contacted. Entry: you made the first personal touch. Not an auto reply, a real message from you.",
          "Qualified. Entry: you confirmed they have the problem you solve, a budget range that fits, and the authority to decide. If any of the three is missing, they go to Nurture instead.",
          "Discovery Done. Entry: you held the call, understood the problem in their words, and they agreed to see a proposal.",
          "Proposal Sent. Entry: the proposal is in their inbox with a price and a deadline for a decision. Never send a proposal without a follow up date already booked.",
          "Verbal Yes. Entry: they said yes in words. Exit: contract signed and invoice paid. Deals in this stage need the most attention because this is where excitement quietly evaporates.",
          "Won. Entry: money received. Trigger your onboarding here. Also create a Lost column and a Nurture column: Lost deals get a reason logged in one sentence, Nurture deals get a check in every 60 days.",
        ],
      },
      {
        title: "The 5 fields worth tracking",
        intro:
          "Most CRMs die from 25 empty fields. Track these 5 and nothing else until the system is a habit:",
        numbered: [
          "Next action and its date. The single most important field in your entire business. This is what makes deals unable to fall through cracks.",
          "Deal value. An estimate is fine. It lets you see which deals deserve your energy this week.",
          "Source. Where this lead came from: LinkedIn, referral, SEO, event. Three months of this data tells you where to invest.",
          "Stage entered date. When a deal sits in one stage too long, it is stuck and needs a different move, not another identical follow up.",
          "Last touch note. One line about the last interaction, written for your future self. What did they say, what do they care about.",
        ],
      },
      {
        title: "The follow up cadence that revives silent deals",
        intro:
          "When a prospect goes quiet after a proposal or a call, run this sequence. Each touch adds value instead of applying pressure:",
        numbered: [
          "Day 2: short check in. Ask if any questions came up. One sentence is enough.",
          "Day 5: add value. Send something useful related to their problem: an article, an example, a relevant result you got for someone like them.",
          "Day 10: address the silent objection. Most stalled deals have an unspoken worry. Name the most likely one openly and answer it.",
          "Day 18: the honest question. Ask directly: has this moved down your priority list? People respect the question and usually tell you the truth.",
          "Day 30: close the loop. Say you are closing the file for now and the door stays open. This message alone revives a surprising number of deals.",
          "After day 30: move to Nurture and check in every 60 days. No deal gets deleted, timing changes.",
        ],
      },
      {
        title: "Setup checklist",
        checklist: [
          {
            title: "The 7 stages exist in my CRM or spreadsheet",
            text: "Named exactly, with entry rules written where the team can see them.",
          },
          {
            title: "The 5 fields exist and nothing extra",
            text: "Next action with date, deal value, source, stage entered date, last touch note.",
          },
          {
            title: "Every current deal has been placed in its true stage",
            text: "Be ruthless. A deal you have not touched in 60 days goes to Nurture, not Proposal Sent.",
          },
          {
            title: "Every open deal has a next action with a date",
            text: "This will feel tedious exactly once. After that it becomes the habit that pays your invoices.",
          },
          {
            title: "The follow up cadence is saved as templates",
            text: "Write the 5 messages once, personalize in 2 minutes each time you use them.",
          },
        ],
      },
      {
        title: "The weekly pipeline ritual",
        intro:
          "Every Monday, 20 minutes, same order. Tick these off the first time you complete the ritual:",
        checklist: [
          {
            title: "Clear every overdue next action",
            text: "Do it or reschedule it consciously. Zero overdue actions is the goal, not heroics.",
          },
          {
            title: "Touch every deal in Verbal Yes and Proposal Sent",
            text: "These are your closest deals to money. They get attention before anything else.",
          },
          {
            title: "Check for deals stuck longer than 14 days in one stage",
            text: "Stuck deals need a new move: a different angle, a different person, or an honest question.",
          },
          {
            title: "Log a one line reason for anything moved to Lost",
            text: "After 10 losses, the patterns in these one liners will rewrite your sales approach.",
          },
          {
            title: "Check your pipeline total against your monthly target",
            text: "A healthy pipeline holds roughly 3x your monthly revenue goal. Below that, your Monday priority is lead generation, not delivery.",
          },
        ],
      },
    ],
  },
  {
    slug: "crm-implementation-checklist",
    intro: [
      "Most CRM projects fail quietly. The tool gets bought in a wave of optimism, half configured over a weekend, then abandoned by month two. The problem is almost never the software. It is the order in which things were done.",
      "This checklist sequences your rollout the right way. Work through the phases in order and tick as you go. Skipping ahead is exactly how the last attempt died.",
    ],
    sections: [
      {
        title: "The 8 mistakes that kill CRM adoption",
        intro:
          "Read these before you start. If your last CRM failed, you will recognize the cause:",
        numbered: [
          "Choosing the tool before defining the process. A CRM automates your sales process. If the process is unclear, you automate confusion.",
          "Importing dirty data. Old dead leads and duplicates make the CRM feel useless from day one.",
          "Creating 25 fields. Every empty field trains the team that the CRM is optional.",
          "Configuring everything alone and announcing it as finished. People reject systems they had no hand in shaping.",
          "No single owner. A system everyone shares and no one owns always decays.",
          "No weekly ritual. Tools do not create habits. Rituals create habits.",
          "Keeping the old spreadsheet alive as a backup. Two sources of truth means zero sources of truth.",
          "Measuring nothing. If the CRM never answers a question you care about, you will stop feeding it.",
        ],
      },
      {
        title: "Phase 1: Before you touch any software",
        checklist: [
          {
            title: "Our sales process is written down",
            text: "The stages a deal moves through, on one page. Use our Sales Pipeline Template if you have not defined this yet.",
          },
          {
            title: "One person owns the CRM",
            text: "Not the whole team. One name. The owner keeps data clean and runs the weekly ritual.",
          },
          {
            title: "We chose the 5 fields we will track",
            text: "Next action with date, deal value, source, stage entered date, last touch note. Everything else waits 90 days.",
          },
          {
            title: "We know the one question the CRM must answer",
            text: "For most service businesses: how much revenue is in the pipeline and what needs action this week.",
          },
          {
            title: "We picked a tool that matches our size",
            text: "For small teams, pick the simplest tool that does the job. Complexity you do not need today is friction you pay for daily.",
          },
        ],
      },
      {
        title: "Phase 2: Clean setup",
        checklist: [
          {
            title: "Old lead data is cleaned before import",
            text: "Delete duplicates and anything dead for over a year. Importing 2,000 cold contacts to feel productive is how CRMs become graveyards.",
          },
          {
            title: "Pipeline stages match our written process exactly",
            text: "Same names, same entry rules. The CRM should read like the document from Phase 1.",
          },
          {
            title: "Every imported deal has a stage and a next action",
            text: "An imported deal without a next action is clutter, not data.",
          },
          {
            title: "Lead sources are set up as options, not free text",
            text: "A dropdown with 6 options produces usable reports. Free text produces 40 spellings of LinkedIn.",
          },
          {
            title: "One automation is live, not ten",
            text: "Start with the highest value one: a task auto created when a new lead arrives. Add more only after the habit exists.",
          },
        ],
      },
      {
        title: "Phase 3: Team rollout",
        checklist: [
          {
            title: "The team helped shape the setup",
            text: "A 30 minute session where they poke holes in the stages and fields. Involvement now prevents rejection later.",
          },
          {
            title: "Everyone can do the 3 core actions",
            text: "Add a lead, update a stage, set a next action. If these take more than 30 seconds each, simplify.",
          },
          {
            title: "The rule is public: if it is not in the CRM, it did not happen",
            text: "Deals discussed in chat or remembered in heads do not count. This single rule does more than any feature.",
          },
          {
            title: "The old spreadsheet is retired with a date",
            text: "Announce the date, export a backup, then stop updating it. No parallel systems.",
          },
          {
            title: "The weekly pipeline ritual is in the calendar",
            text: "Same day, same 20 minutes, every week. The ritual is what keeps the system alive after the novelty fades.",
          },
        ],
      },
      {
        title: "Phase 4: Keeping it alive past month two",
        checklist: [
          {
            title: "Week 2 check: every open deal still has a next action",
            text: "This is the first place decay shows. Catch it in week 2 and the habit survives.",
          },
          {
            title: "Month 1 check: the CRM answered a real question",
            text: "Pipeline value, best lead source, stuck deals. The moment it answers something useful, it stops being admin and starts being an asset.",
          },
          {
            title: "Month 2 check: one improvement was made from the data",
            text: "Doubled down on the best source, fixed the stage where deals stall. Data that changes decisions is data people keep entering.",
          },
          {
            title: "New automations are added one at a time",
            text: "Each new automation gets two weeks to prove it saves time before the next one is added.",
          },
          {
            title: "The owner reviews field usage quarterly",
            text: "Any field empty on most deals gets deleted. A lean CRM that gets used beats a complete one that gets ignored.",
          },
        ],
      },
    ],
  },
  {
    slug: "service-business-seo-checklist",
    intro: [
      "Most SEO advice is written for bloggers and online stores, so service businesses end up publishing random articles and wondering why the phone stays silent. Ranking for buyers works differently: fewer pages, clearer services, stronger proof.",
      "This checklist covers what actually moves the needle for businesses that sell expertise. Tick as you go, and use the score at the end to see where you stand.",
    ],
    sections: [
      {
        title: "How SEO actually works for a service business",
        numbered: [
          "Buyers search for the service, the problem, or the comparison. Your job is to have one excellent page for each service and honest content for the problems around it.",
          "Google ranks pages it trusts. Trust comes from clarity, proof, and other reputable places pointing at you.",
          "SEO compounds. Everything below keeps paying you back for years, which is exactly why most competitors never do it.",
        ],
      },
      {
        title: "Part 1: Technical foundations",
        checklist: [
          {
            title: "Every page loads in under 3 seconds on a phone",
            text: "Test your homepage and one service page on your own phone with mobile data. Slow pages lose rankings and buyers at the same time.",
          },
          {
            title: "The site works flawlessly on mobile",
            text: "More than half your buyers check you on a phone first. Menus, forms, and buttons must work with a thumb.",
          },
          {
            title: "Every page has a unique title and description",
            text: "The title is your search result headline. Formula: Service for Who | Brand. Under 60 characters.",
          },
          {
            title: "A sitemap is submitted to Google Search Console",
            text: "Search Console is free and takes 15 minutes to set up. It tells you exactly which searches already show your site.",
          },
          {
            title: "No broken links or dead pages",
            text: "Click through your own site once a quarter. Every dead end quietly leaks trust with visitors and with Google.",
          },
        ],
      },
      {
        title: "Part 2: Service pages that rank and convert",
        checklist: [
          {
            title: "Each service has its own dedicated page",
            text: "One page listing six services ranks for nothing. Six focused pages can each rank for their own search.",
          },
          {
            title: "The headline says what, for whom, and the outcome",
            text: "Within 5 seconds a stranger knows they are in the right place. Clever taglines lose to clear promises.",
          },
          {
            title: "The page answers the 5 buyer questions",
            text: "What exactly do I get, how does it work, how long does it take, what does it roughly cost, and why you. Pages that answer these get the enquiry.",
          },
          {
            title: "Proof appears before the price",
            text: "A result, a testimonial, or a recognizable client near the top of the page. Buyers scroll for reasons to believe.",
          },
          {
            title: "One clear call to action, repeated",
            text: "Book a call, get an audit, download the checklist. One action, offered at the top, middle, and end.",
          },
          {
            title: "Services link to related proof and articles",
            text: "Internal links keep visitors moving and help Google understand what your site is about.",
          },
        ],
      },
      {
        title: "Part 3: Trust and local signals",
        checklist: [
          {
            title: "Google Business Profile is claimed and complete",
            text: "Even for online businesses. It is free, it shows in searches for your brand, and reviews live there.",
          },
          {
            title: "You have at least 10 genuine reviews",
            text: "Ask every happy client for a review the week the project ends. Reviews are the most undervalued free SEO asset there is.",
          },
          {
            title: "Name, contact details, and address match everywhere",
            text: "Website, Google, LinkedIn, directories. Inconsistency reads as unreliability to both people and search engines.",
          },
          {
            title: "The about page shows real humans",
            text: "Faces, names, and your founder story. Buyers and search engines both reward businesses that clearly exist.",
          },
          {
            title: "You appear in at least 5 places you do not own",
            text: "Directories, podcasts, guest posts, partner pages, industry lists. Every credible mention is a vote for your site.",
          },
        ],
      },
      {
        title: "Part 4: Content that attracts buyers, not just readers",
        checklist: [
          {
            title: "Content targets what buyers search before hiring you",
            text: "Cost guides, comparisons, how to choose articles, and problem explainers. One buyer focused article beats ten generic tips posts.",
          },
          {
            title: "Every article exists to support a service",
            text: "Each piece answers a real question and links to the relevant service page. Content without a job is decoration.",
          },
          {
            title: "You publish consistently, even if slowly",
            text: "Two excellent articles a month compounds. Twelve articles in January followed by silence does not.",
          },
          {
            title: "Case studies are published as pages",
            text: "Problem, approach, result with numbers. Case studies rank, convert, and arm your sales conversations all at once.",
          },
          {
            title: "Old content gets updated yearly",
            text: "Refreshing your best pages with current numbers and examples is the highest return hour in SEO.",
          },
        ],
      },
    ],
    scoring: {
      title: "Your SEO Score",
      intro: "Count your ticks across all 4 parts:",
      bands: [
        {
          range: "0 to 8",
          label: "Invisible online",
          text: "Your website is a brochure nobody finds. Start with Part 1 and Part 2 this month. The foundations alone will put you ahead of most local competitors.",
        },
        {
          range: "9 to 15",
          label: "Findable but leaky",
          text: "You show up sometimes but lose buyers on the page. Focus on Part 2 and Part 3: sharper service pages and more proof.",
        },
        {
          range: "16 to 21",
          label: "Compounding asset",
          text: "Your site works while you sleep. Keep publishing buyer focused content and updating your winners. You are playing a game most competitors quit.",
        },
      ],
    },
  },
  {
    slug: "30-day-content-calendar",
    intro: [
      "Consistency beats brilliance in content, but consistency needs a system. This calendar gives you 30 days mapped out: what to post, which angle to take, and which business goal each post serves. No more opening LinkedIn wondering what to say.",
      "The rhythm is 3 posts per week plus daily engagement. That is enough to grow steadily without content taking over your life. Pair it with our 100 LinkedIn Hooks swipe file and the writing becomes fill in the blanks.",
    ],
    sections: [
      {
        title: "The weekly rhythm",
        intro:
          "Every week repeats the same simple pattern. Three post types, three goals:",
        numbered: [
          "Monday: a Value post. Teach one thing from your expertise. Goal: authority. This is why people follow you.",
          "Wednesday: a Story or Opinion post. Show how you think and what you have lived. Goal: trust. This is why people remember you.",
          "Friday: a Proof or Offer post. A result, a case study, a client win, or a soft invitation to work with you. Goal: leads. This is why the content pays.",
          "Every weekday: 15 minutes of engagement. Comment thoughtfully on 5 posts where your buyers spend time. Comments are content with a smaller stage and often bring more profile visits than your own posts.",
        ],
      },
      {
        title: "Week 1: Foundations",
        numbered: [
          "Day 1 (Value): The single most common mistake you see in your field, and what to do instead.",
          "Day 2: Engage only. 5 thoughtful comments.",
          "Day 3 (Story): Why you started your business. Use Beat 2 and Beat 3 of your founder story.",
          "Day 4: Engage only.",
          "Day 5 (Proof): A client result with numbers. Before, after, and the one thing that made the difference.",
          "Day 6: Optional. Reshare your best performing post of the week with one new sentence of context.",
          "Day 7: Rest. Note down 3 content ideas that came up this week.",
        ],
      },
      {
        title: "Week 2: Depth",
        numbered: [
          "Day 8 (Value): A step by step breakdown. How you do one specific part of your work, numbered.",
          "Day 9: Engage only.",
          "Day 10 (Opinion): Something your industry does that you disagree with, and the better way. Use a contrarian hook.",
          "Day 11: Engage only.",
          "Day 12 (Proof): A mistake you made and what it cost. Vulnerability posts build more trust than wins.",
          "Day 13: Optional. Answer a question someone asked in your comments or DMs as a full post.",
          "Day 14: Rest. Review: which post got the most reach, comments, and profile visits?",
        ],
      },
      {
        title: "Week 3: Authority",
        numbered: [
          "Day 15 (Value): A list post. 5 to 7 tools, habits, or questions from your daily work. Easy to save, easy to share.",
          "Day 16: Engage only.",
          "Day 17 (Story): A client interaction that taught you something. Change names, keep the lesson.",
          "Day 18: Engage only.",
          "Day 19 (Proof): How you work. Walk through your process from enquiry to result. This post quietly pre sells every future call.",
          "Day 20: Optional. Share a stat about your industry with your take on what it means. Use a statistic hook.",
          "Day 21: Rest. Ask one happy client for a testimonial. You will use it next week.",
        ],
      },
      {
        title: "Week 4: Harvest",
        numbered: [
          "Day 22 (Value): Answer the question every prospect asks before hiring someone like you. Cost, timeline, or how to choose.",
          "Day 23: Engage only.",
          "Day 24 (Story): Where you were a few years ago versus today. A milestone post. Gratitude reads better than bragging.",
          "Day 25: Engage only.",
          "Day 26 (Offer): The direct post. Who you help, the outcome, one line of proof, and exactly how to start. Clear beats clever.",
          "Day 27: Optional. Post the testimonial from Day 21 with the story behind it.",
          "Day 28: Rest.",
          "Day 29: Review the month: your top 3 posts by comments and profile visits. Those topics are next month's Week 1.",
          "Day 30: Plan next month in 30 minutes using the same weekly rhythm. The calendar repeats, only the specifics change.",
        ],
      },
      {
        title: "The 2 hour weekly batching system",
        intro:
          "Never write day of. Batch once a week instead:",
        numbered: [
          "Minutes 0 to 15: pick hooks. Choose 3 hooks from the swipe file that match Monday, Wednesday, Friday.",
          "Minutes 15 to 75: draft all 3 posts. Rough is fine. Use the Founder GPT Prompt Pack to speed up drafting.",
          "Minutes 75 to 105: edit. Shorten sentences, sharpen hooks, cut the first paragraph if the post works without it. It usually does.",
          "Minutes 105 to 120: schedule all 3, morning your time. Done. The rest of the week is 15 minute engagement blocks only.",
        ],
      },
      {
        title: "Setup checklist",
        checklist: [
          {
            title: "My 3 weekly posting days are fixed in my calendar",
            text: "Same days every week. The rhythm matters more than the specific days you choose.",
          },
          {
            title: "The 2 hour batching block is booked weekly",
            text: "Protect it like a client call. This block is your marketing department.",
          },
          {
            title: "I have my hooks source ready",
            text: "Keep the 100 LinkedIn Hooks open during batching. Never start a post from a blank line.",
          },
          {
            title: "My engagement list of 20 accounts exists",
            text: "People your buyers follow and places your buyers comment. Your 15 minute blocks happen there, not on the general feed.",
          },
          {
            title: "I track 3 numbers monthly",
            text: "Profile visits, followers, and enquiries mentioning your content. If enquiries grow, the system works, whatever the like counts say.",
          },
        ],
      },
    ],
  },
  {
    slug: "hiring-scorecard",
    intro: [
      "A bad hire costs a multiple of their salary in wasted months, redone work, and lost momentum. And here is the uncomfortable part: most bad hires interviewed brilliantly. Charm is not competence.",
      "This scorecard removes the gut feeling from hiring. Define the outcomes before you interview, ask questions that surface evidence, score every candidate on the same grid, and let the numbers argue with your first impression.",
    ],
    sections: [
      {
        title: "Step 1: Define the role by outcomes, not duties",
        intro:
          "Before writing any job post, answer these three questions in writing:",
        numbered: [
          "What 3 outcomes must this person deliver in the first 6 months? Specific and measurable, for example: takes over all client reporting with zero misses, or brings response time under 2 hours.",
          "Which 3 skills are genuinely non negotiable for those outcomes? Only three. Everything else is trainable or nice to have.",
          "What would make this hire a clear failure at month 6? Writing the failure case now makes it visible in interviews later.",
        ],
      },
      {
        title: "Step 2: The scoring grid",
        intro:
          "Score every candidate 1 to 5 on the same six dimensions, immediately after each interview, before discussing with anyone:",
        numbered: [
          "Evidence for outcome 1. Have they actually done something close to this before? 5 means proven with specifics, 1 means claims only.",
          "Evidence for outcome 2. Same standard: real examples with their personal role clear, not team achievements they stood near.",
          "Evidence for outcome 3. If a role outcome is new territory for every candidate, score how they have learned adjacent things fast.",
          "Coachability. Did they mention learning from a mistake without being cornered into it? Did they ask questions that showed real thought?",
          "Communication. Were answers structured and concrete? People who communicate clearly in interviews communicate clearly with clients.",
          "Values fit. Would you trust this person alone with your best client? Score the evidence, not the vibe.",
        ],
      },
      {
        title: "Step 3: Evidence based interview questions",
        intro:
          "Every question asks about the past, because past behavior predicts future behavior far better than hypotheticals:",
        numbered: [
          "Walk me through a time you delivered [OUTCOME FROM YOUR LIST]. What was your specific role, and what was the result in numbers?",
          "Tell me about a project that went wrong. What was your part in the failure, and what did you change afterwards?",
          "Describe the most difficult feedback you have received. What did you do about it?",
          "What is something you taught yourself in the last year? How did you go about it?",
          "Tell me about a time you disagreed with a boss or client. What did you do?",
          "Walk me through a normal week in your last role. Where did your time actually go?",
          "What questions do you have about the outcomes this role must deliver? Strong candidates interrogate the goal. Weak ones only ask about perks.",
        ],
      },
      {
        title: "The 5 red flags founders notice too late",
        numbered: [
          "Every failure story blames someone else. This person will one day blame you, your client, or your process.",
          "Impressive titles but vague specifics. Press for their personal contribution. If it stays foggy, the achievement was the team, not them.",
          "They speak poorly of every previous employer. You are hearing your own future reference.",
          "All confidence, zero questions. Someone who has nothing to ask about the actual work is performing, not evaluating.",
          "Pushy timeline pressure without reason. Real urgency exists, but manufactured scarcity is a sales tactic, and you are the prospect.",
        ],
      },
      {
        title: "Final decision checklist",
        checklist: [
          {
            title: "The scorecard was filled in right after each interview",
            text: "Memory rewrites interviews within hours, always in favor of charm. Score first, discuss second.",
          },
          {
            title: "No score below 3 on any non negotiable outcome",
            text: "One weak core dimension does not average out. It becomes your problem at month 3.",
          },
          {
            title: "Total score is 24 or higher out of 30",
            text: "Below 24 means keep looking. The most expensive sentence in hiring is: they were the best of the batch.",
          },
          {
            title: "A paid test project confirmed the top candidate",
            text: "A few hours of real, paid work reveals more than three interviews. Small task, real conditions, clear brief.",
          },
          {
            title: "References were called and asked one killer question",
            text: "Ask: would you enthusiastically hire this person again? The pause before the answer is the answer.",
          },
          {
            title: "You are excited, not just relieved",
            text: "Relief means you are tired of searching. Hire on evidence and enthusiasm, never on exhaustion.",
          },
        ],
      },
    ],
  },
];

export function getResourceContent(slug: string): ResourceContent | undefined {
  return resourceContents.find((c) => c.slug === slug);
}
