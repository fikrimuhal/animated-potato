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
 }
};
export default class QuestionSee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }
  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
          <div>
              <h2>Soruları Gör</h2>
          </div>
        <div>
          <SelectField value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Set Türü" />
            <MenuItem value={2} primaryText="Back-End Set" />
            <MenuItem value={3} primaryText="Front-End Set" />
            <MenuItem value={3} primaryText="Sistem Yönetimi Set" />
          </SelectField>
          <br/>

          <SelectField value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Soru Türü" />
            <MenuItem value={2} primaryText="Back-End" />
            <MenuItem value={3} primaryText="Front-End" />
            <MenuItem value={3} primaryText="Sistem Yönetimi" />
          </SelectField>
          </div>
        <br/>
      </div>
    );
  }
}
