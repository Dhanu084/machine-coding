import { useState, useRef, useEffect, useMemo } from "react";
import "./App.css";
let order = 0;

function App() {
  const [boxes, setBoxes] = useState([]);
  const fullFilled = useRef(false);

  if (boxes.filter((box) => box.clicked).length === 7)
    fullFilled.current = true;

  const sortedList = useMemo(
    () => [...boxes].sort((a, b) => a.order - b.order),
    [boxes]
  );

  useEffect(() => {
    getBoxes(true);
  }, []);

  useEffect(() => {
    if (!fullFilled.current) {
      return;
    }
    const temp = [...sortedList];
    if (temp.length === 0) {
      fullFilled.current = false;
      getBoxes(true);
      return;
    }
    temp.shift();
    setTimeout(() => setBoxes(temp), 1000);
  }, [boxes]);

  function getBoxes(initial) {
    const temp = [];
    const value = [1, 2, 3].map((_, i) => {
      return [1, 2, 3].map((o, j) => {
        if (i === 1 && j > 0) {
          return <div key={i + "" + j}></div>;
        }
        if (initial) {
          temp.push({ i, j, clicked: false, order: null });
        }
        return (
          <div
            className='box'
            key={i + "" + j}
            id={i + "" + j}
            style={{
              backgroundColor:
                !initial &&
                boxes.find((box) => box.i === i && box.j === j)?.clicked
                  ? "green"
                  : ""
            }}
            onClick={() => {
              const temp = [...boxes];
              const box = temp.find((box) => box.i === i && box.j === j);
              if (box) {
                box.clicked = true;
                box.order = ++order;
                setBoxes(temp);
              }
            }}
          >
            {i + "" + j}
          </div>
        );
      });
    });
    if (initial) {
      setBoxes(temp);
    }
    return value;
  }

  return (
    <div className='App'>
      <div className='grid'>{getBoxes(false)}</div>
    </div>
  );
}

export default App;
