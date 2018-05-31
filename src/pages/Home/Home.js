import React from 'react';
import Game from '../../components/Game/';
import defaultSettings from '../../settings';

class Home extends React.Component {
  constructor() {
    super()
    this.state = defaultSettings;
  }

  render() {
    return (
      <Game settings={this.state} />
    );
  }
};

export default Home;
