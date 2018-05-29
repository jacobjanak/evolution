import React from 'react';
import Menu from '../Menu';
import Tile from '../Tile';
import Organism from '../Organism';
import defaultSettings from '../../settings';
import { spawn, feed, reproduce, move, updateTiles } from '../../utils';
import './World.css';

// global variables
let i;

class Game extends React.Component {
  constructor() {
    super()

    const plants = spawn.plants(200, [], defaultSettings);
    const herbivores = spawn.herbivores(200, [], defaultSettings);
    const carnivores = spawn.carnivores(5, [], defaultSettings);

    this.state = {
      settings: defaultSettings,
      tiles: [],
      plants: plants,
      herbivores: herbivores,
      carnivores: carnivores
    };

    this.changeSettings = this.changeSettings.bind(this);
  }

  changeSettings(newSettings) {
    this.updateTileCount()
    this.setState({ settings: newSettings })
  }

  updateTileCount() {
    const updatedTiles = updateTiles(this.state.tiles, this.state.settings);
    if (updatedTiles) this.setState({ tiles: updatedTiles });
  }

  componentWillMount() {
    this.updateTileCount()
  }

  cycle = () => {
    setInterval(() => {
      let { settings, tiles, plants, herbivores, carnivores } = this.state;

      plants = reproduce.plants(plants, settings);
      plants = feed.plants(plants, tiles, settings);
      herbivores = move(herbivores, tiles, settings);
      ({ herbivores, plants } = feed.herbivores(herbivores, plants, settings));
      herbivores = reproduce.herbivores(herbivores, settings);
      carnivores = move(carnivores, tiles, settings);
      ({ carnivores, herbivores } = feed.carnivores(carnivores, herbivores, settings));
      carnivores = reproduce.carnivores(carnivores, settings);

      this.setState({
        plants: plants,
        herbivores: herbivores,
        carnivores: carnivores
      })
    }, 100)
  }

  render() {
    const { settings, tiles, plants, herbivores, carnivores } = this.state;
    const organisms = [].concat(plants, herbivores, carnivores);

    const style = {
      height: settings.world.height * settings.tile.size + 'px',
      width: settings.world.width * settings.tile.size + 'px'
    };

    return (
      <div id="game world" style={style}>
        <Menu settings={this.state.settings} changeSettings={this.changeSettings} />

        {tiles.map((tile, i) => <Tile model={tile} size={settings.tile.size} key={i} />)}
        {organisms.map((organism, i) => <Organism model={organism} key={i} />)}

        <div onClick={this.cycle}>Next Cycle</div>
      </div>
    );
  }
}

export default Game;
