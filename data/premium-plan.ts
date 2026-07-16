// data/premium-plan.ts

import type { PillarId } from "@/types/linkedin-score";

export interface PlanAction {
  title: string;
  task: string;
  minutes: number;
}

export interface PillarActionBank {
  pillar: PillarId;
  label: string;
  foundation: PlanAction[];
  routine: PlanAction[];
}

export interface PlanDay {
  day: number;
  pillarLabel: string;
  title: string;
  task: string;
  minutes: number;
}

export interface HeadlineFormula {
  name: string;
  formula: string;
  before: string;
  after: string;
}

export const actionBanks: PillarActionBank[] = [
  {
    pillar: "first-impression",
    label: "First Impression",
    foundation: [
      {
        title: "Design your billboard banner",
        task: "Open Canva, search LinkedIn banner, and build one with a single line: who you help plus the outcome you deliver, plus your website. Upload it today, even if it is version 1.",
        minutes: 25,
      },
      {
        title: "Upgrade your profile photo",
        task: "Take 20 photos near a window in daylight, plain background, face filling about 60 percent of the frame, slight smile. Pick the one where you look like someone you would trust with money.",
        minutes: 20,
      },
      {
        title: "Claim your custom URL",
        task: "Open your profile, go to public profile settings, and change your URL to linkedin.com/in/yourname. Update it in your email signature too.",
        minutes: 5,
      },
      {
        title: "Rewrite your first 3 lines",
        task: "Your about section gets cut after roughly 3 lines. Rewrite the opening with a number, a question, or a bold claim about your reader's biggest problem. Make clicking See more irresistible.",
        minutes: 30,
      },
      {
        title: "Run the mobile test",
        task: "Open your profile on your phone in incognito. Screenshot what a stranger sees without scrolling. Fix anything that does not scream credibility within 5 seconds.",
        minutes: 10,
      },
    ],
    routine: [
      {
        title: "Study 3 competitor profiles",
        task: "Open 3 profiles of people winning in your space. Note one thing each does better than you above the fold. Steal the principle, not the words.",
        minutes: 15,
      },
      {
        title: "Get 5 second feedback",
        task: "Send your profile to 2 people who match your target audience. Ask one question: in 5 seconds, what do I do and for whom? If they hesitate, sharpen the top of your profile.",
        minutes: 10,
      },
      {
        title: "Check your profile views trend",
        task: "Open your analytics. Are profile views up or down versus last week? Note which post or activity drove the spike and do more of it.",
        minutes: 10,
      },
      {
        title: "Refresh your banner message",
        task: "Reread your banner line as a stranger. Can it be more specific? Swap one vague word for one concrete outcome or number.",
        minutes: 15,
      },
    ],
  },
  {
    pillar: "positioning",
    label: "Positioning",
    foundation: [
      {
        title: "Write 5 headline drafts",
        task: "Use the formula: I help [who] get [outcome] with [method], plus one proof point. Write 5 versions, sleep on them, publish the sharpest one tomorrow morning.",
        minutes: 30,
      },
      {
        title: "Choose one audience, one outcome",
        task: "Write down every audience you could serve. Circle the one that pays best and that you have proof for. Your entire profile now speaks to only that circle.",
        minutes: 25,
      },
      {
        title: "Rebuild the middle of your about section",
        task: "After your hook, add your proof story: the problem you solve, how you discovered your method, and the results it produced. Write it in first person, to one reader.",
        minutes: 35,
      },
      {
        title: "Add 3 real numbers",
        task: "Find 3 concrete figures from your work: clients served, results generated, years, timeframes. Add them to your about section. Small true numbers beat big vague claims.",
        minutes: 15,
      },
      {
        title: "Hunt down every buzzword",
        task: "Search your profile for passionate, motivated, guru, visionary, results driven. Replace each one with something checkable that proves the same claim.",
        minutes: 15,
      },
    ],
    routine: [
      {
        title: "Sharpen one line of your headline",
        task: "Look at this week's profile views. If views are flat, your headline is not stopping the scroll. Test one sharper outcome word.",
        minutes: 10,
      },
      {
        title: "Collect one new proof point",
        task: "Find one new number from recent work, a result, a milestone, a client count, and work it into your about section or a post.",
        minutes: 15,
      },
      {
        title: "Steal your clients' words",
        task: "Ask one client: what would you say I actually did for you? Their exact phrasing is better positioning copy than anything you will write. Use it.",
        minutes: 15,
      },
      {
        title: "Run a positioning check",
        task: "Read your headline and first 3 lines out loud. Does it say who, what outcome, and why believe you? If any of the three is missing, fix that one today.",
        minutes: 15,
      },
    ],
  },
  {
    pillar: "content-engine",
    label: "Content Engine",
    foundation: [
      {
        title: "Set your minimum viable week",
        task: "Decide your floor: 2 posts plus 5 comments per day. Put both in your calendar as real appointments. Consistency you can sustain beats intensity you cannot.",
        minutes: 15,
      },
      {
        title: "Batch write your first 2 posts",
        task: "One post: a mistake you made and what it cost. Second post: a lesson a client taught you. Hook in line one, one idea per post, end with a question.",
        minutes: 45,
      },
      {
        title: "Build your engagement list",
        task: "List 10 accounts your ideal buyers already follow. Follow them, turn on notifications, and be one of the first thoughtful comments on their next post.",
        minutes: 15,
      },
      {
        title: "Pick your 3 recurring formats",
        task: "Choose 3 you can repeat forever: for example client story, how to breakdown, and contrarian opinion. Recurring formats kill the blank page problem permanently.",
        minutes: 30,
      },
      {
        title: "Repurpose your best old post",
        task: "Find your best performing post ever. Turn it into a different format: a carousel, a short video, or a longer story. Winners deserve second lives.",
        minutes: 30,
      },
    ],
    routine: [
      {
        title: "Publish a post",
        task: "Use one of your 3 recurring formats. Spend half your time on the first line, it decides whether the rest gets read at all.",
        minutes: 30,
      },
      {
        title: "Leave 10 real comments",
        task: "Go through your engagement list and leave 10 comments that add something: an example, a counterpoint, a sharper phrasing. No great post or thanks for sharing.",
        minutes: 20,
      },
      {
        title: "Batch your next 2 posts",
        task: "Write 2 posts in one sitting while you are warm. Future you will thank present you on the next busy day.",
        minutes: 45,
      },
      {
        title: "Work the first hour",
        task: "After posting, stay for 60 minutes. Reply to every comment with a real response. The algorithm reads early conversation as a quality signal.",
        minutes: 15,
      },
    ],
  },
  {
    pillar: "social-proof",
    label: "Social Proof",
    foundation: [
      {
        title: "Request 3 recommendations",
        task: "Message 3 past clients or colleagues: I am updating my profile, would you write 3 lines about the result we got together? Offer to write one for them in return.",
        minutes: 20,
      },
      {
        title: "Curate your Featured section",
        task: "Pin exactly 3 items: your strongest result or case study, your most valuable post, and one free resource. Delete everything else. It is a shop window, not a storage room.",
        minutes: 20,
      },
      {
        title: "Add client outcomes to your about",
        task: "Write 2 lines, each with a client type, the problem, and a number: for example, helped a staffing firm double qualified leads in 90 days. Place them right after your story.",
        minutes: 20,
      },
      {
        title: "Build your proof vault",
        task: "Create one folder. Collect every testimonial, kind message, result screenshot, and metric you have. You will pull from this vault weekly from now on.",
        minutes: 15,
      },
      {
        title: "Write one mini case study",
        task: "One client, one problem, what you did, the result with a number, and one lesson. Post it. This single format wins clients more reliably than any other.",
        minutes: 40,
      },
    ],
    routine: [
      {
        title: "Bank one new recommendation",
        task: "One short message to one person you delivered for recently. Recommendations compound, and almost nobody asks consistently.",
        minutes: 10,
      },
      {
        title: "Post one client win",
        task: "Pull something from your proof vault and turn it into a short post. Frame it as a lesson so it teaches while it proves.",
        minutes: 30,
      },
      {
        title: "Refresh your Featured section",
        task: "Check your 3 pinned items. If you have produced stronger proof since, swap the weakest one out.",
        minutes: 10,
      },
      {
        title: "Turn a conversation into proof",
        task: "Find one client conversation from this week with a result or insight in it. Ask permission, then share the lesson publicly.",
        minutes: 30,
      },
    ],
  },
  {
    pillar: "conversion",
    label: "Conversion",
    foundation: [
      {
        title: "Set up your booking link",
        task: "Create a free Cal.com account and a 20 minute intro call event. Add the link to your contact info. Interested visitors should never have to work to reach you.",
        minutes: 25,
      },
      {
        title: "Close your about with a CTA",
        task: "Add one final line: Want [outcome]? DM me the word [WORD] or book a call at [your link]. A convinced reader with no instruction simply leaves.",
        minutes: 10,
      },
      {
        title: "Open every door",
        task: "Make Follow your primary button, check that people outside your network can message you, and put an email in your contact info. Remove every wall between you and inbound leads.",
        minutes: 10,
      },
      {
        title: "Put your link in Featured",
        task: "Add your booking link as a Featured item with a title that sells the outcome of the call, not the call itself.",
        minutes: 10,
      },
      {
        title: "Write your DM playbook",
        task: "Draft a short friendly reply template for inquiries: acknowledge, one smart question, then the booking link. Warm speed wins deals.",
        minutes: 20,
      },
    ],
    routine: [
      {
        title: "Add a soft CTA to a post",
        task: "End one post this week with a low pressure next step: DM me the word AUDIT, or the link is in my Featured section.",
        minutes: 5,
      },
      {
        title: "Follow up with warm viewers",
        task: "Check who viewed your profile. Send a friendly, no pitch opener to 3 relevant people: thanks for stopping by, what brought you here?",
        minutes: 20,
      },
      {
        title: "Find this week's leak",
        task: "Trace the funnel: profile views, link clicks, calls booked. Whichever step drops the most is your one conversion fix for next week.",
        minutes: 15,
      },
      {
        title: "Test a sharper CTA",
        task: "Rewrite the closing line of your about section with a more specific outcome. Small wording changes move booking rates more than you would expect.",
        minutes: 10,
      },
    ],
  },
];

