import React from 'react';
import Statistics from '../Statistics';
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
    const { settings, changeSettings, spawn, newWorld } = this.props;
    const { activeItem } = this.state;

    return (
      <nav id="menu">

        {/* Statistics */}
        <button
        className={activeItem === 'statistics' ? 'collapsible active' : 'collapsible'}
        onClick={() => this.activate('statistics')}>
          Statistics
        </button>
        <div className="content">
          <Statistics changeSettings={changeSettings} settings={settings} />
        </div>
        {/* End Statistics */}

        {/* Settings */}
        <button
        className={activeItem === 'settings' ? 'collapsible active' : 'collapsible'}
        onClick={() => this.activate('settings')}>
          Settings
        </button>
        <div className="content">
          <Settings changeSettings={changeSettings} settings={settings} />
        </div>
        {/* End Settings */}

        {/* Actions */}
        <button
        className={activeItem === 'actions' ? 'collapsible active' : 'collapsible'}
        onClick={() => this.activate('actions')}>
          Actions
        </button>
        <div className="content">
          <Actions spawn={spawn} settings={settings} newWorld={newWorld} />
        </div>
        {/* End Actions */}

      </nav>
    );
  }
}

export default Menu;
