//core imports
import React            from 'react'
import log2             from '../../utils/log2'
import ReactDataGrid    from 'react-data-grid';
import {Toolbar,Data}   from 'react-data-grid/addons';
import CircularProgress from 'material-ui/CircularProgress';
import * as mockApi     from '../../utils/mock_api'
import * as Cache       from  '../../utils/cache'
import DeleteIcon       from 'material-ui/svg-icons/action/delete';
import FlatButton       from 'material-ui/FlatButton';
import QuestionSetCreateToolbar     from './SetCreateToolbar'
import * as s           from '../../layouts/style'
import * as api         from '../../utils/api'
import IconDone         from 'material-ui/svg-icons/action/done';
import IconClose        from 'material-ui/svg-icons/content/clear'
import * as util        from '../../utils/utils'
import * as db          from '../../utils/data'
import {QuestionSetAPI} from '../../utils/api'
import * as _           from 'lodash'
import BookmarkIcon     from 'material-ui/svg-icons/action/bookmark'
//css referenaces
require("!style!css!react-data-grid/themes/react-data-grid.css")

//const and variable
const Selectors = Data.Selectors;
const log = log2("ListOfQuestionSet")

var questionSetInstance;

var columns = [
    {
        key:'id',
        name:'Set ID',
        width:50,
        filterable:false,
        resizable:false
    },
    {
        key:'title',
        name:'Question Set Title',
        sortable:true,
        width:250,
        editable:true,
        filterable:true
    },
    {
        key:'questionCount',
        name:'Question Count',
        sortable:true,
        width:120,
    },
    {
        key:'isDefaultSetCell',
        name:'Default Set?',
        width:100
    },
    {
        key:"options",
        name:"Options"
    }
]
const helperFunction = {
    getDefaultSetCell:(row)=>{
        if(row.isDefaultSet) {
            return <div><IconDone/></div>
        }
        else {
            return <div><IconClose/></div>
        }
    },
    getOptionColumn:(row)=>{

    }
};
export default class ListOfQuestionSet extends React.Component {

    constructor(props){
        super(props);
        //var rows = db.getQuestionSetAddToStorage();
        this.state = {
            dataLoaded:false
        };
        util.bindFunctions.call(this,['getRows','getSize',
            'rowGetter','handleFilterChange',
            'handleGridSort','handleRowUpdated','handleSetSave','saveQuestionSet'])
        questionSetInstance = this;
        if(Cache.QuestionSetCaching.check())
            this.initializeDataFromCache();
        else
            this.initializeDataFromApi();

    }

