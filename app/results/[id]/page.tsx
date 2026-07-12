import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { ResultCard } from "@/components/results/result-card";
import type { PersonalityResult, TraitScore } from "@/lib/types";

const personalityTypes: Record<
  string,
  { description: string; strengths: string[]; weaknesses: string[] }
> = {
  INFJ: {
    description:
      "The Advocate — Quiet, visionary, and principled. You have a rare combination of deep empathy and analytical insight.",
    strengths: ["Creative", "Insightful", "Principled", "Passionate", "Altruistic"],
    weaknesses: [
      "Sensitive to criticism",
      "Perfectionistic",
      "Prone to burnout",
      "Can be overly private",
    ],
  },
  INFP: {
    description:
      "The Mediator — Idealistic, empathetic, and deeply caring. You seek harmony and authenticity in all aspects of life.",
    strengths: ["Empathetic", "Open-minded", "Creative", "Passionate", "Idealistic"],
    weaknesses: ["Overly idealistic", "Self-critical", "Impractical", "Emotionally vulnerable"],
  },
  INTJ: {
    description:
      "The Architect — Strategic, logical, and independent. You see possibilities and systems where others see chaos.",
    strengths: ["Strategic", "Independent", "Determined", "Knowledgeable", "High standards"],
    weaknesses: ["Overly critical", "Dismissive of emotions", "Arrogant", "Socially aloof"],
  },
  INTP: {
    description:
      "The Thinker — Innovative, curious, and analytical. You love exploring ideas and uncovering how things work.",
    strengths: ["Analytical", "Original", "Open-minded", "Curious", "Objective"],
    weaknesses: ["Disconnected", "Indecisive", "Impatient", "Perfectionistic"],
  },
  ENFJ: {
    description:
      "The Protagonist — Charismatic, inspiring, and natural-born leaders. You bring people together toward a common goal.",
    strengths: ["Charismatic", "Reliable", "Altruistic", "Natural leader", "Empathetic"],
    weaknesses: ["Overly selfless", "Approval-seeking", "Overwhelmed easily", "Can be manipulative"],
  },
  ENFP: {
    description:
      "The Campaigner — Enthusiastic, creative, and free-spirited. You see life as an exciting adventure full of possibilities.",
    strengths: ["Enthusiastic", "Creative", "Sociable", "Open-minded", "Optimistic"],
    weaknesses: ["Disorganized", "Overly emotional", "Easily bored", "Struggles with routine"],
  },
  ENTJ: {
    description:
      "The Commander — Bold, strategic, and efficient. You're a natural leader who turns vision into reality.",
    strengths: ["Strategic", "Efficient", "Confident", "Strong leader", "Goal-oriented"],
    weaknesses: ["Intolerant", "Arrogant", "Workaholic", "Can be ruthless"],
  },
  ENTP: {
    description:
      "The Debater — Quick-witted, curious, and energetic. You thrive on intellectual challenge and new ideas.",
    strengths: ["Innovative", "Energetic", "Charismatic", "Quick thinker", "Resourceful"],
    weaknesses: ["Argumentative", "Insensitive", "Easily bored", "Can be unreliable"],
  },
  ISTJ: {
    description:
      "The Inspector — Practical, dependable, and responsible. You are the rock others rely on.",
    strengths: ["Dependable", "Hardworking", "Responsible", "Detail-oriented", "Practical"],
    weaknesses: ["Stubborn", "Insensitive", "Judgmental", "Rigid"],
  },
  ISFJ: {
    description:
      "The Defender — Warm, caring, and protective. You are always ready to support and nurture those around you.",
    strengths: ["Supportive", "Reliable", "Patient", "Practical", "Loyal"],
    weaknesses: ["Overly humble", "Represses feelings", "Overwhelmed by change", "People-pleasing"],
  },
  ISTP: {
    description:
      "The Virtuoso — Bold, practical, and action-oriented. You are a master of tools and hands-on problem solving.",
    strengths: ["Practical", "Resourceful", "Action-oriented", "Independent", "Calm under pressure"],
    weaknesses: ["Stubborn", "Insensitive", "Risk-prone", "Avoids commitment"],
  },
  ISFP: {
    description:
      "The Adventurer — Artistic, gentle, and in tune with the senses. You find beauty in everyday moments.",
    strengths: ["Artistic", "Gentle", "Passionate", "Open-minded", "Down-to-earth"],
    weaknesses: ["Overly sensitive", "Unpredictable", "Easily stressed", "Struggles with criticism"],
  },
  ESTJ: {
    description:
      "The Executive — Efficient, organized, and community-oriented. You get things done and done right.",
    strengths: ["Organized", "Efficient", "Direct", "Dependable", "Natural leader"],
    weaknesses: ["Inflexible", "Judgmental", "Work-focused", "Can be controlling"],
  },
  ESFJ: {
    description:
      "The Consul — Social, caring, and community-focused. You bring people together and keep things running smoothly.",
    strengths: ["Sociable", "Caring", "Organized", "Practical", "Loyal"],
    weaknesses: ["Approval-seeking", "Overly sensitive", "Resistant to change", "Self-sacrificing"],
  },
  ESTP: {
    description:
      "The Entrepreneur — Energetic, perceptive, and daring. You live in the moment and seize opportunities.",
    strengths: ["Energetic", "Persuasive", "Perceptive", "Action-oriented", "Resourceful"],
    weaknesses: ["Impulsive", "Insensitive", "Risk-seeking", "Easily bored"],
  },
  ESFP: {
    description:
      "The Entertainer — Spontaneous, enthusiastic, and fun-loving. You light up every room you enter.",
    strengths: ["Enthusiastic", "Sociable", "Playful", "Observant", "Practical"],
    weaknesses: ["Impulsive", "Easily bored", "Overly dramatic", "Sensitive to criticism"],
  },
};

interface ResultsPageProps {
  params: { id: string };
  searchParams: { local?: string };
}

async function getResult(id: string) {
  // Handle local fallback (when Supabase save fails)
  if (id.startsWith("eyJ")) {
    try {
      const data = JSON.parse(atob(id));
      return data as { type: string; scores: TraitScore[]; answers: Record<number, number> };
    } catch {
      return null;
    }
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("quiz_responses")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return {
      type: data.personality_type,
      scores: data.scores as TraitScore[],
      answers: data.answers as Record<number, number>,
    };
  } catch {
    return null;
  }
}

export default async function ResultsPage({ params, searchParams }: ResultsPageProps) {
  const result = await getResult(params.id);

  if (!result) {
    redirect("/quiz");
  }

  const typeInfo = personalityTypes[result.type];
  if (!typeInfo) {
    redirect("/quiz");
  }

  const personalityResult: PersonalityResult = {
    id: params.id,
    createdAt: new Date().toISOString(),
    type: result.type,
    scores: result.scores,
    answers: result.answers,
    description: typeInfo.description,
    strengths: typeInfo.strengths,
    weaknesses: typeInfo.weaknesses,
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <ResultCard result={personalityResult} />
    </div>
  );
}
