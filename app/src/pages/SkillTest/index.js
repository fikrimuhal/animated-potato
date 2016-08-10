//core imports
import React        from 'react';
import Paper        from 'material-ui/Paper';
import SkillTest    from './SkillTest';
import log2         from '../../utils/log2';
import {Toast}      from '../../components/MyComponents';
import * as s       from '../../layouts/style';
import * as db      from '../../utils/data';
import * as util    from '../../utils/utils'

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
                duration: 2000
            },
            questionReady: false,
            testOver: false,
            answer: [],
            status: "ok"
        };
        util.bindFunctions.call(this, ['getQuestionContainer', 'answerAndNextQuestion', 'saveAnswer', 'startTest']);
        showToast = util.myToast("toastSettings", this.setState, this.state);
        this.startTest();
    }

    startTest = ()=> {
        db.startTest().then((response)=> {
            if (response.valid) {
                var question = response.firstQuestion;
                //log("soru geldi",question);
                this.setState({
                    currentQuestion: question,
                    questionReady: true,
                    testOver: false
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
                content = <div>Test bitti.......</div>
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
                    content = <div>Bir sonraki soru hazırlanıyor.....</div>
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
        this.setState({
            questionReady: false
        });
        db.answerQuestion(this.state.currentQuestion.id, this.state.answer).then((response)=> {

            this.setState({
                currentQuestion: response.testOver ? null : response.nextQuestion,
                questionReady: !response.testOver,
                testOver: response.testOver,
                answer: []
            });
        });
    };
    render = function () {
        log("rendered")
        return (
            <Paper style={s.userLayoutStyles.skillTestPaper}>
                {this.getQuestionContainer()}
                <Toast settings={this.state.toastSettings}/>
            </Paper>
        )
    }
}
