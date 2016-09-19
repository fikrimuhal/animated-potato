//core imports
import React            from 'react';
import FlatButton       from 'material-ui/FlatButton';
import NavigateBefore   from 'material-ui/svg-icons/navigation/arrow-back';
import {browserHistory} from 'react-router'
import * as mockApi     from '../../utils/mock_api'
import * as mockData     from '../../utils/mock_data'
import CircularProgress from 'material-ui/CircularProgress';
import log2             from '../../utils/log2'
import * as Cache       from '../../utils/cache'
import * as util        from '../../utils/utils'
import * as s           from '../../layouts/style'

import ReportView       from './ReportViewer'
//consts and variables
const log = log2("SkillTestReportContainer");
var context ={};
export default  class SkillTestReportContainer extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['initializeFromAPI', 'initializeFromCache']);
        this.state = {
            dataWaiting: true
        };
        this.initData();

        //var userId = this.props.params.userId;
        // if(Cache.checkTestResultReportCache(userId))
        //     this.initializeFromCache(userId)
        // else
        //     this.initializeFromAPI(userId)

        //log(this.props);

    }
    getChildContext(){
        context.userId = this.props.params.userId;
        return context;
    };
    initializeFromAPI = function (userId) {
        log("Data from SERVER");
        mockApi.getUserSkillTestReport(userId).then(response=> {
            var data = JSON.parse(response);
            log("data", data);
            this.setState({
                dataWaiting: false,
                data: data
            });
        })
    };
    initializeFromCache = function (userId) {
        log("Data from CACHE");
        var data = Cache.getTestResultReportFromCache(userId);
        data.isValidUser = true;
        this.state = {
            dataWaiting: false,
            data: data
        }
    };
    goToList = function () {
        browserHistory.push("/dashboard/listofparticipants");
    };
    initData = function () {
        var _this = this;
        var dataset = [];
        var categoryScoreInfo = {};
        mockApi.getRadarData().then(json=> {

            // log("received json=>", json);

            var generalScoreInfo = {
                trustRate: Math.floor(Math.random() * 50 + 50),
                score: Math.floor(Math.random() * 80 + 20),
                degree: Math.floor(Math.random() * 50),
                rate: Math.floor(Math.random() * 100)
            };
            var userInfo = {
                name: "Şükrü",
                lastname: "Hasdemir",
                email: "sukru@fikrimuhal.com",
                tel: "+90 539 585 45 12"
            };
            _this.setState({
                categoryScoreInfo: json,
                generalScoreInfo: generalScoreInfo,
                userInfo: userInfo,
                scoreData: mockData.TestResultMockDataCreator.createScoresData(10),
                dataLoaded: true
            })
        });
    };
    createWaitingContent = ()=> {
        return (<div>
            Test result is preparing, please wait...<br/>
            <CircularProgress size={1}/>
        </div>);
    };
    createReport = ()=> {
        return <ReportView categoryScoreInfo={this.state.categoryScoreInfo}
                           generalScoreInfo={this.state.generalScoreInfo} userInfo={this.state.userInfo}
                           scoreData={this.state.scoreData}/>

    };
    getContent = function () {
        //log("getContent", this.state.dataWaiting);
        if (!this.state.dataLoaded)
            return this.createWaitingContent();
        else
            return this.createReport()

    };

    render = ()=> {
        log("rendered");
        return (
            <div>

                <FlatButton label={"Back to list"} icon={<NavigateBefore/>} onClick={this.goToList}></FlatButton>
                <hr/>
                <h5>Participant Skill Test Report</h5>
                {this.getContent()}
            </div>
        )
    }
}

SkillTestReportContainer.childContextTypes = {
    userId: React.PropTypes.number
};