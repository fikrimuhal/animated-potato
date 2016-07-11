// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
import './css/base';
import { Router, Route, hashHistory } from 'react-router'
import About from './components/Application/About'
import Repos from './components/Application/Repos'
import Deneme from './components/Application/Deneme'


// Some ES6+ features require the babel polyfill
// More info here: https://babeljs.io/docs/usage/polyfill/
// Uncomment the following line to enable the polyfill
// require("babel/polyfill");

import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application';


if (module.hot) {
    module.hot.accept();
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Application}>
        <Route path="repos" component={Repos}/>
        <Route path="about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
