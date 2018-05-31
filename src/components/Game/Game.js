import React from 'react';
import Menu from '../Menu';
import Controls from '../Controls';
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
      playing: false,
      timer: false,
      speed: 1,
      tiles: updateTiles(defaultSettings),
      plants: [],
      herbivores: [],
      carnivores: []
    };

    this.changeSettings = this.changeSettings.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.spawn = this.spawn.bind(this);
    this.newWorld = this.newWorld.bind(this);
    this.cycle = this.cycle.bind(this);
  }

  newWorld() {
    this.setState({
      tiles: [],
      plants: [],
      herbivores: [],
      carnivores: []
    }, this.updateTileCount)
  }

  updateTileCount() {
    const updatedTiles = updateTiles(this.state.settings, this.state.tiles);
    if (updatedTiles) this.setState({ tiles: updatedTiles });
  }

  changeSettings(newSettings) {
    this.setState({ settings: newSettings })
    this.updateTileCount()
  }

  changeSpeed(faster) {
    let { speed, playing } = this.state;

    if (faster) speed = speed * 2;
    else speed = speed / 2;

    this.setState({ speed: speed }, () => {
      // restart timer
      if (playing) this.togglePlay(true);
    })
  }

  togglePlay(restart = false) {
    const { playing, timer } = this.state;

    if (playing || restart) clearInterval(timer);
    if (!playing || restart) this.cycle();

    if (!restart) {
      this.setState({
        playing: playing ? false : true
      })
    }
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
    const timer = setInterval(() => {
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
    }, Math.floor(200 / this.state.speed))

    this.setState({
      timer: timer
    })
  }

  render() {
    const { settings, playing, speed, tiles, plants, herbivores, carnivores } = this.state;
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
          newWorld={this.newWorld}
        />

        <Controls
          playing={playing}
          speed={speed}
          changeSpeed={this.changeSpeed}
          togglePlay={this.togglePlay}
        />

        <div id="world" style={style}>
          {tiles.map((tile, i) => <Tile model={tile} size={settings.tile.size} key={i} />)}
          {organisms.map((organism, i) => <Organism model={organism} key={i} />)}
        </div>
      </div>
    );
  }
}

export default Game;
