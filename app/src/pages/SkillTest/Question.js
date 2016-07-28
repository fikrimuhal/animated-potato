import React from 'react'
import {util,log2} from '../../utils/'
import RadioQuestion from './RadioQuestion'
import CheckboxQuestion from './CheckboxQuestion'
const log = log2("Question")
export default class Question extends React.Component{
constructor(props){
  super(props);
  util.bindFunctions.call(this,['getQuestionComponent','onChange'])
}
onChange = function (value) {
  var answer = this.props.answer;
  answer.value = value;
  this.props.onAnswer(answer);
}
getQuestionComponent = () => {
  var questionType = this.props.question.type;
  var component;
  switch (questionType) {
    case "radio":
      component = <RadioQuestion question={this.props.question} answer={this.props.answer}  onChange={this.onChange}/>
      break;
      case "checkbox":
      component = <CheckboxQuestion question={this.props.question} answer={this.props.answer}/>
        break;
    default: <div></div>

  }
  return component
}
render = function () {
  log("render",this.props.answer)
  return (
    this.getQuestionComponent()
  )
}
}
