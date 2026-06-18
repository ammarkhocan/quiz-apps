import { useEffect, useState } from "react";

import { getQuizQuestions } from "@/services/quizApi";
import type { QuizQuestion } from "@/types/quiz";

export function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getQuizQuestions();

        setQuestions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold">Total Soal: {questions.length}</h1>

      <pre className="mt-5">{JSON.stringify(questions[0], null, 2)}</pre>
    </div>
  );
}
