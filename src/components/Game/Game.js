import React from 'react';
import World from '../World';
import Settings from '../Settings/';
import TileModel from '../../models/Tile';
import defaultSettings from '../../settings';

// global variables
let i;

class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      settings: defaultSettings,
      tiles: []
    };
    this.changeSetting = this.changeSetting.bind(this);
  }

  spawn(Model, count, settings = {}) {
    const spawned = [];
    for (i = 0; i < count; i++) {
      spawned.push(new Model(settings))
    }
    return spawned;
  }

  changeSetting(action, value) {
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
        const newTiles = this.spawn(TileModel, difference);
        tiles = tiles.concat(newTiles)
      }

      else if (difference < 0) {
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
