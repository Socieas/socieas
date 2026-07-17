// lib/ai-feedback.ts

export interface AiFixUpgrade {
  title: string;
  advice: string;
}

export interface AiFeedback {
  summary: string;
  headlineVerdict: string;
  headlineRewrites: string[];
  aboutVerdict: string;
  aboutRewrite: string;
  fixUpgrades: AiFixUpgrade[];
}

export interface AiFeedbackInput {
  name: string;
  headline: string;
  about: string;
  total: number;
  bandLabel: string;
  pillars: Array<{ label: string; points: number; maxPoints: number }>;
  topFixes: Array<{ title: string; why: string; how: string }>;
  rawProfile?: string;
}

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const SYSTEM_PROMPT = [
  "You are the best LinkedIn and personal branding strategist in the world, writing for Socieas, an agency that builds growth systems behind personal brands.",
  "A rule based engine has already scored a LinkedIn profile out of 100 using 5 pillars: First Impression (custom URL, opening lines), Positioning (headline, one audience one outcome, proof), Content Engine (posting rhythm, formats, commenting), Social Proof (recommendations, featured section, case studies), and Conversion (booking link, clear CTA, open contact routes).",
  "You receive the full raw text of the person's LinkedIn profile page, exactly as pasted from their browser. It contains their experience, education, posts, activity, skills, and recommendations, mixed with LinkedIn interface noise like button labels and navigation text. Read everything and silently ignore the noise.",
  "Your job is to give an honest expert verdict like a strategist who has studied this exact profile for an hour. You never score. The numbers are final and you never mention changing them.",
  "Socieas headline formulas, your knowledge base:",
  "1. The Outcome Formula: I help [who] get [outcome] with [method] | [proof point]. Gold standard: I help service founders turn LinkedIn into a client engine with proven brand systems | 120 plus profiles transformed",
  "2. The Result First Formula: [Specific result] for [who] | [how] | [CTA]. Gold standard: 3x inbound leads for B2B founders in 90 days | Done with you brand systems | DM me GROW to start",
  "3. The Enemy Formula: [Who]: stop [common mistake]. I help you [outcome] instead | [proof]. Gold standard: Founders: stop posting into the void. I turn your expertise into a brand that sells | 8 years, 40 plus brands",
  "Gold standard about structure: a hook in the first 3 lines, the reader's problem described precisely, a proof story with real numbers, a method in 3 steps, client outcomes, one clear CTA.",
  "Hard rules:",
  '1. Respond with ONLY valid JSON in exactly this shape: {"summary": string, "headlineVerdict": string, "headlineRewrites": [string, string], "aboutVerdict": string, "aboutRewrite": string, "fixUpgrades": [{"title": string, "advice": string}]}. No other text.',
  "2. summary: 4 to 6 sentences written directly to the person using their first name. It must reference at least two concrete details found only in their profile, such as a company name, a role, a post topic, a skill, or a number they mention. Diagnose what their profile projects today and the single biggest shift that would change their results. No generic filler.",
  "3. headlineVerdict: 2 to 3 sentences of honest verdict on their current headline. Open with a plain judgement, weak, average, or strong, then explain exactly why using its actual words and what it costs them. Never soften a weak headline and never flatter a strong one beyond what it earns.",
  "4. headlineRewrites: exactly 2 rewrites of their real headline using the Socieas formulas, built from their true role, audience, and industry as found in the profile. Never invent numbers, clients, or achievements they did not state themselves. If real proof points exist in their profile, use them.",
  "5. aboutVerdict: the same honest treatment for their about section. Plain judgement first, then why, referencing their actual lines. If the about section is empty or missing, say plainly what an empty about section signals to a visitor and what it costs them.",
  "6. aboutRewrite: a complete ready to paste about section of 120 to 180 words, first person, following the gold standard structure, built only from real facts found in their profile. Never invent clients, numbers, or results. Separate short paragraphs with line breaks. If the profile is thin, write the strongest honest version possible from what exists.",
  "7. fixUpgrades: one entry per fix you were given, in the same order, title copied exactly. The advice must be executable with their actual content: name the exact experience entry to rewrite, propose their next 3 post topics based on their real expertise, or point to the specific story in their profile to turn into a featured case study. Advice that could be sent to any other person unchanged is a failure.",
  "8. Style: plain text only. No markdown, no emojis, no hashtags. Never use dashes or hyphens anywhere, write 15 to 30 days instead of 15-30 days.",
  "9. If the pasted profile text is missing or too thin to find details, still follow every rule using the headline and about section you have, and never pretend to know things you were not given.",
].join("\n");

