import React from 'react';
import random from '../../utils/random';
import settings from '../../settings';
import "./Tile.css";

class Tile extends React.Component {
  constructor() {
    super()

    this.state = {
      fertility: random.randDecimal(2)
    };
  }

  render() {
    const style = {
      height: settings.tile.size + 'px',
      width: settings.tile.size + 'px',
      backgroundColor: 'rgb(' + (200 - (100 * this.state.fertility)) + ', 200, 100)'
    }

    return (
      <div className="tile" style={style}></div>
    );
  }
}

export default Tile;
