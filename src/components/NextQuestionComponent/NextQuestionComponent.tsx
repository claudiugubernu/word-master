import React from 'react';
import { useGameContext } from '../../context/GameContext';
import wallet from '../../assets/images/wallet.png';
import './NextQuestionComponent.css';

const NextQuestionComponent: React.FC = () => {
  const {
    totalPoints,
    takeNextQuestion,
    endGame,
    playAnotherGame,
    changeQuestion,
    quitGame,
  } = useGameContext();

  return (
    <div
      className={
        takeNextQuestion
          ? 'next-question-container active'
          : 'next-question-container'
      }>
      <div className='next-question'>
        <img
          src={wallet}
          className='wallet'
          alt='wallet'
        />
        <h2 className='next-question-total'>
          {endGame && totalPoints < 0
            ? `Good luck next time. Today you leave empty handed`
            : endGame
            ? `Congrats!`
            : `You won: £${totalPoints} in wallet`}
        </h2>
        <h2 className='next-question-total'>
          {endGame && totalPoints < 0
            ? `Today you leave empty handed.`
            : endGame
            ? `You've walked home with £${totalPoints}`
            : ``}
        </h2>
        {endGame ? (
          <>
            <button
              className='button buy'
              onClick={playAnotherGame}>
              Play Another Game
            </button>
            <button
              className='button buy'
              onClick={quitGame}>
              Quit
            </button>
          </>
        ) : (
          <button
            className='button buy'
            onClick={changeQuestion}>
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default NextQuestionComponent;
