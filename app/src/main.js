import './assets/css/base';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {log2} from './utils/'
import * as pages from './pages/'
import {AdminLayout, DefaultLayout, UserLayout, InterviewLayout}   from './layouts/'
import perf from "react-addons-perf";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const log = log2("app");
//const perflog=log2("performance");
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

//log("pages",pages);
ReactDOM.render((

    <Router history={browserHistory}>
        <Route path="/" component={UserLayout}>
            <IndexRoute component={pages.UserHome}/>
            <Route path="home" component={pages.UserHome}/>
        </Route>

        <Route path="/" component={DefaultLayout}>
            <Route path="interview" component={pages.InterView}/>
            <Route path="Skilltest" component={pages.SkillTest}/>
            <Route path="Signin" component={pages.UserSignIn}/>
            <Route path="Signup" component={pages.UserSignUp}/>
            <Route path="Deneme" component={pages.Deneme}/>
        </Route>
        <Route path="/" component={AdminLayout}>
            <Route path="dashboard" component={pages.AdminPanel}>
                <Route path="ListofParticipants" component={pages.ListOfParticipants}/>
                <Route path="ListOfUser" component={pages.UserList}/>
                <Route path="ListofStaff" component={pages.StaffList}/>
                <Route path="AdminProfile" component={pages.AdminProfile}/>
                <Route path="QuestionAdd" component={pages.QuestionAdd}/>
                <Route path="ListofQuestionSet" component={pages.ListOfQuestionSet}/>
                <Route path="QuestionList" component={pages.QuestionList}/>
                <Route path="SkillTestReport/:userId" component={pages.SkillTestReport}/>
                <Route path="QuestionDetail/:questionId" component={pages.QuestionDetail}/>
                <Route path="initialization" component={pages.Initialization}/>
            </Route>
        </Route>

    </Router>
), document.getElementById('app'))
//perflog(perf);
if (module.hot) {
    module.hot.accept();
}
