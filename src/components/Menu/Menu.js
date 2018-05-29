import React from 'react';
import Settings from '../Settings';
import './Menu.css';

class Menu extends React.Component {
  constructor() {
    super()

    this.state = {
      activeItem: false
    };
  }

  activate(item) {
    if (item === this.state.activeItem) {
      this.setState({ activeItem: false })
    } else {
      this.setState({ activeItem: item })
    }
  }

  render() {
    const { settings, changeSettings } = this.props;
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
          <Settings settings={settings} changeSettings={changeSettings} />
        </div>
        <button
        className={activeItem === 'actions' ? 'collapsible active' : 'collapsible'}
        onClick={() => this.activate('actions')}>
          Actions
        </button>
        <div className="content">

        </div>
      </nav>
    );
  }
}

export default Menu;
