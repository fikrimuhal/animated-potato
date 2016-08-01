import React from 'react'
import {util,log2} from '../../utils/'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
const log = log2("CheckboxQuestion")
const styles = {
  container: {
    width:"80%",
    backgroundColor : "yellow",
    margin:"0 auto",
    marginTop:"10px",
    padding:"5px,5px,5px,5px"
  }
}
export default class CheckboxQuestion extends React.Component{
constructor(props){
  super(props);
  util.bindFunctions.call(this,['handleCheckbox'])
}
handleCheckbox = function (optionId,checked) {
  log(optionId,checked);
  var answer = this.props.answer;
  var value="";
  if (answer.value == null) {
       value = [optionId];
  }
  else {
   var values = answer.value;
   if (checked) {
     values.push(optionId);
   }
   else {
     _.remove(values,(o)=>{return o == optionId});
   }
   value = values;
  }
  log("old-new",answer.value,value);
  this.props.onChange(value);
}
render = function () {
  log("rendered",this.props.question)
  var opts = this.props.question.options;
  var options = Object.keys(opts).map(function(k) { return opts[k] });
  var ans = this.props.answer.value;
  return (
    <div style={styles.container}>
    <Card>
    <CardHeader
      title={this.props.question.title}
      subtitle=""
    />
    <CardText>
      {
        options.map((option) => {
          var checked = false;
          if (ans != null && ans.length>0) {
            checked= _.includes(ans,option.id);
          }

          return (
            <Checkbox
            key = {option.id}
            value = {option.id}
            label= {option.text}
            checked={checked}
            onCheck = {(event,checked)=> this.handleCheckbox(option.id,checked)}
              />
          )
        })
      }
    </CardText>
  </Card>
</div>
  )
}
}

CheckboxQuestion.propTypes = {
  question: React.PropTypes.any.isRequired
}
