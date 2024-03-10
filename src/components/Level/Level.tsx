import React from 'react';
import { useGameContext } from '../../context/GameContext';
import './Level.css';

const Level: React.FC = () => {
  const {
    errorCSSClass,
    wordPoints,
    currentGame,
    currentQuestion,
    currentWord,
    guess,
  } = useGameContext();

  return (
    <div className='level'>
      <h2 className='level-points'>Winnings: £{wordPoints}</h2>
      <h3 className='level-question'>
        {currentGame[currentQuestion].question}
      </h3>
      <div className='level-word'>
        {new Array(currentWord.length).fill(undefined).map((_, i) => (
          <div
            key={i}
            className={'level-word-letter ' + errorCSSClass}>
            {guess[i]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Level;
