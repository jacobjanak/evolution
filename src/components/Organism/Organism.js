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

    let text;
    if (model.size > 10) text = Math.ceil(model.health);
    else if (model.size > 7) text = Math.ceil(model.health / 10);
    else text = '';

    // organisms shouldn't exist if health is 0 but this is a precaution
    return model.health > 0 ? (
      <div
        className="organism"
        onMouseEnter={() => spotlight(model)}
        onMouseLeave={() => spotlight(false)}
        style={style}
      >
        {text}
      </div>
    ) : null;
  }
}

export default Organism;
