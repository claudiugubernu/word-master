import React from 'react';
import { useGameContext } from '../../context/GameContext';
import './Timer.css';

const Timer: React.FC = () => {
  const { gameTime } = useGameContext();
  const minutes = Math.floor(gameTime.time / 60);
  const seconds = gameTime.time - minutes * 60;

  return (
    <div className='timer'>
      <div className='time'>
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default Timer;
