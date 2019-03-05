import React from 'react';
import Menu from '../Menu';
import Controls from '../Controls';
import Spotlight from '../Spotlight';
import Tile from '../Tile';
import Organism from '../Organism';
import defaultSettings from '../../settings';
import { spawn, feed, reproduce, move, updateTiles, statistics } from '../../utils';
import './Game.css';


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
      carnivores: [],
      spotlight: false,
    };

    // automatically start game on page load w/ delay
    setTimeout(this.togglePlay, 100);
  }

  newWorld = () => {
    this.setState({
      tiles: [],
      plants: [],
      herbivores: [],
      carnivores: []
    }, this.updateTileCount)
  }

  updateTileCount = () => {
    const updatedTiles = updateTiles(this.state.settings, this.state.tiles);
    if (updatedTiles) this.setState({ tiles: updatedTiles });
  }

  changeSettings = newSettings => {
    this.setState({ settings: newSettings })
    this.updateTileCount()
  }

  changeSpeed = faster => {
    let { speed, playing } = this.state;

    if (faster) speed *= 2;
    else speed /= 2;

    this.setState({ speed: speed }, () => {
      if (playing) this.togglePlay(true);
    })
  }

  togglePlay = (restart = false) => {
    const { playing, timer } = this.state;

    if (playing || restart) clearInterval(timer);
    if (!playing || restart) this.cycle();

    if (!restart) {
      this.setState({
        playing: playing ? false : true
      })
    }
  }

  spawn = organism => {
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

  cycle = () => {
    const time = Math.floor(100 / this.state.speed);
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
    }, time)

    this.setState({
      timer: timer
    })
  }

  spotlight = organism => {
    console.log(organism)
    this.setState({ spotlight: organism })
  }

  render() {
    const { settings, playing, speed, tiles, plants, herbivores, carnivores, spotlight } = this.state;

    const organisms = [].concat(plants, herbivores, carnivores);

    const style = {
      height: settings.world.height * settings.tile.size + 'px',
      width: settings.world.width * settings.tile.size + 'px'
    };

    return (
      <div id="game">
        <Menu
          plants={plants}
          herbivores={herbivores}
          carnivores={carnivores}
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

        <Spotlight organism={spotlight} />

        <div id="world" style={style}>
          {tiles.map((tile, i) => (
            <Tile model={tile} size={settings.tile.size} key={i} />
          ))}
          {organisms.map((organism, i) => (
            <Organism model={organism} spotlight={this.spotlight} key={i} />
          ))}
        </div>
      </div>
    );
  }
}

export default Game;
