import React from 'react';
import Timer from '../Timer/Timer';
import resetIcon from './redo.svg';
import inputIcon from './input.svg';
import './header.css';

export default function Header(props) {
  const { initializeGames, handleInput } = props;

  return (
    <>
      <h2 className="mine-header">Mine Sweeper</h2>
      <div className="minesweeper-header" >
        <Timer startTimer={props.startTimer} />
        <div className="reset-icon" style={{ marginRight: 20, cursor: 'pointer' }} onClick={handleInput}>
          <img src={inputIcon} width={30} height={30} title={'user input'} alt={'user input'} />
        </div>
        <div className="reset-icon" style={{ marginRight: 20, cursor: 'pointer' }} onClick={initializeGames}>
          <img src={resetIcon} width={30} height={30} title={'reset'} alt={'reset'} />
        </div>
      </div >
    </>
  )
}
