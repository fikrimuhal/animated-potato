//login ve singup kısmı tamamlanınca bu sayfa tekrardan güncellenecek.
import React from 'react'
require("!style!css!react-data-grid/themes/react-data-grid.css")
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import {db,log2,util} from '../../utils/'
import {Table} from 'material-ui/Table';
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from 'react-data-grid/addons';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash'
import TextField from 'material-ui/TextField';

const Selectors = Data.Selectors;
const log = log2("Admin Profile")
log("Admin Profile")

const styles = {
  customWidth: {
   width: 150,
 },
};

var questionSetInstance;

class ButtonsColFormatter extends React.Component{
  constructor(props){
    super(props)
    util.bindFunctions.call(this,['onClick'])
  }
  onClick = function () {
    console.dir(questionSetInstance);
    var rows = questionSetInstance.state.rows;
    var  news = _.filter(rows,(o)=>{return o.id != this.props.value});
    questionSetInstance.state={
      rows : news,
      originalRows:news,
      filters:{}
    };
    questionSetInstance.forceUpdate();

  }
  render = function(){
    console.log("ButtonsColFormatter");
    return (<div>
    <RaisedButton secondary={true} onClick={this.onClick} style={{paddingRight:'9px'}}>Sil</RaisedButton>
      <RaisedButton primary={true} onClick={this.onClick}>Düzenle</RaisedButton>
    </div>)
  }
}

var columns = [
{
  key: 'id',
  name: 'ID',
  width: 80,
  filterable: true
},
{
  key: 'title',
  name: 'Admin Adı',
  sortable : true,
  editable : true,
  filterable: true
},
{
  key:'id',
  name: 'İşlemler',
  formatter:ButtonsColFormatter
}
]

export default class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
      var rows = db.getQuestionSetAddToStorage();
    this.state = {
      rows : rows, filters : {},
      originalRows:rows
    };
    util.bindFunctions.call(this,['getRows','getSize',
                                  'rowGetter','handleFilterChange',
                                  'handleGridSort','handleRowUpdated','handleSetSave'])
    questionSetInstance = this;
  }

  getRows = function() {
   return Selectors.getRows(this.state);
 }
 handleRowUpdated = function(e){
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows:rows});
  }

 getSize = function() {
   return this.getRows().length;
 }

 rowGetter = function(rowIdx){
   var rows = this.getRows();
   return rows[rowIdx];
 }

 handleFilterChange = function(filter){
   let newFilters = Object.assign({}, this.state.filters);
   if (filter.filterTerm) {
     newFilters[filter.columnKey] = filter.filterTerm;
   } else {
    delete newFilters[filter.columnKey];
   }
   this.setState({filters: newFilters});
 }
 handleGridSort = function (sortColumn, sortDirection) {
   var comparer = function(a, b) {
     if(sortDirection === 'ASC'){
       return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
     }else if(sortDirection === 'DESC'){
       return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
     }
   }
   var rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
   this.setState({rows : rows});
 }
handleSetSave = function(event, value){
  console.log("yeni set adı", value);
    var input = this.refs.inputQuestionSet.input
    if(input.value != null && input.value != "")
    {
      db.setQuestionSetAddToStorage(input.value, util.guid())
      var rows = db.getQuestionSetAddToStorage();
      this.setState({
        rows : rows,
        filters : {},
        originalRows:rows
      })
    }
}
  render() {
    return (

      <div>
        <div>
         <br/>
          <h4>Question Set Details</h4>
       </div>
       <div>
         <h6>Admin Ekle</h6>
         <TextField ref="inputQuestionSet"
                hintText="Admin Adı"
              />
              <br/>

          <TextField ref="inputQuestionSet"
                 hintText="Şifre"
               />
            <br/>
          <RaisedButton label="Ekle" secondary={true} onClick={this.handleSetSave}/>
        </div>

        <div>
          <ReactDataGrid
                 columns={columns}
                 rowGetter={this.rowGetter}
                 enableCellSelect={true}
                 rowsCount={this.getSize()}
                 minHeight={500}
                 rowHeight={45}
                 toolbar={<Toolbar enableFilter={true}/>}
                 onAddFilter={this.handleFilterChange}
                 onGridSort={this.handleGridSort}
                 onRowUpdated={this.handleRowUpdated} />
        </div>
      </div>


    );
  }
}
