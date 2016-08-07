import React from 'react'
import {util,log2} from '../../utils/'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {yellow500} from 'material-ui/styles/colors';

const log = log2("FreeTextQuestion")

const styles = {
  container: {
    width:"70%",
    backgroundColor : "yellow",
    margin:"0 auto",
    marginTop:"10px",
  },
  paperStyle:{
    height: '100%',
    width: '100%',
    display: 'inline-block',
  }
}
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
  var opts = this.props.question.options;
  var options = Object.keys(opts).map(function(k) { return opts[k] });
  var ans = this.props.answer.value;
  var textValue = "";
  if (ans != null && ans.length>0) {
    textValue= ans[0];
  }
  return (
    <div style={styles.container}>

      <Paper style={styles.paperStyle} zDepth={0} rounded={false} >
        <FontIcon color={yellow500} className="material-icons md-dark md-inactive" >extension</FontIcon>

        {this.props.question.title}

        <TextField  floatingLabelText="Your answer" hintText="Your answer" value={textValue} onChange={this.handleTextboxChange} multiLine={true} rows={3} fullWidth={true}/>

        </Paper>
</div>
  )
}
}

FreeTextQuestion.propTypes = {
  question: React.PropTypes.any.isRequired
}
