import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem';

export default class UserProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }
  handleChange = (event, index, value) => this.setState({value});
  render() {
    return (
      <div>
          <h3>Kullanıcı Profili</h3>
        <div>
          <SelectField value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Sıralama Türü" />
            <MenuItem value={2} primaryText="Büyükden Küçüğe" />
            <MenuItem value={3} primaryText="Küçükden Büyüğe" />
          </SelectField>
        </div>
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
               <TableRowColumn><div>
                 <RaisedButton label="Sil" secondary={true}/>
                 <RaisedButton label="Düzenle" primary={true}/>
               </div></TableRowColumn>
             </TableRow>

             <TableRow>
               <TableRowColumn>Ali Yılmaz</TableRowColumn>
               <TableRowColumn>Set 2</TableRowColumn>
               <TableRowColumn><div>
                 <RaisedButton label="Sil" secondary={true}/>
                 <RaisedButton label="Düzenle" primary={true}/>
               </div></TableRowColumn>
             </TableRow>

             <TableRow>
               <TableRowColumn>Zehra Kıgız</TableRowColumn>
               <TableRowColumn>Set 2</TableRowColumn>
               <TableRowColumn><div>
                 <RaisedButton label="Sil" secondary={true}/>
                 <RaisedButton label="Düzenle" primary={true}/>
               </div></TableRowColumn>
             </TableRow>
            </TableBody>
            </Table>
        </div>
        <br/>
        <div>
          <TextField
            hintText="Kullanıcı Ara"
            />
            <br/>
        </div>
      </div>
    );
  }
}
