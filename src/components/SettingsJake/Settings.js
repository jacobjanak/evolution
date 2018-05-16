import React from 'react';

class Settings extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <button className="collapsible">Statistics</button>

        <div className="content">

        <h3 className="input-header">World Dimensions</h3>
        <div className="input-container">
          <input id="world-height" className="settings" type="number" max="9999" min="1" value="5" />
          <label htmlFor="world-height">Height</label>
        </div>
        <div className="input-container">
          <input id="world-width" className="settings" type="number" max="9999" min="1" value="5" />
          <label htmlFor="world-width">Width</label>
        </div>

        <h3 className="input-header">Sizes (pixels)</h3>
        <div className="input-container">
          <input id="tile-size" className="settings" type="number" max="9999" min="1" value="100" />
          <label htmlFor="tile-size">Tiles</label>
        </div>
        <div className="input-container">
          <input id="plant-size" className="settings" type="number" max="9999" min="1" value="20" />
          <label htmlFor="plant-size">Plants</label>
        </div>
        <div className="input-container">
          <input id="herbivore-size" className="settings" type="number" max="9999" min="1" value="10" />
          <label htmlFor="herbivore-size">Herbivores</label>
        </div>
        <div className="input-container">
          <input id="carnivore-size" className="settings" type="number" max="9999" min="1" value="10" />
          <label htmlFor="carnivore-size">Carnivores</label>
        </div>

        <h3 className="input-header">Spawn Counts</h3>
        <div className="input-container">
          <input id="plant-count" className="settings" type="number" max="9999" min="1" value="200" />
          <label htmlFor="plant-count">Plants</label>
        </div>
        <div className="input-container">
          <input id="herbivore-count" className="settings" type="number" max="9999" min="1" value="20" />
          <label htmlFor="herbivore-count">Herbivores</label>
        </div>
        <div className="input-container">
          <input id="carnivore-count" className="settings" type="number" max="9999" min="1" value="2" />
          <label htmlFor="carnivore-count">Carnivores</label>
        </div>

        <h3 className="input-header">Reproduction Rates</h3>
        <div className="input-container">
          <input id="plant-reproduction" className="settings" type="number" max="9999" min="1" value="100" />
          <label htmlFor="plant-reproduction">Plants</label>
        </div>
        <div className="input-container">
          <input id="herbivore-reproduction" className="settings" type="number" max="9999" min="1" value="50" />
          <label htmlFor="herbivore-reproduction">Herbivores</label>
        </div>
        <div className="input-container">
          <input id="carnivore-reproduction" className="settings" type="number" max="9999" min="1" value="30" />
          <label htmlFor="carnivore-reproduction">Carnivores</label>
        </div>

        </div>
      </div>
    );
  }
}

export default Settings;
