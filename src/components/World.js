import React from 'react';
import Tile from './Tile';
import Herbivore from './Herbivore';
import settings from '../settings';

let i, j;

class World extends React.Component {
  constructor() {
    super()

    this.state = {
      height: settings.world.height,
      width: settings.world.width,
      tiles: [],
      herbivores: [],
      carnivores: []
    };

    // make tiles
    for (i = 0; i < this.state.height; i++) {
      for (j = 0; j < this.state.width; j++) {
        this.state.tiles.push(<Tile />)
      }
    }
  }

  render() {
    const style = {
      height: this.state.height * settings.tile.size + 'px',
      width: this.state.width * settings.tile.size + 'px'
    };

    return (
      <div id="world" style={style}>
        { this.state.tiles.map((tile, i) => <Tile key={i} />) }
        <Herbivore />
      </div>
    );
  }
}

export default World;
