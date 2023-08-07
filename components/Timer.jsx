import React, { useEffect, useState } from "react";
const Timer = ({ seconds, onFinish }) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) {
      //redirect from here
      onFinish();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return <span className="countdown-timer">{timeLeft}</span>;
};

export default Timer;
