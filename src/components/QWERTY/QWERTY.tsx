import React from 'react';
import './QWERTY.css';
import { useGameContext } from '../../context/GameContext';

const QWERTY: React.FC = () => {
  const qwerty = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  const { handleLetterClick } = useGameContext();

  return (
    <div className='qwerty-keyboard'>
      {qwerty.map((row, i) => (
        <div
          key={i}
          className='keyboard-row'>
          {row.split('').map((key, i) => (
            <button
              key={i}
              className='keyboard-key'
              onClick={handleLetterClick}
              value={key}>
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className='keyboard-row'>
        <button
          className='keyboard-key delete-key'
          value={'Backspace'}
          onClick={handleLetterClick}>
          ⌫
        </button>
        <button
          className='keyboard-key submit-key'
          value={'Enter'}
          onClick={handleLetterClick}>
          ⏎
        </button>
      </div>
    </div>
  );
};

export default QWERTY;
