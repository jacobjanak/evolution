import React from 'react';
import Settings from '../Settings';
import './Menu.css';

class Menu extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <nav id="menu">
        <Settings />
      </nav>
    );
  }
}

export default Menu;
