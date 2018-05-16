import React from 'react';
import Menu from '../Menu';
import Tile from '../Tile';
import Herbivore from '../Herbivore';
import settings from '../../settings';
import './World.css';

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
    const { tiles, plants, herbivores, carnivores } = this.state;

    const style = {
      height: this.state.height * settings.tile.size + 'px',
      width: this.state.width * settings.tile.size + 'px'
    };

    // <Herbivore settings={settings} genetics={{}} />

    return (
      <div>
        <Menu />
        <div id="world" style={style}>
          { tiles.map((tile, i) => <Tile settings={settings} key={i} />) }

        </div>
      </div>
    );
  }
}

export default World;
