import { useEffect, useState } from "react";

interface UseTimerProps {
  initialTime: number;
  onTimeUp: () => void;
}

export function useTimer({ initialTime, onTimeUp }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  return {
    timeLeft,
  };
}
