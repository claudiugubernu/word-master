import { createContext, useContext, useState, useEffect } from 'react';
import { UseCountdown } from '../hooks/UseCountdown';
import { currentGameProps, GameProps } from '../@types/types';
import gameData from '../assets/quizez/quizez.json';

export const GameContext = createContext<any>(null);

export const useGameContext = () => {
  return useContext(GameContext);
};

const GameProvider = ({ children }: any) => {
  const [currentGame, setCurrentGame] = useState<currentGameProps[]>([]);
  const [randomGame, setRandomGame] = useState<GameProps>({
    id: 0,
    game: [],
  });
  const [gamesNotPlayed, setGamesNotPlayed] = useState<GameProps[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>('');

  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [freezeTime, setFreezeTime] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [takeNextQuestion, setTakeNextQuestion] = useState<boolean>(false);
  const [errorCSSClass, setErrorCSSClass] = useState<string>('');
  const [wordPoints, setWordPoints] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [disabledGameControls, setDisabledGameControls] =
    useState<boolean>(false);

  const gameTime = UseCountdown(240); // 4 minutes
  const guessTime = UseCountdown(10);
  const letterPrice = 100;
  const nextQuestion = currentQuestion + 1;

  // Get a random game from the gameData
  // Set that randomGame as currentGame
  useEffect(() => {
    setRandomGame(gameData[Math.floor(Math.random() * gameData.length)]);
    setCurrentGame(randomGame.game);
    setGamesNotPlayed(gameData.filter((game) => game.id !== randomGame.id));
  }, [currentGame]);

  // Set currentWord and wordPoints
  useEffect(() => {
    setCurrentWord(currentGame[currentQuestion]?.answer);
    setWordPoints(currentWord?.length * letterPrice);
  }, [currentGame, currentWord, currentQuestion]);

  // End game if on last question
  useEffect(() => {
    // Last question
    if (nextQuestion === currentGame.length) {
      setEndGame(!endGame);
      return;
    }
  }, [nextQuestion, currentGame.length]);

  // guessTime ended and no guess has been successfull
  useEffect(() => {
    if (guessTime.timeEnded) {
      // Calculate total
      setTotalPoints(-wordPoints + totalPoints);
    }
  }, [guessTime.timeEnded, currentWord, wordPoints]);

  // gameTime ended show total end game
  useEffect(() => {
    if (gameTime.timeEnded) {
      // Calculate total
      setTotalPoints(-wordPoints + totalPoints);
      // End game
      setEndGame(!endGame);
    }
  }, [gameTime.timeEnded, currentWord, wordPoints]);

  // Change game
  const playAnotherGame = () => {
    // grab another game and reset all
    const newRandomGame =
      gamesNotPlayed[Math.floor(Math.random() * gamesNotPlayed.length)];
    setCurrentGame(newRandomGame.game);
    setRandomGame(newRandomGame);
    setGamesNotPlayed(
      gamesNotPlayed.filter((game) => game.id !== newRandomGame.id)
    );
    setCurrentQuestion(0);
    setWordPoints(0);
    setTotalPoints(0);
    setGuess('');
    setEndGame(false);
    setTakeNextQuestion(false);
    setFreezeTime(false);
    setErrorCSSClass('');
    setDisabledGameControls(!disabledGameControls);
    setTakeNextQuestion(!takeNextQuestion);
    // Reset timers if needed
    gameTime.resetTimer();
    gameTime.startTimer();
    guessTime.resetTimer();
  };

  // Here we handle changing question on correct guess
  const changeQuestion = () => {
    if (nextQuestion < currentGame.length) {
      setCurrentQuestion(nextQuestion);
      setGuess('');
      setDisabledGameControls(!disabledGameControls);
      setTakeNextQuestion(!takeNextQuestion);
      setFreezeTime(!freezeTime);
      gameTime.startTimer();
    } else {
      setFreezeTime(!freezeTime);
      setEndGame(!endGame);
      gameTime.stopTimer();
    }
  };

  // Here we handle changing question on guessTime running out
  const goNextQuestion = () => {
    // If not on the last question
    if (nextQuestion < currentGame.length) {
      setCurrentQuestion(nextQuestion);
      setGuess('');
      setDisabledGameControls(!disabledGameControls);
      setFreezeTime(!freezeTime);
      guessTime.setTimeEnded(!guessTime.timeEnded);
      guessTime.resetTimer();
      gameTime.startTimer();
    } else {
      setFreezeTime(!freezeTime);
      setEndGame(!endGame);
      gameTime.stopTimer();
    }
  };

  // User click input
  const handleLetterClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    if (target.value === 'Enter') {
      // Check if guess enter has enough letters
      if (guess.length !== currentWord.length) {
        // Trigger shaking animation of boxes
        setErrorCSSClass('error');
        setTimeout(() => {
          setErrorCSSClass('');
        }, 500);
        return;
      }
      // Check if guess matches guess
      if (currentWord === guess) {
        // Calculate score
        setTotalPoints(wordPoints + totalPoints);
        // Stop timer
        guessTime.stopTimer();
        // Go to next question
        setTakeNextQuestion(!takeNextQuestion);
        return;
      } else {
        // Wrong guess
        // Trigger shaking animation of boxes
        setErrorCSSClass('error');
        setTimeout(() => {
          setErrorCSSClass('');
        }, 500);
      }
    }
    // If backspace remove last letter from guess
    if (target.value === 'Backspace') {
      setGuess((guess) => guess.slice(0, guess.length - 1));
    }
    // Render guess in boxes
    if (guess.length < currentWord.length && target.value.match(/^[A-z]$/)) {
      setGuess((guess) => guess + target.value.toLowerCase());
    }
  };

  // User key input
  useEffect(() => {
    // Allow user input only when ready to take guess (freezeTime === true)
    if (freezeTime) {
      const handleKeyup = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          // Check if guess enter has enough letters
          if (guess.length !== currentWord.length) {
            // Trigger shaking animation of boxes
            setErrorCSSClass('error');
            setTimeout(() => {
              setErrorCSSClass('');
            }, 500);
            return;
          }
          // Check if guess matches guess
          if (currentWord === guess) {
            // Calculate score
            setTotalPoints((prevTotalPoints) => wordPoints + prevTotalPoints);
            // Stop timer
            guessTime.stopTimer();
            // Go to next question
            setTakeNextQuestion(
              (prevTakeNextQuestion) => !prevTakeNextQuestion
            );
            setGuess('');
            return;
          } else {
            // Wrong guess
            // Trigger shaking animation of boxes
            setErrorCSSClass('error');
            setTimeout(() => {
              setErrorCSSClass('');
            }, 500);
            setErrorCSSClass('error');
          }
        }
        // If backspace remove last letter from guess
        if (e.key === 'Backspace') {
          setGuess((prevGuess) => prevGuess.slice(0, prevGuess.length - 1));
        }
        // Render guess in boxes
        if (guess.length < currentWord.length && e.key.match(/^[A-z]$/)) {
          setGuess((prevGuess) => prevGuess + e.key.toLowerCase());
        }
      };

      window.addEventListener('keyup', handleKeyup);
      return () => {
        window.removeEventListener('keyup', handleKeyup);
      };
    }
  }, [
    freezeTime,
    guess,
    currentWord,
    setErrorCSSClass,
    setTotalPoints,
    guessTime.stopTimer,
    setTakeNextQuestion,
    setGuess,
  ]);

  return (
    <GameContext.Provider
      value={{
        gameStarted,
        setGameStarted,
        gameTime,
        totalPoints,
        setTotalPoints,
        currentWord,
        setCurrentWord,
        currentGame,
        setCurrentGame,
        currentQuestion,
        setWordPoints,
        letterPrice,
        wordPoints,
        guess,
        setGuess,
        guessTime,
        disabledGameControls,
        setDisabledGameControls,
        setCurrentQuestion,
        nextQuestion,
        freezeTime,
        setFreezeTime,
        takeNextQuestion,
        setTakeNextQuestion,
        endGame,
        setEndGame,
        errorCSSClass,
        setErrorCSSClass,
        playAnotherGame,
        changeQuestion,
        goNextQuestion,
        handleLetterClick,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
