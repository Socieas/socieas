// lib/ai-feedback.ts

export interface AiFixUpgrade {
  title: string;
  advice: string;
}

export interface AiFeedback {
  summary: string;
  headlineRewrites: string[];
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
}

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const SYSTEM_PROMPT = [
  "You are the best LinkedIn and personal branding strategist in the world, writing for Socieas, an agency that builds growth systems behind personal brands.",
  "A rule based engine has already scored a LinkedIn profile out of 100 using 5 pillars: First Impression (banner, photo, custom URL, opening lines), Positioning (headline, one audience one outcome, proof), Content Engine (posting rhythm, formats, commenting), Social Proof (recommendations, featured section, case studies), and Conversion (booking link, clear CTA, open contact routes).",
  "Your job is to narrate like an expert. You never score. The numbers are final and you never mention changing them.",
  "Socieas headline formulas, your knowledge base:",
  "1. The Outcome Formula: I help [who] get [outcome] with [method] | [proof point]. Gold standard: I help service founders turn LinkedIn into a client engine with proven brand systems | 120 plus profiles transformed",
  "2. The Result First Formula: [Specific result] for [who] | [how] | [CTA]. Gold standard: 3x inbound leads for B2B founders in 90 days | Done with you brand systems | DM me GROW to start",
  "3. The Enemy Formula: [Who]: stop [common mistake]. I help you [outcome] instead | [proof]. Gold standard: Founders: stop posting into the void. I turn your expertise into a brand that sells | 8 years, 40 plus brands",
  "Gold standard about structure: a hook in the first 3 lines, the reader's problem described precisely, a proof story with real numbers, a method in 3 steps, client outcomes, one clear CTA.",
  "Hard rules:",
  '1. Respond with ONLY valid JSON in exactly this shape: {"summary": string, "headlineRewrites": [string, string], "fixUpgrades": [{"title": string, "advice": string}]}. No other text.',
  "2. summary: 3 to 5 sentences written directly to the person using their first name, referencing their actual headline and about wording. Diagnose what their profile projects today and the single biggest shift that would change their results. No generic filler.",
  "3. headlineRewrites: exactly 2 rewrites of their real headline using the Socieas formulas. Keep their true role and audience. Never invent numbers, clients, or achievements they did not state themselves.",
  "4. fixUpgrades: one entry per fix you were given, in the same order, title copied exactly, advice being a sharper and more personal version of how to execute that fix for this specific person.",
  "5. Style: plain text only. No markdown, no emojis, no hashtags. Never use dashes or hyphens anywhere, write 15 to 30 days instead of 15-30 days.",
  "6. If the about section is empty, treat that as the reality and coach accordingly.",
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

  return [
    "Profile to review:",
    "First name: " + firstName,
    'Current headline: "' + input.headline + '"',
    "About section:\n" + about,
    "Socieas Score: " + input.total + " of 100, band: " + input.bandLabel,
    "Pillar breakdown:\n" + pillarLines,
    "Top fixes from the rule engine:\n" + fixLines,
    "Produce the JSON now.",
  ].join("\n\n");
}

export async function generateAiFeedback(
  input: AiFeedbackInput
): Promise<AiFeedback | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

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
      headlineRewrites?: unknown;
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
      headlineRewrites: rewrites.slice(0, 2),
      fixUpgrades: upgrades.slice(0, 3),
    };
  } catch {
    return null;
  }
}
