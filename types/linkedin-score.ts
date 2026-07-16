// types/linkedin-score.ts

export type PillarId =
  | "first-impression"
  | "positioning"
  | "content-engine"
  | "social-proof"
  | "conversion";

export interface PillarMeta {
  id: PillarId;
  label: string;
  weight: number;
  description: string;
}

export interface QuestionOption {
  value: string;
  label: string;
  points: number;
  feedback: string;
}

export interface AuditQuestion {
  id: string;
  pillar: PillarId;
  question: string;
  helper?: string;
  maxPoints: number;
  options: QuestionOption[];
}

export interface TextCheck {
  id: string;
  pillar: PillarId;
  target: "headline" | "about";
  maxPoints: number;
  passFeedback: string;
  failFeedback: string;
}

export interface FixCopy {
  checkId: string;
  title: string;
  why: string;
  how: string;
}

export interface ScoreBandMeta {
  min: number;
  label: string;
  headline: string;
  message: string;
}

export interface AuditInput {
  name: string;
  email: string;
  linkedinUrl: string;
  headline: string;
  about: string;
  answers: Record<string, string>;
}

export interface SignalResult {
  id: string;
  pillar: PillarId;
  points: number;
  maxPoints: number;
  passed: boolean;
  feedback: string;
}

export interface PillarScore {
  pillar: PillarId;
  label: string;
  points: number;
  maxPoints: number;
  percent: number;
}

export interface RankedFix {
  pillar: PillarId;
  title: string;
  why: string;
  how: string;
  lostPoints: number;
}

export interface ScoreResult {
  total: number;
  band: ScoreBandMeta;
  pillars: PillarScore[];
  signals: SignalResult[];
  topFixes: RankedFix[];
}
