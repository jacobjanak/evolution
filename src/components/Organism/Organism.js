import React from 'react';
import './Organism.css';

class Organism extends React.Component {
  render() {
    const { model, spotlight } = this.props;

    const style = {
      top: model.y + 'px',
      left: model.x + 'px',
      height: model.size + 'px',
      width: model.size + 'px',
      lineHeight: model.size + 'px',
      backgroundColor: model.color
    };

    // organisms shouldn't exist if health is 0 but this is a precaution
    return model.health > 0 ? (
      <div
        className="organism"
        onMouseEnter={() => spotlight(model)}
        onMouseLeave={() => spotlight(false)}
        style={style}
      >
        {model.size > 10 ? Math.ceil(model.health) : Math.ceil(model.health / 10)}
      </div>
    ) : null;
  }
}

export default Organism;
