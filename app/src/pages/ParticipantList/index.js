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
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

//helper to create a fixed number of rows
function createRows(numberOfRows){
  var _rows = [];
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({
      id: i,
      task: 'Task ' + i,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority : ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType : ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: randomDate(new Date(2015, 3, 1), new Date()),
      completeDate: randomDate(new Date(), new Date(2016, 0, 1))
    });
  }
  return _rows;
}
var rowGetter = function(i){
  return _rows[i];
};

//Columns definition
var columns = [
{
  key: 'id',
  name: 'ID',
  width: 80,
  filterable: true
},
{
  key: 'task',
  name: 'Title',
  filterable: true,
  sortable : true
},
{
  key: 'priority',
  name: 'Priority',
  filterable: true,
  sortable : true
},
{
  key: 'issueType',
  name: 'Issue Type',
  filterable: true
},
{
  key: 'complete',
  name: '% Complete',
  filterable: true
},
{
  key: 'startDate',
  name: 'Start Date',
  filterable: true,
  sortable : true
},
{
  key: 'completeDate',
  name: 'Expected Complete',
  filterable: true,
  sortable : true
}
]
export default class ParticipantList extends React.Component {

  constructor(props) {
    super(props);
      var rows = createRows(1000);
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
                <h2>Katılımcı Listesi</h2>
                <OrderFilterPanel />
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
                  {
                    // <MTableHead columns={['Fullname','Date','Score','Settings']} />
                    // <MTableBody rows={this.state.data}/>
                  }

                </div>
              </div>
    );
  }
}
