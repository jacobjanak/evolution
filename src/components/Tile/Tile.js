import React from 'react';
import './Tile.css';

class Tile extends React.Component {
  render() {
    const { model, size } = this.props;

    const style = {
      height: size + 'px',
      width: size + 'px',
      backgroundColor: 'rgb(' + (200 - (100 * model.fertility)) + ', 200, 100)'
    }

    return (
      <div className="tile" style={style}></div>
    );
  }
}

export default Tile;
