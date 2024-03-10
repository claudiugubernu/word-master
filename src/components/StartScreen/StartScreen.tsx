import React from 'react';
import './StartScreen.css';
import LogoNav from '../../assets/images/Logo-nav.png';
import { useGameContext } from '../../context/GameContext';

const StartScreen: React.FC = () => {
  const { setGameStarted, gameTime } = useGameContext();

  const onStartGame = () => {
    setGameStarted(true);
    gameTime.startTimer();
  };

  return (
    <div className='start-screen'>
      <div className='image-wrapper'>
        <img
          src={LogoNav}
          className='logo'
          alt='logo game'
        />
      </div>
      <div className='content-wrapper'>
        <div className='button-group align-vertical'>
          <button
            className='button primary'
            onClick={onStartGame}>
            Start Game
          </button>
          <button className='button secondary'>Instructions</button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
