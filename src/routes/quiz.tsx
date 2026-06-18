import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getQuizQuestions } from "@/services/quizApi";
import { shuffleArray } from "@/utils/shuffle";

import type { QuizQuestion, Answer } from "@/types/quiz";

import { QuestionCard } from "@/components/quiz/question-card";

export function Quiz() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Answer[]>([]);

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

  const question = questions[currentQuestion];

  const shuffledAnswers = useMemo(() => {
    if (!question) return [];

    return shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]);
  }, [question]);

  const handleAnswer = (selectedAnswer: string) => {
    if (!question) return;

    const newAnswer: Answer = {
      question: question.question,
      selectedAnswer,
      correctAnswer: question.correct_answer,
      isCorrect: selectedAnswer === question.correct_answer,
    };

    const updatedAnswers = [...answers, newAnswer];

    setAnswers(updatedAnswers);

    const isLastQuestion = currentQuestion === questions.length - 1;

    if (isLastQuestion) {
      localStorage.setItem("quiz_result", JSON.stringify(updatedAnswers));

      navigate("/result");
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <h1 className="mb-6 text-xl font-bold">
        Soal {currentQuestion + 1} dari {questions.length}
      </h1>

      <QuestionCard
        question={question.question}
        answers={shuffledAnswers}
        onSelectAnswer={handleAnswer}
      />
    </div>
  );
}
