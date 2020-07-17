import React from 'react';
import './Cell.css';
import bombImg from './bomb.png';

export default function Cell(props) {
  const { cell = [], handleClick } = props;

  const handleElementClick = () => {
    handleClick(cell);
  }

  return (
    <div className={`cell-container ${cell.isOpen ? 'cell-open' : ''}`} onClick={handleElementClick}>
      {
        cell.isOpen && !cell.hasMine ? <div>{cell.count ? cell.count : ''}</div> : (
          <>
            {
              cell.hasMine ? <div>
                <img src={bombImg} width={25} />
              </div> : null
            }
          </>
        )
      }
    </div >
  )
}
