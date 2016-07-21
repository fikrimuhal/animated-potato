import './assets/css/base';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {log2} from './utils/'
import * as pages from './pages/'
import {AdminLayout,MainLayout,InterviewLayout}   from './layouts/'
const log = log2("app")

if (module.hot) {
    module.hot.accept();
    log("pages",pages);
}
ReactDOM.render((

  <Router history={browserHistory}>
      {log("router",pages)}
    <Route path="/" component={MainLayout}>
        <IndexRoute component={InterviewLayout}/>
        <Route path="interview" component={pages.Interview}>
          <Route path="applicationform" component={pages.ApplyForm}/>
          <Route path="detailssaved" component={pages.ApplyCompleted}/>
          <Route path="questions" component={pages.QuestionList}/>
          <Route path="testover" component={pages.TestCompleted}/>
        </Route>

        <Route path="adminlayout" component={AdminLayout}>
          <Route path="singin" component={pages.Login}/>
          <Route path="singup" component={pages.SignUp}/>
        </Route>

        <Route path="adminpanel" component={pages.AdminPanel}>
            <Route path="listofparticipants" component={pages.ListOfParticipants}/>
            <Route path="usersprofile" component={pages.UserProfile}/>
            <Route path="adminprofile" component={pages.AdminProfile}/>
            <Route path="questionsee" component={pages.ViewQuestion}/>
            <Route path="questionadd" component={pages.QuestionAdd}/>
            <Route path="questionsetdetails" component={pages.QuestionSetDetails}/>
            <Route path="questionsetadd" component={pages.NewQuestionSet}/>
        </Route>

    </Route>
  </Router>
), document.getElementById('app'))
