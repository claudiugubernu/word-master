import './StartScreen.css';
import LogoNav from '../../assets/images/Logo-nav.png';

const StartScreen = () => {
  return (
    <div className="start-screen">
      <div className="image-wrapper">
        <img src={LogoNav} className='logo' alt='logo game' />
      </div>
      <div className="content-wrapper">
        <div className="button-group align-vertical">
          <button className="button primary">Start Game</button>
          <button className="button secondary">Instructions</button>
        </div>
      </div>
    </div>
  )
}

export default StartScreen