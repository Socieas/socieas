// components/tools/LinkedInScoreTool.tsx

"use client";

import { useState } from "react";
import ScoreWizard from "@/components/tools/ScoreWizard";
import ScoreResults from "@/components/tools/ScoreResults";
import type { AuditInput, ScoreResult } from "@/types/linkedin-score";
import type { AiFeedback } from "@/lib/ai-feedback";

export default function LinkedInScoreTool() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [input, setInput] = useState<AuditInput | null>(null);
  const [ai, setAi] = useState<AiFeedback | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleComplete = (res: ScoreResult, inp: AuditInput) => {
    setResult(res);
    setInput(inp);
    setAi(null);
    setAiLoading(true);

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
      })
        .then((r) => r.json())
        .then((data: { ok?: boolean; ai?: AiFeedback | null }) => {
          setAi(data && data.ai ? data.ai : null);
        })
        .catch(() => {
          setAi(null);
        })
        .finally(() => {
          setAiLoading(false);
        });
    } catch {
      setAiLoading(false);
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRestart = () => {
    setResult(null);
    setInput(null);
    setAi(null);
    setAiLoading(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (result && input) {
    return (
      <ScoreResults
        result={result}
        input={input}
        onRestart={handleRestart}
        ai={ai}
        aiLoading={aiLoading}
      />
    );
  }

  return <ScoreWizard onComplete={handleComplete} />;
}
