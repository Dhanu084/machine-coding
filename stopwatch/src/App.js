import { useState, useRef } from "react";
import "./App.css";

const displayFormatter = (val) => {
  return val.length < 2 ? `0${val}` : val;
};

function App() {
  const [timeVal, setTimeVal] = useState(0);
  const timer = useRef(null);

  const displayTime = () => {
    const hour = displayFormatter(Math.floor(timeVal / (60 * 60)) + "");
    const minutes = displayFormatter(Math.floor(timeVal / 60) + "");
    const seconds = displayFormatter(Math.floor(timeVal % 60) + "");
    return `${hour}:${minutes}:${seconds}`;
  };

  const startTimer = () => {
    if (timer.current) return;
    timer.current = setInterval(() => {
      setTimeVal((prev) => ++prev);
    }, 1000);
  };

  const clearTimer = () => {
    clearTimeout(timer.current);
    timer.current = null;
  };

  const pauseTimer = () => {
    clearTimer();
  };
  const stopTimer = () => {
    clearTimer();
    setTimeVal(0);
  };

  return (
    <div className='App'>
      <div className='timer'>{displayTime()}</div>
      <div className='flex'>
        <button className='btn' onClick={startTimer}>
          Start
        </button>
        <button className='btn' onClick={pauseTimer}>
          Pause
        </button>
        <button className='btn' onClick={stopTimer}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default App;
