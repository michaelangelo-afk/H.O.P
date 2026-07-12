import { Question } from "./types";

export const questions: Question[] = [
  // Extraversion (E) vs Introversion (I) — 4 questions
  {
    id: 1,
    text: "After a long week, how do you prefer to recharge?",
    dimension: "EI",
    direction: -1,
    leftLabel: "Quiet night alone",
    rightLabel: "Party with friends",
  },
  {
    id: 2,
    text: "In conversations, you tend to:",
    dimension: "EI",
    direction: 1,
    leftLabel: "Listen and reflect",
    rightLabel: "Speak and engage",
  },
  {
    id: 3,
    text: "You feel most energized when:",
    dimension: "EI",
    direction: -1,
    leftLabel: "Spending time alone",
    rightLabel: "Being around people",
  },
  {
    id: 4,
    text: "Your ideal weekend involves:",
    dimension: "EI",
    direction: -1,
    leftLabel: "Small gatherings or solitude",
    rightLabel: "Big social events",
  },

  // Intuition (N) vs Sensing (S) — 4 questions
  {
    id: 5,
    text: "When learning something new, you prefer:",
    dimension: "SN",
    direction: 1,
    leftLabel: "Step-by-step instructions",
    rightLabel: "Figuring it out intuitively",
  },
  {
    id: 6,
    text: "You are more drawn to:",
    dimension: "SN",
    direction: 1,
    leftLabel: "Practical, proven solutions",
    rightLabel: "New, imaginative possibilities",
  },
  {
    id: 7,
    text: "When describing an experience, you focus on:",
    dimension: "SN",
    direction: -1,
    leftLabel: "Specific details and facts",
    rightLabel: "Overall impressions and meanings",
  },
  {
    id: 8,
    text: "You trust more:",
    dimension: "SN",
    direction: -1,
    leftLabel: "What you can see and measure",
    rightLabel: "Your gut feelings and hunches",
  },

  // Thinking (T) vs Feeling (F) — 4 questions
  {
    id: 9,
    text: "When making an important decision, you rely on:",
    dimension: "TF",
    direction: 1,
    leftLabel: "Logic and objective analysis",
    rightLabel: "Values and personal impact",
  },
  {
    id: 10,
    text: "You are more persuaded by:",
    dimension: "TF",
    direction: 1,
    leftLabel: "Clear, rational arguments",
    rightLabel: "Emotional, heartfelt appeals",
  },
  {
    id: 11,
    text: "In a disagreement, you prioritize:",
    dimension: "TF",
    direction: -1,
    leftLabel: "Being right and truthful",
    rightLabel: "Maintaining harmony",
  },
  {
    id: 12,
    text: "People would describe you as more:",
    dimension: "TF",
    direction: -1,
    leftLabel: "Fair-minded and firm",
    rightLabel: "Compassionate and gentle",
  },

  // Judging (J) vs Perceiving (P) — 4 questions
  {
    id: 13,
    text: "How do you approach your schedule?",
    dimension: "JP",
    direction: 1,
    leftLabel: "Plan everything in advance",
    rightLabel: "Go with the flow",
  },
  {
    id: 14,
    text: "You feel more comfortable when:",
    dimension: "JP",
    direction: 1,
    leftLabel: "Things are decided and settled",
    rightLabel: "Options remain open",
  },
  {
    id: 15,
    text: "Your workspace is usually:",
    dimension: "JP",
    direction: -1,
    leftLabel: "Organized and tidy",
    rightLabel: "Creatively messy",
  },
  {
    id: 16,
    text: "You prefer projects that:",
    dimension: "JP",
    direction: -1,
    leftLabel: "Have clear deadlines and structure",
    rightLabel: "Allow spontaneous exploration",
  },
];
