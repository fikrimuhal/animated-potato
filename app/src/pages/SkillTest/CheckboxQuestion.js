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
}
render = function () {
  log("rendered",this.props.question)
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
      {
        options.map((option) => {
          return (
            <Checkbox
            key = {option.id}
            value = {option.id}
            label= {option.text}
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
