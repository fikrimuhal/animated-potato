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
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const questions = {
  1: {
    title: "Aşağıdakilerden hangisinde daha iyisiniz?",
    answers: [
      { title: "front end", value: 1},
      { title: "back end", value: 2},
      { title: "sistem yönetimi", value: 3}
    ],
    id: 1,
    type: "radioButton"
  },
  2: {
    title: "Aşağıdakilerden hangisinde daha kötüsünüz?",
    answers: [
      {title:"JavaScript", value: 1},
      {title:"Scala", value: 2},
      {title:"Haskell", value: 3},
      {title: "Java", value: 4}
    ],
    id: 2,
    type: "radioButton"
  },
}

const styles = {
  button:{
    marginRight: 12,
  },
  position: 'absolute',
  display: 'inline-block',
  alignItems: 'center',
  marginLeft: 250,
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
  };
export default React.createClass({
  render() {
      return (<MuiThemeProvider>
        <div>
          <p><b>{this.props.questionId})</b> {this.props.question}</p>

              

            </div>
      </MuiThemeProvider>
    )}
})
