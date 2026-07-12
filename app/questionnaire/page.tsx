"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionnaireContainer } from "@/components/questionnaire/questionnaire-container";
import type { PersonalInfo } from "@/lib/types";

export default function QuestionnairePage() {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  useEffect(() => {
    // Try to get personal info from session storage
    const stored = sessionStorage.getItem("hop_personal_info");
    if (stored) {
      try {
        setPersonalInfo(JSON.parse(stored));
      } catch {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  if (!personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <QuestionnaireContainer personalInfo={personalInfo} />;
}
