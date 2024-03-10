import { useGameContext } from '../../context/GameContext';
import './TotalScore.css';
import wallet from '../../assets/images/wallet.png';
const TotalScore = () => {
  const { totalPoints } = useGameContext();

  return (
    <div className='total-score'>
      <img
        src={wallet}
        className='wallet'
        alt='wallet'
      />
      <p className='score'>
        £<span className={totalPoints < 0 ? 'danger' : ''}>{totalPoints}</span>
      </p>
    </div>
  );
};

export default TotalScore;
