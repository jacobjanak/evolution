import React from 'react';
import Settings from '../Settings';
import Actions from '../Actions';
import './Menu.css';

class Menu extends React.Component {
  constructor() {
    super()

    this.state = {
      activeItem: false
    };
  }

  activate(item) {
    this.setState({
      activeItem: item === this.state.activeItem ? false : item
    })
  }

  render() {
    const { settings, changeSettings, spawn } = this.props;
    const { activeItem } = this.state;

    return (
      <nav id="menu">
        <button
        className={activeItem === 'statistics' ? 'collapsible active' : 'collapsible'}
        onClick={() => this.activate('statistics')}>
          Statistics
        </button>
        <div className="content">

        </div>
        <button
        className={activeItem === 'settings' ? 'collapsible active' : 'collapsible'}
        onClick={() => this.activate('settings')}>
          Settings
        </button>
        <div className="content">
          <Settings changeSettings={changeSettings} settings={settings} />
        </div>
        <button
        className={activeItem === 'actions' ? 'collapsible active' : 'collapsible'}
        onClick={() => this.activate('actions')}>
          Actions
        </button>
        <div className="content">
          <Actions spawn={spawn} settings={settings} />
        </div>
      </nav>
    );
  }
}

export default Menu;
