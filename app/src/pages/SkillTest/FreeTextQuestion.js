import React from 'react'
import {util,log2} from '../../utils/'
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
const log = log2("FreeTextQuestion")
const styles = {
  container: {
    width:"80%",
    backgroundColor : "yellow",
    margin:"0 auto",
    marginTop:"10px",
    padding:"5px,5px,5px,5px"
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
    <Card>
    <CardHeader
      title={this.props.question.title}
      subtitle=""
    />
    <CardText>
      {
        <TextField  floatingLabelText="Your answer" hintText="Your answer" value={textValue} onChange={this.handleTextboxChange} multiLine={true} rows={5} fullWidth={true}/>
      }
    </CardText>
  </Card>
</div>
  )
}
}

FreeTextQuestion.propTypes = {
  question: React.PropTypes.any.isRequired
}
