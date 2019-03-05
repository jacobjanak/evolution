import React from 'react';
import Statistics from '../Statistics';
import Spotlight from '../Spotlight';
import Settings from '../Settings';
import Actions from '../Actions';
import './Menu.css';

class Menu extends React.Component {
  constructor() {
    super()
    this.state = { activeItem: 'actions' };
  }

  activate(item) {
    this.setState({
      activeItem: item === this.state.activeItem ? false : item
    })
  }

  render() {
    const { activeItem } = this.state;
    const {
      plants, 
      herbivores, 
      carnivores, 
      settings, 
      changeSettings, 
      spawn, 
      newWorld, 
      spotlight,
    } = this.props;

    return (
      <nav className="menu">

        {/* Settings */}
        <button
        className={activeItem === 'settings' ? 'collapsible active' : 'collapsible'}
        onClick={() => this.activate('settings')}>
          Settings
        </button>
        <div className="content">
          <Settings changeSettings={changeSettings} settings={settings} />
        </div>

        {/* Statistics */}
        <button
        className={activeItem === 'statistics' ? 'collapsible active' : 'collapsible'}
        onClick={() => this.activate('statistics')}>
          Statistics
        </button>
        <div className="content">
          <Statistics
            changeSettings={changeSettings}
            settings={settings}
            plants={plants}
            herbivores={herbivores}
            carnivores={carnivores}
          />
        </div>

        {/* Spotlight */}
        <button
        className={activeItem === 'spotlight' ? 'collapsible active' : 'collapsible'}
        onClick={() => this.activate('spotlight')}>
          Spotlight
        </button>
        <div className="content">
          <Spotlight organism={spotlight} />
        </div>

        {/* Actions */}
        <button
        className={activeItem === 'actions' ? 'collapsible active' : 'collapsible'}
        onClick={() => this.activate('actions')}>
          Actions
        </button>
        <div className="content">
          <Actions spawn={spawn} newWorld={newWorld} />
        </div>

      </nav>
    );
  }
}

export default Menu;
