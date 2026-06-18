import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  question: string;
  answers: string[];
  onSelectAnswer: (answer: string) => void;
}

export function QuestionCard({
  question,
  answers,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <h2
          className="text-xl font-semibold"
          dangerouslySetInnerHTML={{
            __html: question,
          }}
        />

        <div className="grid gap-3">
          {answers.map((answer) => (
            <Button
              key={answer}
              variant="outline"
              onClick={() => onSelectAnswer(answer)}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: answer,
                }}
              />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
