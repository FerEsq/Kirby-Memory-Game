import React from 'react';
import { useState, useEffect } from 'react';
import swal from 'sweetalert'
import Card from "./components/Card";
import blue from './media/blue.png';
import brown from './media/brown.png';
import green from './media/green.png';
import pink from './media/pink.png';
import purple from './media/purple.png';
import red from './media/red.png';
import white from './media/white.png';
import yellow from './media/yellow.png';

const cardImages = [
  {"src": blue, paired: false},
  {"src": brown, paired: false},
  {"src": green, paired: false },
  {"src": pink, paired: false },
  {"src": purple, paired: false },
  {"src": red, paired: false },
  {"src": white, paired: false },
  {"src": yellow, paired: false }
];

function App() {
  const [cards, setCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [selectedOne, setSelectedOne] = useState(null)
  const [selectedTwo, setSelectedTwo]= useState(null)
  const [disabled, setDisabled] = useState(false)

  const mixCards = () => {
    const mixedCards = [...cardImages, ...cardImages]
    .sort (() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setSelectedOne(null)
    setSelectedTwo(null)
    setCards(mixedCards)
    setMoves(0)
  }

  const handleSelect = (card) =>{
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card)
  }

  useEffect (() => {
    if (selectedOne && selectedTwo){
      setDisabled(true)
    }
    if (selectedOne && selectedTwo){
      if (selectedOne.src === selectedTwo.src){
        setCards(lastCards => {
          return lastCards.map(card => {
            if (card.src === selectedOne.src){
              return {...card, paired: true}
            }
            else{
              return card
            }
          })
        })
        resetMove()
      }
      else{
        setTimeout(() => resetMove(), 1000) 
      }
    }
  }, [selectedOne, selectedTwo])

  //console.log(cards)

  // reset choices & increase turn
  const resetMove = () => {
    setSelectedOne(null)
    setSelectedTwo(null)
    setMoves(lastMove => lastMove + 1)
    setDisabled(false)
  }

  // start a new game automagically
  useEffect (() => {
    mixCards()
  }, [])

  let contador = 0;

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].paired) { 
      contador = contador + 1
    }
  }

  if (contador === 16) {
    setTimeout(function() {
      swal({
        title: "¡You win!",
        text: "Congratulations",
        icon: 'https://i.pinimg.com/originals/9c/b1/59/9cb159ed669f59d43cf2abc56c33f6a4.gif',
        button: "Close"
      });
    }, 1000);
  }
  


  return (
    <div className='container'>
      <h1> Memoria </h1>
      <h3> Moves: {moves} </h3>
      <button onClick={mixCards}> Nuevo Juego </button>

      <div className='cardGrid'>
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card}
            handleSelect={handleSelect}
            flipped={card === selectedOne || card === selectedTwo || card.paired}
            disabled={disabled}
          />
        ))}
      </div>
      
      

    </div>
  )
};

export default App;