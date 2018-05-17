import React from 'react';
import Menu from '../Menu';
import Settings from '../Settings';
import Tile from '../Tile';
import Organism from '../Organism';

import TileModel from '../../models/Tile'
import HerbivoreModel from '../../models/Herbivore'

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
      plants: [],
      herbivores: [],
      carnivores: []
    };

    const newHerbivores = this.spawn(HerbivoreModel, 20);
    this.state.herbivores = this.state.herbivores.concat(newHerbivores);
  }

  updateTileCount() {
    const existingTiles = this.state.tiles.length;
    const tilesNeeded = this.state.height * this.state.width;

    const difference = tilesNeeded - existingTiles;
    if (difference > 0) {
      for (i = 0; i < difference; i++) {
        this.state.tiles.push(new TileModel())
      }
    }
    else if (difference < 0) {
      this.state.tiles.length = tilesNeeded;
    }
  }

  spawn(Model, count) {
    const spawned = [];
    for (i = 0; i < count; i++) {
      spawned.push(new Model(settings))
    }
    return spawned;
  }

  render() {
    const { tiles, plants, herbivores, carnivores } = this.state;

    const style = {
      height: this.state.height * settings.tile.size + 'px',
      width: this.state.width * settings.tile.size + 'px'
    };

    const changeSetting = (action, value) => {
      switch (action) {
        case 'world-height':
          this.setState({ height: value });
          break;
        case 'world-width':
          this.setState({ width: value })
          break;
        default:
          break;
      }
    }

    const handleSettingChange = (action, value) => {
      if (value.length > 0) {
       changeSetting(action, value);
      }
    };

    // make/remove tiles
    this.updateTileCount()


    console.log(this.state.herbivores)

    return (
      <div>
        <Settings onChange={handleSettingChange} />
        <div id="world" style={style}>

          { this.state.tiles.map((tile, i) => {
            return <Tile model={tile} settings={settings} key={i} />
          })}

          { this.state.herbivores.map((herbivore, i) => {
            return <Organism model={herbivore} key={i} />
          })}

        </div>
      </div>
    );
  }
}

export default World;
