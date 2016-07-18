import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField'

export default class QuestionSetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }
  handleChange = (event, index, value) => this.setState({value});
  render() {
    return (
        <div>
          <h2>Soru Seti Bilgileri</h2>
          <br/>
          <div>
            <Table>
              <TableHeader>
               <TableRow>
                 <TableHeaderColumn>Soru Seti Adı</TableHeaderColumn>
                 <TableHeaderColumn>Soru Sayısı</TableHeaderColumn>
                 <TableHeaderColumn>İşlemler</TableHeaderColumn>
               </TableRow>
              </TableHeader>

              <TableBody>
               <TableRow>
                 <TableRowColumn>Set 1</TableRowColumn>
                 <TableRowColumn>65</TableRowColumn>
                 <TableRowColumn><div>
                   <RaisedButton label="Sil" secondary={true}/>
                   <RaisedButton label="Düzenle" primary={true}/>
                 </div></TableRowColumn>
               </TableRow>

               <TableRow>
                 <TableRowColumn>Set 2</TableRowColumn>
                 <TableRowColumn>90</TableRowColumn>
                 <TableRowColumn><div>
                   <RaisedButton label="Sil" secondary={true}/>
                   <RaisedButton label="Düzenle" primary={true}/>
                 </div></TableRowColumn>
               </TableRow>

               <TableRow>
                 <TableRowColumn>Set 3</TableRowColumn>
                 <TableRowColumn>78</TableRowColumn>
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
          <h2>Soru Seti Ekle</h2>
          <div>
            <TextField
              hintText="Soru Seti Adı"/><br />
          </div>
          <RaisedButton label="Ekle" secondary={true}/>
        </div>
      </div>
    );
  }
}
