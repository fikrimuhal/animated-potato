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
import Mousetrap    from 'Mousetrap'
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
//css  referancing
require("!style!css!../../assets/css/animate.css");

//variables and const definitions
const log = log2("SkillTest");

//React component
export default class SkillTest extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['nextQuestion', 'onAnswer', 'handleHotkey']);
    }

    onAnswer = function (answer) {
        log("answer", answer);
        this.props.saveAnswer(answer);
    };
    nextQuestion = function () {
        this.props.answerAndNextQuestion();
    };
    handleHotkey = function (e, combo) {
        log("combo", combo, "testOver", this.props.testOver);

        if (combo == "enter" && !this.props.testOver) {
            this.props.answerAndNextQuestion();
        }
    };
    componentDidMount = ()=> {
        Mousetrap.bind([`enter`], this.handleHotkey);
    };
    componentWillUnmount = function () {

        Mousetrap.unbind([`enter`], this.handleHotkey);

    };
    render = function () {
        log("rendered")
        var question = this.props.question;
        var testOver = this.props.testOver;
        return (
            <div>
                <style>
                    {
                        ".gridX {width:auto}"
                    }
                </style>
                <Grid width="500px" className={"gridX"}>
                    <Row height={"80%"}>
                        <Col xs={12} md={12} lg={12}>
                            <Question key={question.id} question={question} onAnswer={this.onAnswer}/>
                        </Col>
                    </Row>
                    <Row end="lg" style={{marginTop:"12%",textAlign:"right"}}>
                        <Col xs={12} md={12} lg={12}>
                            <RaisedButton label="Next >" primary={true} onClick={()=>this.nextQuestion()}
                                          style={{marginLeft: "3px"}} disabled={testOver}/>
                            <span style={s.userLayoutStyles.tusStili}>Enter</span>
                        </Col>
                    </Row>

                </Grid>

            </div>


        )
    }
}

SkillTest.propTypes = {
    question: React.PropTypes.object.isRequired,
    testOver: React.PropTypes.bool.isRequired,
    saveAnswer: React.PropTypes.func.isRequired

};
