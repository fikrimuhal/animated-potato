import React from 'react'
import SkillTest from './SkillTest'
import {util,log2,db} from '../../utils/'
const log = log2("SkillTestContainer")
const _questions = db.getQuestionsBySetName("Set 1");
const answers = []
export default class SkillTestContainer extends React.Component{
constructor(props){
  super(props);
  this.state = {
    answers:answers
  }
  util.bindFunctions.call(this,['handleOnChangeAnswer']);
}
handleOnChangeAnswer = function (newData) {
  this.setState({
    answers:newData
  })
}
render = function () {
  log("rendered")
  return (
    <SkillTest questions={_questions}  answers={this.state.answers} onChangeAnswer={this.handleOnChangeAnswer}/>
  )
}
}
