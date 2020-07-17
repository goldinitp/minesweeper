import React from 'react'

export default function Header(props) {
  return (
    <div className="minesweeper-header" >Header
      Cells to explore: { props.opencells}
    </div >
  )
}
