import React from 'react';
import Tile from '../Tile';
import Organism from '../Organism';
import PlantModel from '../../models/Plant'
import HerbivoreModel from '../../models/Herbivore'
import spawn from '../../utils/spawn';
import './World.css';

// global variables
let i;

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
  }

  render() {
    const { plants, herbivores, carnivores } = this.state;
    const { settings, tiles } = this.props;

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

        { /* spawning herbivores */
          herbivores.map((herbivore, i) => {
            return <Organism model={herbivore} key={i} />
          })
        }

      </div>
    );
  }
}

export default World;
