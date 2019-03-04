import React from 'react';
import './Actions.css';

class Actions extends React.Component {
  render() {
    return (
      <div id="actions">
        <button
          className="btn btn-stripe"
          onClick={this.props.newWorld}>
          New world
        </button>
        <button
          className="btn btn-stripe"
          onClick={() => {
            this.props.spawn('plants')
          }}>
          Spawn plant
        </button>
        <button
          className="btn btn-stripe"
          onClick={() => {
            this.props.spawn('herbivores')
          }}>
          Spawn herbivore
        </button>
        <button
          className="btn btn-stripe"
          onClick={() => {
            this.props.spawn('carnivores')
          }}>
          Spawn carnivore
        </button>
      </div>
    );
  }
}

export default Actions;
