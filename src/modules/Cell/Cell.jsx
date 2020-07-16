import React from 'react';
import './Cell.css';

export default function Cell(props) {
  const { cell = [] } = props;
  // console.log(cell);

  const handleHover = () => {
    console.log(cell)
  }
  return (
    <div className='cell-container' onMouseEnter={handleHover}>
    </div>
  )
}
