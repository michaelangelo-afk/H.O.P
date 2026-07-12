export interface Question {
  id: number;
  text: string;
  dimension: TraitDimension;
  direction: -1 | 1; // -1 = left trait, 1 = right trait
  leftLabel: string;
  rightLabel: string;
}

export type TraitDimension = "EI" | "SN" | "TF" | "JP";

export interface TraitScore {
  dimension: TraitDimension;
  score: number; // -100 to +100
  leftTrait: string;
  rightTrait: string;
}

export interface PersonalityResult {
  id: string;
  createdAt: string;
  type: string;
  scores: TraitScore[];
  answers: Record<number, number>;
  description: string;
  strengths: string[];
  weaknesses: string[];
}

export interface QuizResponse {
  id: string;
  created_at: string;
  answers: Record<number, number>;
  personality_type: string;
  scores: TraitScore[];
}

export type QuizState = "idle" | "playing" | "submitting" | "completed";

export const TRAIT_INFO: Record<
  TraitDimension,
  { left: string; right: string; leftDesc: string; rightDesc: string }
> = {
  EI: {
    left: "Introvert",
    right: "Extravert",
    leftDesc: "Reserved, reflective, enjoys solitude",
    rightDesc: "Outgoing, energetic, enjoys socializing",
  },
  SN: {
    left: "Sensing",
    right: "Intuitive",
    leftDesc: "Practical, detail-oriented, focused on facts",
    rightDesc: "Imaginative, big-picture, focused on possibilities",
  },
  TF: {
    left: "Thinking",
    right: "Feeling",
    leftDesc: "Logical, analytical, values truth",
    rightDesc: "Empathetic, harmonious, values compassion",
  },
  JP: {
    left: "Judging",
    right: "Perceiving",
    leftDesc: "Structured, organized, likes planning",
    rightDesc: "Flexible, spontaneous, likes exploring",
  },
};
