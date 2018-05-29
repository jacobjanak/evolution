import React from 'react';
import World from '../World';
import Menu from '../Menu';
import defaultSettings from '../../settings';
import { spawn, updateTiles } from '../../utils';

// global variables
let i;

class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      settings: defaultSettings,
      tiles: []
    };

    this.changeSettings = this.changeSettings.bind(this);
  }

  changeSettings(newSettings) {
    this.setState({ settings: newSettings })
    this.updateTileCount()
  }

  updateTileCount() {
    const updatedTiles = updateTiles(this.state.tiles, this.state.settings);
    if (updateTiles) this.setState({ tiles: updatedTiles });
  }

  componentWillMount() {
    this.updateTileCount()
  }

  render() {
    return (
      <div id="game">
        <Menu settings={this.state.settings} changeSettings={this.changeSettings} />
        <World settings={this.state.settings} tiles={this.state.tiles} />
      </div>
    );
  }
}

export default Game;
