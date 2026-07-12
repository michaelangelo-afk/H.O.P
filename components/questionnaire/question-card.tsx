"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Question } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  index: number;
}

export function QuestionCard({ question, value, onChange, index }: QuestionCardProps) {
  const [customText, setCustomText] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (option === "Other (please specify)") {
      setShowCustom(true);
      onChange(customText || option);
    } else {
      setShowCustom(false);
      onChange(option);
    }
  };

  const handleCustomTextChange = (text: string) => {
    setCustomText(text);
    onChange(text || "Other (please specify)");
  };

  const renderInput = () => {
    switch (question.type) {
      case "text":
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder || "Type your answer..."}
            className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 backdrop-blur-sm focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/30 transition-all duration-200"
          />
        );

      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder || "Share your thoughts..."}
            rows={4}
            className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 backdrop-blur-sm focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/30 transition-all duration-200 resize-none"
          />
        );

      case "radio":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options?.map((option, i) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleOptionSelect(option)}
                className={`group relative p-4 rounded-xl border text-left transition-all duration-200 ${
                  value === option
                    ? "border-green-400 bg-green-500/10 text-white shadow-lg shadow-green-500/10"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      value === option
                        ? "border-green-400 bg-green-400"
                        : "border-white/30 group-hover:border-white/50"
                    }`}
                  >
                    {value === option && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-sm md:text-base font-medium">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        );

      case "radio-text":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options?.map((option, i) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleOptionSelect(option)}
                  className={`group relative p-4 rounded-xl border text-left transition-all duration-200 ${
                    value === option && !showCustom
                      ? "border-green-400 bg-green-500/10 text-white shadow-lg shadow-green-500/10"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        value === option && !showCustom
                          ? "border-green-400 bg-green-400"
                          : "border-white/30 group-hover:border-white/50"
                      }`}
                    >
                      {value === option && !showCustom && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-sm md:text-base font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}

              {/* Other option */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * (question.options?.length || 0) }}
                onClick={() => {
                  setShowCustom(true);
                  onChange(customText || "");
                }}
                className={`group relative p-4 rounded-xl border text-left transition-all duration-200 ${
                  showCustom
                    ? "border-green-400 bg-green-500/10 text-white shadow-lg shadow-green-500/10"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      showCustom
                        ? "border-green-400 bg-green-400"
                        : "border-white/30 group-hover:border-white/50"
                    }`}
                  >
                    {showCustom && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm md:text-base font-medium">Other (please specify)</span>
                </div>
              </motion.button>
            </div>

            {/* Custom text input */}
            {showCustom && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => handleCustomTextChange(e.target.value)}
                  placeholder="Type your answer..."
                  autoFocus
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-green-400/30 text-white placeholder-white/30 backdrop-blur-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/30 transition-all duration-200"
                />
              </motion.div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* Question number badge */}
      <div className="flex justify-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium text-white/70"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Question {index + 1} of 16
        </motion.span>
      </div>

      {/* Question text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed"
      >
        {question.text}
      </motion.h2>

      {/* Optional indicator */}
      {!question.required && (
        <p className="text-center text-white/30 text-sm italic">
          (Optional — you can skip this one if you&apos;d like)
        </p>
      )}

      {/* Input */}
      <div className="pt-4">{renderInput()}</div>
    </motion.div>
  );
}
