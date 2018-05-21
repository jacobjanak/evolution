import React from 'react';
import Tile from '../Tile';
import Organism from '../Organism';
import PlantModel from '../../models/Plant'
import HerbivoreModel from '../../models/Herbivore'
import CarnivoreModel from '../../models/Carnivore'
import { spawn, feed, reproduce } from '../../utils';
import './World.css';


class World extends React.Component {
  constructor(props) {
    super()

    this.state = {
      plants: [],
      herbivores: [],
      carnivores: []
    };

    //NOTE: this won't be here
    const newPlants = spawn(PlantModel, 20, props.settings);
    this.state.plants = this.state.plants.concat(newPlants);

    //NOTE: this won't be here
    const newHerbivores = spawn(HerbivoreModel, 20, props.settings);
    this.state.herbivores = this.state.herbivores.concat(newHerbivores);

    //NOTE: this won't be here
    const newCarnivores = spawn(CarnivoreModel, 5, props.settings);
    this.state.carnivores = this.state.carnivores.concat(newCarnivores);
  }

  /* a cycle is one unit of time in the simulation */
  cycle = () => {
    setInterval(() => {
      const { settings, tiles } = this.props;
      let { plants, herbivores, carnivores } = this.state;

      plants = feed.plants(plants, tiles, settings);
      plants = reproduce.plants(plants, settings);

      this.setState({
        plants: plants
      })
    }, 100)

    // 2. reproducePlants()
    // 1. feedPlants()
    // 3. moveHerbivores()
    // feedHerbivores()
    // 4. reproduceHerbivores()
    // 3. moveCarnivores()
    // feedCarnivores()
    // reproduceCarnivores()
    // updateDOM()
    // updateStatistics()
  }

  render() {
    const { settings, tiles } = this.props;
    const { plants, herbivores, carnivores } = this.state;

    // creating one array for more DRY code
    const organisms = [].concat(plants, herbivores, carnivores);

    const style = {
      height: settings.world.height * settings.tile.size + 'px',
      width: settings.world.width * settings.tile.size + 'px'
    };

    return (
      <div id="world" style={style}>

        { /* spawning tiles */
          tiles.map((tile, i) => {
            return <Tile model={tile} size={settings.tile.size} key={i} />
          })
        }

        { /* spawning organisms */
          organisms.map((organism, i) => {
            return <Organism model={organism} key={i} />
          })
        }

        <div onClick={this.cycle}>Next Cycle</div>

      </div>
    );
  }
}

export default World;
