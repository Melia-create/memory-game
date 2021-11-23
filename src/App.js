import { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

const cardImages = [
  { "src": "/img/helmet-1.png", matched:false},
  { "src": "/img/potion-1.png", matched:false},
  { "src": "/img/ring-1.png", matched:false},
  { "src": "/img/scroll-1.png", matched:false},
  { "src": "/img/shield-1.png", matched:false},
  { "src": "/img/sword-1.png", matched:false}
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

      //Shuffle Cards

      const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }))
        

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
      }

      //Handle card choice

      const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
      }

      //Compare cards selected

      useEffect(() => {
        if (choiceOne && choiceTwo) {
          setDisabled(true)

          //If cards match, 
          if(choiceOne.src === choiceTwo.src) {
            //Update card state
            setCards(prevCards => {
              //Take in Previous card state to update state 
              return prevCards.map(card => {
                //return new array of cards
                if (card.src === choiceOne.src) {
                //if card src matches choice src
                //return a new object
                //spread card props
                //Changed matched prop to true
                 return {...card, matched:true}
                } else {
                  return card
                }
              })
            })
            resetTurn()
          } else {
            setTimeout(() => resetTurn(), 500)
          }
        }
      }, [choiceOne, choiceTwo])


      // Start Game automatically 

      useEffect(() => {
        shuffleCards()
      }, [])

      //Reset cards

      const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
      }



  return (
    <div className="App">
      <h1>Memory Mayhem</h1>
      <h3>Turns: {turns}</h3>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <Card 
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}/>
        ))}
      </div>
    </div>
  );
}

export default App;