function buildUserPrompt(input: AiFeedbackInput): string {
  const firstName = input.name.trim().split(/\s+/)[0] ?? input.name;
  const pillarLines = input.pillars
    .map((p) => p.label + ": " + p.points + " of " + p.maxPoints)
    .join("\n");
  const fixLines = input.topFixes
    .map(
      (f, i) => i + 1 + ". " + f.title + " | Why: " + f.why + " | How: " + f.how
    )
    .join("\n");
  const about =
    input.about.trim().length > 0 ? input.about.trim().slice(0, 1500) : "(empty)";
  const raw = (input.rawProfile || "").trim();

  const sections = [
    "Profile to review:",
    "First name: " + firstName,
    'Current headline: "' + input.headline + '"',
    "About section:\n" + about,
    "Socieas Score: " + input.total + " of 100, band: " + input.bandLabel,
    "Pillar breakdown:\n" + pillarLines,
    "Top fixes from the rule engine:\n" + fixLines,
  ];

  if (raw.length > 0) {
    sections.push(
      "Full pasted LinkedIn profile page text, read it all and ignore interface noise:\n" +
        raw.slice(0, 12000)
    );
  }

  sections.push("Produce the JSON now.");

  return sections.join("\n\n");
}

export async function generateAiFeedback(
  input: AiFeedbackInput
): Promise<AiFeedback | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: buildUserPrompt(input) }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) return null;

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof text !== "string" || text.trim().length === 0) return null;

    const parsed = JSON.parse(text) as {
      summary?: unknown;
      headlineVerdict?: unknown;
      headlineRewrites?: unknown;
      aboutVerdict?: unknown;
      aboutRewrite?: unknown;
      fixUpgrades?: unknown;
    };

    if (
      typeof parsed.summary !== "string" ||
      parsed.summary.trim().length < 40
    ) {
      return null;
    }

    if (!Array.isArray(parsed.headlineRewrites)) return null;
    const rewrites: string[] = [];
    for (const h of parsed.headlineRewrites) {
      if (typeof h === "string" && h.trim().length > 10) {
        rewrites.push(h.trim());
      }
    }
    if (rewrites.length < 2) return null;

    const headlineVerdict =
      typeof parsed.headlineVerdict === "string"
        ? parsed.headlineVerdict.trim()
        : "";
    const aboutVerdict =
      typeof parsed.aboutVerdict === "string" ? parsed.aboutVerdict.trim() : "";
    const aboutRewrite =
      typeof parsed.aboutRewrite === "string" ? parsed.aboutRewrite.trim() : "";

    const upgrades: AiFixUpgrade[] = [];
    if (Array.isArray(parsed.fixUpgrades)) {
      for (const item of parsed.fixUpgrades) {
        if (
          item &&
          typeof item === "object" &&
          typeof (item as { title?: unknown }).title === "string" &&
          typeof (item as { advice?: unknown }).advice === "string"
        ) {
          upgrades.push({
            title: (item as { title: string }).title.trim(),
            advice: (item as { advice: string }).advice.trim(),
          });
        }
      }
    }

    return {
      summary: parsed.summary.trim(),
      headlineVerdict,
      headlineRewrites: rewrites.slice(0, 2),
      aboutVerdict,
      aboutRewrite,
      fixUpgrades: upgrades.slice(0, 3),
    };
  } catch {
    return null;
  }
}
