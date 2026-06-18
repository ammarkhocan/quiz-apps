import type { QuizQuestion } from "@/types/quiz";

const API_URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

interface QuizResponse {
  response_code: number;
  results: QuizQuestion[];
}

export async function getQuizQuestions() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  const data: QuizResponse = await response.json();

  return data.results;
}
