// DEPENDENCIES
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Home from './pages/Home';
import PageNotFound from './pages/404';

// MAIN
const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
