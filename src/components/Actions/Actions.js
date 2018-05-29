import React from 'react';
import './Actions.css';

class Actions extends React.Component {
  render() {
    return (
      <div id="actions">
        <button id="new-world" className="btn btn-stripe">New world</button>
        <button id="spawn-plant" className="btn btn-stripe">Spawn plants</button>
        <button id="spawn-herbivore" className="btn btn-stripe">Spawn herbivores</button>
        <button id="spawn-carnivore" className="btn btn-stripe">Spawn carnivores</button>
      </div>
    );
  }
}

export default Actions;
