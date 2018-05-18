import React from 'react';
import './World.css';

// models
import TileModel from '../../models/Tile'
import HerbivoreModel from '../../models/Herbivore'

// components
import Menu from '../Menu';
import Settings from '../Settings';
import Tile from '../Tile';
import Organism from '../Organism';

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
    // const newHerbivores = this.spawn(HerbivoreModel, 20, props.settings);
    // this.state.herbivores = this.state.herbivores.concat(newHerbivores);
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
            return <Tile model={tile} settings={settings} key={i} />
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
