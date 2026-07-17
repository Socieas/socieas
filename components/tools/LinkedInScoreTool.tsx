// components/tools/LinkedInScoreTool.tsx

"use client";

import { useState } from "react";
import ScoreWizard from "@/components/tools/ScoreWizard";
import ScoreResults from "@/components/tools/ScoreResults";
import type { AuditInput, ScoreResult } from "@/types/linkedin-score";

export default function LinkedInScoreTool() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [input, setInput] = useState<AuditInput | null>(null);

  const handleComplete = (res: ScoreResult, inp: AuditInput) => {
    setResult(res);
    setInput(inp);

    try {
      fetch("/api/tools/linkedin-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inp.name,
          email: inp.email,
          linkedinUrl: inp.linkedinUrl,
          headline: inp.headline,
          about: inp.about,
          answers: inp.answers,
          rawProfile: inp.rawProfile || "",
          result: {
            total: res.total,
            band: {
              label: res.band.label,
              headline: res.band.headline,
              message: res.band.message,
            },
            pillars: res.pillars,
            topFixes: res.topFixes,
          },
        }),
      }).catch(() => {
        /* The on screen report always works even if the email fails */
      });
    } catch {
      /* Never block the user */
    }

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
