"use client";

import { motion } from "framer-motion";
import { PersonalityResult } from "@/lib/types";
import { TYPE_GRADIENTS, TYPE_EMOJIS } from "@/lib/personality-data";
import { TraitChart } from "./trait-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ResultCardProps {
  result: PersonalityResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const gradient = TYPE_GRADIENTS[result.type] || "from-primary-600 to-accent-600";
  const emoji = TYPE_EMOJIS[result.type] || "✨";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto space-y-8"
    >
      {/* Type badge */}
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          className="text-6xl"
        >
          {emoji}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <span
            className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${gradient} text-white font-bold text-3xl tracking-widest shadow-lg`}
          >
            {result.type}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-white/80 max-w-lg"
        >
          {result.description}
        </motion.p>
      </div>

      {/* Trait Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4"
      >
        <h3 className="text-lg font-semibold text-white/80 text-center">
          Your Trait Breakdown
        </h3>
        <TraitChart scores={result.scores} />
      </motion.div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-emerald-500/10 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-6"
        >
          <h3 className="text-lg font-semibold text-emerald-300 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Strengths
          </h3>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-center gap-2 text-white/70 text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {s}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-rose-500/10 backdrop-blur-xl rounded-2xl border border-rose-500/20 p-6"
        >
          <h3 className="text-lg font-semibold text-rose-300 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Growth Areas
          </h3>
          <ul className="space-y-2">
            {result.weaknesses.map((w, i) => (
              <motion.li
                key={w}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-center gap-2 text-white/70 text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                {w}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center gap-4"
      >
        <Link href="/quiz">
          <Button variant="gradient" size="lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retake Test
          </Button>
        </Link>
        <Link href="/">
          <Button variant="secondary" size="lg">
            Home
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
