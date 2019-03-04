import React from 'react';
import { statistics } from '../../utils';
import './Statistics.css';

class Statistics extends React.Component {
  render() {
    const { plants, herbivores, carnivores } = this.props;

    const stats = statistics(plants, herbivores, carnivores);
    
    return (
      <div>
        <p className="stat-header">Population</p>
        <p className="stat-value">Plants: {stats.count.plants}</p>
        <p className="stat-value">Herbivores: {stats.count.herbivores}</p>
        <p className="stat-value">Carnivores: {stats.count.carnivores}</p>

        <p className="stat-header">Terrain</p>
        <p className="stat-value">Herbivores: {Math.round(stats.preference.herbivores) || 'N/A'}</p>
        <p className="stat-value">Carnivores: {Math.round(stats.preference.carnivores) || 'N/A'}</p>
      </div>
    );
  }
}

export default Statistics;
