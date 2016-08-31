import React            from 'react';
import {log2,util}      from '../../utils/';
import * as db          from '../../utils/data';
import ReactDataGrid    from 'react-data-grid';
import {Toolbar,Data}   from 'react-data-grid/addons';
import FlatButton       from 'material-ui/FlatButton';
import DeleteIcon       from 'material-ui/svg-icons/action/delete';
import ViewIcon         from 'material-ui/svg-icons/action/visibility';
import {browserHistory} from 'react-router'
import CircularProgress from 'material-ui/CircularProgress';
import * as Cache       from  '../../utils/cache'
import * as api         from '../../utils/api'
import  moment          from 'moment'
require("!style!css!react-data-grid/themes/react-data-grid.css");

const Selectors = Data.Selectors;
const log = log2("User Profile")

var columns = [
    {
        key:'id',
        name:'NO',
        width:50,
        resizable:false
    },
    {
        key:'fullName',
        name:'Full Name',
        filterable:true,
        sortable:true,
        width:200,
        resizable:true
    },
    {
        key:'email',
        name:'Email',
        filterable:true,
        sortable:true,
        width:200,
        resizable:false
    },
    {
        key:'phone',
        name:'Phone',
        filterable:true,
        sortable:true,
        width:150,
        resizable:false
    },
    {
        key:'date',
        name:'Apply Date',
        filterable:true,
        sortable:true,
        width:200,
        resizable:true
    },
    {
        key:'score',
        name:'Score',
        sortable:true,
        width:75,
        resizable:false
    },
    {
        key:'options',
        name:'Options',
        width:250
    }
]
export default class UserList extends React.Component {
    constructor(props){
        super(props);
        util.bindFunctions.call(this,['getRows','getSize',
            'rowGetter','handleFilterChange',
            'handleGridSort','getOptionCell',
            'initializeDataFromCache','initializeDataFromApi']);
        this.state = {
            filters:{},
            dataLoaded:false
        };

        if(Cache.checkParticipantListFromCache())
            this.initializeDataFromCache();
        else
            this.initializeDataFromApi();

    }

    initializeDataFromCache = function (){
        log("Data from CACHE");
        var rows = Cache.getParticipantListFromCache();
        var tableData = this.convertTableRawData(rows);
        this.state = {
            rows:tableData,
            originalRows:tableData,
            dataLoaded:true
        };
    };
    initializeDataFromApi = function (){
        log("Data from SERVER");
        api.getParticipants().then(response=>{
            return response.json();
        }).then(json=>{
            var rows = json;
            Cache.cacheParticipantList(rows);
            var tableData = this.convertTableRawData(rows);
            this.setState({
                rows:tableData,
                originalRows:tableData,
                dataLoaded:true
            });
        });

        // db.getApplicantListFromAPI().then((rows)=>{
        //         originalRows:tableData,
        //         dataLoaded:true
        //     });
        // })
        //     rows = JSON.parse(rows);
        //     Cache.cacheParticipantList(rows);
        //     var tableData = this.convertTableRawData(rows);
        //     this.setState({
        //         rows:tableData,
    };
    convertTableRawData = (rows)=>{
        var tableData = rows.map(r =>{
            r.options = this.getOptionCell(r);
            r.date = moment().format('LLL')
            r.fullName = r.name + ' ' + r.lastname;
            r.score = Math.floor(Math.random() * 100);

            return r;
        });
        return tableData;
    };
    getOptionCell = (rowData) =>{
        return (<div>
            <FlatButton icon={<DeleteIcon/>} onClick={this.deleteRow(rowData.id)}></FlatButton>
            <FlatButton icon={<ViewIcon/>} onClick={this.viewRow(rowData.id)}></FlatButton>
        </div>);
    };
    deleteRow = index => ()=>{
        log("deleting row ->",index);
    };
    viewRow = index => ()=>{
        log("viewing row ->",index);
        browserHistory.push("/adminpanel/skilltestreport/" + index)
    };
    getRows = function (){
        return Selectors.getRows(this.state);
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
                    <h4>List of User</h4>
                </div>
                <br/>
                <div>
                    {
                        (()=>{
                            var content;
                            if(this.state.dataLoaded) {
                                content = <ReactDataGrid
                                    columns={columns}
                                    rowGetter={this.rowGetter}
                                    enableCellSelect={true}
                                    rowsCount={this.getSize()}
                                    minHeight={500}
                                    toolbar={<Toolbar enableFilter={true}/>}
                                    onAddFilter={this.handleFilterChange}
                                    onGridSort={this.handleGridSort}

                                />
                            }
                            else {
                                content = <div><CircularProgress size={1.5}/></div>
                            }

                            return content;
                        })()
                    }


                </div>
            </div>
        );
    }
}
