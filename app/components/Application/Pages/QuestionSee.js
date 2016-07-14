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

const styles = {
  customWidth: {
   width: 150,
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
        <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Soru Türü" />
          <MenuItem value={2} primaryText="Back-End" />
          <MenuItem value={3} primaryText="Front-End" />
          <MenuItem value={3} primaryText="Sistem Yönetimi" />

        </SelectField>


        <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Set Türü" />
          <MenuItem value={2} primaryText="Set 1" />
          <MenuItem value={3} primaryText="Set 2" />
          <MenuItem value={3} primaryText="Set 3" />

        </SelectField>
        </div>
      <br/>
      <div>
          <p><b>1)</b> İş tecrübeniz var mı?</p>

          <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

          <RadioButton
            value="experience"
             label="Evet"
             style={styles.radioButton}
           />
           <RadioButton

              label="Hayır"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <div style={styles.button}>
            <RaisedButton label="Sil" secondary={true}/>
            <RaisedButton label="Soru Setine Ekle" primary={true}/>
          </div>
      </div>
      <div>
          <p><b>2)</b> Scala biliyor musunuz?</p>

          <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

          <RadioButton
            value="experience"
             label="Evet"
             style={styles.radioButton}
           />
           <RadioButton

              label="Hayır"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <div style={styles.button}>
            <RaisedButton label="Sil" secondary={true}/>
            <RaisedButton label="Soru Setine Ekle" primary={true}/>
          </div>
      </div>
      <div>
          <p><b>3)</b> Kişisel bilgisayarınızda hangi işletim sistemini kullanıyorsunuz?</p>

          <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

          <RadioButton

             label="Windows"
             style={styles.radioButton}
           />
           <RadioButton
              value="experience"
              label="Linux"
              style={styles.radioButton}
            />
            <RadioButton

               label="Mac Os"
               style={styles.radioButton}
             />
          </RadioButtonGroup>
          <div style={styles.button}>
            <RaisedButton label="Sil" secondary={true}/>
            <RaisedButton label="Soru Setine Ekle" primary={true}/>
          </div>
      </div>
      <div>
          <p><b>4)</b> Aşağıdakilerin hangisinde daha iyisiniz?</p>

          <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

          <RadioButton

             label="Back end"
             style={styles.radioButton}
           />
           <RadioButton
              value="experience"
              label="Front end"
              style={styles.radioButton}
            />
            <RadioButton

               label="Sistem Yönetimi"
               style={styles.radioButton}
             />
          </RadioButtonGroup>
      </div>

      </div>
    );
  }
}
