import React from 'react'
import {util,log2} from '../../utils/'
import RadioQuestion from './RadioQuestion'
import CheckboxQuestion from './CheckboxQuestion'
import FreeTextQuestion from './FreeTextQuestion'
import NumberQuestion from './NumberQuestion'
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
      component = <CheckboxQuestion question={this.props.question} answer={this.props.answer} onChange={this.onChange} />
        break;
      case "freetext":
      component =<FreeTextQuestion question={this.props.question} answer={this.props.answer} onChange={this.onChange}/>
        break;
      case "number":
      component =<NumberQuestion question={this.props.question} answer={this.props.answer} onChange={this.onChange}/>
        break;
    default: <div></div>

  }
  return component
}
shouldComponentUpdate= function(nextProps, nextState) {
  // return !this.props.readMode;
  return true;
}
render = function () {
  log("render")
  return (
    this.getQuestionComponent()
  )
}
}
