import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Recipe from './Recipe';
import CreationPage from './CreationPage';
import EditionPage from './EditionPage';
import Connection from './Connection';

export default function GeneralRouter() {
  return (
    <div>
      <Router>
        <Header />
        <Connection />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/MesRecettes">
            <Recipe />
          </Route>
          <Route exact path="/CreateData">
            <CreationPage />
          </Route>
          <Route exact path="/EditData">
            <EditionPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
