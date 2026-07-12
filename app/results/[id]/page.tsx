import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { ResultCard } from "@/components/results/result-card";
import { PERSONALITY_TYPES } from "@/lib/personality-data";
import type { PersonalityResult, TraitScore } from "@/lib/types";

interface ResultsPageProps {
  params: { id: string };
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

export default async function ResultsPage({ params }: ResultsPageProps) {
  const result = await getResult(params.id);

  if (!result) {
    redirect("/quiz");
  }

  const typeInfo = PERSONALITY_TYPES[result.type];
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
