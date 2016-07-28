import React from 'react'
import {util,log2} from '../../utils/'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
const log = log2("RadioQuestion")
const styles = {
  container: {
    width:"80%",
    backgroundColor : "yellow",
    margin:"0 auto",
    marginTop:"10px",
    padding:"5px,5px,5px,5px"
  }
}
export default class RadioQuestion extends React.Component{
constructor(props){
  super(props);
  util.bindFunctions.call(this,['radioChange']);
}
radioChange = function (value) {
  this.props.onChange(value);
}
render = function () {
  log("rendered",this.props.question,this.props.answer)
  var opts = this.props.question.options;
    var options = Object.keys(opts).map(function(k) { return opts[k] });
  return (
    <div style={styles.container}>
    <Card>
    <CardHeader
      title={this.props.question.title}
      subtitle=""
    />
    <CardText>
    <RadioButtonGroup name={this.props.question.id} value={this.props.answer.value} onChange={(event,value)=> this.radioChange(value)}>
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
    </CardText>
  </Card>



    </div>
  )
}
}

RadioQuestion.propTypes = {
  question: React.PropTypes.any.isRequired
}
