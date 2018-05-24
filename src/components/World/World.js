import React from 'react';
import Tile from '../Tile';
import Organism from '../Organism';
import { spawn, feed, reproduce, move } from '../../utils';
import './World.css';


class World extends React.Component {
  constructor(props) {
    super()

    const plants = spawn.plants(200, [], props.settings);
    const herbivores = spawn.herbivores(200, [], props.settings);
    const carnivores = spawn.carnivores(5, [], props.settings);

    this.state = {
      plants: plants,
      herbivores: herbivores,
      carnivores: carnivores
    };
  }

  // a cycle is one unit of time in the simulation
  cycle = () => {
    setInterval(() => {
      const { settings, tiles } = this.props;
      let { plants, herbivores, carnivores } = this.state;

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
