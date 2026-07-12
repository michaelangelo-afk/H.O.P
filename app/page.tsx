"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonalInfoForm } from "@/components/form/personal-info-form";
import { QuestionnaireContainer } from "@/components/questionnaire/questionnaire-container";
import type { PersonalInfo, AppStage } from "@/lib/types";

export default function Home() {
  const [stage, setStage] = useState<AppStage>("landing");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  const handleInfoSubmit = (info: PersonalInfo) => {
    setPersonalInfo(info);
    setStage("questionnaire");
  };

  if (stage === "questionnaire" && personalInfo) {
    return <QuestionnaireContainer personalInfo={personalInfo} />;
  }

  return (
    <AnimatePresence mode="wait">
      {stage === "landing" && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen flex flex-col"
        >
          {/* Hero Section */}
          <div className="relative flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 -left-40 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
              />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium text-white/70">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Teens Life Questionnaire
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                We Want to Know{" "}
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                  Your Story
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed"
              >
                We&apos;d love to hear from you! Take a few minutes to answer some
                questions about your life, your faith, and your dreams.
                Your answers are safe with us. 🙏
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <button
                  onClick={() => setStage("info")}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-[length:200%_200%] animate-gradient-x shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
                >
                  <span>Start Here</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </motion.div>

              {/* Footer note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 text-white/30 text-sm"
              >
                This information is confidential and will only be used for pastoral care purposes
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}

      {stage === "info" && (
        <motion.div
          key="info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen flex items-center justify-center px-6 py-16"
        >
          <PersonalInfoForm onSubmit={handleInfoSubmit} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
