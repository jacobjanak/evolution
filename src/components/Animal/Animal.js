import React from 'react';
import Organism from '../Organism';

class Animal extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Organism className={this.props.className || ''} />
    );
  }
}

export default Animal;
