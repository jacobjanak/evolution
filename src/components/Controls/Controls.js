import React from 'react';
import './Controls.css';

class Controls extends React.Component {
  render() {
    const { playing, speed, changeSpeed, togglePlay } = this.props;
    const playOrPause = playing ? 'pause' : 'play';

    return (
      <div id="controls-container">
        <div id="controls">
          <span className="control" onClick={() => changeSpeed(false)}>
            <i className="fa fa-backward"></i>
          </span>
          <span className="control" onClick={() => togglePlay(false)}>
            <i className={'fa fa-' + playOrPause}></i>
          </span>
          <span className="control" onClick={() => changeSpeed(true)}>
            <i className="fa fa-forward"></i>
          </span>
        </div>
        <p id="speed">world speed: {speed}x</p>
      </div>
    );
  }
}

export default Controls;
