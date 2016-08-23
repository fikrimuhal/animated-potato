import React            from 'react';
import {log2, util}     from '../../utils/';
import * as db          from '../../utils/data';
import ReactDataGrid    from 'react-data-grid';
import {Toolbar, Data}  from 'react-data-grid/addons';
import FlatButton       from 'material-ui/FlatButton';
import DeleteIcon       from 'material-ui/svg-icons/action/delete';
import ViewIcon         from 'material-ui/svg-icons/action/visibility';
import {browserHistory} from 'react-router'
import CircularProgress from 'material-ui/CircularProgress';
import * as Cache       from  '../../utils/cache'
require("!style!css!react-data-grid/themes/react-data-grid.css");

const Selectors=Data.Selectors;
const log=log2("ParticipantList");
var columns=[
    {
        key: 'id',
        name: 'NO',
        width: 70,
        resizable: false
    },
    {
        key: 'fullName',
        name: 'Full Name',
        filterable: true,
        sortable: true,
        width: 200,
        resizable: true
    },
    {
        key: 'date',
        name: 'Apply Date',
        filterable: true,
        sortable: true,
        width: 300,
        resizable: true
    },
    {
        key: 'score',
        name: 'Score',
        sortable: true,
        width: 100,
        resizable: false
    },
    {
        key: 'options',
        name: 'Options',
        width: 200
    }
]
export default class ParticipantList extends React.Component {

    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['getRows', 'getSize',
            'rowGetter', 'handleFilterChange',
            'handleGridSort', 'getOptionCell',
            'initializeDataFromCache','initializeDataFromApi']);
        this.state={
            dataLoaded: false,
            filters: {}
        };
        if(Cache.checkParticipantListFromCache())
            this.initializeDataFromCache();
        else
            this.initializeDataFromApi();

    };

    initializeDataFromCache=function () {
        log("Data from CACHE");
        var rows=Cache.getParticipantListFromCache();
        var tableData=this.convertTableRawData(rows);
        this.state={
            rows: tableData,
            originalRows: tableData,
            dataLoaded: true
        };
    };
    initializeDataFromApi=function () {
        log("Data from SERVER");
        db.getApplicantListFromAPI().then((rows)=> {
            rows = JSON.parse(rows);
            Cache.cacheParticipantList(rows);
            var tableData=this.convertTableRawData(rows);

            this.setState({
                rows: tableData,
                originalRows: tableData,
                dataLoaded: true
            });
        })
    };
    convertTableRawData=(rows)=> {
        var tableData=rows.map(r => {
            r.options=this.getOptionCell(r);
            return r;
        });
        return tableData;
    };
    getOptionCell=(rowData) => {
        return (<div>
            <FlatButton icon={<DeleteIcon/>} onClick={this.deleteRow(rowData.id)}></FlatButton>
            <FlatButton icon={<ViewIcon/>} onClick={this.viewRow(rowData.id)}></FlatButton>
        </div>);
    };
    deleteRow=index => ()=> {
        log("deleting row ->", index);
    };
    viewRow=index => ()=> {
        log("viewing row ->", index);
        browserHistory.push("/adminpanel/skilltestreport/" + index)
    };
    getRows=function () {
        return Selectors.getRows(this.state);
    }

    getSize=function () {
        return this.getRows().length;
    }

    rowGetter=function (rowIdx) {
        var rows=this.getRows();
        return rows[rowIdx];
    }

    handleFilterChange=function (filter) {
        let newFilters=Object.assign({}, this.state.filters);
        if(filter.filterTerm) {
            newFilters[filter.columnKey]=filter.filterTerm;
        }
        else {
            delete newFilters[filter.columnKey];
        }
        this.setState({filters: newFilters});
    }
    handleGridSort=function (sortColumn, sortDirection) {
        var comparer=function (a, b) {
            if(sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            }
            else if(sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        }
        var rows=sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
        this.setState({rows: rows});
    }

    render() {
        log("rendered");
        return (
            <div>
                <h4>Participant List</h4>
                <br/>
                <div>

                    {
                        (()=> {
                            var content;
                            if(this.state.dataLoaded) {
                                content=<ReactDataGrid
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
                                content=<div><CircularProgress size={1.5}/></div>
                            }

                            return content;
                        })()
                    }

                </div>
            </div>
        );
    }
}
