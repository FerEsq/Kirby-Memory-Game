import React from 'react';
import { useState, useEffect } from 'react';
import swal from 'sweetalert'

//Carta
import Card from "./components/Card";
//Imagenes para las cartas
import blue from './media/blue.png';
import brown from './media/brown.png';
import green from './media/green.png';
import pink from './media/pink.png';
import purple from './media/purple.png';
import red from './media/red.png';
import white from './media/white.png';
import yellow from './media/yellow.png';
import title from './media/title.png';

//Datos de las cartas (imagen, bandera para ver si ya se hizo la pareja)
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
  //Estados
  const [cards, setCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [selectedOne, setSelectedOne] = useState(null)
  const [selectedTwo, setSelectedTwo]= useState(null)
  const [disabled, setDisabled] = useState(false)

  //Función para mezclar las cartas
  const mixCards = () => {
    const mixedCards = [...cardImages, ...cardImages]
    .sort (() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setSelectedOne(null)
    setSelectedTwo(null)
    setCards(mixedCards)
    setMoves(0)
  }

  //Función al darle click a una carta
  const handleSelect = (card) =>{
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card)
  }

  //Para voltear las cartas
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

  //Función ara resetear las cartas y aumentar los movimientos
  const resetMove = () => {
    setSelectedOne(null)
    setSelectedTwo(null)
    setMoves(lastMove => lastMove + 1)
    setDisabled(false)
  }

  //Iniciar el juego al iniciar la página
  useEffect (() => {
    mixCards()
  }, [])


  //Para poner el alert cuando ganó
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
      <img src={title} className='imgTitle'/>
      <h2> Moves: {moves} </h2>
      <button onClick={mixCards} className='restartButton'> Restart </button>

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