import React, { Component } from 'react';
import './Spotlight.css';

class Spotlight extends Component {
  render() {
    const { organism } = this.props;

    return ( 
      <div id="spotlight">
        <p className="stat-value">Type: {organism ? organism.constructor.name : '-'}</p>
        <p className="stat-value">Age (days): {organism.age || '-'}</p>
        {/* <p className="stat-value">Health: {organism.health || '-'}</p> */}
        <p className="stat-value">Terrain: {organism.preference || '-'}</p>
        <p className="stat-value">Size: {organism.size || '-'}</p>
        <p className="stat-value">Speed: {organism.speed || '-'}</p>
        <p className="stat-value">Offspring: {organism.offspring || '-'}</p>
        <p className="stat-value">Kills: {organism.kills || '-'}</p>        
        <p className="stat-header">Hover over organisms to see additional info</p>
      </div>
    );
  }
}
 
export default Spotlight;