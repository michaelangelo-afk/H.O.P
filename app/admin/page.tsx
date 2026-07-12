"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { questions } from "@/lib/questions";

interface Response {
  id: string;
  created_at: string;
  personal_info: {
    fullName: string;
    age: number;
    phoneNumber: string;
    birthday: string;
    stateOfBirth: string;
    parentGuardianPhone: string;
  };
  answers: Record<string, string>;
}

const questionMap = questions.reduce((map, q) => {
  map[q.id] = q.text;
  return map;
}, {} as Record<number, string>);

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({ total: 0, today: 0, statesCount: 0 });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple access code — you can change this
    if (password === "admin123") {
      setAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    fetchResponses();
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Access</h2>
            <p className="text-white/50 text-sm">Enter the access code to view responses</p>
            <form onSubmit={handleAuth} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAuthError(false); }}
                placeholder="Access code"
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                  authError ? "border-red-400" : "border-white/10"
                } text-white placeholder-white/30 focus:outline-none focus:border-green-400/50 transition-all text-center text-lg`}
              />
              {authError && (
                <p className="text-red-400 text-sm">Invalid access code</p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                Enter Dashboard
              </button>
            </form>
            <Link href="/" className="block text-sm text-white/30 hover:text-white/50 transition-colors">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  async function fetchResponses(query?: string) {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.set("search", query);
      params.set("limit", "100");

      const res = await fetch(`/api/admin/responses?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      setResponses(data.responses || []);
      setTotal(data.total || 0);

      let todayCount = 0;
      const statesSet = new Set<string>();
      const today = new Date().toDateString();
      (data.responses || []).forEach((r: Response) => {
        if (r.personal_info?.stateOfBirth) statesSet.add(r.personal_info.stateOfBirth);
        if (new Date(r.created_at).toDateString() === today) todayCount++;
      });
      setStats({ total: data.total || 0, today: todayCount, statesCount: statesSet.size });
    } catch (err) {
      setError("Could not load responses. Make sure the Supabase table has been created.");
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResponses(search);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-NG", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <div className="h-6 w-px bg-white/10" />
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <span className="text-sm text-white/40">{total} responses</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 mb-8 text-center"
          >
            <p className="text-rose-300 font-medium mb-2">{error}</p>
            <p className="text-white/50 text-sm">Run the SQL schema in Supabase dashboard first.</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-2xl border border-white/10 p-6"
          >
            <p className="text-white/50 text-sm mb-1">Total Responses</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-2xl border border-white/10 p-6"
          >
            <p className="text-white/50 text-sm mb-1">Today</p>
            <p className="text-3xl font-bold text-green-400">{stats.today}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-2xl border border-white/10 p-6"
          >
            <p className="text-white/50 text-sm mb-1">States Reached</p>
            <p className="text-3xl font-bold text-primary-400">{stats.statesCount}</p>
          </motion.div>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, or state..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all"
            />
          </div>
        </form>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : responses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">
              {search ? "No responses match your search" : "No responses yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {responses.map((response, i) => (
                <motion.div key={response.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <button
                    onClick={() => setSelectedResponse(selectedResponse?.id === response.id ? null : response)}
                    className={`w-full text-left bg-white/5 rounded-2xl border border-white/10 p-6 transition-all duration-200 hover:bg-white/[0.07] ${
                      selectedResponse?.id === response.id ? "border-green-400/30 ring-1 ring-green-400/20" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                          {response.personal_info?.fullName?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{response.personal_info?.fullName || "Unknown"}</p>
                          <p className="text-sm text-white/40">
                            {response.personal_info?.stateOfBirth || "N/A"} · {response.personal_info?.age || "?"} yrs
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-white/30">{formatDate(response.created_at)}</span>
                    </div>

                    <AnimatePresence>
                      {selectedResponse?.id === response.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 border-t border-white/10 mt-4 space-y-6">
                            <div>
                              <h3 className="text-sm font-semibold text-green-400 mb-3">Personal Information</h3>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {[
                                  ["Phone", response.personal_info?.phoneNumber],
                                  ["Age", response.personal_info?.age],
                                  ["Birthday", response.personal_info?.birthday],
                                  ["State of Birth", response.personal_info?.stateOfBirth],
                                  ["Parent/Guardian", response.personal_info?.parentGuardianPhone],
                                ].map(([label, value]) => (
                                  <div key={label as string} className="bg-white/[0.03] rounded-xl p-3">
                                    <p className="text-xs text-white/40 mb-1">{label as string}</p>
                                    <p className="text-sm text-white/80 font-medium">{String(value ?? "—")}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-sm font-semibold text-green-400 mb-3">Responses</h3>
                              <div className="space-y-3">
                                {Object.entries(response.answers || {}).map(([qId, answer]) => {
                                  const qNum = parseInt(qId);
                                  const questionText = questionMap[qNum] || `Question ${qId}`;
                                  return (
                                    <div key={qId} className="bg-white/[0.03] rounded-xl p-4">
                                      <p className="text-xs text-white/40 mb-1">Q{qId}</p>
                                      <p className="text-sm text-white/50 mb-2">{questionText}</p>
                                      <p className="text-white font-medium">{answer}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
