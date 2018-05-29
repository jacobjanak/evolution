import React from 'react';
import Game from '../../components/Game/';
import Settings from '../../components/Settings/';
import defaultSettings from '../../settings';

class Home extends React.Component {
  constructor() {
    super()
    this.state = defaultSettings;
  }

  render() {
    return (
      <div>
        <Game settings={this.state} />
      </div>
    );
  }
};

export default Home;
