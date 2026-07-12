"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface AnimatedTypingInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  isTextarea?: boolean;
  rows?: number;
  className?: string;
  type?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  autoFocus?: boolean;
  min?: number;
  max?: number;
}

export function AnimatedTypingInput({
  value,
  onChange,
  placeholder = "",
  isTextarea = false,
  rows = 3,
  className = "",
  type = "text",
  onFocus,
  onBlur,
  autoFocus,
  min,
  max,
}: AnimatedTypingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [charIds, setCharIds] = useState<number[]>([]);
  const idCounterRef = useRef(0);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevValueRef = useRef("");
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Assign stable IDs to each character so only new ones animate in
  useEffect(() => {
    const prev = prevValueRef.current;
    const curr = value;
    prevValueRef.current = curr;

    if (curr.length >= prev.length && curr.startsWith(prev)) {
      // Characters were appended — assign new IDs only to appended characters
      setCharIds((prevIds) => {
        const newIds = [...prevIds];
        for (let i = prev.length; i < curr.length; i++) {
          idCounterRef.current++;
          newIds.push(idCounterRef.current);
        }
        return newIds;
      });
    } else if (curr.length < prev.length && prev.startsWith(curr)) {
      // Characters were removed from the end — just slice
      setCharIds((prevIds) => prevIds.slice(0, curr.length));
    } else {
      // Middle edit — rebuild IDs for changed positions, keep where possible
      setCharIds((prevIds) => {
        const newIds: number[] = [];
        for (let i = 0; i < curr.length; i++) {
          if (i < prev.length && prevIds[i] !== undefined && prev[i] === curr[i]) {
            newIds.push(prevIds[i]);
          } else {
            idCounterRef.current++;
            newIds.push(idCounterRef.current);
          }
        }
        return newIds;
      });
    }
  }, [value]);

  // Detect typing activity for glow effects
  const handleInputActivity = useCallback(() => {
    setIsTyping(true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 1200);
  }, []);

  useEffect(() => {
    return () => clearTimeout(typingTimeoutRef.current);
  }, []);

  // Sync scroll position for textarea
  const handleScroll = useCallback(() => {
    if (overlayRef.current && inputRef.current) {
      overlayRef.current.scrollTop = inputRef.current.scrollTop;
    }
  }, []);

  // Base styles shared between input and overlay
  const textStyles =
    "w-full px-5 py-4 rounded-2xl text-lg leading-relaxed font-sans antialiased";

  const inputClasses = `
    ${textStyles}
    ${isTextarea ? "resize-none" : ""}
    text-transparent caret-green-400
    bg-white/[0.04] backdrop-blur-sm
    border-2 border-white/[0.08]
    focus:outline-none focus:border-green-400/30
    transition-all duration-300
    relative z-10
    ${className}
  `;

  const renderChars = () => {
    if (!value) return null;

    const chars = value.split("");
    const glowActive = isTyping;

    return (
      <div className="inline">
        {chars.map((char, i) => {
          const isRecentChar = i >= chars.length - 3;

          return (
            <motion.span
              key={charIds[i] ?? `char-${i}`}
              initial={{ opacity: 0, y: 12, scale: 0.4, filter: "blur(6px)" }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                textShadow:
                  glowActive && isRecentChar
                    ? "0 0 8px rgba(74, 222, 128, 0.5), 0 0 20px rgba(74, 222, 128, 0.2)"
                    : "0 0 0px transparent",
              }}
              transition={{
                duration: 0.25,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
              className="inline-block"
              style={{ whiteSpace: "pre" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}

        {/* Animated cursor */}
        {isFocused && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block w-[2.5px] h-[1.15em] bg-green-400 ml-[1px] align-middle rounded-full"
          />
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Glow border effect when typing */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        animate={{
          boxShadow: isTyping
            ? [
                "0 0 15px rgba(74, 222, 128, 0.15), 0 0 40px rgba(74, 222, 128, 0.05)",
                "0 0 25px rgba(74, 222, 128, 0.25), 0 0 60px rgba(74, 222, 128, 0.08)",
                "0 0 15px rgba(74, 222, 128, 0.15), 0 0 40px rgba(74, 222, 128, 0.05)",
              ]
            : "0 0 0px transparent",
          borderColor: isTyping
            ? "rgba(74, 222, 128, 0.35)"
            : isFocused
              ? "rgba(74, 222, 128, 0.15)"
              : "rgba(255, 255, 255, 0.08)",
        }}
        transition={{
          duration: 1.5,
          repeat: isTyping ? Infinity : 0,
          ease: "easeInOut",
        }}
        style={{ border: "2px solid" }}
      />

      {/* Subtle pulsing glow ring when actively typing */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        animate={{
          opacity: isTyping ? [0, 0.5, 0] : 0,
        }}
        transition={{
          duration: 0.8,
          repeat: isTyping ? Infinity : 0,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: "inset 0 0 30px rgba(74, 222, 128, 0.1)",
        }}
      />

      {/* Animated text overlay */}
      <div
        ref={overlayRef}
        className={`${textStyles} absolute inset-0 z-20 pointer-events-none overflow-hidden ${
          isTextarea ? "overflow-y-auto" : "overflow-hidden"
        }`}
        aria-hidden="true"
      >
        {value ? (
          renderChars()
        ) : isFocused ? (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block w-[2.5px] h-[1.15em] bg-green-400 align-middle rounded-full"
          />
        ) : (
          <span className="text-white/25 select-none">{placeholder}</span>
        )}
      </div>

      {/* Real input (invisible text, visible caret, fully interactive) */}
      {isTextarea ? (
        <textarea
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => {
            handleInputActivity();
            onChange(e);
          }}
          placeholder=""
          rows={rows}
          autoFocus={autoFocus}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e as React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e as React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>);
          }}
          onScroll={handleScroll}
          className={inputClasses}
          spellCheck={false}
        />
      ) : (
        <input
          ref={inputRef as React.Ref<HTMLInputElement>}
          type={type}
          value={value}
          onChange={(e) => {
            handleInputActivity();
            onChange(e);
          }}
          placeholder=""
          autoFocus={autoFocus}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e as React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e as React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>);
          }}
          min={min}
          max={max}
          className={inputClasses}
          spellCheck={false}
          autoComplete="off"
        />
      )}
    </motion.div>
  );
}
