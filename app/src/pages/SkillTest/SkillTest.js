import React from 'react'
import {util,log2,db} from '../../utils/'
import Question from './Question'
import _ from 'lodash'
import RaisedButton from 'material-ui/RaisedButton';
const log = log2("SkillTest")
export default class SkillTest extends React.Component{
constructor(props){
  super(props);
  this.state = {
    currentIndex:0
  }
  util.bindFunctions.call(this,['nextQuestion','previousQuestion',
                                'onAnswer','getCurrentAnswer']);
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
onAnswer = function (value) {
  //log("onAnswer");
  var answers = this.props.answers;
  var answer  =this.getCurrentAnswer();
  if (answer.value == null) {
     answers.push(answer);
  }
  else {
    answers.value = value;
  }
  this.props.onChangeAnswer(answers);
}
nextQuestion = function () {
  if (this.state.currentIndex < this.props.questions.length -1) {
    this.setState({
      currentIndex : (this.state.currentIndex + 1)
    })
  }
}
previousQuestion = function () {
  if (this.state.currentIndex > 0) {
    this.setState({
      currentIndex : (this.state.currentIndex - 1)
    })
  }
}

render = function () {
log("render",this.props.answers)

  return (
    <div>
      <Question question={this.props.questions[this.state.currentIndex]} onAnswer={this.onAnswer} answer={this.getCurrentAnswer()} />
      <div style={{float:"right",marginRight:"100px",marginTop:"10px"}}>
        <RaisedButton  label="< Previous" primary={true}   onClick={()=>this.previousQuestion()}  />
        <RaisedButton  label="Next >" primary={true}   onClick={()=>this.nextQuestion()} style={{marginLeft:"3px"}}/>
    </div>
    </div>

  )
}

}

SkillTest.propTypes = {
  questions: React.PropTypes.array.isRequired,
  answer: React.PropTypes.array.isRequired
}
