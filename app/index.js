import './css/base';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Interview from './components/Application/Pages/Interview';
import MainLayout from './MainLayout';
import ApplicationForm from './components/Application/Pages/ApplicationForm';
import Questions from './components/Application/Pages/Questions';
import TestOver from './components/Application/Pages/TestOver';
import InterviewLayout from './components/Application/Pages/InterviewLayout';
import DetailsSaved from './components/Application/Pages/DetailsSaved';
import Questions2 from './components/Application/Pages/Questions2';
import Questions3 from './components/Application/Pages/Questions3';
import AdminPanel from './components/Application/Pages/AdminPanel';
import AdminSingIn from './components/Application/Pages/AdminSingIn';
import AdminSingUp from './components/Application/Pages/AdminSingUp';
import UsersProfile from './components/Application/Pages/UsersProfile';
import QuestionSee from './components/Application/Pages/QuestionSee';
import AdminProfile from './components/Application/Pages/AdminProfile';
import ListOfParticipants from './components/Application/Pages/ListOfParticipants';
import QuestionAdd from './components/Application/Pages/QuestionAdd';
import QuestionSetDetails from './components/Application/Pages/QuestionSetDetails'
import QuestionSetAdd from './components/Application/Pages/QuestionSetAdd'


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
        </Route>

        <Route path="questions" component={Questions}/>
        <Route path="questions2" component={Questions2}/>
        <Route path="questions3" component={Questions3}/>
        <Route path="testover" component={TestOver}/>

            <Route path="adminsingin" component={AdminSingIn}/>
            <Route path="adminsingup" component={AdminSingUp}/>
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
