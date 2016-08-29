import React                                from 'react'
import RaisedButton                         from 'material-ui/RaisedButton';
import {db,log2,util}                       from '../../utils/'
import {Table}                              from 'material-ui/Table';
import ReactDataGrid                        from 'react-data-grid';
import {Toolbar,Data}                       from 'react-data-grid/addons';
import IconMenu                             from 'material-ui/IconMenu';
import FontIcon                             from 'material-ui/FontIcon';
import IconButton                           from 'material-ui/IconButton';
import NavigationExpandMoreIcon             from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem                             from 'material-ui/MenuItem';
import _                                    from 'lodash'
import TextField                            from 'material-ui/TextField';
import FlatButton       from 'material-ui/FlatButton';
import DeleteIcon       from 'material-ui/svg-icons/action/delete';
import ViewIcon         from 'material-ui/svg-icons/action/visibility';
import {Link,browserHistory}                from 'react-router'
import Checkbox                             from 'material-ui/Checkbox';
import * as api                             from '../../utils/api'
import * as Cache                           from '../../utils/cache'
require("!style!css!react-data-grid/themes/react-data-grid.css")
const Selectors = Data.Selectors;
const log = log2("Question List")

var columns = [
    {
        key:'id',
        name:'ID',
        width:80,
        filterable:true,
        resizable:false,
        sortable:true
    },
    {
        key:'title',
        name:'Title',
        sortable:true,
        editable:true,
        filterable:true
    },
    {
        key:'qType',
        name:'Answer Type',
        filterable:true,
        resizable:false,
        sortable:true
    },

    {
        key:'categoryWeightsCell',
        name:'Categories & Weights'
    },
    {
        key:'options',
        name:'Options'
    },
];

export default class QuestionList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rows:[],
            filters:{},
            originalRows:[]
        };
        util.bindFunctions.call(this,['getRows','getSize',
            'rowGetter','handleFilterChange',
            'handleGridSort','handleRowUpdated','createNew']);

        this.initializeData();
    }

    initializeData = function (){
        if(Cache.checkAllQuestionFromCache()) {
            var rows = Cache.getAllQuestionFromCache();
            rows  = this.convertTableRawData(rows);
            this.state = {
                rows:rows,
                originalRows:rows
            };
        }
        else {
            this.initializeFromAPI();
        }
    };
    initializeFromAPI= function (){
        api.getAllQuestion().then(response=>response.json()).then(json=>{
            var rows = json;
            Cache.cacheAllQuestion(rows);
            rows  = this.convertTableRawData(rows);

            this.setState({
                rows:rows,
                originalRows:rows
            });
        });
    };
    convertTableRawData = function (rows){
        var tableData = rows.map(r =>{
            r.options = this.getOptionCell(r);
            r.categoryWeightsCell = <div>
                {
                    r.categoryWeights.map(category=>{
                        return <span> c:{category.id} , w:{category.weight.toFixed(2)} <br/></span>
                    })
                }
            </div>;
            return r;
        });
        return tableData;
    };
    getOptionCell = (rowData) =>{
        return (<div>
            <FlatButton icon={<DeleteIcon/>} onClick={this.deleteQuestion(rowData.id)}></FlatButton>
            <FlatButton icon={<ViewIcon/>} onClick={this.viewQuestion(rowData.id)}></FlatButton>
        </div>);
    };
    createNew = function (){
        browserHistory.push('/adminpanel/questionadd')
    };
    deleteQuestion = id => ()=>{
        log("deleting-> ", id);
    };
    viewQuestion = id => ()=>{
        log("viewing-> ", id);
    };
    getRows = function (){
        return Selectors.getRows(this.state);
    }
    handleRowUpdated = function (e){
        //merge updated row with current row and rerender by setting state
        var rows = this.state.rows;
        Object.assign(rows[e.rowIdx],e.updated);
        this.setState({rows:rows});
    }

    getSize = function (){
        return this.getRows().length;
    }

    rowGetter = function (rowIdx){
        var rows = this.getRows();
        return rows[rowIdx];
    }

    handleFilterChange = function (filter){
        let newFilters = Object.assign({},this.state.filters);
        if(filter.filterTerm) {
            newFilters[filter.columnKey] = filter.filterTerm;
        }
        else {
            delete newFilters[filter.columnKey];
        }
        this.setState({filters:newFilters});
    }
    handleGridSort = function (sortColumn,sortDirection){
        var comparer = function (a,b){
            if(sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            }
            else if(sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        }
        var rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
        this.setState({rows:rows});
    }

    render(){
        return (

            <div>
                <div>
                    <br/>
                    <h4>Question List</h4>
                    <RaisedButton label="+Create New" secondary={true} onClick={()=> this.createNew()}
                                  style={{float:"right"} }/>
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
                        onRowUpdated={this.handleRowUpdated}/>
                </div>
            </div>
        );
    }
}
