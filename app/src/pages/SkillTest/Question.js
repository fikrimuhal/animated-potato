import React from 'react'
import {util,log2} from '../../utils/'
const log = log2("Question")
export default class Question extends React.Component{
constructor(props){
  super(props);
}
render = function () {
  return (
    <div>
      {this.props.question.title}
    </div>
  )
}
}
Question.propTypes = {
  questions: React.PropTypes.any.isRequired,
  onAnswer: React.PropTypes.func.isRequired
}
