import React from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {log2} from '../../utils/'
const log = log2("CevapTurleri: ")
const styles = {
  radioButton: {
    marginBottom: 16,
  },
  fieldDiv : {
    position:'relative',
    float:'left',
    width:'30%'
  },
  w100:{
      width:'auto'
  },
  fullWidth: {
    width:'100%',
    float:'left'
  },
  flexContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent: "space-around",
    flexFlow:"row wrap"
  },
  container: {

    backgroundColor:"#f1f1f1",
    padding:"5px 5px 5px 5px",
    marginTop:"5px",

  },
  child:{
    width:"100px",
    margin:"auto"
  }
};
export default class CevapTurleri  extends React.Component {
  constructor(props){
    super(props);
  }
  handleFieldTypeChange = function (event,value) {

    var model = this.props.parent.state.data;
    if (value == "radio" || value=="checkbox") {

         model.type = value;
         this.props.parent.setState({
          addOptionDisplay: false,
           data : model
        });
    }
    else {
        model.options = [];
        this.props.parent.setState({
         addOptionDisplay: true,
          data : model
       });
    }
  }
 shouldComponentUpdate= function(nextProps, nextState) {
   return false;
 }
  render () {
      log("cevapturleri")
    return (
      <div>
      <label>Cevap Türü:</label> <br/>
      <div style={styles.container}>
        <RadioButtonGroup name="shipSpeed" defaultSelected="radio"  onChange={this.handleFieldTypeChange.bind(this)} style={styles.flexContainer} >
            <RadioButton value="radio" label="Radio" style={styles.radioButton,styles.child}/>
            <RadioButton value="checkbox" label="Checkbox" style={styles.radioButton,styles.child}/>
            <RadioButton value="freetext" label="FreeText" style={styles.radioButton,styles.child} />
            <RadioButton value="number" label="Number" style={styles.radioButton,styles.child}/>
        </RadioButtonGroup>
      </div>
    </div>
    )
  }
}
