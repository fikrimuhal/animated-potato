//core imports
import React          from 'react';
import Paper          from 'material-ui/Paper';
import SkillTest      from './SkillTest';
import log2           from '../../utils/log2';
import {Toast}        from '../../components/MyComponents';
import * as s         from '../../layouts/style';
import * as db        from '../../utils/data';
import * as util      from '../../utils/utils'
import WaitingPanel   from './WaitingPanel'
import TestOverPanel  from './TestOver'
import LinearProgress from 'material-ui/LinearProgress';
//variables and const definitions
const log = log2("SkillTestContainer");
var showToast = null;

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
        setInterval(()=>{
            var clientW = document.documentElement.clientWidth;
            if(clientW != this.state.screenWidth){
                   this.setState({
                       paperStyle:clientW<=500 ? s.userLayoutStyles.skillTestPaperMobil:s.userLayoutStyles.skillTestPaper
                   })
            }

        },1000);
        log("this.props",this.props);

    }

    startTest = ()=> {
        db.startTest().then((response)=> {
            if (response.valid) {
                var question = response.firstQuestion;
                //log("soru geldi",question);
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
    };
    getQuestionContainer = function () {
        var content;
        if (this.state.status == "ok") {
            if (this.state.testOver) {
                content = <TestOverPanel/>
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
                    questionCount: !response.testOver ? response.questionCount : 0
                });
            });
        }
    };
    getProgressValue = function () {
        var answeredQuestionCount = this.state.answeredQuestionCount;
        var waitingQuestionCount = this.state.questionCount;
        var progressValue = (parseFloat(answeredQuestionCount) / (answeredQuestionCount + waitingQuestionCount)) * 100;
        log("answeredQuestionCount,waitingQuestionCount,progressValue",answeredQuestionCount,waitingQuestionCount,progressValue)
        return progressValue;
    };
    render = function () {
        log("rendered")
        return (
            <Paper style={this.state.paperStyle}>
                <LinearProgress mode="determinate" value={this.getProgressValue()} color={"red"}/>
                {this.getQuestionContainer()}

                <Toast settings={this.state.toastSettings}/>
            </Paper>
        )
    }
}
