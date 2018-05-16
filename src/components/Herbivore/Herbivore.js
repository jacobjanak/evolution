import React from 'react';
import Animal from '../Animal';
import random from '../../utils/random';

class Herbivore extends React.Component {
  constructor(props) {
    super()
    const { world, tile } = props.settings;
    const { genetics } = props;

    const randomCoord = (limit) => random.randInt(0, limit - genetics.size);

    if (!genetics.x) genetics.x = randomCoord(world.width * tile.size);
    if (!genetics.y) genetics.y = randomCoord(world.height * tile.size);

    this.state = {
      x: genetics.x || randomCoord(world.width * tile.size),
      y: genetics.y || randomCoord(world.height * tile.size)
    };
  }

  render() {
    const style = {
      top: this.state.y + 'px',
      left: this.state.x + 'px'
    };

    return (
      <Animal className="herbivore" style={style} />
    );
  }
}

export default Herbivore;
