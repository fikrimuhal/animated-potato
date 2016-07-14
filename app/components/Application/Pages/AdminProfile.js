import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField'

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
        <h2>Admin Profili</h2>
      <br/>
      <div>
        <Table>
          <TableHeader>
           <TableRow>
             <TableHeaderColumn>Ad Soyad</TableHeaderColumn>
             <TableHeaderColumn>Yanıtlanan Soru Seti</TableHeaderColumn>
             <TableHeaderColumn>İşlemler</TableHeaderColumn>
           </TableRow>
          </TableHeader>
          <TableBody>
           <TableRow>
             <TableRowColumn>Ayşe Ak</TableRowColumn>
             <TableRowColumn>Set 1</TableRowColumn>
             <TableRowColumn><div style={styles.button}>
               <RaisedButton label="Sil" secondary={true}/>
               <RaisedButton label="Düzenle" primary={true}/>
             </div></TableRowColumn>
           </TableRow>
           <TableRow>

             <TableRowColumn>Ali Yılmaz</TableRowColumn>
             <TableRowColumn>Set 2</TableRowColumn>
             <TableRowColumn><div style={styles.button}>
               <RaisedButton label="Sil" secondary={true}/>
               <RaisedButton label="Düzenle" primary={true}/>
             </div></TableRowColumn>
           </TableRow>
           <TableRow>
             <TableRowColumn>Zehra Kıgız</TableRowColumn>
             <TableRowColumn>Set 2</TableRowColumn>
             <TableRowColumn><div style={styles.button}>
               <RaisedButton label="Sil" secondary={true}/>
               <RaisedButton label="Düzenle" primary={true}/>
             </div></TableRowColumn>
           </TableRow>
          </TableBody>a
          </Table>
      </div>
      <br/>
      <div>  <TextField
            hintText="Kullanıcı Ara"
          /><br /></div>
      </div>
    );
  }
}
