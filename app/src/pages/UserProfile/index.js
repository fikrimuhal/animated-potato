var FakeObjectDataListStore = require('../Deneme/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {log2,util,db} from '../../utils/'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import _ from 'lodash'

const {Table, Column, Cell} = FixedDataTable;

const styles = {
  container: {
    backgroundColor:"#f1f1f1",
    margin: '134px'
  },

   buttonPadding: {
     marginRight: '5'
   },
   toolbar:{
     width: '100%',
   },
   toolbarButton:{
     marginLeft: '270'
   },
   tableStyle:{
     width: '100%',
     height: '700'
   }
}

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);
export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this._dataList = db.getUsers();

    this.state = {
      filteredDataList: this._dataList,
    };
    this._onFilterChange = this._onFilterChange.bind(this);
    util.bindFunctions.call(this,['handleUserDelete','_onFilterChange'])
  }

  handleChange = function(event, index, value){
    this.setState({value});
}
_onFilterChange(e) {
  if (!e.target.value) {
    this.setState({
      filteredDataList: this._dataList,
    });

  }
   var filterBy = e.target.value.toLowerCase();
   var size = this._dataList.length;
   var arr = [];
   for (var index = 0; index < size; index++) {
     var name = this._dataList[index].name;
     var lastname = this._dataList[index].lastname;
     console.log(name, lastname);

     if (name.toLowerCase().indexOf(filterBy) !== -1 || lastname.toLowerCase().indexOf(filterBy) !== -1 ) {
       arr.push(this._dataList[index]);
     }
   }
  this.setState({
    filteredDataList: arr
  });
}
  handleSearchSet = function(event, value){
    this.setState({addOptionDisplay: true});
  }
  handleSetSave = function(event, value){

  }
  handleUserDelete = function(key)
  {
    db.UserDelete(key);
    this.setState({
      filteredDataList: db.getUsers()
    });

  }
  render() {
    var {filteredDataList} = this.state;
    //console.log(filteredDataList)

    return (
        <div>
            <div>
              <br/>
                <Toolbar style={styles.toolbar}>
                  <ToolbarGroup>
                    <ToolbarTitle text="UserProfile"/>
                    <FontIcon className="muidocs-icon-custom-sort" />
                    <ToolbarSeparator />

                    <TextField onChange={this._onFilterChange}
                      hintText="Kullanıcı Ara"
                    />

                  </ToolbarGroup>
                </Toolbar>
            </div>
               <Table
               rowHeight={50}
               rowsCount={this.state.filteredDataList.length}
               headerHeight={50}
               width={1300}
               height={700}
               >
               <Column
                 header={<Cell>Name Surname</Cell>}
                 cell={({rowIndex, ...props}) => (
              <Cell {...props}>
                {this.state.filteredDataList[rowIndex].name +" "+ this.state.filteredDataList[rowIndex].lastname}
              </Cell>
            )}
                 fixed={true}
                 width={150}
               />
               <Column
                 header={<Cell>Email</Cell>}
                 cell={({rowIndex, ...props}) => (
              <Cell {...props}>
                {this.state.filteredDataList[rowIndex].email}
              </Cell>
            )}
                 fixed={true}
                 width={150}
               />
               <Column
                 header={<Cell>Phone</Cell>}
                 cell={({rowIndex, ...props}) => (
              <Cell {...props}>
                {this.state.filteredDataList[rowIndex].phone}
              </Cell>
            )}
                 fixed={true}
                 width={150}
               />
               <Column
                 header={<Cell>Photo</Cell>}
                 cell={({rowIndex, ...props}) => (
              <Cell {...props}>
                {this.state.filteredDataList[rowIndex].photo}
              </Cell>
            )}
                 fixed={true}
                 width={150}
               />
               <Column
                 header={<Cell>Web Site</Cell>}
                 cell={({rowIndex, ...props}) => (
              <Cell {...props}>
                {this.state.filteredDataList[rowIndex].wesite}
              </Cell>
            )}
                 fixed={true}
                 width={150}
               />
               <Column
                 header={<Cell>Your Notes</Cell>}
                 cell={({rowIndex, ...props}) => (
              <Cell {...props}>
                {this.state.filteredDataList[rowIndex].notes}
              </Cell>
            )}
                 fixed={true}
                 width={150}
               />
               <Column
                 header={<Cell>İşlemler</Cell>}
                 cell={({rowIndex, ...props}) => (
                   <Cell {...props}>
                     {
                       <div><RaisedButton label="Sil" secondary={true} style={styles.buttonPadding} onTouchTap={()=>this.handleUserDelete(this.state.filteredDataList[rowIndex].id)} />
                       <RaisedButton label="Düzenle" primary={true}/></div>
                     }
                   </Cell>
                 )
                   }
                 width={300}
               />
             </Table>
            <br/>
        </div>
    );
  }
}
