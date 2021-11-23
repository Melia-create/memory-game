import { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

const cardImages = [
  { "src": "/img/helmet-1.png"},
  { "src": "/img/potion-1.png"},
  { "src": "/img/ring-1.png"},
  { "src": "/img/scroll-1.png"},
  { "src": "/img/shield-1.png"},
  { "src": "/img/sword-1.png"}
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

      //Shuffle Cards

      const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }))

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

          if(choiceOne.src === choiceTwo.src) {
            console.log("Match!")
            resetTurn()
          } else {
            console.log("Mismatch!")
            resetTurn()
          }
        }
      }, [choiceOne, choiceTwo])

      //Reset cards

      const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
      }



  return (
    <div className="App">
      <h1>Memory Mayhem</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <Card 
          key={card.id}
          card={card}
          handleChoice={handleChoice}/>
        ))}
      </div>
    </div>
  );
}

export default App;
