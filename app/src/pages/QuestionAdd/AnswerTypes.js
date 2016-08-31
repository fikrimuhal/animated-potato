import React from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {log2,util} from '../../utils/'
const log = log2("AnswerTypes: ")
const styles = {
  flexContainer:{
    display:"flex",
    justifyContent: "flexStart",
    flexFlow:"row wrap"
  },
  container: {
    backgroundColor:"#f1f1f1",
    padding:"5px 5px 5px 5px",
    marginTop:"5px"
  },
  child:{
    width:"100px",
    marginLeft:"5px"
    }
};
export default class AnswerTypes  extends React.Component {
  constructor(props){
    super(props);
    util.bindFunctions.call(this,['handleRadiButtonChange']);
  }

  handleRadiButtonChange = function (event,value) {
    this.props.onChangeAnswerType(value);
  }
 shouldComponentUpdate= function(nextProps, nextState) {
   return true;
 }
  render () {
    log("rendered")
      console.log("bu type",this.props.answerType)
    return (
      <div>
      <label>Answer Type:</label> <br/>
      <div style={styles.container}>
        <RadioButtonGroup name="radiosAnswerTypes" valueSelected={this.props.answerType}  onChange={this.handleRadiButtonChange} style={styles.flexContainer} >
            <RadioButton value="radio" label="Radio" style={styles.child}/>
            <RadioButton value="checkbox" label="Checkbox" style={styles.child}/>
            <RadioButton value="freetext" label="FreeText" style={styles.child} />
            <RadioButton value="number" label="Number" style={styles.child}/>
            <RadioButton value="yesno" label="Yes/No" style={styles.child}/>
        </RadioButtonGroup>
      </div>
    </div>
    )
  }
}
AnswerTypes.propTypes = {
  onChangeAnswerType: React.PropTypes.func.isRequired
}
