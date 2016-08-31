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
const log=log2("app");
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
            <Route path="skilltest" component={pages.SkillTest}/>
            <Route path="signin" component={pages.UserSignIn}/>
            <Route path="signup" component={pages.UserSignUp}/>
            <Route path="deneme" component={pages.Deneme}/>
        </Route>
        <Route path="/" component={AdminLayout}>
            <Route path="adminpanel" component={pages.AdminPanel}>
                <Route path="listofparticipants" component={pages.ListOfParticipants}/>
                <Route path="listofuser" component={pages.UserList}/>
                <Route path="listofstuff" component={pages.StuffList}/>
                <Route path="adminprofile" component={pages.AdminProfile}/>
                <Route path="questionadd" component={pages.QuestionAdd}/>
                <Route path="questionsetdetails" component={pages.QuestionSetDetails}/>
                <Route path="questionlist" component={pages.QuestionList}/>
                <Route path="skilltestreport/:userId" component={pages.SkillTestReport}/>
                <Route path="questiondetail/:questionId" component={pages.QuestionDetail}/>
            </Route>
        </Route>

    </Router>
), document.getElementById('app'))
//perflog(perf);
if(module.hot) {
    module.hot.accept();
}
