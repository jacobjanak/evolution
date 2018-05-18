import React, { Component } from 'react';

export default class Settings extends Component {
  render() {
    const { onChange } = this.props;
    const handleSettingChange = (action, { target }) => onChange(target.name, target.value);
    const renderControlGroup = (name, label) => {
      return (
        <div>
          <input
            id={name}
            name={name}
            type="number"
            onChange={event => handleSettingChange(name, event)}
          />
          <label htmlFor={name}>{label}</label>
        </div>
      );
    };

    return (
      <div>
        <h3 className="input-header">World Dimensions</h3>
        {renderControlGroup('world-height', 'Height')}
        {renderControlGroup('world-width', 'Width')}
      </div>
    );
  }
}

/*
=== REMOVE AFTER CREATING CSS ===
Settings Controls html from Evolution v1:
<h3 class="input-header">World Dimensions</h3>
<div class="input-container">
  <input id="world-height" class="settings" type="number" max="9999" min="1" value="5" />
  <label for="world-height">Height</label>
</div>
<div class="input-container">
  <input id="world-width" class="settings" type="number" max="9999" min="1" value="5" />
  <label for="world-width">Width</label>
</div>
*/
