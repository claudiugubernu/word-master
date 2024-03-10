import GameScreen from './components/GameScreen/GameScreen';
import StartScreen from './components/StartScreen/StartScreen';
import { useGameContext } from './context/GameContext';

function App() {
  const { gameStarted } = useGameContext();

  return (
    <main className='App'>
      {!gameStarted ? <StartScreen /> : <GameScreen />}
    </main>
  );
}

export default App;
