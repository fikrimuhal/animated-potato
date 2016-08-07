import React from 'react'
import {util,log2} from '../../utils/'
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';

const log = log2("FreeTextQuestion")

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
export default class NumberQuestion extends React.Component{
constructor(props){
  super(props);
  util.bindFunctions.call(this,['handleSliderChange'])
}
handleSliderChange= function (event,value) {
log(value);
this.props.onChange([value]);
}
render = function () {
  log("rendered",this.props.question)
  var opts = this.props.question.options;
  var options = Object.keys(opts).map(function(k) { return opts[k] });
  var ans = this.props.answer.value;
  var sliderValue = 0;
  if (ans != null && ans.length>0) {
    sliderValue= ans[0];
  }
  return (
    <div style={styles.container}>
      <Paper style={styles.paperStyle} zDepth={0} rounded={false} >

      {this.props.question.title}

    {
        <div>
        <Slider
            min={0}
            max={100}
            step={1}
            defaultValue={0}
            value={sliderValue}
            onChange={this.handleSliderChange}
          />
          <label>{sliderValue} Yıl</label>
        </div>

    }
    </Paper>
</div>
  )
}
}

NumberQuestion.propTypes = {
  question: React.PropTypes.any.isRequired
}
