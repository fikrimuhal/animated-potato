
import './css/base';
import { Router, Route, browserHistory } from 'react-router'
import Interview from './components/Application/Interview'
import Uyeol from './components/Application/Uyeol'


import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application';


if (module.hot) {
    module.hot.accept();
}
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Application}/>
        <Route path="interview" component={Interview}>
          <Route path="uyeol" component={Uyeol}/>
        </Route>

  </Router>
), document.getElementById('app'))
