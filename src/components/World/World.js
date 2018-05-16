import React from 'react';
import Menu from '../Menu';
import Settings from '../Settings';
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

    // make tiles
    const worldArea = this.state.height * this.state.width;
    for (i = 0; i < worldArea; i++) {
      this.state.tiles.push(<Tile />)
    }

    return (
      <div>
        <Settings onChange={handleSettingChange} />
        <div id="world" style={style}>
          { this.state.tiles.map((tile, i) => <Tile settings={settings} key={i} />) }

        </div>
      </div>
    );
  }
}

export default World;
