import React from "react";

const SingleCard = ({
  card,
  selectedCard1,
  selectedCard2,
  handleSelection
}) => {
  return (
    <div
      className='box'
      onClick={() => handleSelection(card)}
      style={{
        backgroundColor: card.bg,
        color: card.tc
      }}
    >
      {(card.isMatched || selectedCard1 === card || selectedCard2 === card) && (
        <span>{card.text}</span>
      )}
    </div>
  );
};

export default SingleCard;
