import React from 'react'
import QuestionRadioButton from './QuestionRadioButton';

const answers =
    [
      { title: "Evet", value: true},
      { title: "Hayır", value: false},
    ]
export default React.createClass({
  render() {
    return (
      <QuestionRadioButton questionId={this.props.questionId} question={this.props.question} answers={answers}/>

    )}
})
