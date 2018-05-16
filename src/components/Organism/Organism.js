import React from 'react';

class Organism extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    const style = {
      height: this.props.model.size,
      width: this.props.model.size
    };

    return (
      <div style={style}></div>
    );
  }
}

export default Organism;
