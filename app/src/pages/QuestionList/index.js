import React from 'react'
require("!style!css!react-data-grid/themes/react-data-grid.css")
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
import { Link ,browserHistory} from 'react-router'
import Checkbox from 'material-ui/Checkbox';



const Selectors = Data.Selectors;
const log = log2("Question List")
log("Question List",Data)

var rows = db.getQuestionsFromStorage();

export class detailButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div>
        <RaisedButton primary={true} onClick={this.onClick}>Detay</RaisedButton>
      </div>
    )
  }
}
export class setWeightsFormatter extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){ 
    return(
      <div>
rrtrg
         

      </div>
    )
  }
}

export class categoryWeightsFormatter extends React.Component{
  constructor(props){
    super(props);
  }
  categoryType = function(){
    var result;

    rows.map((row, i) => {
      var cWeights = util.obj2Array(row.categoryWeights)
       return( cWeights.map((c,j)=>{

            <div>{c.category}</div>

        }
        )
      )
    })
  }
  render(){
    return(
      <div>
        {this.categoryType()}
      </div>
    )
  }
}

const styles = {
  customWidth: {
   width: 150,
 },
};

var columns = [
{
  key: 'id',
  name: 'ID',
  width: 80,
  filterable: true
},
{
  key: 'title',
  name: 'Soru Adı',
  sortable : true,
  editable : true,
  filterable: true
},
{
  key: 'type',
  name: 'Cevap Türü',
},
{
  key: 'id',
  name: 'Set Türü',
  sortable : true,
  filterable: true,
  formatter: setWeightsFormatter
},
{
  key: 'id',
  name: 'Kategori Türü',
  sortable : true,
  sortable : true,
  filterable: true,
  formatter: categoryWeightsFormatter
},
{
  key: 'id',
  name: 'Detay',
  formatter: detailButton
},

]

export default class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows : rows, filters : {},
      originalRows:rows
    };
    util.bindFunctions.call(this,['getRows','getSize',
                                  'rowGetter','handleFilterChange',
                                  'handleGridSort','handleRowUpdated','createNew'])
  }
    createNew = function () {
        browserHistory.push('/adminpanel/questionadd')
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

  render() {
    return (

      <div>
        <div>
         <br/>
          <h4>Question List</h4>
            <RaisedButton label="+Create New" secondary={true} onClick={()=> this.createNew()} style={{float:"right"} }/>
       </div>

        <div>
          <ReactDataGrid
                 columns={columns}
                 rowGetter={this.rowGetter}
                 enableCellSelect={true}
                 rowsCount={this.getSize()}
                 minHeight={500}
                 rowHeight={50}
                 toolbar={<Toolbar enableFilter={true}/>}
                 onAddFilter={this.handleFilterChange}
                 onGridSort={this.handleGridSort}
                 onRowUpdated={this.handleRowUpdated} />
        </div>
      </div>
    );
  }
}