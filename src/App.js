import React, { useState, useEffect } from 'react';
import './App.css';
import rockImage from './images/rock.png';
import paperImage from './images/paper.png';
import scissorsImage from './images/scissors.png';


const App = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [winner, setWinner] = useState('');
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [roundCount, setRoundCount] = useState(1);

  const choices = [
    { name: 'piedra', image: rockImage },
    { name: 'papel', image: paperImage },
    { name: 'tijeras', image: scissorsImage },
  ];

  const defaultChoiceImage = {
    name1: 'ninja',
    image1: 'ninja.png',
    name2: 'computer',
    image2: 'computer.png',  
  };

  useEffect(() => {
    setPlayerChoice(defaultChoiceImage.image1);
    setComputerChoice(defaultChoiceImage.image2);
  }, [defaultChoiceImage.image1, defaultChoiceImage.image2]);

  const handlePlayerChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    determineWinner(choice, computerChoice.name);
    updateScore(choice, computerChoice.name);
    setRoundCount((prevRoundCount) => prevRoundCount + 1);
  };

  const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
      setWinner('Tie');
    } else if (
      (playerChoice === 'piedra' && computerChoice === 'tijeras') ||
      (playerChoice === 'papel' && computerChoice === 'piedra') ||
      (playerChoice === 'tijeras' && computerChoice === 'papel')
    ) {
      setWinner('¡You Win!');
    } else {
      setWinner('¡You Lost!');
    }
  };

  const updateScore = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
      return; // It's a tie, no need to update the score
    }
    if (
      (playerChoice === 'piedra' && computerChoice === 'tijeras') ||
      (playerChoice === 'papel' && computerChoice === 'piedra') ||
      (playerChoice === 'tijeras' && computerChoice === 'papel')
    ) {
      setScore((prevScore) => ({
        ...prevScore,
        player: prevScore.player + 1,
      }));
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        computer: prevScore.computer + 1,
      }));
    }
  };

  return (
    <div className="app">
     <header className="header">
        <h1>Rock, Paper or Scissors the ultimate game</h1>
        <h2>man VS machine, who will be the winner?</h2>
      </header>
      <div className="choices">
        {choices.map((choice) => (
          <div
            key={choice.name}
            className={`choice ${playerChoice === choice.name ? 'active' : ''}`}
            onClick={() => handlePlayerChoice(choice.name)}
          >
            <img src={choice.image} alt={choice.name} />
          </div>
        ))}
      </div>
      <div className="selections">
        <div className="player-selection">
          <h3>your choice:</h3>
          <div className="choice">
          <img src={playerChoice && choices.find((choice) => choice.name === playerChoice)?.image} alt="" />


          </div>
        </div>
        <div className="computer-selection">
          <h3>computer choice:</h3>
          <div className="choice">
          <img src={computerChoice && computerChoice.image} alt="" />

          </div>
        </div>
      </div>
      <div className="winner">{winner}</div>
      
      <div className="scoreboard">
        <h3>Scoreboard</h3>
        <div className="score">
          <div>
            Player: <span>{score.player}</span>
          </div>
          <div>
            Computer: <span>{score.computer}</span>
          </div>
        </div>
      </div>
      <div className="round-count">
        <h3>Round: {roundCount}</h3>
      </div>
    </div>
  );
};

export default App;

