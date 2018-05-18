import React from 'react';
import World from '../World';
import Settings from '../Settings/';
import defaultSettings from '../../settings';
import TileModel from '../../models/Tile';
import spawn from '../../utils/spawn';

// global variables
let i;

class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      settings: defaultSettings,
      tiles: []
    };
  }

  changeSetting = (action, value) => {
    if (value.length > 0) {
      if (action === 'world-height') {
        const newSettings = this.state.settings;
        newSettings.world.height = Number(value);
        this.setState(newSettings);
      }
      else if (action === 'world-width') {
        const newSettings = this.state.settings;
        newSettings.world.width = Number(value);
        this.setState({ settings: newSettings });
      }
    }

    this.updateTileCount()
  }

  updateTileCount() {
    const { height, width } = this.props.settings.world;

    const existing = this.state.tiles.length;
    const needed = height * width;

    if (existing !== needed) {
      const difference = needed - existing;
      let tiles = this.state.tiles;

      if (difference > 0) {
        const newTiles = spawn(TileModel, difference);
        tiles = tiles.concat(newTiles)
      }

      else if (difference < 0) {
        //NOTE: make this fancier so that tiles stay in the same place
        tiles.length = needed;
      }

      this.setState({ tiles: tiles })
    }
  }

  componentWillMount() {
    this.updateTileCount()
  }

  render() {
    return (
      <div id="game">
        <Settings onChange={this.changeSetting} />
        <World settings={this.state.settings} tiles={this.state.tiles} />
      </div>
    );
  }
}

export default Game;
