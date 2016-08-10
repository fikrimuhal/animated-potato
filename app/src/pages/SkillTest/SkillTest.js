//core imports
import React        from 'react'
import Router       from 'react-router'
import Question     from './Question'
import _            from 'lodash'
import RaisedButton from 'material-ui/RaisedButton';
import * as s       from '../../layouts/style'
import * as util    from '../../utils/utils'
import log2         from '../../utils/log2'
import * as db      from '../../utils/data'

//css  referancing
require("!style!css!../../assets/css/animate.css");

//variables and const definitions
const log = log2("SkillTest");

//React component
export default class SkillTest extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['nextQuestion', 'onAnswer']);
    }

    onAnswer = function (answer) {
        this.props.saveAnswer(answer);
    };
    nextQuestion = function () {
        this.props.answerAndNextQuestion();
    };
    componentDidMount = ()=> {
        setTimeout(()=> {
            var div = this.refs.animateDiv;
            div.classList.remove("animated");
            div.classList.remove("pulse");
            div.classList.add("animated");
            div.classList.add("pulse");
        }, 50)
    };

    render = function () {
        log("rendered")
        var question = this.props.question;
        var testOver = this.props.testOver;
        return (

            <div style={{height: "100%"}}>
                <div ref="animateDiv" style={{height: "100%"}}>
                    <Question key={question.id} question={question} onAnswer={this.onAnswer}/>
                    <div style={s.userLayoutStyles.testButtonGroup}>
                        <RaisedButton label="Next >" primary={true} onClick={()=>this.nextQuestion()}
                                      style={{marginLeft: "3px"}} disabled={testOver}/>
                    </div>
                </div>
            </div>
        )
    }
}

SkillTest.propTypes = {
    question: React.PropTypes.object.isRequired,
    testOver: React.PropTypes.bool.isRequired,
    saveAnswer: React.PropTypes.func.isRequired

};
