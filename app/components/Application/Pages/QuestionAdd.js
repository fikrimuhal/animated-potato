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

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }
  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
        <div>
          <div>
              <h2>Soru Ekle</h2>
          </div>
        <div>
          <TextField
            hintText="Soru Kalıbı"/><br />
        </div>
        <div>
          <SelectField value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Soru Türü" />
            <MenuItem value={2} primaryText="Back-End" />
            <MenuItem value={3} primaryText="Front-End" />
            <MenuItem value={3} primaryText="Sistem Yönetimi" />
          </SelectField>
        </div>
        <div>
        <TextField
          hintText="Ağırlık"/><br />
        </div>

        <div>
          <span>Cevap Türü: <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

          <RadioButton
            value="experience"
             label="Option"
             style={styles.radioButton}
           />
           <RadioButton

              label="Checkbox"
              style={styles.radioButton}
            />
            <RadioButton

               label="FreeText(Tek Satır)"
               style={styles.radioButton}
             />
             <RadioButton

                label="FreeText(Tek Satır)"
                style={styles.radioButton}
              />
              <RadioButton

                 label="Rakam"
                 style={styles.radioButton}
               />
          </RadioButtonGroup></span>
        </div>
        <div>
        <TextField
          hintText="Seçenekler"/><br />
          <RaisedButton label="Ekle" secondary={true}/>
          <RaisedButton label="Sil" primary={true}/>
          <br/>
          <TextField
            hintText="Ağırlık"/><br />
          </div>
          <div>
            <SelectField value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={1} primaryText="Soru Seti" />
              <MenuItem value={2} primaryText="Set 1" />
              <MenuItem value={3} primaryText="Set 2" />
              <MenuItem value={3} primaryText="Set 3" />
            </SelectField>
          </div>
          <RaisedButton label="Soru Ekle" secondary={true}/>

      </div>
    );
  }
}
