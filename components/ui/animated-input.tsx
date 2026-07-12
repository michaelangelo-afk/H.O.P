"use client";

import { useState, useRef, useEffect, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isTextarea?: false;
}

interface AnimatedTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isTextarea: true;
}

type Props = (AnimatedInputProps | AnimatedTextareaProps) & {
  glowColor?: string;
};

function Sparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ opacity: 1, x, y, scale: 0 }}
      animate={{
        opacity: [1, 0.8, 0],
        y: y - 40 + Math.random() * -30,
        x: x + (Math.random() - 0.5) * 20,
        scale: [0, 1.5, 0],
      }}
      transition={{ duration: 0.6 + Math.random() * 0.4, delay, ease: "easeOut" }}
    >
      <svg className="w-3 h-3 text-green-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </motion.div>
  );
}

export function AnimatedInput(props: Props) {
  const { isTextarea, glowColor = "rgba(74, 222, 128,", ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const sparkleIdRef = useRef(0);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const sparkleThrottleRef = useRef(0);

  const handleInputActivity = () => {
    setIsTyping(true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 1000);

    // Throttled sparkles (max 1 per 150ms)
    const now = Date.now();
    if (now - sparkleThrottleRef.current > 150 && inputRef.current) {
      sparkleThrottleRef.current = now;
      const rect = inputRef.current.getBoundingClientRect();
      const x = Math.random() * (rect.width - 20) + 10;
      const y = Math.random() * 20 + rect.height - 10;
      const id = sparkleIdRef.current++;
      setSparkles((prev) => [...prev.slice(-5), { id, x, y }]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 1000);
    }
  };

  useEffect(() => {
    return () => clearTimeout(typingTimeoutRef.current);
  }, []);

  const glowIntensity = isTyping ? 1 : isFocused ? 0.5 : 0;
  const borderGlow = `${glowColor}${glowIntensity * 0.6})`;
  const shadowGlow = `${glowColor}${glowIntensity * 0.3})`;
  const sharedClasses = `w-full px-5 py-4 rounded-2xl bg-white/[0.04] text-white placeholder-white/20 backdrop-blur-sm focus:outline-none transition-all duration-300 text-lg relative z-10`;

  // Separate the event handlers from rest to avoid double-firing
  const {
    onFocus: _onFocus,
    onBlur: _onBlur,
    className: _className,
    ...htmlProps
  } = rest as any;

  const handleFocus = (e: React.FocusEvent<any>) => {
    setIsFocused(true);
    _onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    setIsFocused(false);
    _onBlur?.(e);
  };

  const inputEl = isTextarea ? (
    <textarea
      {...(htmlProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      ref={inputRef as React.Ref<HTMLTextAreaElement>}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={(e) => {
        handleInputActivity();
        htmlProps.onChange?.(e);
      }}
      className={`${sharedClasses} ${_className || ""} resize-none`}
    />
  ) : (
    <input
      {...(htmlProps as InputHTMLAttributes<HTMLInputElement>)}
      ref={inputRef as React.Ref<HTMLInputElement>}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={(e) => {
        handleInputActivity();
        htmlProps.onChange?.(e);
      }}
      className={`${sharedClasses} ${_className || ""}`}
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Lightning border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: [
            `0 0 ${10 + glowIntensity * 20}px ${borderGlow}`,
            `0 0 ${15 + glowIntensity * 30}px ${shadowGlow}`,
          ],
          borderColor: `rgba(74, 222, 128, ${0.1 + glowIntensity * 0.5})`,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ border: "2px solid rgba(255,255,255,0.08)" }}
      />

      {/* Lightning bolt accent when typing */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1], scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -right-3 -top-3 z-20 pointer-events-none"
          >
            <svg className="w-6 h-6 text-green-300 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkle particles */}
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} x={sparkle.x} y={sparkle.y} delay={0} />
      ))}

      {/* Pulsing glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          opacity: isTyping ? [0.3, 0.6, 0.3] : 0,
        }}
        transition={{
          duration: 0.8,
          repeat: isTyping ? Infinity : 0,
          ease: "easeInOut",
        }}
        style={{ boxShadow: `inset 0 0 30px ${glowColor}0.15)` }}
      />

      {inputEl}
    </motion.div>
  );
}
