"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeroSection } from "@/components/landing/hero-section";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "16 Thoughtful Questions",
    description:
      "Each question is carefully designed to reveal different aspects of your personality across four key dimensions.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
    title: "16 Personality Types",
    description:
      "Discover which of the 16 distinct personality types matches you best, based on your unique responses.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Beautifully Designed",
    description:
      "Enjoy a stunning, immersive experience with smooth animations, glassmorphism, and a dark gradient theme.",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* About Section */}
      <section id="about-section" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* How it works */}
          <div className="text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-lg max-w-xl mx-auto"
            >
              Three simple steps to unlock your personality profile
            </motion.p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Answer Questions",
                desc: "Respond to 16 intuitive questions using our interactive slider. There are no right or wrong answers — just be yourself.",
              },
              {
                step: "02",
                title: "AI Analysis",
                desc: "Our algorithm analyzes your responses across four key dimensions: Mind, Energy, Nature, and Tactics.",
              },
              {
                step: "03",
                title: "Get Your Profile",
                desc: "Receive a detailed personality profile with your type, trait breakdown, strengths, and growth areas.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 h-full hover:border-primary-500/30 transition-colors duration-300">
                  <span className="text-4xl font-bold bg-gradient-to-br from-primary-400 to-accent-400 bg-clip-text text-transparent">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-4 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] rounded-xl border border-white/5 p-6 hover:bg-white/[0.06] transition-colors duration-300"
              >
                <div className="text-primary-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Discover Yourself?
            </h2>
            <p className="text-white/60 max-w-md mx-auto">
              It takes just 5 minutes. Your journey of self-discovery starts now.
            </p>
            <Link href="/quiz">
              <Button
                variant="gradient"
                size="lg"
                className="text-lg px-10 py-5 rounded-xl shadow-2xl shadow-primary-500/25"
              >
                Start the Test
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-32 text-center">
          <p className="text-white/30 text-sm">
            Made with ❤️ — HOP Personality Test
          </p>
        </footer>
      </section>
    </>
  );
}
