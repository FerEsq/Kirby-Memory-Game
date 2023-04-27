import React, { useState } from 'react';
import "./Card.css";
import back from '../media/back.png';

function Card({card, handleSelect, flipped, disabled}) {

  //Al darle click a la carta
  const handleClick = () =>{
    if (!disabled){
      handleSelect(card)
    }
  }

  return (
    <div className="card" >
      <div className={flipped ? "flipped" : ""}>
        <img 
          className="frontCard" 
          src={card.src} 
        />

        <img 
          className="backCard" 
          src={back} 
          onClick={handleClick}
        />
      </div>
    </div>

  )
}

export default Card