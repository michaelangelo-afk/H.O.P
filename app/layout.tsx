import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HOP — Personality Test | Discover Your True Self",
  description:
    "Take the HOP personality test to discover your unique personality type, strengths, and growth areas. A 16-question journey of self-discovery.",
  openGraph: {
    title: "HOP — Personality Test",
    description:
      "Discover your unique personality type through 16 thoughtful questions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-gray-950`}>
        {/* Ambient background gradient */}
        <div className="fixed inset-0 bg-gradient-radial from-primary-500/5 via-gray-950 to-gray-950 pointer-events-none" />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
