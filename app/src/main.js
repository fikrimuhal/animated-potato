import './assets/css/base';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {log2} from './utils/'
import * as pages from './pages/'
import {AdminLayout,MainLayout,MainLayoutAuthenticated,InterviewLayout}   from './layouts/'
import perf from "react-addons-perf";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const log = log2("app");
const perflog = log2("performance");
perflog(perf);
// setTimeout(function () {
//   perflog("started");
//   //perf.start();
// },2000)
// setTimeout(function () {
//     // perf.stop();
//     // const measurements = perf.getLastMeasurements();
//     // perflog("inclusive");
//     // perf.printInclusive(measurements);
//     // perflog("exclusive");
//     // perf.printExclusive(measurements);
//     // perflog("wasted");
//     // perf.printWasted(measurements)
// }, 10000)

if (module.hot) {
    module.hot.accept();
    //log("pages",pages);
}
ReactDOM.render((

  <Router history={browserHistory}>
      <Route path="/" component={MainLayoutAuthenticated} >
              <IndexRoute component={pages.UserHome}/>
              <Route path="home" component={pages.UserHome} />
          <Route path="interview" component={pages.Interview} >
              <Route path="applicationform" component={pages.ApplyForm}/>
              <Route path="detailssaved/::userId" component={pages.ApplyCompleted}/>
              <Route path="questions/:userId" component={pages.QuestionList}/>
              <Route path="testover" component={pages.TestCompleted}/>
              <Route path="skilltest/:userId" component={pages.SkillTest}/>
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
                <Route path="questionlist" component={pages.QuestionList}></Route>
          </Route>
        <Route path="deneme" component={pages.Deneme} />
      </Route>
      <Route path="/" component={MainLayout} >
        <IndexRoute component={pages.Home}/>
        <Route path="signin" component={pages.UserSignIn}/>
        <Route path="signup" component={pages.UserSignUp}/>
      </Route>
  </Router>
), document.getElementById('app'))
