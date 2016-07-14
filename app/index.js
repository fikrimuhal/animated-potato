import './css/base';
import { Router, Route, browserHistory } from 'react-router';
import Interview from './components/Application/Pages/Interview';
import SingUp from './components/Application/Pages/SingUp'
import SingIn from './components/Application/Pages/SingIn'
import MainLayout from './MainLayout'
import ApplicationForm from './components/Application/Pages/ApplicationForm'
import CompetenceForm from './components/Application/Pages/CompetenceForm'
import Questions from './components/Application/Pages/Questions'
import TestOver from './components/Application/Pages/TestOver'




import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application';

if (module.hot) {
    module.hot.accept();
}
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>

        <Route path="interview" component={Interview}>
          <Route path="singup" component={SingUp}/>
          <Route path="singin" component={SingIn}/>
          <Route path="applicationform" component={ApplicationForm}/>

        </Route>
        <Route path="competenceform" component={CompetenceForm}/>
        <Route path="questions" component={Questions}/>



    </Route>

  </Router>
), document.getElementById('app'))
