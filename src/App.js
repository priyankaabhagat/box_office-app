import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Navs from './components/Navs';
import Home from './Pages/Home';
import Show from './Pages/Show';
import Starred from './Pages/Starred';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      {/* Below sytnax, is to define the another route */}
      <Route exact path="/starred">
        {/* This is Starred */}
        <Starred />
      </Route>

      <Route exact path="/show/:id">
        <Show />
      </Route>

      {/* Below sytnax, is to define the default/undefined route. */}

      <Route>
        <div>404 ERROR.PAGE NOT FOUND.</div>
      </Route>
    </Switch>
  );
}

export default App;
