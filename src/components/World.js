import React from 'react';
import Tile from './Tile';
import Herbivore from './Herbivore';
import settings from '../settings';
import Settings from './Settings';

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

    return (
      <div>
        <Settings onChange={handleSettingChange} />
        <div id="world" style={style}>
          { this.state.tiles.map((tile, i) => <Tile key={i} />) }
          <Herbivore />
        </div>
      </div>
    );
  }
}

export default World;
