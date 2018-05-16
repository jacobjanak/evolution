import React from 'react';
import settings from '../../settings';
import random from '../../utils/random';
import './Organism.css';

class Organism extends React.Component {
  constructor(props) {
    super()

    this.state = {};

    if (props.x) {
      this.state.x = props.x
    } else {
      this.state.x = random.randInt(1, settings.world.width * settings.tile.size - props.size)
    }

    if (props.y) {
      this.state.y = props.y
    } else {
      this.state.y = random.randInt(1, settings.world.height * settings.tile.size - props.size)
    }

    // if (!genetics.x) genetics.x = random.randInt(1, setting.world.width * setting.tile.size - this.size);
    // if (!genetics.y) genetics.y = random.randInt(1, setting.world.height * setting.tile.size - this.size);
    // genetics.size = 5;
    // this.state = genetics;
  }

  render() {
    const style = {
      height: this.props.genetics.size,
      width: this.props.genetics.size
    };

    return(
      <div className={(this.props.className || '') + ' organism'} style={style}>Hi</div>
    )
  }
}

export default Organism;