export const reviewDays: PlanAction[] = [
  {
    title: "Week 1 review: foundations",
    task: "Look back at the week. Which fixes are done, which slipped? Move anything unfinished to tomorrow. Then note one number: profile views this week, your baseline.",
    minutes: 15,
  },
  {
    title: "Week 2 review: momentum",
    task: "Compare profile views and post reach to week 1. What worked? Do twice as much of that next week and drop one thing that produced nothing.",
    minutes: 15,
  },
  {
    title: "Week 3 review: signals",
    task: "Check for the real signals: new followers in your target audience, DMs, profile views from decision makers. Adjust who you engage with based on who is actually showing up.",
    minutes: 15,
  },
  {
    title: "Week 4 review: results",
    task: "Retake the Socieas Score. Compare every pillar to your original report. Celebrate the jumps, and your lowest pillar today becomes the focus of your next 30 days.",
    minutes: 20,
  },
];

export const headlineFormulas: HeadlineFormula[] = [
  {
    name: "The Outcome Formula",
    formula: "I help [who] get [outcome] with [method] | [proof point]",
    before: "CEO at Socieas | Entrepreneur | Passionate about marketing",
    after:
      "I help service founders turn LinkedIn into a client engine with proven brand systems | 120 plus profiles transformed",
  },
  {
    name: "The Result First Formula",
    formula: "[Specific result] for [who] | [how] | [CTA]",
    before: "Marketing Consultant | Growth Expert | Speaker",
    after:
      "3x inbound leads for B2B founders in 90 days | Done with you brand systems | DM me GROW to start",
  },
  {
    name: "The Enemy Formula",
    formula: "[Who] : stop [common mistake]. I help you [outcome] instead | [proof]",
    before: "Founder | Helping businesses grow online",
    after:
      "Founders: stop posting into the void. I turn your expertise into a brand that sells | 8 years, 40 plus brands",
  },
];

export const aboutBlueprint: string[] = [
  "Line 1 to 3, the hook: a number, question, or bold claim about your reader's problem. This is all most people see, so earn the click on See more.",
  "The problem: describe your reader's situation so accurately they feel seen. Two or three lines, written to one person.",
  "Your proof story: how you learned to solve it, told with real numbers. Not your biography, only the parts that build trust.",
  "How you work: your method in 3 simple steps, so hiring you feels concrete instead of vague.",
  "Client outcomes: 2 lines, each with a client type, problem, and a number.",
  "The close: one clear CTA. DM keyword, booking link, or email. One instruction, not three.",
];
