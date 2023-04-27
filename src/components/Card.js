import React, { useState } from 'react';
import "./Card.css";
import backImage from './media/back.png';

function Card({frontImage}) {
  const [currentImage, setCurrentImage] = useState(backImage);

  function handleClick() {
    setCurrentImage(currentImage === backImage ? frontImage : backImage);
  }

  return <img src={currentImage} width={192} onClick={handleClick} />;
}

export default Card