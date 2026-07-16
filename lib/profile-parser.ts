// lib/profile-parser.ts

export interface ParsedProfile {
  headline: string;
  about: string;
  answers: Record<string, string>;
  detected: string[];
}

const SECTION_HEADERS = [
  "About",
  "Featured",
  "Activity",
  "Experience",
  "Education",
  "Services",
  "Skills",
  "Recommendations",
  "Licenses & certifications",
  "Interests",
  "Publications",
  "Projects",
  "Languages",
  "Honors & awards",
  "Volunteering",
  "Courses",
];

function toLines(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

function isSectionHeader(line: string): boolean {
  return SECTION_HEADERS.some(
    (h) => line.toLowerCase() === h.toLowerCase()
  );
}

function findSectionIndex(lines: string[], header: string): number {
  return lines.findIndex((l) => l.toLowerCase() === header.toLowerCase());
}

function extractSection(lines: string[], header: string): string {
  const start = findSectionIndex(lines, header);
  if (start === -1) return "";
  const collected: string[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    if (isSectionHeader(line)) break;
    collected.push(line);
  }
  return collected.join("\n");
}

function extractHeadline(lines: string[], name: string): string {
  const cleanName = name.trim().toLowerCase();
  let nameIndex = -1;
  if (cleanName.length > 1) {
    nameIndex = lines.findIndex(
      (l) => l.toLowerCase() === cleanName || l.toLowerCase().startsWith(cleanName)
    );
  }
  const startFrom = nameIndex >= 0 ? nameIndex + 1 : 0;
  const stopWords = /followers|connections|contact info|degree connection|profile viewers|post impressions/i;
  const skipWords = /^\(?\s*(he|she|they)\b|^·|^1st$|^2nd$|^3rd$|^verified/i;

  for (let i = startFrom; i < Math.min(startFrom + 8, lines.length); i++) {
    const line = lines[i];
    if (!line) continue;
    if (isSectionHeader(line)) break;
    if (stopWords.test(line)) break;
    if (skipWords.test(line)) continue;
    if (/^talks about/i.test(line)) continue;
    if (line.length >= 8) return line;
  }
  return "";
}

function detectTimeMarkers(text: string): { recent: number; weeks: number; months: number } {
  const counts = { recent: 0, weeks: 0, months: 0 };
  const regex = /\b(\d+)\s*(h|hr|d|w|mo|yr)\b/g;
  let match = regex.exec(text);
  while (match !== null) {
    const unit = match[2];
    if (unit === "h" || unit === "hr" || unit === "d") counts.recent += 1;
    else if (unit === "w") counts.weeks += 1;
    else if (unit === "mo") counts.months += 1;
    match = regex.exec(text);
  }
  return counts;
}

function countMatches(text: string, regex: RegExp): number {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

export function parseProfileText(
  raw: string,
  linkedinUrl: string,
  name: string
): ParsedProfile {
  const lines = toLines(raw);
  const fullText = lines.join("\n");
  const detected: string[] = [];
  const answers: Record<string, string> = {};

  /* Headline and about */
  const headline = extractHeadline(lines, name);
  if (headline) detected.push("Headline detected");

  const about = extractSection(lines, "About");
  if (about) detected.push("About section detected");

  /* Custom URL: no long digit runs in the slug */
  const slugMatch = linkedinUrl.match(/\/in\/([^/?#]+)/i);
  const slug = slugMatch && slugMatch[1] ? slugMatch[1] : "";
  if (slug && !/\d{5,}/.test(slug)) {
    answers["q-url"] = "yes";
    detected.push("Custom profile URL detected");
  } else {
    answers["q-url"] = "no";
  }

  /* Featured section */
  const featured = extractSection(lines, "Featured");
  if (featured.length > 120) {
    answers["q-featured"] = "strategic";
    detected.push("Featured section detected");
  } else if (featured.length > 0) {
    answers["q-featured"] = "something";
    detected.push("Featured section detected");
  } else {
    answers["q-featured"] = "empty";
  }

  /* Recommendations */
  const recommendations = extractSection(lines, "Recommendations");
  if (recommendations.length > 0) {
    const recCount = countMatches(recommendations, /·\s*(1st|2nd|3rd)/gi);
    answers["q-recommendations"] = recCount >= 5 ? "many" : "few";
    detected.push("Recommendations detected");
  } else {
    answers["q-recommendations"] = "none";
  }

  /* Creator mode signals */
  if (/talks about/i.test(fullText) || /[\d,.]+\s*followers/i.test(fullText)) {
    answers["q-creator"] = "yes";
    detected.push("Creator setup detected");
  } else {
    answers["q-creator"] = "no";
  }

  /* Activity rhythm */
  const activity = extractSection(lines, "Activity") || fullText;
  const markers = detectTimeMarkers(activity);

  if (markers.recent >= 3) {
    answers["q-frequency"] = "high";
  } else if (markers.recent >= 1 || markers.weeks >= 1) {
    answers["q-frequency"] = "medium";
  } else if (markers.months >= 1) {
    answers["q-frequency"] = "low";
  } else {
    answers["q-frequency"] = "never";
  }
  if (answers["q-frequency"] !== "never") {
    detected.push("Posting rhythm estimated from recent activity");
  }

  /* Consistency, derived from the same markers */
  if (markers.recent >= 1 && markers.weeks + markers.recent >= 2) {
    answers["q-consistency"] = "weekly";
  } else if (markers.recent + markers.weeks + markers.months >= 1) {
    answers["q-consistency"] = "gaps";
  } else {
    answers["q-consistency"] = "inactive";
  }

  /* Commenting */
  const commentCount = countMatches(fullText, /commented on/gi);
  if (commentCount >= 2) {
    answers["q-commenting"] = "daily";
    detected.push("Commenting habit detected");
  } else if (commentCount === 1) {
    answers["q-commenting"] = "sometimes";
  } else {
    answers["q-commenting"] = "never";
  }

  /* Content formats */
  if (answers["q-frequency"] === "never") {
    answers["q-formats"] = "none";
  } else {
    const formatSignals = [
      /video/i.test(activity),
      /document|carousel/i.test(activity),
      /newsletter/i.test(fullText),
      /photo|image/i.test(activity),
    ].filter(Boolean).length;
    answers["q-formats"] = formatSignals >= 2 ? "mixed" : "single";
  }

  /* Contact and conversion */
  const hasEmail = /[\w.+-]+@[\w-]+\.[\w.]{2,}/.test(fullText);
  const hasBooking = /calendly|cal\.com|topmate|book a call|book an intro/i.test(fullText);
  if (hasEmail || hasBooking) {
    answers["q-contact"] = "clear";
    detected.push("Contact route detected");
  } else {
    answers["q-contact"] = "dm";
  }

  /* Open messaging cannot be verified from a paste, so we stay conservative */
  answers["q-openprofile"] = hasEmail || hasBooking ? "yes" : "no";

  return { headline, about, answers, detected };
}
