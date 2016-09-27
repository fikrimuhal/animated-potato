//core imports
import React            from 'react';
import FlatButton       from 'material-ui/FlatButton';
import NavigateBefore   from 'material-ui/svg-icons/navigation/arrow-back';
import {browserHistory} from 'react-router'
import * as api         from '../../utils/api'
import * as mockApi     from '../../utils/mock_api'
import * as mockData     from '../../utils/mock_data'
import CircularProgress from 'material-ui/CircularProgress';
import log2             from '../../utils/log2'
import * as Cache       from '../../utils/cache'
import * as util        from '../../utils/utils'
import * as s           from '../../layouts/style'
import * as _           from 'lodash'
import ReportView       from './ReportViewer'
import {MetricAPI}        from '../../utils/metricDB'
//consts and variables
const log = log2("SkillTestReportContainer");
var context = {};
export default  class SkillTestReportContainer extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['initializeFromAPI', 'initializeFromCache']);
        this.state = {
            dataWaiting: true,
            comparativeResultLoaded: false,
            scoreTableLoaded: false,
            answersLoaded: false
        };
        this.initData();
        //Örnek metrik oluşturulması
        // MetricAPI.getClient().then(client=> {
        //     client.write({key: "resultPageView", value: 1});
        // });

        //var userId = this.props.params.interviewId;
        // if(Cache.checkTestResultReportCache(userId))
        //     this.initializeFromCache(userId)
        // else
        //     this.initializeFromAPI(userId)

        //log(this.props);

    }

    getChildContext() {
        //log("**getChildContext**", this.props.params);
        context.userId = parseInt(this.props.params.userId);
        context.interviewId = parseInt(this.props.params.interviewId);
        return context;
    };

    initializeFromAPI = function (userId) {
        //log("Data from SERVER");
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
        //log("Data from CACHE");
        //var data = Cache.getTestResultReportFromCache(userId);
        data.isValidUser = true;
        this.state = {
            dataWaiting: false,
            comparativeResultLoaded: false,
            scoreTableLoaded: false
        }
    };
    goToList = function () {
        browserHistory.push("/dashboard/listofparticipants");
    };
    initData = function () {
        var interviewId = parseInt(this.props.params.interviewId);
        var _this = this;
        api.ReportAPI.getAllResult({
            id: interviewId
        }).then(response=> {
            return response.json()
        }).then(json=> {
            log("getAllResult", json);
            if (json.status == "SESSION_TIME_OUT" || json.status == "UNAUTHORIZED") {
                util.clearToken();
                _this.context.showMessage(json.message, 2000);
                setTimeout(()=> {
                    browserHistory.push("/signin")
                }, 2000)
                return;
            }
            else if(json.status =="FORBIDDEN"){
                browserHistory.push("/")
            }
            else {
                _this.setState({
                    //categoryScoreInfo: mockData.TestResultMockDataCreator.getRadarData(),
                    generalInfo: _.filter(json, q=> {
                        return q.interviewId == interviewId
                    })[0],
                    scoreData: json,
                    dataLoaded: true
                })
            }

        }).catch(err=> {
            _this.context.showMessage("Error occured... try again", 6000)
        })

        api.ReportAPI.getComparativeResult({
            id: interviewId
        }).then(response=> {
            return response.json()
        }).then(json=> {
            this.setState({
                comparativeResult: json,
                comparativeResultLoaded: true
            })
        })


        //log("****interviewID", _this.props.params.interviewId)
        api.ReportAPI.getScoreTable({
            id: interviewId
        }).then(response=> {
            return response.json()
        }).then(json=> {
            this.setState({
                scoreTable: json,
                scoreTableLoaded: true
            });
        });


        api.ReportAPI.getAnswersByInterviewId({
            id: interviewId
        }).then(response=> {
            return response.json()
        }).then(json=> {
            this.setState({
                answers: json,
                answersLoaded: true
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
                           generalInfo={this.state.generalInfo}
                           scoreData={this.state.scoreData}
                           comparativeResult={this.state.comparativeResult}
                           comparativeResultLoaded={this.state.comparativeResultLoaded}
                           scoreTable={this.state.scoreTable}
                           scoreTableLoaded={this.state.scoreTableLoaded}
                           answers={this.state.answers}
                           answersLoaded={this.state.answersLoaded}
        />

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
    userId: React.PropTypes.number,
    interviewId: React.PropTypes.number
};

SkillTestReportContainer.contextTypes = {
    showMessage: React.PropTypes.func
}