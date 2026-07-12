"use client";

import { motion } from "framer-motion";
import { Question } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
  value: number;
  onChange: (value: number) => void;
  index: number;
}

const sliderColors = [
  "from-primary-500 to-accent-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-violet-500 to-purple-500",
  "from-sky-500 to-indigo-500",
  "from-lime-500 to-green-500",
  "from-fuchsia-500 to-pink-500",
  "from-red-500 to-rose-500",
  "from-blue-500 to-violet-500",
  "from-teal-500 to-cyan-500",
  "from-orange-500 to-amber-500",
  "from-purple-500 to-fuchsia-500",
  "from-indigo-500 to-blue-500",
  "from-pink-500 to-rose-500",
];

export function QuestionCard({
  question,
  value,
  onChange,
  index,
}: QuestionCardProps) {
  const gradientClass = sliderColors[index % sliderColors.length];

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto space-y-8"
    >
      {/* Question number badge */}
      <div className="flex justify-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium text-white/70"
        >
          <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
          Question {index + 1}
        </motion.span>
      </div>

      {/* Question text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold text-white text-center leading-tight"
      >
        {question.text}
      </motion.h2>

      {/* Slider section */}
      <div className="space-y-6">
        {/* Labels */}
        <div className="flex justify-between items-center gap-4 px-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`flex-1 text-right transition-all duration-300 ${
              value <= 2
                ? "text-primary-300 font-semibold scale-105"
                : "text-white/50"
            }`}
          >
            <span className="text-sm md:text-base">{question.leftLabel}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg"
          >
            {value}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`flex-1 text-left transition-all duration-300 ${
              value >= 4
                ? "text-accent-300 font-semibold scale-105"
                : "text-white/50"
            }`}
          >
            <span className="text-sm md:text-base">{question.rightLabel}</span>
          </motion.div>
        </div>

        {/* Custom slider */}
        <div className="relative px-1">
          <input
            type="range"
            min={1}
            max={5}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="
              w-full h-3 rounded-full appearance-none cursor-pointer
              bg-white/10 backdrop-blur-sm
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-8
              [&::-webkit-slider-thumb]:h-8
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-gradient-to-br
              [&::-webkit-slider-thumb]:from-primary-400
              [&::-webkit-slider-thumb]:to-accent-500
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:shadow-primary-500/50
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-white/20
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:duration-200
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-8
              [&::-moz-range-thumb]:h-8
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-gradient-to-br
              [&::-moz-range-thumb]:from-primary-400
              [&::-moz-range-thumb]:to-accent-500
              [&::-moz-range-thumb]:shadow-lg
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-white/20
            "
            style={{
              background: `linear-gradient(to right, 
                rgb(139, 92, 246) 0%, 
                rgb(217, 70, 239) ${((value - 1) / 4) * 100}%, 
                rgba(255,255,255,0.1) ${((value - 1) / 4) * 100}%, 
                rgba(255,255,255,0.1) 100%)`,
            }}
          />

          {/* Tick marks */}
          <div className="flex justify-between px-[14px] mt-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => onChange(num)}
                className={`w-6 h-6 rounded-full text-xs font-medium transition-all duration-200 ${
                  value === num
                    ? "bg-primary-500/30 text-primary-300 scale-110"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Value description */}
        <motion.p
          key={value}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-white/40 italic"
        >
          {value === 1
            ? `Strongly ${question.leftLabel}`
            : value === 2
            ? `Moderately ${question.leftLabel}`
            : value === 3
            ? `Neutral / Balanced`
            : value === 4
            ? `Moderately ${question.rightLabel}`
            : `Strongly ${question.rightLabel}`}
        </motion.p>
      </div>
    </motion.div>
  );
}
