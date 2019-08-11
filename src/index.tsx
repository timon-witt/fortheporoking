import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import Nav from './patterns/organisms/nav/nav';
import { ChampionPage } from './patterns/pages/champion-page/champion-page';
import { ImpressumPage } from './patterns/pages/impressum-page/impressum-page';

import './index.scss';

const routing = (
  <Router>
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" component={ChampionPage} />
        <Route path="/impressum" component={ImpressumPage} />
        <Route path="/:filter" component={ChampionPage} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
