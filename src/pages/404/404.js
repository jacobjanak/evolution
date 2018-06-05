import React from "react";

const style = {
  textAlign: 'center',
  fontSize: '32px'
};

const NoMatch = () => (
  <div>
    <h1 id="error-message" style={style}>Page Not Found</h1>
  </div>
);

export default NoMatch;
