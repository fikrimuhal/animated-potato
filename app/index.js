import './css/base';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Interview from './components/Application/Pages/Interview';
import MainLayout from './MainLayout';
import ApplicationForm from './components/Application/Pages/ApplicationForm';
import Questions from './components/Application/Pages/Questions';
import TestOver from './components/Application/Pages/TestOver';
import InterviewLayout from './components/Application/Pages/InterviewLayout';
import DetailsSaved from './components/Application/Pages/DetailsSaved';
import AdminPanel from './components/Application/Pages/AdminPanel';
import SingIn from './components/Application/Pages/SingIn';
import SingUp from './components/Application/Pages/SingUp';
import UsersProfile from './components/Application/Pages/UsersProfile';
import QuestionSee from './components/Application/Pages/QuestionSee';
import AdminProfile from './components/Application/Pages/AdminProfile';
import ListOfParticipants from './components/Application/Pages/ListOfParticipants';
import QuestionAdd from './components/Application/Pages/QuestionAdd';
import QuestionSetDetails from './components/Application/Pages/QuestionSetDetails'
import QuestionSetAdd from './components/Application/Pages/QuestionSetAdd'
import AdminLayout from './components/Application/Pages/AdminLayout';

import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application';

if (module.hot) {
    module.hot.accept();
}
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={InterviewLayout}/>
        <Route path="interview" component={Interview}>
          <Route path="applicationform" component={ApplicationForm}/>
          <Route path="detailssaved" component={DetailsSaved}/>
          <Route path="questions" component={Questions}/>
          <Route path="testover" component={TestOver}/>
        </Route>

        <Route path="adminlayout" component={AdminLayout}>
          <Route path="singin" component={SingIn}/>
          <Route path="singup" component={SingUp}/>
        </Route>

        <Route path="adminpanel" component={AdminPanel}>
            <Route path="listofparticipants" component={ListOfParticipants}/>
            <Route path="usersprofile" component={UsersProfile}/>
            <Route path="adminprofile" component={AdminProfile}/>
            <Route path="questionsee" component={QuestionSee}/>
            <Route path="questionadd" component={QuestionAdd}/>
            <Route path="questionsetdetails" component={QuestionSetDetails}/>
            <Route path="questionsetadd" component={QuestionSetAdd}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))
