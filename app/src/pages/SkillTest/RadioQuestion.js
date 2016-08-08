import React from 'react'
import {util,log2} from '../../utils/'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {pink500} from 'material-ui/styles/colors';


const log = log2("RadioQuestion")
const styles = {
  container: {
    width:"70%",
    margin:"0 auto",
    marginTop:"10px",
  },
  paperStyle:{
    height: '100%',
    width: '100%',
    display: 'inline-block',
  }
}
export default class RadioQuestion extends React.Component{
constructor(props){
  super(props);
  util.bindFunctions.call(this,['radioChange']);
}
radioChange = function (value) {
  log(value);
  this.props.onChange([value]);
}
shouldComponentUpdate= function(nextProps, nextState) {
  return this.props.answer.value != nextProps.answer.value;
}
render = function () {
  log("rendered",this.props.answer.value)
  var opts = this.props.question.options;
  var options = Object.keys(opts).map(function(k) { return opts[k] });
  var ans = this.props.answer.value;
  var value = (ans!=null && ans.length>0)?ans[0]:null;
  return (
    <div style={styles.container}>
      <Paper style={styles.paperStyle} zDepth={0} rounded={false} >
        <FontIcon color={pink500} className="material-icons md-dark md-inactive" >flag</FontIcon>

        {this.props.question.title}


    <RadioButtonGroup name={this.props.question.id} valueSelected={value} onChange={(event,value)=> this.radioChange(value)}>
      {
        options.map((option) => {
          return (
            <RadioButton
              key = {option.id}
              value = {option.id}
              label= {option.text}
             />
          )
        })
      }
      </RadioButtonGroup>

    </Paper>



    </div>
  )
}
}

RadioQuestion.propTypes = {
  question: React.PropTypes.any.isRequired
}