//core imports
import React               from 'react'
import Router              from 'react-router'
import Question            from './Question'
import _                   from 'lodash'
import RaisedButton        from 'material-ui/RaisedButton';
import * as s              from '../../layouts/style'
import * as util           from '../../utils/utils'
import log2                from '../../utils/log2'
import * as db             from '../../utils/data'
import Mousetrap           from 'Mousetrap'
import {Grid, Row, Col}    from 'react-flexbox-grid/lib/index';
import Toggle              from 'material-ui/Toggle';
//css  referancing
require("!style!css!../../assets/css/animate.css");

//variables and const definitions
const log=log2("SkillTest");

//React component
export default class SkillTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enterKeyPassing:true
        };
        util.bindFunctions.call(this, ['nextQuestion', 'onAnswer', 'handleHotkey','onToggle']);
    }

    onAnswer=function (answer) {
        log("answer", answer);
        this.props.saveAnswer(answer);
    };
    nextQuestion=function () {
        this.props.answerAndNextQuestion();
    };
    handleHotkey=function (e, combo) {
        log("combo", combo, "testOver", this.props.testOver);

        if(combo == "enter" && !this.props.testOver && this.state.enterKeyPassing) {
            this.props.answerAndNextQuestion();
        }
    };
    componentDidMount=()=> {
        Mousetrap.bind([`enter`], this.handleHotkey);
    };
    componentWillUnmount=function () {
        Mousetrap.unbind([`enter`], this.handleHotkey);
    };
    onToggle = function () {
      this.setState({
          enterKeyPassing:!this.state.enterKeyPassing
      })
    };
    render=function () {
        log("rendered",this.state)
        var question=this.props.question;
        var testOver=this.props.testOver;
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
                    <Row  style={{marginTop: "12%"}}>
                        <Col xs={6} md={6} lg={6}>
                            <Toggle
                                label="Enter ile bir sonraki soruya geç"
                                defaultToggled={true}
                                labelPosition="right"
                                onToggle={this.onToggle}
                            />
                        </Col>
                        <Col xs={6} md={6} lg={6} style={{textAlign: "right"}}>
                            <RaisedButton label="Next >" primary={true} onClick={()=>this.nextQuestion()}
                                          style={{marginLeft: "3px"}} disabled={testOver}/>

                        </Col>
                    </Row>

                </Grid>

            </div>


        )
    }
}

SkillTest.propTypes={
    question: React.PropTypes.object.isRequired,
    testOver: React.PropTypes.bool.isRequired,
    saveAnswer: React.PropTypes.func.isRequired

};
