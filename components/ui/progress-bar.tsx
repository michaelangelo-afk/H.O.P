"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  // Calculate which milestones to render with gaps for large totals
  const milestones = Array.from({ length: total }, (_, i) => i + 1);

  // Determine if we should show compact view (many milestones on small screens)
  const showCompact = total > 10;

  return (
    <div className="w-full space-y-3">
      {/* Label row */}
      <div className="flex justify-between items-center">
        {label && (
          <span className="text-xs sm:text-sm font-medium text-white/60">{label}</span>
        )}
        <motion.span
          key={percentage}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="text-xs sm:text-sm font-bold text-green-400"
        >
          {percentage}%
        </motion.span>
      </div>

      {/* Stepped progress bar */}
      <div className="relative overflow-x-auto scrollbar-none -mx-1 px-1">
        <div className={`relative ${showCompact ? "min-w-[600px]" : ""} pt-3 pb-6`}>
          {/* Track background */}
          <div className="absolute top-[10px] left-[6px] right-[6px] h-[2px] sm:h-[3px] bg-white/10 rounded-full" />

          {/* Filled track */}
          <motion.div
            className="absolute top-[10px] left-[6px] h-[2px] sm:h-[3px] rounded-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-400"
            initial={{ width: "0%" }}
            animate={{
              width: `${Math.max(0, (current / total) * 100)}%`,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Milestone dots */}
          <div className="flex justify-between relative">
            {milestones.map((milestone) => {
              const isCompleted = milestone <= current;
              const isCurrent = milestone === current + 1;
              const isFuture = milestone > current + 1;

              const dotSize = showCompact
                ? "w-[18px] sm:w-[24px] h-[18px] sm:h-[24px]"
                : "w-[20px] sm:w-[28px] h-[20px] sm:h-[28px]";

              const innerDotSize = showCompact
                ? "w-[6px] sm:w-[9px] h-[6px] sm:h-[9px]"
                : "w-[8px] sm:w-[10px] h-[8px] sm:h-[10px]";

              const checkSize = showCompact
                ? "w-[10px] sm:w-[14px] h-[10px] sm:h-[14px]"
                : "w-[12px] sm:w-[16px] h-[12px] sm:h-[16px]";

              const glowInset = showCompact
                ? "-inset-1.5"
                : "-inset-2";

              return (
                <div key={milestone} className="flex flex-col items-center">
                  {/* Dot container */}
                  <div className="relative">
                    {/* Glow ring for current */}
                    {isCurrent && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={`absolute ${glowInset} rounded-full bg-green-400/20`}
                      />
                    )}

                    {/* The dot */}
                    <motion.div
                      initial={false}
                      animate={
                        isCompleted
                          ? { scale: [1, 1.25, 1] }
                          : { scale: 1 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 12,
                        delay: isCompleted ? 0.05 : 0,
                      }}
                      className={`relative ${dotSize} rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isCompleted
                          ? "bg-green-500 shadow-sm sm:shadow-lg sm:shadow-green-500/40"
                          : isCurrent
                            ? "bg-white/10 border border-green-400/60 sm:border-2"
                            : "bg-white/5 border border-white/10 sm:border-2"
                      }`}
                    >
                      {isCompleted ? (
                        <motion.svg
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className={`${checkSize} text-white`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <motion.path
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                          />
                        </motion.svg>
                      ) : isCurrent ? (
                        <div className={`${innerDotSize} rounded-full bg-green-400`} />
                      ) : null}
                    </motion.div>
                  </div>

                  {/* Question number label (hidden on mobile when compact) */}
                  <motion.span
                    initial={false}
                    animate={{
                      color: isCompleted
                        ? "rgba(74, 222, 128, 0.9)"
                        : isCurrent
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(255, 255, 255, 0.25)",
                      scale: isCurrent ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`absolute top-[24px] sm:top-[32px] text-[10px] sm:text-[11px] font-medium whitespace-nowrap ${
                      showCompact ? "hidden sm:block" : ""
                    }`}
                  >
                    Q{milestone}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status text with animated counter */}
      <div className="flex items-center justify-center gap-2">
        <motion.div
          key={current}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/20 flex items-center justify-center"
        >
          <span className="text-[10px] sm:text-xs font-bold text-green-400">{current}</span>
        </motion.div>
        <span className="text-[10px] sm:text-xs text-white/40 font-medium">
          of {total} questions answered
        </span>
      </div>
    </div>
  );
}
