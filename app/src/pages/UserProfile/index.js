import React from 'react'
require("!style!css!react-data-grid/themes/react-data-grid.css")
import RaisedButton from 'material-ui/RaisedButton';
import {log2,util} from '../../utils/'
import * as db from '../../utils/data'
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from 'react-data-grid/addons';
var userProfileInstance;
class ButtonsColFormatter extends React.Component{
  constructor(props){
    super(props);

    util.bindFunctions.call(this,['onClick'])
  }
  onClick = function () {
    console.dir(userProfileInstance);
    var rows = userProfileInstance.state.rows;
    var  news = _.filter(rows,(o)=>{return o.id != this.props.value});
    userProfileInstance.state={
      rows : news,
      originalRows:news,
      filters:{}
    };
    userProfileInstance.forceUpdate();

  }
  render = function(){
    console.log("ButtonsColFormatter");
    return (<div>
      <RaisedButton primary={true} onClick={this.onClick} >Sil</RaisedButton>
    </div>)
  }
}

class ImageDisplayer extends React.Component{
  constructor(props){
    super(props)
  }
  render = function(){
    return (

      <img src={this.props.value} width={50} height={30} />
    )
  }
}
const Selectors = Data.Selectors;
const log = log2("User Profile")
log("ReactDataGrid",Data)

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
  key: 'name',
  name: 'Name',
  filterable: true,
  sortable : true,
  editable : true
},
{
  key: 'lastname',
  name: 'Lastname',
  filterable: true,
  sortable : true
},
{
  key: 'email',
  name: 'Email',
  filterable: true,
  sortable : true
},
{
  key: 'phone',
  name: 'Phone',
  filterable: true
},
{
  key: 'photo',
  name: 'Photo',
  filterable: true,
  formatter:ImageDisplayer
},
{
  key: 'website',
  name: 'Web Site',
  filterable: true,
  sortable : true
},
{
  key: 'notes',
  name: 'Your Notes',
  filterable: true,
  sortable : true
},
{
  key:'id',
  name: 'İşlemler',
  formatter:ButtonsColFormatter
}
]

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters : {},
      dataLoaded:false
    };

    util.bindFunctions.call(this,['getRows','getSize',
                                  'rowGetter','handleFilterChange',
                                  'handleGridSort','handleRowUpdated']);
      db.getUsersFromAPI().then((message)=>{
        this.setState({
            rows:message,
            dataLoaded:true,
            originalRows:message
        })
      })
userProfileInstance = this;
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
    log("User Profile rendered");
    return (
        <div>
            <div>
              <br/>
              <h4>User Profile </h4>
           </div>
           <br/>
                <div>
                    {
                        (()=>{
                            var content;
                            if(this.state.dataLoaded){
                                content= <ReactDataGrid
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
                            }
                            else {
                                content=  <p>Data Loading.... !!!</p>
                            }
                            return content;
                        })()
                    }


                </div>
        </div>
    );
  }
}
