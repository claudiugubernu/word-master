import React from 'react';
import './GameControl.css';
import { useGameContext } from '../../context/GameContext';

type GameControlsProps = {
  disabled: boolean;
};

const GameControls: React.FC<GameControlsProps> = ({ disabled }) => {
  const {
    freezeTime,
    buyLetter,
    setFreezeTime,
    setDisabledGameControls,
    gameTime,
    guessTime,
    disabledGameControls,
  } = useGameContext();

  const takeGuess = () => {
    setFreezeTime(!freezeTime);
    setDisabledGameControls(!disabledGameControls);
    gameTime.stopTimer();
    guessTime.resetTimer();
    guessTime.startTimer();
  };

  return (
    <div className='game-options'>
      <button
        disabled={disabled}
        className={freezeTime ? 'button freeze' : 'button guess'}
        onClick={takeGuess}>
        {freezeTime ? 'Frozen' : 'Guess'}
      </button>
      <button
        disabled={disabled}
        className='button buy'
        onClick={buyLetter}>
        £
      </button>
    </div>
  );
};

export default GameControls;
