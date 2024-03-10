import React from 'react';
import './TakeGuess.css';
import { useGameContext } from '../../context/GameContext';

const TakeGuess: React.FC = () => {
  const { guessTime } = useGameContext();
  const seconds = guessTime.time;
  return (
    <div className='take-guess'>{seconds.toString().padStart(2, '0')}s</div>
  );
};

export default TakeGuess;
