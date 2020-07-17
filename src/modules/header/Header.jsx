import React from 'react';
import Timer from './Timer';
import resetIcon from './reset.png';

export default function Header(props) {
  const { initializeGames } = props;
  return (
    <div className="minesweeper-header" >
      <Timer startTimer={props.startTimer} />
      <div className="reset-icon" style={{ marginRight: 20, cursor: 'pointer' }} onClick={initializeGames}>
        <img src={resetIcon} width={30} height={30} title={'reset'} />
      </div>
    </div >
  )
}
