import { useState, useEffect } from 'react';

interface CountdownState {
  time: number;
  timeEnded: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setTimeEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UseCountdown = (startTime: number): CountdownState => {
  const [time, setTime] = useState<number>(startTime);
  const [timeEnded, setTimeEnded] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<number | null>(null);

  const hasTimerEnded: boolean = time <= 0;
  const isTimerRunning: boolean = intervalID !== null;

  const update = () => {
    setTime((time) => time - 1);
  };

  const startTimer = () => {
    if (!hasTimerEnded && !isTimerRunning) {
      const id = window.setInterval(update, 1000);
      setIntervalID(id);
    }
  };

  const stopTimer = () => {
    if (intervalID) {
      window.clearInterval(intervalID);
      setIntervalID(null);
    }
  };

  const resetTimer = () => {
    if (intervalID) {
      window.clearInterval(intervalID);
    }
    setTime(startTime);
  };

  // Update timeEnded when the timer ends
  useEffect(() => {
    if (hasTimerEnded) {
      setTimeEnded(!timeEnded);
    }
  }, [hasTimerEnded]);

  // Clear interval when timeEnded changes
  useEffect(() => {
    if (timeEnded && intervalID) {
      window.clearInterval(intervalID);
      setIntervalID(null);
    }
  }, [timeEnded, intervalID]);

  // Clear interval when component unmounts
  useEffect(() => {
    return () => {
      if (intervalID) {
        window.clearInterval(intervalID);
      }
    };
  }, [intervalID]);

  return {
    time,
    timeEnded,
    startTimer,
    stopTimer,
    resetTimer,
    setTimeEnded,
  };
};
