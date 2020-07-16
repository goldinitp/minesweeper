import React from 'react';
import Cell from '../Cell/Cell';

export default function Row(props) {
  const { cells } = props;

  const renderCells = cells.map((cell, index) => (
    <Cell
      cell={cell}
      key={index}
    />
  ))

  // console.log('cells', cells);
  return (
    <div className="row-container">
      {renderCells}
    </div>
  )
}
