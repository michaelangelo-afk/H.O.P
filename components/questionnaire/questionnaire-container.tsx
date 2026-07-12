"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { supabase } from "@/lib/supabase";
import { QuestionCard } from "./question-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import type { PersonalInfo, AppStage } from "@/lib/types";

interface QuestionnaireContainerProps {
  personalInfo: PersonalInfo;
}

export function QuestionnaireContainer({ personalInfo }: QuestionnaireContainerProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [stage, setStage] = useState<AppStage>("questionnaire");

  const totalQuestions = questions.length;
  const currentValue = answers[questions[currentQuestion]?.id] ?? "";
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const currentQuestionData = questions[currentQuestion];

  const handleAnswer = useCallback(
    (value: string) => {
      const qId = questions[currentQuestion].id;
      setAnswers((prev) => ({ ...prev, [qId]: value }));
    },
    [currentQuestion]
  );

  const goNext = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [currentQuestion, totalQuestions]);

  const goPrev = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const canGoNext = () => {
    const q = questions[currentQuestion];
    if (!q.required) return true;
    return currentValue.trim().length > 0;
  };

  const handleSubmit = useCallback(async () => {
    setStage("submitting");

    try {
      const { data, error } = await supabase
        .from("questionnaire_responses")
        .insert({
          personal_info: personalInfo,
          answers,
        })
        .select("id")
        .single();

      if (error) throw error;

      if (data?.id) {
        router.push(`/thank-you?id=${data.id}`);
      }
    } catch (err) {
      console.error("Failed to save:", err);
      // Fallback: encode in URL
      const encoded = btoa(
        JSON.stringify({ personalInfo, answers })
      );
      router.push(`/thank-you?local=${encoded}`);
    }
  }, [personalInfo, answers, router]);

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="w-full px-6 pt-8 pb-4">
        <ProgressBar
          current={answeredCount}
          total={totalQuestions}
          label="Questionnaire Progress"
        />
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full"
          >
            <QuestionCard
              question={currentQuestionData}
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
            className="min-w-[110px]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
              disabled={!canGoNext() || stage === "submitting"}
              isLoading={stage === "submitting"}
              className="min-w-[140px]"
            >
              {stage === "submitting" ? "Submitting..." : "Submit All"}
              {stage !== "submitting" && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </Button>
          ) : (
            <Button
              variant="gradient"
              onClick={goNext}
              disabled={!canGoNext()}
              className="min-w-[110px]"
            >
              Next
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
