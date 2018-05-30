// DEPENDENCIES
import React from 'react';
import ReactDOM from 'react-dom';

// COMPONENTS
import App from './App';

// LIB
import registerServiceWorker from './lib/registerServiceWorker';
import './lib/reset.css';

// MAIN CSS
import './style.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
