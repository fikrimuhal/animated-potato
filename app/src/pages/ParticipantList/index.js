import React from 'react'
require("!style!css!react-data-grid/themes/react-data-grid.css")
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import {db,log2,util} from '../../utils/'
import {Table} from 'material-ui/Table';
import MTableHead from './MTableHead'
import MTableBody from './MTableBody'
import OrderFilterPanel from './OrderFilterPanel'
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from 'react-data-grid/addons';
const Selectors = Data.Selectors;
const log = log2("ParticipantList")
log("ReactDataGrid",Data)



const styles = {
  customWidth: {
   width: 150,
 },
};
const data = db.getApplicantList();
var columns = [
  {
    key: 'id',
    name: 'NO'
  },
{
  key: 'fullName',
  name: 'Full Name',
  filterable: true,
  sortable : true
},
{
  key: 'date',
  name: 'Apply Date',
  filterable: true,
  sortable : true
},
{
  key: 'score',
  name: 'Score',
  sortable : true
},
]
export default class ParticipantList extends React.Component {

  constructor(props) {
    super(props);
      var rows = data
    this.state = {
      rows : rows, filters : {},
      originalRows:rows
    };
    util.bindFunctions.call(this,['getRows','getSize',
                                  'rowGetter','handleFilterChange',
                                  'handleGridSort'])
  }
  getRows = function() {
   return Selectors.getRows(this.state);
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
  render() {
    log("rendered");
    return (
              <div>
                <h2>Participant List</h2>
                <div>
                  <ReactDataGrid
                         columns={columns}
                         rowGetter={this.rowGetter}
                         enableCellSelect={true}
                         rowsCount={this.getSize()}
                         minHeight={500}
                         toolbar={<Toolbar enableFilter={true}/>}
                         onAddFilter={this.handleFilterChange}
                         onGridSort={this.handleGridSort}
                         />
                </div>
              </div>
    );
  }
}
