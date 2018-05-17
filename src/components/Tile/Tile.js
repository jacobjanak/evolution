import React from 'react';
import './Tile.css';

class Tile extends React.Component {
  render() {
    const { model, settings } = this.props;

    const style = {
      height: settings.tile.size + 'px',
      width: settings.tile.size + 'px',
      backgroundColor: 'rgb(' + (200 - (100 * model.fertility)) + ', 200, 100)'
    }

    return (
      <div className="tile" style={style}></div>
    );
  }
}

export default Tile;