    initializeDataFromCache = function (){
        log("Data from CACHE");
        var rows = Cache.QuestionSetCaching.get();
        var tableData = this.convertTableRawData(rows);
        this.state = {
            rows:tableData,
            originalRows:tableData,
            dataLoaded:true,
            originalData:rows
        };
    };
    initializeDataFromApi = function (){
        log("Data from API");
        QuestionSetAPI.getAllQuestionSet().then(repsonse=>{
            return repsonse.json()
        }).then(json=>{
            var rows = json;
            Cache.QuestionSetCaching.cache(rows);
            this.createTable(rows);
        });

        // mockApi.getQuestionSets().then(response=>{
        //     var rows = JSON.parse(response);
        //     Cache.cacheQuestionSets(rows);
        //     var tableData = this.convertTableRawData(rows);
        //     this.setState({
        //         rows:tableData,
        //         originalRows:tableData,
        //         dataLoaded:true
        //     });
        // });

    };
    createTable = function (rows){
        log("creatable",rows);
        //var data = _.clone(rows);
        var tableData = this.convertTableRawData(_.clone(rows));
        log("creatable",rows,tableData);
        this.setState({
            rows:tableData,
            originalRows:tableData,
            dataLoaded:true,
            originalData:rows
        });
    };
    convertTableRawData = (rows)=>{
        var data =  JSON.parse(JSON.stringify(rows));
        var tableData = data.map(r =>{
            r.options = this.getOptionCell(r);
            //r.questionCount = Math.floor(Math.random() * 200);
            r.isDefaultSetCell = helperFunction.getDefaultSetCell(r);
            return r;
        });
        return tableData;
    };
    getOptionCell = (rowData) =>{
        return (<div>
            <FlatButton icon={<DeleteIcon/>} onClick={this.deleteQuestionSet(rowData.id)} ></FlatButton>
            <FlatButton icon={<BookmarkIcon/>} onClick={this.makeDefaultSet(rowData.id)}
                        style={{display:rowData.isDefaultSet?"none":""}}
                        label={"Mark as Default"}></FlatButton>
            

        </div>);
    };
    makeDefaultSet = setId=> ()=>{
        var _this = this;
        log("makeDefaultSet",setId);
        var originalData = this.state.originalData;
        var markingDefaultSetIndex = _.findIndex(originalData,(q=>q.isDefaultSet));
        var willBeMarkingSetIndex = _.findIndex(originalData,(q=>q.id == setId));

        QuestionSetAPI.makeDefaultSet({id:setId}).then(response=>{
            return response.json()
        }).then(json=>{
            if(json.status == "OK") {
                _this.context.showMessage("Question set mark as default.",1000);

                originalData[markingDefaultSetIndex].isDefaultSet = false;
                originalData[willBeMarkingSetIndex].isDefaultSet = true;
                log(originalData,markingDefaultSetIndex,willBeMarkingSetIndex);
                _this.createTable(originalData);
            }
            else {
                _this.context.showMessage("Question set marking default has     failed..",1000);
            }
        }).catch(err=>{
            _this.context.showMessage("An error occured.",1000);
            log("err",err);
        });
    };
    deleteQuestionSet = setId => ()=>{
        var _this = this;

        var originalData = this.state.originalData;
        var deletingSetId = _.findIndex(originalData,(q=>q.id == setId));
        var deletingSet = originalData[deletingSetId];
        log("deleting set-> ",originalData,deletingSet);
        QuestionSetAPI.deleteQuestionSet(deletingSet).then(response =>{
            return response.json();
        }).then(json=>{
            log("json",json)
            if(json.status.toLowerCase() == "ok") {
                _this.context.showMessage("Question set deleted.",1000);
                _.pullAt(originalData,[deletingSetId]);
                _this.createTable(originalData);
            }
            else {
                _this.context.showMessage("Question set deleting fail!",1000);
            }
        }).catch(err=>{
            _this.context.showMessage("Fail deleting.",1000);
        })
    };
    getRows = function (){
        return Selectors.getRows(this.state);
    };
    handleRowUpdated = function (e){
        //merge updated row with current row and rerender by setting state
        var _this = this;
        var originalData = this.state.originalData;
        //log("originalData",originalData,e);
        var updatingRow = originalData[e.rowIdx];
        //log("updatingRow",updatingRow);
        log("comparing",originalData[e.rowIdx].title, e.updated.title);
        if(originalData[e.rowIdx].title != e.updated.title){
            Object.assign(updatingRow,e.updated);
            QuestionSetAPI.updateQuestionSet(updatingRow).then(response=>{
                return response.json()
            }).then(json=>{
                log("json",json)
                if(json.status == "OK") {
                    _this.context.showMessage("Question set updated.",1000);
                    Object.assign(originalData[e.rowIdx],e.updated);
                    _this.createTable(originalData);
                    Cache.QuestionSetCaching.clear();
                }
                else {
                    _this.context.showMessage("Question set updating fail.",1000);
                }
            });

        }
        //var rows = this.state.rows;
        //Object.assign(rows[e.rowIdx],e.updated);
        //this.setState({rows:rows});
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
            newFilters[filter.column.key] = filter.filterTerm;
        }
        else {
            delete newFilters[filter.column.key];
        }


        log("filter", newFilters);
        var rows = this.state.originalRows;
        //rows = _.filter(rows,newFilters);
        rows = _.filter(rows, row=> {
            var result = false;
            if (Object.keys(newFilters).length == 0) {
                return true;
            }
            else {
                Object.keys(newFilters).forEach(key=> {
                    if (row[key].toLowerCase().includes(newFilters[key].toLowerCase()))result = true;
                })
            }
            return result;
        });
        this.setState({
            filters: newFilters,
            rows: rows
        });
    };
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
    saveQuestionSet = function (setName){
        var _this = this;
        var apiRequestData = {
            title:setName,
            isDefaultSet:false
        };
        return new Promise((resolve,reject)=>{

            QuestionSetAPI.setQuestionSet(apiRequestData).then(response=>{
                return response.json()
            }).then(json=>{
                if(json.status == "OK") {
                    _this.context.showMessage("Question set successfully saved.",1000);
                    this.addNewQuestionToTable(setName,json.id);
                    resolve({
                        status:"ok"
                    })
                }
                else {
                    _this.context.showMessage("Question set saving fail!",1000);
                    resolve({
                        status:"fail"
                    })
                }

            });

        })
    };
    addNewQuestionToTable = function (setName,id){
        var newQuestionSet = {
            title:setName,
            isDefaultSet:false,
            id:id,
            questionCount:0
        };
        var newRows = this.state.originalData;
        newRows.push(newQuestionSet);
        this.createTable(newRows);

    }
    getContent = function (){
        if(this.state.dataLoaded) {
            return <div>
                <QuestionSetCreateToolbar saveQuestionSet={this.saveQuestionSet}/>
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
        }
        else {
            return <CircularProgress color={"teal"} size={1}/>
        }
    };

    render(){
        return (

            <div>
                <h4>Question Set Details</h4><br/>
                {
                    this.getContent()
                }


            </div>


        );
    }
}

ListOfQuestionSet.contextTypes = {
    showMessage:React.PropTypes.func
};