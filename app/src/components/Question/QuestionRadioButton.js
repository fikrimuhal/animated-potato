import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const styles = {
  button:{
    marginRight: 12,
  },
  position: 'absolute',
  display: 'inline-block',
  alignItems: 'center',
  marginLeft: 250,
  };
export default React.createClass({
  questions(){
    var answers = this.props.answers
      if(answers){
        return answers.map((option, i) => (
          <RadioButton key={option.value}
            value = {option.value}
            label= {option.title}
           style={styles.radioButton}
         />))
    }
  },
  render() {
    return (<MuiThemeProvider>
        <div>
          <p><b>{this.props.questionId})</b> {this.props.question}</p>
          <RadioButtonGroup name="shipSpeed" onChange={(event, value) => (console.log("Kullanıcı bnun seçti:",value))}>
            {
                this.questions()
            }
          </RadioButtonGroup>
            </div>
      </MuiThemeProvider>
    )}
})
