"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { supabase } from "@/lib/supabase";
import { QuestionCard } from "./question-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import type { TraitScore, QuizState } from "@/lib/types";

export function QuizContainer() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [state, setState] = useState<QuizState>("playing");
  const [direction, setDirection] = useState(0); // 0 = none, 1 = forward, -1 = backward

  const totalQuestions = questions.length;
  const currentValue = answers[questions[currentQuestion]?.id] ?? 3;

  const handleAnswer = useCallback((value: number) => {
    const qId = questions[currentQuestion].id;
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }, [currentQuestion]);

  const goNext = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setDirection(1);
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [currentQuestion, totalQuestions]);

  const goPrev = useCallback(() => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const calculateResult = useCallback((): {
    type: string;
    scores: TraitScore[];
  } => {
    const dimensions = ["EI", "SN", "TF", "JP"] as const;
    const scores: TraitScore[] = [];

    for (const dim of dimensions) {
      const dimQuestions = questions.filter((q) => q.dimension === dim);
      let total = 0;
      let count = 0;

      for (const q of dimQuestions) {
        const answer = answers[q.id] ?? 3;
        // Convert 1-5 scale to -2 to +2, then apply direction
        const normalized = (answer - 3) * q.direction;
        total += normalized;
        count++;
      }

      const avgScore = count > 0 ? (total / count) * 50 : 0; // Scale to -100 to +100

      const traitInfo = {
        EI: { left: "I", right: "E" },
        SN: { left: "S", right: "N" },
        TF: { left: "T", right: "F" },
        JP: { left: "J", right: "P" },
      };

      scores.push({
        dimension: dim,
        score: Math.round(avgScore),
        leftTrait: traitInfo[dim].left,
        rightTrait: traitInfo[dim].right,
      });
    }

    // Build personality type string
    const typeStr = scores
      .map((s) => (s.score >= 0 ? s.rightTrait : s.leftTrait))
      .join("");

    return { type: typeStr, scores };
  }, [answers]);

  const handleSubmit = useCallback(async () => {
    setState("submitting");
    const { type, scores } = calculateResult();

    try {
      const { data, error } = await supabase
        .from("quiz_responses")
        .insert({
          answers,
          personality_type: type,
          scores,
        })
        .select("id")
        .single();

      if (error) throw error;

      if (data?.id) {
        router.push(`/results/${data.id}`);
      }
    } catch (err) {
      console.error("Failed to save:", err);
      // Fallback: show result locally without saving
      const id = btoa(JSON.stringify({ type, scores, answers }));
      router.push(`/results/${id}?local=true`);
    }
  }, [calculateResult, answers, router]);

  const canGoNext = currentValue >= 1 && currentValue <= 5;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar with progress */}
      <div className="w-full px-6 pt-8 pb-4">
        <ProgressBar
          current={Object.keys(answers).length}
          total={totalQuestions}
        />
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? 300 : -300,
                opacity: 0,
              }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({
                x: dir < 0 ? 300 : -300,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            <QuestionCard
              question={questions[currentQuestion]}
              value={currentValue}
              onChange={handleAnswer}
              index={currentQuestion}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="w-full px-6 pb-8 pt-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="secondary"
            onClick={goPrev}
            disabled={currentQuestion === 0}
            className="min-w-[120px]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Button>

          <span className="text-white/40 text-sm font-medium">
            {currentQuestion + 1} of {totalQuestions}
          </span>

          {isLastQuestion ? (
            <Button
              variant="gradient"
              onClick={handleSubmit}
              disabled={!canGoNext || state === "submitting"}
              isLoading={state === "submitting"}
              className="min-w-[140px]"
            >
              {state === "submitting" ? "Analyzing..." : "See Results"}
              {state !== "submitting" && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              )}
            </Button>
          ) : (
            <Button
              variant="gradient"
              onClick={goNext}
              disabled={!canGoNext}
              className="min-w-[120px]"
            >
              Next
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
