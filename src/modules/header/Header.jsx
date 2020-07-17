import React from 'react';
import Timer from './Timer';

export default function Header(props) {
  return (
    <div className="minesweeper-header" >
      {
        props.startTimer ? <Timer /> : null
      }
    </div >
  )
}
