"use client";

import { motion } from "framer-motion";
import { HTMLAttributes } from "react";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  glow?: boolean;
  hover?: boolean;
}

export function Card({ glow = false, hover = false, className = "", children, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={`
        relative rounded-2xl border border-white/10 backdrop-blur-xl
        bg-white/5 p-6
        ${glow ? "shadow-lg shadow-primary-500/10" : ""}
        ${hover ? "cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
