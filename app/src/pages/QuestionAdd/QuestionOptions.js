import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField'
import {log2,util} from '../../utils/'
import Immutable from  'Immutable'
const log = log2("QuestionOptions: ")
const styles = {
  flexContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent: "flexStart",
    flexFlow:"row wrap"
  },
  child:{
    width:"20%",
    height:"300px",
    border:'1px solid teal',
    borderRadius:'5px',
    padding:'5px 5px 5px 5px',
    marginBottom:'5px',
    marginLeft:'10px',
  },
  secenekBox:{
    border:'1px solid teal',
    borderRadius:'5px',
    padding:'5px 5px 5px 5px',
    marginBottom:'5px',
    marginLeft:'10px',
    float:'left'
  }
};

export default class QuestionOptions extends React.Component{
  constructor(props){
    super(props);
    util.bindFunctions.call(this,['handleSliderValueChange','handleOptionTextChanged',
                                  'removeOptionFromModel']);
  }
  handleSliderValueChange = function (key,value) {
    var oldOptions = this.props.optionList;
    var newOptions = oldOptions.updateIn([key,"weight"], (v)=> {return value;});
    this.props.onQuestionOptionsChange(newOptions);
  }
  removeOptionFromModel = function (key) {
    var oldOptions = this.props.optionList;
    var newOptions = oldOptions.remove(key);
    this.props.onQuestionOptionsChange(newOptions);
  }
  handleOptionTextChanged = function (key) {
    log("key",this.refs)
    var input = this.refs["txtOptionText-"+key].input;
    var oldOptions = this.props.optionList;
    var newOptions = oldOptions.updateIn([key,"text"], (v)=> {return input.value;});
    this.props.onQuestionOptionsChange(newOptions);

  }
  shouldComponentUpdate= function(nextProps, nextState) {
    var isEqual = nextProps.optionList.equals(this.props.optionList);
    return !isEqual;
  }
  render= ()=> {
    log("rendered")
    var _this = this;
    return (
      <div style = {styles.flexContainer}>

        {
          this.props.optionList.map(function(item) {
              var itemKey =_this.props.optionList.findKey( (x)=> {return x.get('id')==item.get("id")});
                return (
                  <div key={item.get('id')} style={styles.child}>
                      <p>Option Details</p>
                      <hr/>
                      <TextField ref={"txtOptionText-" + itemKey } hintText="Seçenek" value={item.get('text')} onChange={()=>_this.handleOptionTextChanged(itemKey)}/><br />
                      <Slider  onChange={(event,value)=> _this.handleSliderValueChange(itemKey,value)}  defaultValue={item.get('weight')} value={item.get('weight')} min={0.05} max={1.0} step={0.05}/>
                      <b>weight: {item.get('weight')}</b>
                      <RaisedButton primary={true} onClick={()=> _this.removeOptionFromModel(itemKey)} style={{float:"right"}}>Remove</RaisedButton>
                  </div>
                 )
          })
        }

      </div>
    )
  }
}
QuestionOptions.PropTypes = {
  optionList:React.PropTypes.any.isRequired,
  onQuestionOptionsChange:React.PropTypes.func.isRequired
}
