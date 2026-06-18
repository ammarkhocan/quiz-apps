import type { Answer } from "@/types/quiz";

export function Result() {
  const answers: Answer[] = JSON.parse(
    localStorage.getItem("quiz_result") || "[]",
  );

  const score = answers.filter((answer) => answer.isCorrect).length;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">
        Score: {score} / {answers.length}
      </h1>

      <div className="mt-8 space-y-4">
        {answers.map((answer, index) => (
          <div key={index} className="rounded border p-4">
            <p>
              <strong>Question:</strong>
            </p>

            <p
              dangerouslySetInnerHTML={{
                __html: answer.question,
              }}
            />

            <p className="mt-2">Your Answer: {answer.selectedAnswer}</p>

            <p>Correct Answer: {answer.correctAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
