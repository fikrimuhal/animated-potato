import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import QuestionYesNo from './QuestionYesNo'
import QuestionRadioButton from './QuestionRadioButton'
import QuestionCheckbox from './QuestionCheckbox'
import QuestionFreeText from './QuestionFreeText';

const styles = {
  button:{
    marginRight: 12,
  },
  position: 'absolute',
  display: 'inline-block',
  alignItems: 'center',
  marginLeft: 250,
  };
export default React.createClass({
  selectQuestionByType(){
   const type = this.props.questionType
      switch(type){
        case "radioButtonYesNo":
          return <QuestionYesNo questionId={this.props.questionId} question={this.props.question}/>
          break
        case "radioButton":
          return <QuestionRadioButton questionId={this.props.questionId} question={this.props.question} answers={this.props.answers}/>
          break
        case "checkbox":
          return <QuestionCheckbox questionId={this.props.questionId} question={this.props.question} answers={this.props.answers}/>
          break
        case "FreeText":
          return <QuestionFreeText questionId={this.props.questionId} question={this.props.question} />
          break
        case "FreeTextMultiLine":
          return <QuestionFreeText questionId={this.props.questionId} question={this.props.question} multiLine={this.props.multiLine}/>
          break
      }
  },
  render(){
    console.log(this.props.answers);
    return (
        <div>
          {this.selectQuestionByType()}
        </div>
    )}
})
