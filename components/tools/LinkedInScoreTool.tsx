// components/tools/LinkedInScoreTool.tsx

"use client";

import { useState } from "react";
import ScoreWizard from "@/components/tools/ScoreWizard";
import ScoreResults from "@/components/tools/ScoreResults";
import type { AuditInput, ScoreResult } from "@/types/linkedin-score";

export default function LinkedInScoreTool() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [input, setInput] = useState<AuditInput | null>(null);

  const handleComplete = (r: ScoreResult, i: AuditInput) => {
    setResult(r);
    setInput(i);

    fetch("/api/tools/linkedin-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: i.name,
        email: i.email,
        linkedinUrl: i.linkedinUrl,
        headline: i.headline,
        about: i.about,
        answers: i.answers,
        result: {
          total: r.total,
          band: r.band,
          pillars: r.pillars,
          topFixes: r.topFixes,
        },
      }),
    }).catch(() => {});

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRestart = () => {
    setResult(null);
    setInput(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (result && input) {
    return (
      <ScoreResults result={result} input={input} onRestart={handleRestart} />
    );
  }

  return <ScoreWizard onComplete={handleComplete} />;
}
