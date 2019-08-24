import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { DialoguePage } from './patterns/pages/dialogue-page/dialogue-page';
import { ImpressumPage } from './patterns/pages/impressum-page/impressum-page';

import './index.scss';

const routing = (
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={DialoguePage} />
        <Route path="/impressum" component={ImpressumPage} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
