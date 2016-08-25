//core imports
import React            from 'react'
import RaisedButton     from 'material-ui/RaisedButton';
import {db,log2,util}   from '../../utils/'
import ReactDataGrid    from 'react-data-grid';
import {Toolbar,Data}   from 'react-data-grid/addons';
import TextField        from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import * as mockApi     from '../../utils/mock_api'
import * as Cache       from  '../../utils/cache'
import DeleteIcon       from 'material-ui/svg-icons/action/delete';
import FlatButton       from 'material-ui/FlatButton';
import ViewIcon         from 'material-ui/svg-icons/action/visibility';
import QuestionSetCreateToolbar     from './SetCreateToolbar'
import * as s           from '../../layouts/style'
//css referenaces
require("!style!css!react-data-grid/themes/react-data-grid.css")

//const and variable
const Selectors = Data.Selectors;
const log = log2("Question Set Details")

var questionSetInstance;

var columns = [
    {
        key:'id',
        name:'Set NO',
        width:70,
        filterable:false,
        resizable:false
    },
    {
        key:'title',
        name:'Set Adı',
        sortable:true,
        width:200,
        editable:false,
        filterable:true
    },
    {
        key:'questionCount',
        name:'Setdeki Soru Sayısı',
        sortable:true,
        width:200,
    },
    {
        key:'options',
        name:'Varsayılan Set',

    }
]

export default class QuestionSetDetails extends React.Component {
    constructor(props){
        super(props);
        //var rows = db.getQuestionSetAddToStorage();
        this.state = {
            dataLoaded:false
            //rows:rows,filters:{},
            //originalRows:rows
        };
        util.bindFunctions.call(this,['getRows','getSize',
            'rowGetter','handleFilterChange',
            'handleGridSort','handleRowUpdated','handleSetSave'])
        questionSetInstance = this;
        if(Cache.checkQuestionSetsFromCache())
            this.initializeDataFromCache();
        else
            this.initializeDataFromApi();

    }

    initializeDataFromCache = function (){
        log("Data from CACHE");
        var rows = Cache.getQuestionSetsFromCache();
        var tableData = this.convertTableRawData(rows);
        this.state = {
            rows:tableData,
            originalRows:tableData,
            dataLoaded:true
        };
    };
    initializeDataFromApi = function (){
        log("Data from SERVER");
        mockApi.getQuestionSets().then(response=>{
            var rows = JSON.parse(response);
            Cache.cacheQuestionSets(rows);
            var tableData = this.convertTableRawData(rows);
            this.setState({
                rows:tableData,
                originalRows:tableData,
                dataLoaded:true
            });
        });

    };
    convertTableRawData = (rows)=>{
        var tableData = rows.map(r =>{
            r.options = this.getOptionCell(r);
            return r;
        });
        return tableData;
    };
    getOptionCell = (rowData) =>{
        return (<div>
            <FlatButton icon={<DeleteIcon/>} onClick={this.deleteQuestionSet(rowData.id)}></FlatButton>

        </div>);
    };
    deleteQuestionSet = setId => ()=>{
        log("deleting set-> ",setId);
    };
    getRows = function (){
        return Selectors.getRows(this.state);
    };
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
    handleSetSave = function (event,value){
        console.log("yeni set adı",value);
        var input = this.refs.inputQuestionSet.input
        if(input.value != null && input.value != "") {
            db.setQuestionSetAddToStorage(input.value,util.guid())
            var rows = db.getQuestionSetAddToStorage();
            this.setState({
                rows:rows,
                filters:{},
                originalRows:rows
            })
        }
    }

    render(){
        return (

            <div>
                <h4>Question Set Details</h4><br/>
                <QuestionSetCreateToolbar/>
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
                        onRowUpdated={this.handleRowUpdated}/>
                </div>
            </div>


        );
    }
}
