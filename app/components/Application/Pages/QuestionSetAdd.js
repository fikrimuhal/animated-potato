import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField'


const styles = {
  customWidth: {
   width: 150,
 },
 block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },

};
export default class UserProfiles extends React.Component {
  render() {
    return (
        <div>
        <div>
          <TextField
            hintText="Soru Seti Adı"/><br />
        </div>
          <RaisedButton label="Ekle" secondary={true}/>

      </div>
    );
  }
}
