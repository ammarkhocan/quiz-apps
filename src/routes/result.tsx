import { useNavigate } from "react-router-dom";

import type { Answer } from "@/types/quiz";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Result() {
  const navigate = useNavigate();

  const answers: Answer[] = JSON.parse(
    localStorage.getItem("quiz_result") || "[]",
  );

  const score = answers.filter((answer) => answer.isCorrect).length;

  const handleRetry = () => {
    localStorage.removeItem("quiz_result");

    navigate("/quiz");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <h1 className="mb-8 text-center text-4xl font-bold">Hasil Quiz</h1>

      {/* Summary */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Score</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">
              {score}/{answers.length}
            </p>

            <p className="mt-2 text-muted-foreground">
              Kamu menjawab {score} soal dengan benar dari {answers.length}{" "}
              soal.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Buttons */}
      <div className="mb-8 flex gap-4">
        <Button onClick={handleRetry}>Try Again</Button>

        <Button variant="outline" onClick={handleBackToDashboard}>
          Dashboard
        </Button>
      </div>

      {/* Detail Jawaban */}
      <div className="space-y-4">
        {answers.map((answer, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Soal {index + 1}</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Pertanyaan:</p>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: answer.question,
                    }}
                  />
                </div>

                <div>
                  <p className="font-medium">Jawaban Kamu:</p>

                  <p
                    className={
                      answer.isCorrect
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {answer.selectedAnswer}
                  </p>
                </div>

                {!answer.isCorrect && (
                  <div>
                    <p className="font-medium">Jawaban Benar:</p>

                    <p className="text-green-600 font-medium">
                      {answer.correctAnswer}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {score === answers.length && (
        <div className="mt-8 rounded-lg border p-4 text-center">
          🎉 Selamat! Semua jawaban kamu benar.
        </div>
      )}
    </div>
  );
}
