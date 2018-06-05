// DEPENDENCIES
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Home from './pages/Home';
import PageNotFound from './pages/404';

//NOTE: routing isn't working on github pages so I'm commenting this out
// MAIN
// const App = () => (
//   <Router>
//     <Switch>
//       <Route exact path='/' component={Home} />
//       {/* this route is for github pages */}
//       <Route exact path='/evolution/' component={Home} />
//       <Route component={PageNotFound} />
//     </Switch>
//   </Router>
// );

const App = () => (
  <Home />
);

export default App;
