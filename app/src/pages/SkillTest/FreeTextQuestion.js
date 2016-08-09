import React from 'react'
import {util,log2} from '../../utils/'
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import {yellow500} from 'material-ui/styles/colors';
const log = log2("FreeTextQuestion")

export default class FreeTextQuestion extends React.Component{
constructor(props){
  super(props);
  util.bindFunctions.call(this,['handleTextboxChange'])
}
handleTextboxChange= function (event,value) {
log(value);
this.props.onChange([value]);
}
render = function () {
  log("rendered",this.props.question)
  var ans = this.props.answer.value;
  var textValue = "";
  if (ans != null && ans.length>0) {
    textValue= ans[0];
  }
  return (
    <div>
        <FontIcon color={yellow500} className="material-icons md-dark md-inactive" >extension</FontIcon>
        {this.props.question.title}
        <TextField  floatingLabelText="Your answer" hintText="Your answer" value={textValue} onChange={this.handleTextboxChange} multiLine={true} rows={3} fullWidth={true}/>

    </div>
  )
}
}

FreeTextQuestion.propTypes = {
  question: React.PropTypes.any.isRequired
}
