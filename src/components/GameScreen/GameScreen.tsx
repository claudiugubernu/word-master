import React from 'react';
import { useGameContext } from '../../context/GameContext';
import Level from '../Level/Level';
import Navbar from '../Navbar/Navbar';
import GameControls from '../GameControls/GameControls';
import TakeGuess from '../TakeGuess/TakeGuess';
import TimeEnded from '../TimeEnded/TimeEnded';
import NextQuestionComponent from '../NextQuestionComponent/NextQuestionComponent';
import QWERTY from '../QWERTY/QWERTY';
import './GamesScreen.css';

const GameScreen: React.FC = () => {
  const {
    disabledGameControls,
    freezeTime,
    guessTime,
    gameTime,
    takeNextQuestion,
  } = useGameContext();

  return (
    <>
      {guessTime.timeEnded && <TimeEnded />}
      {gameTime.timeEnded && <TimeEnded />}
      <Navbar />
      <div className='game-screen'>
        <div className='game-level'>
          {freezeTime && <TakeGuess />}
          <Level />
          <GameControls disabled={disabledGameControls} />
        </div>
        {freezeTime && <QWERTY />}
        {takeNextQuestion && <NextQuestionComponent />}
      </div>
    </>
  );
};

export default GameScreen;
