import './Navbar.css';
import Logo from '../Logo/Logo';
import Timer from '../Timer/Timer';
import TotalScore from '../TotalScore/TotalScore';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='left-content'>
        <Timer />
      </div>
      <div className='left-center m-auto'>
        <Logo />
      </div>
      <div className='right-content'>
        <TotalScore />
      </div>
    </div>
  );
};

export default Navbar;
