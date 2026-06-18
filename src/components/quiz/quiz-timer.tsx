interface QuizTimerProps {
  timeLeft: number;
}

export function QuizTimer({ timeLeft }: QuizTimerProps) {
  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  return (
    <div className="rounded-lg border px-4 py-2 text-center">
      <span className="text-2xl font-bold">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
