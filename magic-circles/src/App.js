import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

let id = 0;
const N = 5;

const commonCircleStyles = {
  border: "5px solid black",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5rem",
  fontWeight: "bold"
};
function App() {
  const [circles, setCircles] = useState([]);
  const [selectedCircleOne, setSelectedCircleOne] = useState(null);
  const [selectedCircleTwo, setSelectedCircleTwo] = useState(null);

  const setInitCircle = () => {
    setCircles([
      {
        id,
        styles: {
          height: "500px",
          width: "500px",
          ...commonCircleStyles
        }
      }
    ]);
  };

  useEffect(() => {
    setInitCircle();
  }, []);

  const splitCircles = () => {
    const tempCircles = [];
    for (let i = 0; i < N; i++) {
      tempCircles.push({
        id: ++id,
        styles: {
          height: `${500 / N}px`,
          width: `${500 / N}px`,
          ...commonCircleStyles
        }
      });
    }
    setCircles(tempCircles);
  };

  useEffect(() => {
    if (selectedCircleOne && selectedCircleTwo) {
      const noModifyCircles = circles.filter(
        (circle) =>
          circle.id !== selectedCircleOne.id &&
          circle.id !== selectedCircleTwo.id
      );

      setCircles([
        ...noModifyCircles,
        {
          id: ++id,
          styles: {
            height: `${
              parseInt(selectedCircleOne.styles.height) +
              parseInt(selectedCircleTwo.styles.height)
            }px`,
            width: `${
              parseInt(selectedCircleOne.styles.width) +
              parseInt(selectedCircleTwo.styles.width)
            }px`,
            ...commonCircleStyles
          }
        }
      ]);
      setSelectedCircleOne(null);
      setSelectedCircleTwo(null);
    }
  }, [selectedCircleOne, selectedCircleTwo]);

  const mergeCircles = (circle) => {
    if (!selectedCircleOne) setSelectedCircleOne(circle);
    else if (!selectedCircleTwo) setSelectedCircleTwo(circle);
  };

  const handleClick = (circle) => {
    if (circles.length === 1) {
      splitCircles();
    } else {
      mergeCircles(circle);
    }
  };

  return (
    <div
      className='App'
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      {circles.map((circle) => {
        return (
          <div
            className={circle.id}
            style={circle.styles}
            onClick={() => handleClick(circle)}
            key={circle.id}
          >
            {circle.styles.height}
          </div>
        );
      })}
    </div>
  );
}

export default App;
