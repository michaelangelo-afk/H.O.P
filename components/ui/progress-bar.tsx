"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        {label && (
          <span className="text-sm font-medium text-white/60">{label}</span>
        )}
        <span className="text-sm font-medium text-white/60">
          {current} / {total}
        </span>
      </div>
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-slow" />
      </div>
      <span className="block text-center text-xs font-medium text-white/40">
        {percentage}% complete
      </span>
    </div>
  );
}
