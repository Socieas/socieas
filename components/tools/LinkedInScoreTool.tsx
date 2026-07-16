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
