//core imports
import React            from 'react';
import Paper            from 'material-ui/Paper';
import SkillTest        from './SkillTest';
import log2             from '../../utils/log2';
import * as s           from '../../layouts/style';
import * as db          from '../../utils/data';
import * as util        from '../../utils/utils'
import WaitingPanel     from './WaitingPanel'
import TestOverPanel    from './TestOver'
import LinearProgress   from 'material-ui/LinearProgress';
import {browserHistory} from 'react-router'
import * as api         from '../../utils/api'
import  Immutable        from 'immutable'
import * as Cache       from '../../utils/cache'
//variables and const definitions
const log = log2("SkillTestContainer");
var context = {};
var windowSizeControlingTimer;
//React component
export default class SkillTestContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toastSettings: {
                open: false,
                message: "",
                duration: 0
            },
            questionReady: false,
            testOver: false,
            answer: "",
            status: "ok",
            answeredQuestionCount: 0,
            questionCount: 0,
            progressValue: 0,
            screenWidth: 0,
            isRegistered: false
        };
        util.bindFunctions.call(this, ['getQuestionContainer', 'saveAnswer', 'startTest', 'nextQuestion']);

        this.startTest();
        var clientW = document.documentElement.clientWidth;
        this.state.paperStyle = clientW <= 500 ? s.userLayoutStyles.skillTestPaperMobil : s.userLayoutStyles.skillTestPaper;
        this.state.screenWidth = clientW;
        windowSizeControlingTimer = setInterval(()=> {
            var clientW = document.documentElement.clientWidth;
            //log(this.state.screenWidth,clientW)
            if (clientW != this.state.screenWidth) {
                this.setState({
                    screenWidth: clientW,
                    paperStyle: clientW <= 500 ? s.userLayoutStyles.skillTestPaperMobil : s.userLayoutStyles.skillTestPaper
                })
            }

        }, 1000);
        //log("this.props",this.props);

    }

    shouldComponentUpdate = (nextProps, nextState)=> {
        var im_currentProp = Immutable.fromJS(this.props, (k, v)=> {
            return v.toOrderedMap()
        });
        var im_nextProp = Immutable.fromJS(nextProps, (k, v)=> {
            return v.toOrderedMap()
        });
        var im_currentState = Immutable.fromJS(this.state, (k, v)=> {
            return v.toOrderedMap()
        });
        var im_nextState = Immutable.fromJS(nextState, (k, v)=> {
            return v.toOrderedMap()
        });

        var propEquality = im_currentProp.equals(im_nextProp);
        var stateEquality = im_currentState.equals(im_nextState);
        log("shouldComponentUpdate", propEquality, stateEquality, (!propEquality || !stateEquality));
        return (!propEquality || !stateEquality);
        return true;
    }
    componentWillMount = function () {

        var reqQuery = this.props.location.query;
        log("reqQuery", reqQuery)
        if (!db.isLoggedIn() && (!reqQuery.companyToken || !reqQuery.trackNo || !reqQuery.email)) {
            if (reqQuery.trackNo == "new") {

            }
            browserHistory.push("/signin");
        }
    };
    componentDidMount = function () {
        clearInterval(windowSizeControlingTimer);
    };

    getChildContext() {
        // log("**getChildContext");
        context.nextQuestion = this.nextQuestion;
        context.currentQuestion = this.state.currentQuestion;
        context.saveAnswer = this.saveAnswer;
        return context;
    };

    startTest = ()=> {
        var _this = this;
        var reqQuery = this.props.location.query;
        var email = db.isLoggedIn() ? db.getUserInfo().email : reqQuery.email;

        // if(db.isLoggedIn()) {
        //var user = db.getUserInfo();
        api.InterviewAPI.startTest({
            email: email
        }).then(response=> {
            return response.json();
        }).then(json=> {
            //log("json",json);
            if (json.status == "OK") {
                this.setState({
                    currentQuestion: json.question,
                    questionReady: true,
                    testOver: json.testOver,
                    questionCount: json.remainingQuestion,
                    interviewId: json.interviewId,
                    email: email
                });

                Cache.ParticipantsCache.clear();
            }
            else {
                _this.context.showMessage(json.message, 5000);
            }
        });

    };

    getQuestionContainer = function () {
        var content;
        if (this.state.status == "ok") {
            if (this.state.testOver) {
                content = <TestOverPanel validUser={this.state.isRegistered} query={this.props.location.query}/>
            }
            else {
                if (this.state.questionReady) {
                    content = <SkillTest
                        question={this.state.currentQuestion}
                        testOver={this.state.testOver}
                        answerAndNextQuestion={this.answerAndNextQuestion}
                        currentQuestionNumber={this.state.answeredQuestionCount + 1}
                    />
                }
                else {
                    content = <WaitingPanel/>
                }
            }

        }
        else {
            content = <div>Bu teste giremezseniz.....</div>
        }

        return content;
    };
    saveAnswer = function (answer) {
        this.setState({
            answer: answer
        })
    };

    nextQuestion = function () {
        //log("nextQuestion",this.state);
        if (this.state.answer == "") {
            this.context.showMessage("Bu soruyu cevaplamadan bir sonraki soruya geçemezseniz", 2200)
            return;
        }
        this.setState({
            questionReady: false,
            answeredQuestionCount: (this.state.answeredQuestionCount + 1)
        });
        var request = {
            answer: {
                questionId: this.state.currentQuestion.id,
                value: this.state.answer == "yes"
            },
            interviewId: this.state.interviewId,
            email: this.state.email
        };
        // log("request",request);
        api.InterviewAPI.nextQuestion(request).then(response=> {
            return response.json()
        }).then(json=> {
            log("json_nextquestion", json);
            if (json.status == "OK") {
                if (!json.testOver) {
                    log("json_nextquestion if", json);
                    this.setState({
                        currentQuestion: json.question,
                        questionReady: true,
                        testOver: false,
                        answer: "",
                        questionCount: json.remainingQuestion
                    });
                }
                else {
                    log("json_nextquestion else", json);
                    this.setState({
                        questionReady: true,
                        testOver: true,
                        answer: "",
                        questionCount: 0,
                        isRegistered: json.isRegistered
                    });
                }
            }

        });
    };

    getProgressValue = function () {
        var answeredQuestionCount = this.state.answeredQuestionCount;
        var waitingQuestionCount = this.state.questionCount;
        var progressValue = (parseFloat(answeredQuestionCount) / (answeredQuestionCount + waitingQuestionCount)) * 100;
        return progressValue;
    };
    render = function () {
        log("rendered", this.state);
        var linearProgressDisplay = (this.state.status == "ok" && !this.state.testOver) ? "" : "none";
        return (
            <Paper style={this.state.paperStyle}>
                <LinearProgress mode="determinate" value={this.getProgressValue()} color={"red"}
                                style={{height: "10px", display: linearProgressDisplay}}/>
                {this.getQuestionContainer()}
            </Paper>
        )
    }
}

SkillTestContainer.contextTypes = {
    showMessage: React.PropTypes.func
};

SkillTestContainer.childContextTypes = {
    nextQuestion: React.PropTypes.func,
    currentQuestion: React.PropTypes.object,
    saveAnswer: React.PropTypes.func
};