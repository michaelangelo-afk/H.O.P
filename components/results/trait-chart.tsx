"use client";

import { motion } from "framer-motion";
import { TraitScore, TRAIT_INFO } from "@/lib/types";

interface TraitChartProps {
  scores: TraitScore[];
}

export function TraitChart({ scores }: TraitChartProps) {
  return (
    <div className="w-full space-y-6">
      {scores.map((score, i) => {
        const info = TRAIT_INFO[score.dimension];
        const isLeft = score.score < 0;
        const absScore = Math.abs(score.score);
        const percentage = 50 + (score.score / 100) * 50; // 0-100 scale, 50 = center

        return (
          <motion.div
            key={score.dimension}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex-1 text-right">
                <span
                  className={`text-sm font-bold transition-colors ${
                    isLeft ? "text-primary-300" : "text-white/40"
                  }`}
                >
                  {info.left}
                </span>
              </div>
              <div className="mx-4">
                <span className="text-xs font-mono font-bold text-white/60 bg-white/10 px-3 py-1 rounded-full">
                  {score.score > 0 ? "+" : ""}
                  {score.score}
                </span>
              </div>
              <div className="flex-1 text-left">
                <span
                  className={`text-sm font-bold transition-colors ${
                    !isLeft ? "text-accent-300" : "text-white/40"
                  }`}
                >
                  {info.right}
                </span>
              </div>
            </div>

            {/* Bar */}
            <div className="relative h-2.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                initial={{ width: 0, left: "50%" }}
                animate={{
                  width: `${absScore * 0.5}%`,
                  left: `${score.score >= 0 ? 50 : 50 - absScore * 0.5}%`,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 + i * 0.15,
                  ease: "easeOut",
                }}
              />
              {/* Center line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/20" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
