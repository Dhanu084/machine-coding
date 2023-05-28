import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import SingleCard from "./SingleCard";

const initialCards = [
  { text: "A" },
  { text: "B" },
  { text: "C" },
  { text: "D" }
];

const colors = [
  { bg: "blue", tc: "white" },
  { bg: "red", tc: "white" },
  { bg: "yellow", tc: "black" },
  { bg: "Orange", tc: "black" },
  { bg: "purple", tc: "white" },
  { bg: "green", tc: "white" },
  { bg: "light-grey", tc: "white" }
];

const getColors = () => {
  return Math.floor(Math.random() * colors.length);
};
function App() {
  const [cards, setCards] = useState([]);
  const [selectedCard1, setSelectedCard1] = useState(null);
  const [selectedCard2, setSelectedCard2] = useState(null);
  const turns = useRef(0);

  const shuffleCards = () => {
    turns.current = 0;
    const temp = [...initialCards, ...initialCards];
    let cardsWithId = temp.sort(() => Math.random() - 0.5);

    cardsWithId = cardsWithId.map((card) => {
      const colorIndex = getColors();
      return {
        id: Math.random() * 100,
        ...card,
        isMatched: false,
        bg: colors[colorIndex].bg,
        tc: colors[colorIndex].tc
      };
    });
    setCards(cardsWithId);
  };

  const handleSelection = (card) => {
    if (selectedCard1 === null) {
      setSelectedCard1(card);
    } else if (selectedCard2 === null && selectedCard1 !== card) {
      setSelectedCard2(card);
    }
  };

  useEffect(() => {
    let matchCount = 0;
    if (selectedCard1 && selectedCard2) {
      turns.current++;
      if (selectedCard1.text === selectedCard2.text) {
        const temp = [...cards];

        temp.forEach((card) => {
          if (card.id === selectedCard1.id || card.id === selectedCard2.id) {
            card.isMatched = true;
          }
          if (card.isMatched) ++matchCount;
        });
        setCards(temp);
      }
      setTimeout(() => {
        setSelectedCard1(null);
        setSelectedCard2(null);
        if (matchCount === cards.length) {
          alert(`You won in ${turns.current} turns`);
        }
      }, 200);
    }
  }, [selectedCard1, selectedCard2]);

  return (
    <div className='App'>
      <div>
        <button onClick={shuffleCards}>New Game</button>
      </div>
      <div className='grid'>
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleSelection={handleSelection}
            selectedCard1={selectedCard1}
            selectedCard2={selectedCard2}
          />
        ))}
      </div>
      {turns.current > 0 && <p>{turns.current}</p>}
    </div>
  );
}

export default App;
