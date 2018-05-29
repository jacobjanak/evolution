import React from 'react';
import './Actions.css';

class Actions extends React.Component {
  render() {
    return (
      <div id="actions">
        <button className="btn btn-stripe">New world</button>
        <button
          className="btn btn-stripe"
          onClick={() => {
            this.props.spawn('plants')
          }}>
          Spawn plants
        </button>
        <button
          className="btn btn-stripe"
          onClick={() => {
            this.props.spawn('herbivores')
          }}>
          Spawn herbivores
        </button>
        <button
          className="btn btn-stripe"
          onClick={() => {
            this.props.spawn('carnivores')
          }}>
          Spawn carnivores
        </button>
      </div>
    );
  }
}

export default Actions;
