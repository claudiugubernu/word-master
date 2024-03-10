import React from 'react';
import './TimeEnded.css';
import wallet from '../../assets/images/wallet.png';
import { useGameContext } from '../../context/GameContext';

export const TimeEnded: React.FC = () => {
  const {
    endGame,
    wordPoints,
    totalPoints,
    currentWord,
    playAnotherGame,
    goNextQuestion,
  } = useGameContext();

  return (
    <div className='time-ended-container'>
      <div className='time-ended'>
        <img
          src={wallet}
          className='wallet'
          alt='wallet'
        />
        {endGame ? '' : <h2 className=''>Lost £{wordPoints}</h2>}
        <h3>
          {endGame && totalPoints < 0
            ? 'Good luck next time.'
            : endGame
            ? `Congrats!`
            : `The correct answer was: ${currentWord}`}
        </h3>
        <h3>
          {endGame && totalPoints < 0
            ? 'Today you leave empty handed'
            : endGame
            ? `You've walked home with £${totalPoints}`
            : ''}
        </h3>
        {endGame ? (
          <button
            className='button buy'
            onClick={playAnotherGame}>
            Play Another Game
          </button>
        ) : (
          <button
            className='button buy'
            onClick={goNextQuestion}>
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeEnded;
