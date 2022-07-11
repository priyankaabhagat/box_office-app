import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navs from './components/Navs';
import Home from './Pages/Home';
import Starred from './Pages/Starred';

function App() {
  return (
    <div>
      <Navs />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        {/* Below sytnax, is to define the another route */}
        <Route exact path="/starred">
          {/* This is Starred */}
          <Starred />
        </Route>

        {/* Below sytnax, is to define the default/undefined route. */}

        <Route>
          <div>404 ERROR.PAGE NOT FOUND.</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
