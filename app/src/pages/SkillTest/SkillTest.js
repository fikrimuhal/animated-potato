import React from 'react'
import Router from 'react-router'
import {util,log2,db} from '../../utils/'
import Question from './Question'
import _ from 'lodash'
import RaisedButton from 'material-ui/RaisedButton';
require("!style!css!../../assets/css/animate.css")
const log = log2("SkillTest")
var animationMode=false;
var animate=""
export default class SkillTest extends React.Component{
constructor(props){
  super(props);
  this.state = {
    currentIndex:0
  }
  util.bindFunctions.call(this,['nextQuestion','previousQuestion',
                                'onAnswer','getCurrentAnswer',
                                'endTest']);
}
getCurrentAnswer = function () {

  var answers = this.props.answers;
  var question = this.props.questions[this.state.currentIndex];
  var answerIndex = _.findIndex(answers,(ans)=>{return ans.questionId==question.id});
  var ans = {};
  if (answerIndex == -1) {
     ans = {
       questionId:question.id,
       value : null
     }
  }
  else {
    ans = answers[answerIndex];
  }
  //log("getCurrentAnswer",ans,answers,answerIndex);
  return ans;
}
onAnswer = function (newAnswer) {
  //log("onAnswer");
  var answers = this.props.answers;
  var currentAnswer  =this.getCurrentAnswer();
    var qType = this.props.questions[this.state.currentIndex].type;
  log("currentAnswer",currentAnswer)
  if (currentAnswer.value == null) {
     //answer.value = newAnswer.value;
     answers.push(newAnswer);
  }
  else {
    var updateIndex = _.findIndex(answers,(a)=>{return a.questionId==currentAnswer.questionId})
    answers[updateIndex].value = newAnswer.value;
  }
  log("degisti",answers)
  this.props.onChangeAnswer(answers);
  if (qType=="radio") {
    this.nextQuestion();
  }
  
}
nextQuestion = function () {
  if (this.state.currentIndex < this.props.questions.length -1) {
      animationMode=true;
      animate="slideInRight"
    this.setState({
      currentIndex : (this.state.currentIndex + 1)
    })

  }

}
previousQuestion = function () {
  if (this.state.currentIndex > 0) {
      animationMode=true
      animate="slideInLeft"
    this.setState({
      currentIndex : (this.state.currentIndex - 1)
    })

  }
}
endTest = function () {
  log("endTest")
  this.props.onSaveTest();
}
componentDidUpdate = function (prevProps,prevState) {
  if (animationMode) {
    setTimeout(()=>{
      var div = this.refs.animateDiv;
      log("cdu",div);
      div.classList.add("animated")
      div.classList.remove("zoomOut")
      div.classList.add(animate)
      animationMode=false;
    },250)
  }

}
componentWillUpdate = function (nextProps,nextState) {
  if (animationMode) {
    var div = this.refs.animateDiv;
    div.classList.remove("slideInLeft")
    div.classList.remove("slideInRight")
    div.classList.add("zoomOut")
  }


}
render = function () {
log("render",Router)
  var question  = this.props.questions[this.state.currentIndex];
  var firstQuestion = (this.state.currentIndex == 0);
  var lastQuestion = (this.state.currentIndex == (this.props.questions.length -1))
  var endTest = (this.props.answers.length == this.props.questions.length)
 log(firstQuestion,lastQuestion)
  return (

      <div>
        <div ref="animateDiv">
          <Question key={question.id} question={question} onAnswer={this.onAnswer} answer={this.getCurrentAnswer()}  />
        </div>
        <div style={{float:"right",marginRight:"20%",marginTop:"10px"}}>
          <RaisedButton  label="< Previous" primary={true}   onClick={()=>this.previousQuestion()}  disabled={firstQuestion}/>
          <RaisedButton  label="Next >" primary={true}   onClick={()=>this.nextQuestion()} style={{marginLeft:"3px"}} disabled={lastQuestion}/>
          <RaisedButton  label="End Test" primary={true}   onClick={()=>this.endTest()} style={{marginLeft:"3px"}} disabled={!endTest}/>
        </div>
      </div>


  )
}

}

SkillTest.propTypes = {
  questions: React.PropTypes.array.isRequired

}
