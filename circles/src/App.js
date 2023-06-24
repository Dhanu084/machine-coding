import { useEffect, useState } from "react";
import "./App.css";

/* Break Big cirlce to N smaller circles and merge the selected small circles*/

const N = 5;
const WIDTH = 500,
  HEIGHT = 500;

const circleStyle = {
  borderRadius: "50%",
  border: "2px solid black",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem"
};
const bigCircleStyle = {
  height: "500px",
  width: "500px",
  ...circleStyle
};
let ID = 1;

function App() {
  const [showSmallCircles, setShowSmallCircles] = useState(false);
  const [smallCircles, setSmallCircles] = useState([]);
  const [selectedCircle1, setSelectedCircle1] = useState(null);
  const [selectedCircle2, setSelectedCircle2] = useState(null);

  const displaySmallCircles = () => {
    const temp = [];
    for (let i = 0; i < N; i++) {
      temp.push({ ID: ID++, height: HEIGHT / 5, width: WIDTH / 5 });
    }
    setSmallCircles(temp);
  };

  useEffect(() => {
    displaySmallCircles();
  }, []);

  useEffect(() => {
    if (selectedCircle1 && selectedCircle2) {
      const temp = [...smallCircles];
      const resultantCircle = [];
      let circle1, circle2;

      temp.forEach((circle) => {
        if (circle.ID === selectedCircle1) {
          circle1 = circle;
        } else if (circle.ID === selectedCircle2) {
          circle2 = circle;
        } else {
          resultantCircle.push(circle);
        }
      });
      setSmallCircles([
        {
          height: circle1.height + circle2.height,
          width: circle1.width + circle2.width,
          ID: ID++
        },
        ...resultantCircle
      ]);
      setSelectedCircle1(null);
      setSelectedCircle2(null);
    }
  }, [selectedCircle1, selectedCircle2]);

  useEffect(() => {
    if (smallCircles.length === 1) {
      setShowSmallCircles(false);
      displaySmallCircles();
      ID = 1;
    }
  }, [smallCircles]);

  const handleCircleSelection = (id) => {
    if (
      selectedCircle1 &&
      selectedCircle2 &&
      selectedCircle1 === selectedCircle2
    ) {
      return;
    }
    if (selectedCircle1 === null) setSelectedCircle1(id);
    else if (selectedCircle2 === null) setSelectedCircle2(id);
  };

  return (
    <div className='App'>
      {!showSmallCircles ? (
        <div style={bigCircleStyle} onClick={() => setShowSmallCircles(true)}>
          Let's start
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          {smallCircles.map((sc) => (
            <div
              key={sc.ID}
              style={{
                height: sc.height,
                width: sc.height,
                ...circleStyle
              }}
              onClick={() => handleCircleSelection(sc.ID)}
            >
              {sc.ID}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
