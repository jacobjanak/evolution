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

        <p className="stat-header">Oldest (days)</p>
        <p className="stat-value">Plant: {stats.age.plants || 'N/A'}</p>
        <p className="stat-value">Herbivore: {stats.age.herbivores || 'N/A'}</p>
        <p className="stat-value">Carnivore: {stats.age.carnivores || 'N/A'}</p>
        
        <p className="stat-header">Most offspring</p>
        <p className="stat-value">Plant: {stats.offspring.plants || 'N/A'}</p>
        <p className="stat-value">Herbivore: {stats.offspring.herbivores || 'N/A'}</p>
        <p className="stat-value">Carnivore: {stats.offspring.carnivores || 'N/A'}</p>

        <p className="stat-header">Most Kills</p>
        <p className="stat-value">Carnivore: {stats.kills.carnivores || 'N/A'}</p>
        
        <p className="stat-header">Average Terrain</p>
        <p className="stat-value">Herbivores: {Math.round(stats.preference.herbivores) || 'N/A'}</p>
        <p className="stat-value">Carnivores: {Math.round(stats.preference.carnivores) || 'N/A'}</p>

        <p className="stat-header">Average Speed</p>
        <p className="stat-value">Herbivores: {Math.round(stats.speed.herbivores * 10) / 10 || 'N/A'}</p>
        <p className="stat-value">Carnivores: {Math.round(stats.speed.carnivores * 10) / 10 || 'N/A'}</p>
      </div>
    );
  }
}

export default Statistics;
