import { QuizContainer } from "@/components/quiz/quiz-container";

export const metadata = {
  title: "Take the Test — HOP Personality Test",
  description:
    "Answer 16 personality questions to discover your unique personality type.",
};

export default function QuizPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <QuizContainer />
    </div>
  );
}
