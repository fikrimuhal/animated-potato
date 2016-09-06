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
//variables and const definitions
const log = log2("SkillTestContainer");
var context = {};
var windowSizeControlingTimer;
//React component
export default class SkillTestContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            toastSettings:{
                open:false,
                message:"",
                duration:0
            },
            questionReady:false,
            testOver:false,
            answer:"",
            status:"ok",
            answeredQuestionCount:0,
            questionCount:0,
            progressValue:0,
            screenWidth:0
        };
        util.bindFunctions.call(this,['getQuestionContainer','answerAndNextQuestion','saveAnswer','startTest','nextQuestion']);

        this.startTest();
        var clientW = document.documentElement.clientWidth;
        this.state.paperStyle = clientW <= 500 ? s.userLayoutStyles.skillTestPaperMobil : s.userLayoutStyles.skillTestPaper;
        this.state.screenWidth = clientW;
        windowSizeControlingTimer = setInterval(()=>{
            var clientW = document.documentElement.clientWidth;
            //log(this.state.screenWidth,clientW)
            if(clientW != this.state.screenWidth) {
                this.setState({
                    screenWidth:clientW,
                    paperStyle:clientW <= 500 ? s.userLayoutStyles.skillTestPaperMobil : s.userLayoutStyles.skillTestPaper
                })
            }

        },1000);
        //log("this.props",this.props);

    }

    componentWillMount = function (){

        var reqQuery = this.props.location.query;

        if(!db.isLoggedIn() && (!reqQuery.companyToken || !reqQuery.trackNo || !reqQuery.email)) {
            if(reqQuery.trackNo == "new") {

            }
            browserHistory.push("signin");
        }
    };
    componentDidMount = function (){
        clearInterval(windowSizeControlingTimer);
    };

    getChildContext(){
        log("**getChildContext");
        context.nextQuestion = this.nextQuestion;
        context.currentQuestion = this.state.currentQuestion;
        context.saveAnswer = this.saveAnswer;
        return context;
    };

    startTest = ()=>{
        var _this = this;
        var reqQuery = this.props.location.query;
        var email = db.isLoggedIn() ? db.getUserInfo().email : reqQuery.email;

        // if(db.isLoggedIn()) {
        //var user = db.getUserInfo();
        api.InterviewAPI.startTest({
            email:email
        }).then(response=>{
            return response.json();
        }).then(json=>{
            log("json1",json);
            var status = json.status == undefined ? "OK" : json.status;
            json = {
                status:status,
                testOver:false,
                questionCount:Math.floor(Math.random() * 10),
                firstQuestion:json
            };
            log("json2",json);
            if(json.status == "OK") {
                this.setState({
                    currentQuestion:json.firstQuestion,
                    questionReady:true,
                    testOver:json.testOver,
                    questionCount:json.questionCount,
                    interviewId:53,
                    email:email
                });
            }
            else {
                _this.context.showMessage("Question fetching fail.",5000);
            }
        });
        // db.startTest().then((response)=> {
        //     if(response.valid) {
        //         var question=response.firstQuestion;
        //         this.setState({
        //             currentQuestion: question,
        //             questionReady: true,
        //             testOver: false,
        //             questionCount: response.questionCount
        //         });
        //     }
        //     else {
        //         this.setState({
        //             status: "fail"
        //         })
        //     }
        // });

        // }
        // else {
        //     db.startTestWithoutAuthentication(reqQuery.email).then((response)=>{
        //         if(response.valid) {
        //             var question = response.firstQuestion;
        //             this.setState({
        //                 currentQuestion:question,
        //                 questionReady:true,
        //                 testOver:false,
        //                 questionCount:response.questionCount
        //             });
        //         }
        //         else {
        //             this.setState({
        //                 status:"fail"
        //             })
        //         }
        //     });
        // }
    };

    getQuestionContainer = function (){
        var content;
        if(this.state.status == "ok") {
            if(this.state.testOver) {
                content = <TestOverPanel validUser={this.state.isValidUser} query={this.props.location.query}/>
            }
            else {
                if(this.state.questionReady) {
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
    saveAnswer = function (answer){
        this.setState({
            answer:answer
        })
    };

    nextQuestion = function (){
        log("nextQuestion",this.state);
        if(this.state.answer == "") {
            this.context.showMessage("Bu soruyu cevaplamadan bir sonraki soruya geçemezseniz",2200)
            return;
        }

        var request = {
            answer:{
                questionId:this.state.currentQuestion.id,
                value:this.state.answer == "yes"
            },
            interviewId:this.state.interviewId,
            email:this.state.email
        };
        log("request",request);
        api.InterviewAPI.nextQuestion(request).then(response=>{
            return response.json()
        }).then(json=>{
            log("json",json);
            var status = (json.status == undefined) ? "OK" : json.status;
            var response = {
                status:status,
                testOver:false,
                questionCount:Math.floor(Math.random() * 10),
                nextQuestion:json,
                isValidUser:true
            };
            log("nextQuestion json",json);
            this.setState({
                currentQuestion:response.testOver ? null : response.nextQuestion,
                questionReady:!response.testOver,
                testOver:response.testOver,
                answer:"",
                questionCount:!response.testOver ? response.questionCount : 0,
                isValidUser:response.isValidUser
            });
        });
    };
    answerAndNextQuestion = function (){
        if(this.state.answer.length == 0) {
            this.context.showMessage("Bu soruyu cevaplamadan bir sonraki soruya geçemezseniz",2200)
            //showToast("Soruya cevaplamadan geçemezseniz", 1200);
        }
        else {
            this.setState({
                questionReady:false,
                answeredQuestionCount:(this.state.answeredQuestionCount + 1)
            });

            db.answerQuestion(this.state.currentQuestion.id,this.state.answer).then((response)=>{

                this.setState({
                    currentQuestion:response.testOver ? null : response.nextQuestion,
                    questionReady:!response.testOver,
                    testOver:response.testOver,
                    answer:[],
                    questionCount:!response.testOver ? response.questionCount : 0,
                    isValidUser:response.isValidUser
                });
            });
        }
    };
    getProgressValue = function (){
        var answeredQuestionCount = this.state.answeredQuestionCount;
        var waitingQuestionCount = this.state.questionCount;
        var progressValue = (parseFloat(answeredQuestionCount) / (answeredQuestionCount + waitingQuestionCount)) * 100;
        //log("answeredQuestionCount,waitingQuestionCount,progressValue",answeredQuestionCount,waitingQuestionCount,progressValue)
        return progressValue;
    };
    render = function (){
        log("rendered",this.state);
        var linearProgressDisplay = (this.state.status == "ok" && !this.state.testOver) ? "" : "none";
        return (
            <Paper style={this.state.paperStyle}>
                <LinearProgress mode="determinate" value={this.getProgressValue()} color={"red"}
                                style={{height:"10px",display:linearProgressDisplay}}/>
                {this.getQuestionContainer()}
            </Paper>
        )
    }
}

SkillTestContainer.contextTypes = {
    showMessage:React.PropTypes.func
};

SkillTestContainer.childContextTypes = {
    nextQuestion:React.PropTypes.func,
    currentQuestion:React.PropTypes.object,
    saveAnswer:React.PropTypes.func
};