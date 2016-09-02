//region İmports
import React                                from 'react'
import RaisedButton                         from 'material-ui/RaisedButton';
import ReactDataGrid                        from 'react-data-grid';
import {Toolbar,Data}                       from 'react-data-grid/addons';
import FlatButton                           from 'material-ui/FlatButton';
import DeleteIcon                           from 'material-ui/svg-icons/action/delete';
import ViewIcon                             from 'material-ui/svg-icons/action/visibility';
import {browserHistory}                     from 'react-router'
import * as api                             from '../../utils/api'
import * as Cache                           from '../../utils/cache'
import * as util                            from '../../utils/utils'
import  log2                                from '../../utils/log2'
import * as db                              from '../../utils/data'
require("!style!css!react-data-grid/themes/react-data-grid.css")
//endregion
const Selectors = Data.Selectors;
const log = log2("Question List");
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
            filters:{
                qType:"fre"
            },
            originalRows:[]
        };
        util.bindFunctions.call(this,['getRows','getSize',
            'rowGetter','handleFilterChange','handleClearFilters',
            'handleGridSort','handleRowUpdated','createNew']);

        this.initializeData();
    }

    initializeData = function (){
        if(Cache.checkAllQuestionFromCache()) {
            log("**********From CACHE************");
            var rows = Cache.getAllQuestionFromCache();
            rows = this.convertTableRawData(rows);
            this.state = {
                rows:rows,
                originalRows:rows,
                filters:{ qType:"fre"},
            };
        }
        else {
            this.initializeFromAPI();
        }
    };
    initializeFromAPI = function (){
        log("**********From API************");
        api.getAllQuestion().then(response=>response.json()).then(json=>{
            var rows = json;
            Cache.cacheAllQuestion(rows);
            rows = this.convertTableRawData(rows);

            this.setState({
                rows:rows,
                originalRows:rows,
                filters:{ qType:"fre"}
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
        browserHistory.push('/dashboard/QuestionAdd')
    };
    deleteQuestion = id => ()=>{
        log("deleting-> ",id);
        //TODO soru silme yapılacak
    };
    viewQuestion = id => ()=>{
        log("viewing-> ",id);
        browserHistory.push("/dashboard/QuestionDetail/" + id);
        //TODO soru detay sayfası yapılacak
    };
    getRows = function (){
        //log("get rows state",this.state );
        //log("get rows",Selectors.getRows(this.state));
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
    };
    rowGetter = function (rowIdx){
        var rows = this.getRows();
        return rows[rowIdx];
    };

    handleFilterChange = function (filter){
        log("handleFilterChange",filter)
        let newFilters = Object.assign({},this.state.filters);
        if(filter.filterTerm) {
            newFilters[filter.column.key] = filter.filterTerm;
        }
        else {
            delete newFilters[filter.column.key];
        }
        log("handleFilterChange",newFilters)
        this.setState({filters:newFilters});
    };
    handleGridSort = function (sortColumn,sortDirection){
        var comparer = function (a,b){
            if(sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            }
            else if(sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        };
        var rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
        this.setState({rows:rows});
    };
    handleClearFilters= function(){
        //all filters removed
        this.setState({filters: {} });
    };
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
                        onRowUpdated={this.handleRowUpdated}
                        onClearFilters={this.handleClearFilters}/>
                </div>
            </div>
        );
    }
}
