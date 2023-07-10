import React, { useRef, useState } from "react";
import "./ImageSlider.css";

const ImageSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerId = useRef(null);
  const [animationDirection, setAnimationDirection] = useState("prev");

  function slideShowFunc() {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
      return;
    }
    timerId.current = setInterval(
      () => setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length),
      2000
    );
  }

  return (
    <>
      <div className='img-container'>
        <div
          className='prev act-btn'
          onClick={() => {
            setCurrentSlide(
              (prevIndex) => (prevIndex + slides.length - 1) % slides.length
            );
            setAnimationDirection("prev");
          }}
        >
          {"<"}
        </div>

        <div
          className={`img-box`}
          key={slides[currentSlide]}
          style={{
            backgroundImage: `url(${slides[currentSlide]})`,
            animation: `${
              animationDirection === "prev" ? "moveInRight" : "moveInLeft"
            } 200ms ease-in 1`
          }}
        ></div>

        <div
          className='next act-btn'
          onClick={() => {
            setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
            setAnimationDirection("next");
          }}
        >
          {">"}
        </div>
      </div>
      <div className='dots'>
        {slides.map((_, index) => (
          <div
            className={`dot ${currentSlide === index ? "active" : "inactive"}`}
            key={_}
          ></div>
        ))}
      </div>
      <div>
        <button onClick={slideShowFunc} className='slideshow-btn'>
          slide show
        </button>
      </div>
    </>
  );
};

export default ImageSlider;
