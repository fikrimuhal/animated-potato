import React from 'react'
import {util,log2} from '../../utils/'
const log = log2("SkillTest")
export default class SkillTest extends React.Component{
constructor(props){
  super(props);
  this.state = {
    currentIndex:0
  }

  util.bindFunctions.call(bind,['getCurrentQuestion'])
}
getCurrentQuestion = function () {
  return this.props.questions[this.state.currentIndex];
}
onAnswer = function () {
  log("onAnswer");
}
render = function () {
  return (
    <Question question={this.getCurrentQuestion()} onAnswer={this.onAnswer}>
  )
}

}

SkillTest.propTypes = {
  questions: React.PropTypes.array.isRequired
}
