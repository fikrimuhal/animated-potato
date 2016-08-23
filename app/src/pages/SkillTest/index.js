//core imports
import React            from 'react';
import Paper            from 'material-ui/Paper';
import SkillTest        from './SkillTest';
import log2             from '../../utils/log2';
import {Toast}          from '../../components/MyComponents';
import * as s           from '../../layouts/style';
import * as db          from '../../utils/data';
import * as util        from '../../utils/utils'
import WaitingPanel     from './WaitingPanel'
import TestOverPanel    from './TestOver'
import LinearProgress   from 'material-ui/LinearProgress';
import {browserHistory} from 'react-router'
//variables and const definitions
const log = log2("SkillTestContainer");
var showToast = null;
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
            answer: [],
            status: "ok",
            answeredQuestionCount: 0,
            questionCount: 0,
            progressValue: 0,
            screenWidth:0
        };
        util.bindFunctions.call(this, ['getQuestionContainer', 'answerAndNextQuestion', 'saveAnswer', 'startTest']);
        showToast = util.myToast("toastSettings", this);
        this.startTest();
        var clientW = document.documentElement.clientWidth;
        this.state.paperStyle=clientW<=500 ? s.userLayoutStyles.skillTestPaperMobil:s.userLayoutStyles.skillTestPaper;
        this.state.screenWidth= clientW;
        windowSizeControlingTimer=setInterval(()=>{
            var clientW = document.documentElement.clientWidth;
            //log(this.state.screenWidth,clientW)
            if(clientW != this.state.screenWidth){
                this.setState({
                    screenWidth:clientW,
                    paperStyle:clientW<=500 ? s.userLayoutStyles.skillTestPaperMobil:s.userLayoutStyles.skillTestPaper
                })
            }

        },1000);
        //log("this.props",this.props);

    }

    componentWillMount = function () {

        log(this.props.location);
        var reqQuery = this.props.location.query;
        if(!db.isLoggedIn() && (!reqQuery.companyToken || !reqQuery.trackNo || !reqQuery.email)){
            browserHistory.push("signin");
        }
    };
    componentDidMount = function () {
        clearInterval(windowSizeControlingTimer);
    };
    startTest = ()=> {
        var reqQuery = this.props.location.query;
        if(db.isLoggedIn()){
            db.startTest().then((response)=> {
                if(response.valid) {
                    var question=response.firstQuestion;
                    this.setState({
                        currentQuestion: question,
                        questionReady: true,
                        testOver: false,
                        questionCount: response.questionCount
                    });
                }
                else {
                    this.setState({
                        status: "fail"
                    })
                }
            });

        }
        else{
            db.startTestWithoutAuthentication(reqQuery.email).then((response)=> {
                if(response.valid) {
                    var question=response.firstQuestion;
                    this.setState({
                        currentQuestion: question,
                        questionReady: true,
                        testOver: false,
                        questionCount: response.questionCount
                    });
                }
                else {
                    this.setState({
                        status: "fail"
                    })
                }
            });
        }
    };

    getQuestionContainer = function () {
        var content;
        if (this.state.status == "ok") {
            if (this.state.testOver) {
                content = <TestOverPanel validUser={this.state.isValidUser} query={this.props.location.query}/>
            }
            else {
                if (this.state.questionReady) {
                    content = <SkillTest
                        question={this.state.currentQuestion}
                        testOver={this.state.testOver}
                        answerAndNextQuestion={this.answerAndNextQuestion}
                        saveAnswer={this.saveAnswer}/>
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

    answerAndNextQuestion = function () {
        if (this.state.answer.length == 0) {
            showToast("Soruya cevaplamadan geçemezseniz", 1200);
        }
        else {
            this.setState({
                questionReady: false,
                answeredQuestionCount: (this.state.answeredQuestionCount + 1)
            });
            db.answerQuestion(this.state.currentQuestion.id, this.state.answer).then((response)=> {

                this.setState({
                    currentQuestion: response.testOver ? null : response.nextQuestion,
                    questionReady: !response.testOver,
                    testOver: response.testOver,
                    answer: [],
                    questionCount: !response.testOver ? response.questionCount : 0,
                    isValidUser:response.isValidUser
                });
            });
        }
    };
    getProgressValue = function () {
        var answeredQuestionCount = this.state.answeredQuestionCount;
        var waitingQuestionCount = this.state.questionCount;
        var progressValue = (parseFloat(answeredQuestionCount) / (answeredQuestionCount + waitingQuestionCount)) * 100;
        //log("answeredQuestionCount,waitingQuestionCount,progressValue",answeredQuestionCount,waitingQuestionCount,progressValue)
        return progressValue;
    };
    render = function () {
        log("rendered");
        var linearProgressDisplay = (this.state.status=="ok" && !this.state.testOver)?"":"none";
        return (
            <Paper style={this.state.paperStyle}>
                <LinearProgress mode="determinate" value={this.getProgressValue()} color={"red"} style={{height:"10px",display:linearProgressDisplay}} />
                {this.getQuestionContainer()}

                <Toast settings={this.state.toastSettings}/>
            </Paper>
        )
    }
}
