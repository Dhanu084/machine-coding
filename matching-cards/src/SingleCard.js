import React from "react";

const SingleCard = ({
  card,
  selectedCard1,
  selectedCard2,
  handleSelection
}) => {
  const isMatching = (card) => {
    return card.isMatched || selectedCard1 === card || selectedCard2 === card;
  };
  return (
    <div
      className='box'
      onClick={() => handleSelection(card)}
      style={{
        backgroundColor: card.bg,
        color: card.tc,
        backgroundImage: isMatching(card) ? `url(${card.img})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    ></div>
  );
};

export default SingleCard;
