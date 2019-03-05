import React, { Component } from 'react';
import './Spotlight.css';

class Spotlight extends Component {
  render() {
    const { organism } = this.props;

    return ( 
      <div id="spotlight">
        <p>{organism.age}</p>
        <p>{organism.health}</p>
      </div>
    );
  }
}
 
export default Spotlight;