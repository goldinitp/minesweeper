import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = (props) => {
  const { startTimer } = props;
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive && startTimer) {
      setIsActive(true);
    }
    if (!startTimer) {
      setIsActive(false);
      setSeconds(0);
    }
  }, [startTimer]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (time) => {
    return time > 9 ? time : `0${time}`;
  }

  const formatSeconds = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${formatTime(hrs)}:${formatTime(mins)}:${formatTime(sec)}`;
  }

  return (
    <div div className="timer-container" >
      {
        startTimer ? <div>{formatSeconds(seconds)}</div> : <div>00:00:00</div>
      }
    </div >
  );
};

export default Timer;