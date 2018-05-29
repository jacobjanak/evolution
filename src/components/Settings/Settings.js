import React from 'react';
import './Settings.css';

class Settings extends React.Component {
  render() {
    const { settings, changeSettings } = this.props;

    return (
      <div id="settings">

        {/* World Dimensions */}
        <h3 className="input-header">World Dimensions</h3>
        <div className="input-container">
          <input
            id="world-height"
            type="number"
            min="1" max="100"
            value={settings.world.height}
            onChange={(event) => {
              settings.world.height = event.target.value;
              changeSettings(settings)
            }}
          />
          <label htmlFor="world-height">Height</label>
        </div>
        <div className="input-container">
          <input
            id="world-width"
            type="number"
            min="1" max="100"
            value={settings.world.width}
            onChange={(event) => {
              settings.world.width = event.target.value;
              changeSettings(settings)
            }}
          />
          <label htmlFor="world-width">Width</label>
        </div>
        {/* End World Dimensions */}

        {/* Sizes */}
        <h3 className="input-header">Sizes</h3>
        <div className="input-container">
          <input
            id="tile-size"
            type="number"
            min="20" max="1000"
            value={settings.tile.size}
            onChange={(event) => {
              settings.tile.size = event.target.value;
              changeSettings(settings)
            }}
          />
          <label htmlFor="tile-size">Tiles</label>
        </div>
        <div className="input-container">
          <input
            id="plant-size"
            type="number"
            min="1" max="100"
            value={settings.plant.size}
            onChange={(event) => {
              settings.plant.size = event.target.value;
              changeSettings(settings)
            }}
          />
          <label htmlFor="plant-size">Plants</label>
        </div>
        <div className="input-container">
          <input
            id="herbivore-size"
            type="number"
            min="1" max="100"
            value={settings.herbivore.size}
            onChange={(event) => {
              settings.herbivore.size = event.target.value;
              changeSettings(settings)
            }}
          />
          <label htmlFor="herbivore-size">Herbivores</label>
        </div>
        <div className="input-container">
          <input
            id="carnivore-size"
            type="number"
            min="1" max="100"
            value={settings.carnivore.size}
            onChange={(event) => {
              settings.carnivore.size = event.target.value;
              changeSettings(settings)
            }}
          />
          <label htmlFor="herbivore-size">Carnivores</label>
        </div>
        {/* End Sizes */}

        {/* Hunger Loss */}
        <h3 className="input-header">Hunger Loss</h3>
        <div className="input-container">
          <input
            id="herbivore-hunger-loss"
            type="number"
            min="0" max="100"
            value={settings.herbivore.healthLoss}
            onChange={(event) => {
              settings.herbivore.healthLoss = event.target.value;
              changeSettings(settings)
            }}
          />
          <label htmlFor="herbivore-hunger-loss">Herbivores</label>
        </div>
        <div className="input-container">
          <input
            id="carnivore-hunger-loss"
            type="number"
            min="0" max="100"
            value={settings.carnivore.healthLoss}
            onChange={(event) => {
              settings.carnivore.healthLoss = event.target.value;
              changeSettings(settings)
            }}
          />
          <label htmlFor="carnivore-hunger-loss">Carnivores</label>
        </div>
        {/* End Hunger Loss */}

        {/* Reproduction Rate */}
        <h3 className="input-header">Reproduction Rate</h3>
        <div className="input-container">
          <input
            id="herbivore-reproduction"
            type="number"
            min="1" max="1000"
            value={settings.herbivore.reproduction}
            onChange={(event) => {
              settings.herbivore.reproduction = event.target.value;
              changeSettings(settings)
            }}
          />
          <label htmlFor="herbivore-reproduction">Herbivores</label>
        </div>
        <div className="input-container">
          <input
            id="carnivore-reproduction"
            type="number"
            min="1" max="1000"
            value={settings.carnivore.reproduction}
            onChange={(event) => {
              settings.carnivore.reproduction = event.target.value;
              changeSettings(settings)
            }}
          />
          <label htmlFor="carnivore-reproduction">Carnivores</label>
        </div>
        {/* End Reproduction Rate */}

      </div>
    );
  }
}

export default Settings;
