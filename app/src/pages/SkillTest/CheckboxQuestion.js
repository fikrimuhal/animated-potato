import React from 'react'
import {util,log2} from '../../utils/'
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';

const log = log2("CheckboxQuestion")
const styles = {
  container: {
    width:"80%",
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
      <Paper style={styles.paperStyle} zDepth={0} rounded={false} >

      {this.props.question.title}



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

      </Paper>

    </div>
  )
}
}

CheckboxQuestion.propTypes = {
  question: React.PropTypes.any.isRequired
}
