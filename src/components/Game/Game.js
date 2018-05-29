import React from 'react';
import Menu from '../Menu';
import Tile from '../Tile';
import Organism from '../Organism';
import defaultSettings from '../../settings';
import { spawn, feed, reproduce, move, updateTiles } from '../../utils';
import './Game.css';

// global variables
let i;

class Game extends React.Component {
  constructor() {
    super()

    this.state = {
      settings: defaultSettings,
      tiles: [],
      plants: [],
      herbivores: [],
      carnivores: []
    };

    this.changeSettings = this.changeSettings.bind(this);
    this.spawn = this.spawn.bind(this);
    this.cycle = this.cycle.bind(this);
  }

  componentWillMount() {
    this.updateTileCount()
  }

  updateTileCount() {
    const updatedTiles = updateTiles(this.state.tiles, this.state.settings);
    if (updatedTiles) this.setState({ tiles: updatedTiles });
  }

  changeSettings(newSettings) {
    this.setState({ settings: newSettings })
    this.updateTileCount()
  }

  spawn(organism) {
    let { plants, herbivores, carnivores, settings } = this.state;

    if (organism === 'plants') {
      plants = spawn.plants(settings.plant.spawnCount, plants, settings);
      this.setState({ plants: plants })
    }
    else if (organism === 'herbivores') {
      herbivores = spawn.herbivores(settings.herbivore.spawnCount, herbivores, settings);
      this.setState({ herbivores: herbivores })
    }
    else if (organism === 'carnivores') {
      carnivores = spawn.carnivores(settings.carnivore.spawnCount, carnivores, settings);
      this.setState({ carnivores: carnivores })
    }
  }

  cycle() {
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
      <div id="game">
        <Menu
          settings={this.state.settings}
          changeSettings={this.changeSettings}
          spawn={this.spawn}
        />

        <div id="world" style={style}>
          {tiles.map((tile, i) => <Tile model={tile} size={settings.tile.size} key={i} />)}
          {organisms.map((organism, i) => <Organism model={organism} key={i} />)}
        </div>

        <div onClick={this.cycle}>Next Cycle</div>
      </div>
    );
  }
}

export default Game;
