import "./App.css";
import cat1 from "./img/cat1.jpg";
import cat2 from "./img/cat2.jpg";
import cat3 from "./img/cat3.jpg";
import cat4 from "./img/cat4.jpg";

import { useState } from "react";
import ImageSlider from "./ImageSlider";

function App() {
  const [slides, setSlides] = useState([cat1, cat2, cat3, cat4]);
  return (
    <div className='App'>
      <ImageSlider slides={slides} />
    </div>
  );
}

export default App;
