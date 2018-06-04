import React from 'react';
import './Organism.css';

class Organism extends React.Component {
  render() {
    const { model } = this.props;

    const style = {
      top: model.y + 'px',
      left: model.x + 'px',
      height: model.size + 'px',
      width: model.size + 'px',
      lineHeight: model.size + 'px',
      backgroundColor: model.color
    };

    return (
      <div className="organism" style={style}>
        {model.health}
      </div>
    );
  }
}

export default Organism;