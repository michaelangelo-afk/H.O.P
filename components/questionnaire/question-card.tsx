"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Question } from "@/lib/types";
import { questionIcons } from "@/lib/question-icons";
import { AnimatedTypingInput } from "@/components/ui/animated-typing-input";

interface QuestionCardProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  index: number;
}

const iconColors = [
  "from-green-400 to-emerald-500",
  "from-cyan-400 to-blue-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-purple-500",
  "from-indigo-400 to-blue-500",
  "from-pink-400 to-rose-500",
  "from-yellow-400 to-amber-500",
  "from-red-400 to-rose-500",
  "from-teal-400 to-cyan-500",
  "from-cyan-400 to-sky-500",
  "from-lime-400 to-green-500",
  "from-purple-400 to-violet-500",
  "from-orange-400 to-red-500",
  "from-fuchsia-400 to-pink-500",
];

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
          <AnimatedTypingInput
            type="text"
            value={value}
            onChange={(e) => onChange((e.target as HTMLInputElement).value)}
            placeholder={question.placeholder || "Type your answer..."}
          />
        );

      case "textarea":
        return (
          <AnimatedTypingInput
            isTextarea
            value={value}
            onChange={(e) => onChange((e.target as HTMLTextAreaElement).value)}
            placeholder={question.placeholder || "Share your thoughts..."}
            rows={4}
          />
        );

      case "radio":
      case "radio-text": {
        const showOther = question.type === "radio-text";
        const allOptions = showOther
          ? [...(question.options || []), "Other (please specify)"]
          : question.options || [];

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {allOptions.map((option, i) => {
              const isSelected =
                option === "Other (please specify)"
                  ? showCustom
                  : value === option && !showCustom;

              return (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.04,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(74, 222, 128, 0.4)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOptionSelect(option)}
                  className={`group relative p-4 rounded-2xl border-2 text-left transition-all duration-300 overflow-hidden ${
                    isSelected
                      ? "border-green-400 bg-green-500/15 text-white shadow-lg shadow-green-500/20"
                      : "border-white/[0.08] bg-white/[0.04] text-white/70 hover:bg-white/[0.08]"
                  }`}
                >
                  {/* Selection glow effect */}
                  {isSelected && (
                    <motion.div
                      layoutId="selectionGlow"
                      className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="relative flex items-center gap-4">
                    {/* Custom radio circle */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? "border-green-400 bg-green-400 scale-110"
                            : "border-white/30 group-hover:border-white/50"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="w-2.5 h-2.5 rounded-full bg-white"
                          />
                        )}
                      </div>
                      {/* Ripple on select */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0.5 }}
                          animate={{ scale: 2.5, opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full bg-green-400/30"
                        />
                      )}
                    </div>

                    <span className="text-sm md:text-base font-medium leading-snug">
                      {option}
                    </span>
                  </div>
                </motion.button>
              );
            })}

            {/* Custom text input for "Other" */}
            {showCustom && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:col-span-2 overflow-hidden"
              >
                <div className="pt-2">
                  <AnimatedTypingInput
                    type="text"
                    value={customText}
                    onChange={(e) => handleCustomTextChange((e.target as HTMLInputElement).value)}
                    placeholder="Type your answer here..."
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* Question number badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="flex items-center justify-center gap-3"
      >
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${iconColors[index % iconColors.length]} flex items-center justify-center shadow-lg shadow-green-500/15`}
        >
          {questionIcons[index + 1]}
        </div>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium text-white/70">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Question {index + 1} of 16
        </span>
      </motion.div>

      {/* Question text */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed px-4"
      >
        {question.text}
      </motion.h2>

      {/* Optional indicator */}
      {!question.required && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-white/30 text-sm italic"
        >
          (Optional — you can skip this one if you&apos;d like)
        </motion.p>
      )}

      {/* Input */}
      <div className="pt-2">{renderInput()}</div>
    </motion.div>
  );
}
