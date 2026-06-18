import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getQuizQuestions } from "@/services/quizApi";
import { shuffleArray } from "@/utils/shuffle";

import type { QuizQuestion, Answer } from "@/types/quiz";

import { QuestionCard } from "@/components/quiz/question-card";
import { Progress } from "@/components/ui/progress";

import { useTimer } from "@/hooks/useTimer";
import { QuizTimer } from "@/components/quiz/quiz-timer";

export function Quiz() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Answer[]>([]);

  const [loading, setLoading] = useState(true);

  const submitQuiz = (finalAnswers: Answer[]) => {
    localStorage.setItem("quiz_result", JSON.stringify(finalAnswers));

    navigate("/result");
  };

  const { timeLeft } = useTimer({
    initialTime: 600, // 10 menit
    onTimeUp: () => {
      submitQuiz(answers);
    },
  });

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

  const progress =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

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
      submitQuiz(updatedAnswers);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  if (loading) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  if (!question) {
    return (
      <div className="container mx-auto py-10">Tidak ada soal tersedia</div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">
      {/* Timer */}
      <div className="mb-6 flex justify-end">
        <QuizTimer timeLeft={timeLeft} />
      </div>

      {/* Progress */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            Soal {currentQuestion + 1} dari {questions.length}
          </h1>

          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>

        <Progress value={progress} />
      </div>

      <QuestionCard
        question={question.question}
        answers={shuffledAnswers}
        onSelectAnswer={handleAnswer}
      />
    </div>
  );
}
