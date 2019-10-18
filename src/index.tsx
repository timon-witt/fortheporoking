import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { DialoguePage } from './patterns/pages/dialogue-page/dialogue-page';

import './index.scss';
import { impressumScene } from './patterns/organisms/impressum-scene/impressum-scene';

const routing = (
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={DialoguePage} />
        <Route path="/impressum" render={() => <DialoguePage dialogueScene={impressumScene} />} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
