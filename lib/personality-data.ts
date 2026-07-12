export const PERSONALITY_TYPES: Record<
  string,
  { description: string; strengths: string[]; weaknesses: string[] }
> = {
  INFJ: {
    description: "The Advocate — Quiet, visionary, and principled. You have a rare combination of deep empathy and analytical insight.",
    strengths: ["Creative", "Insightful", "Principled", "Passionate", "Altruistic"],
    weaknesses: ["Sensitive to criticism", "Perfectionistic", "Prone to burnout", "Can be overly private"],
  },
  INFP: {
    description: "The Mediator — Idealistic, empathetic, and deeply caring. You seek harmony and authenticity in all aspects of life.",
    strengths: ["Empathetic", "Open-minded", "Creative", "Passionate", "Idealistic"],
    weaknesses: ["Overly idealistic", "Self-critical", "Impractical", "Emotionally vulnerable"],
  },
  INTJ: {
    description: "The Architect — Strategic, logical, and independent. You see possibilities and systems where others see chaos.",
    strengths: ["Strategic", "Independent", "Determined", "Knowledgeable", "High standards"],
    weaknesses: ["Overly critical", "Dismissive of emotions", "Arrogant", "Socially aloof"],
  },
  INTP: {
    description: "The Thinker — Innovative, curious, and analytical. You love exploring ideas and uncovering how things work.",
    strengths: ["Analytical", "Original", "Open-minded", "Curious", "Objective"],
    weaknesses: ["Disconnected", "Indecisive", "Impatient", "Perfectionistic"],
  },
  ENFJ: {
    description: "The Protagonist — Charismatic, inspiring, and natural-born leaders. You bring people together toward a common goal.",
    strengths: ["Charismatic", "Reliable", "Altruistic", "Natural leader", "Empathetic"],
    weaknesses: ["Overly selfless", "Approval-seeking", "Overwhelmed easily", "Can be manipulative"],
  },
  ENFP: {
    description: "The Campaigner — Enthusiastic, creative, and free-spirited. You see life as an exciting adventure full of possibilities.",
    strengths: ["Enthusiastic", "Creative", "Sociable", "Open-minded", "Optimistic"],
    weaknesses: ["Disorganized", "Overly emotional", "Easily bored", "Struggles with routine"],
  },
  ENTJ: {
    description: "The Commander — Bold, strategic, and efficient. You're a natural leader who turns vision into reality.",
    strengths: ["Strategic", "Efficient", "Confident", "Strong leader", "Goal-oriented"],
    weaknesses: ["Intolerant", "Arrogant", "Workaholic", "Can be ruthless"],
  },
  ENTP: {
    description: "The Debater — Quick-witted, curious, and energetic. You thrive on intellectual challenge and new ideas.",
    strengths: ["Innovative", "Energetic", "Charismatic", "Quick thinker", "Resourceful"],
    weaknesses: ["Argumentative", "Insensitive", "Easily bored", "Can be unreliable"],
  },
  ISTJ: {
    description: "The Inspector — Practical, dependable, and responsible. You are the rock others rely on.",
    strengths: ["Dependable", "Hardworking", "Responsible", "Detail-oriented", "Practical"],
    weaknesses: ["Stubborn", "Insensitive", "Judgmental", "Rigid"],
  },
  ISFJ: {
    description: "The Defender — Warm, caring, and protective. You are always ready to support and nurture those around you.",
    strengths: ["Supportive", "Reliable", "Patient", "Practical", "Loyal"],
    weaknesses: ["Overly humble", "Represses feelings", "Overwhelmed by change", "People-pleasing"],
  },
  ISTP: {
    description: "The Virtuoso — Bold, practical, and action-oriented. You are a master of tools and hands-on problem solving.",
    strengths: ["Practical", "Resourceful", "Action-oriented", "Independent", "Calm under pressure"],
    weaknesses: ["Stubborn", "Insensitive", "Risk-prone", "Avoids commitment"],
  },
  ISFP: {
    description: "The Adventurer — Artistic, gentle, and in tune with the senses. You find beauty in everyday moments.",
    strengths: ["Artistic", "Gentle", "Passionate", "Open-minded", "Down-to-earth"],
    weaknesses: ["Overly sensitive", "Unpredictable", "Easily stressed", "Struggles with criticism"],
  },
  ESTJ: {
    description: "The Executive — Efficient, organized, and community-oriented. You get things done and done right.",
    strengths: ["Organized", "Efficient", "Direct", "Dependable", "Natural leader"],
    weaknesses: ["Inflexible", "Judgmental", "Work-focused", "Can be controlling"],
  },
  ESFJ: {
    description: "The Consul — Social, caring, and community-focused. You bring people together and keep things running smoothly.",
    strengths: ["Sociable", "Caring", "Organized", "Practical", "Loyal"],
    weaknesses: ["Approval-seeking", "Overly sensitive", "Resistant to change", "Self-sacrificing"],
  },
  ESTP: {
    description: "The Entrepreneur — Energetic, perceptive, and daring. You live in the moment and seize opportunities.",
    strengths: ["Energetic", "Persuasive", "Perceptive", "Action-oriented", "Resourceful"],
    weaknesses: ["Impulsive", "Insensitive", "Risk-seeking", "Easily bored"],
  },
  ESFP: {
    description: "The Entertainer — Spontaneous, enthusiastic, and fun-loving. You light up every room you enter.",
    strengths: ["Enthusiastic", "Sociable", "Playful", "Observant", "Practical"],
    weaknesses: ["Impulsive", "Easily bored", "Overly dramatic", "Sensitive to criticism"],
  },
};

export const TYPE_GRADIENTS: Record<string, string> = {
  INFJ: "from-purple-600 to-indigo-600",
  INFP: "from-emerald-500 to-teal-600",
  INTJ: "from-blue-600 to-indigo-800",
  INTP: "from-cyan-600 to-blue-700",
  ENFJ: "from-amber-500 to-orange-600",
  ENFP: "from-yellow-500 to-red-500",
  ENTJ: "from-red-600 to-rose-700",
  ENTP: "from-orange-500 to-pink-600",
  ISTJ: "from-slate-700 to-gray-900",
  ISFJ: "from-green-600 to-emerald-800",
  ISTP: "from-stone-600 to-zinc-800",
  ISFP: "from-teal-500 to-cyan-700",
  ESTJ: "from-blue-700 to-indigo-900",
  ESFJ: "from-rose-500 to-pink-700",
  ESTP: "from-amber-600 to-orange-800",
  ESFP: "from-fuchsia-500 to-purple-800",
};

export const TYPE_EMOJIS: Record<string, string> = {
  INFJ: "🦋",
  INFP: "🌙",
  INTJ: "🧠",
  INTP: "🔬",
  ENFJ: "🌟",
  ENFP: "🎨",
  ENTJ: "⚡",
  ENTP: "💡",
  ISTJ: "🏛️",
  ISFJ: "🌻",
  ISTP: "🔧",
  ISFP: "🎵",
  ESTJ: "📊",
  ESFJ: "🤝",
  ESTP: "🔥",
  ESFP: "🎭",
};
