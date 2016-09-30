import React            from 'react';
import {log2, util}      from '../../utils/';
import * as db          from '../../utils/data';
import ReactDataGrid    from 'react-data-grid';
import {Toolbar, Data}   from 'react-data-grid/addons';
import FlatButton       from 'material-ui/FlatButton';
import DeleteIcon       from 'material-ui/svg-icons/action/delete';
import ViewIcon         from 'material-ui/svg-icons/action/visibility';
import GavelIcon         from 'material-ui/svg-icons/action/gavel';
import {browserHistory} from 'react-router'
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import * as Cache       from  '../../utils/cache'
import * as api         from '../../utils/api'
import  moment          from 'moment'
import * as _           from 'lodash'
require("!style!css!react-data-grid/themes/react-data-grid.css");

const Selectors = Data.Selectors;
const log = log2("User List")

var columns = [
    {
        key: 'id',
        name: 'NO',
        width: 50,
        resizable: false
    },
    {
        key: 'fullName',
        name: 'Full Name',
        filterable: true,
        sortable: true,
        width: 170,
        resizable: true
    },
    {
        key: 'email',
        name: 'Email',
        filterable: true,
        sortable: true,
        width: 180,
        resizable: false
    },
    {
        key: 'phone',
        name: 'Phone',
        filterable: true,
        sortable: true,
        width: 130,
        resizable: false
    },
    {
        key: 'options',
        name: 'Options'
    }
]
export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['getRows', 'getSize',
            'rowGetter', 'handleFilterChange',
            'handleGridSort', 'getOptionCell',
            'initializeDataFromCache', 'initializeDataFromApi']);
        this.state = {
            filters: {},
            rows: [],
            originalData: [],
            originalRows: [],
            dataLoaded: false,
            showWaitingPanel: false
        };

        if (Cache.UserCaching.check())
            this.initializeDataFromCache();
        else
            this.initializeDataFromApi();

    }

    initializeDataFromCache = function () {
        log("Data from CACHE");
        var rows = Cache.UserCaching.getAll();
        var tableData = this.convertTableRawData(rows);
        this.state = {
            rows: tableData,
            originalRows: tableData,
            originalData: rows,

            dataLoaded: true
        };
    };
    initializeDataFromApi = function () {
        log("Data from SERVER");
        api.UserAPI.getUsers().then(response=> {
            return response.json();
        }).then(json=> {
            var rows = json;
            Cache.UserCaching.cache(rows);
            this.initTable(rows);
        });

    };
    initTable = function (data) {
        var tableData = this.convertTableRawData(data);
        this.setState({
            rows: tableData,
            originalRows: tableData,
            originalData: data,
            dataLoaded: true,
            showWaitingPanel: false
        });
    };
    convertTableRawData = (rows)=> {
        var data = JSON.parse(JSON.stringify(rows));
        var tableData = data.map(r => {
            r.options = this.getOptionCell(r);
            r.fullName = r.name + ' ' + r.lastName;
            return r;
        });
        return tableData;
    };
    getOptionCell = (rowData) => {
        return (<div>
            <FlatButton icon={<DeleteIcon/>} onClick={this.deleteUser(rowData.id)}></FlatButton>
            <FlatButton icon={<GavelIcon/>} onClick={this.makeStaff(rowData.id)} label={"Make Staff"}></FlatButton>
        </div>);
    };
    makeStaff = id => ()=> {
        var _this = this;
        log("makeStaff row ->", id);
        _this.setState({
            showWaitingPanel: true
        });
        api.UserAPI.makeStaff({
            id: id
        }).then(response=> {
            return response.json()
        }).then(json=> {
            if (json.status == "OK") {
                _this.context.showMessage("This user has been marked staff. Can see on staff list", 2000);
                var rows = _this.state.originalData;
                rows = _.filter(rows, q => q.id != id);
                _this.initTable(rows);
                Cache.UserCaching.clear();
                Cache.StaffCaching.clear();
            }
            else if (json.status == "FAIL") {
                _this.context.showMessage("Operation failed.", 2000);
            }
        });

    };
    viewRow = id => ()=> {
        //log("viewing row ->",id);
        browserHistory.push("/dashboard/skilltestreport/" + id)
    };
    deleteUser = id => ()=> {
        var _this = this;
        api.UserAPI.deleteUser({id: id}).then(response=> {
            return response.json()
        }).then(json=> {
            if (json.status == "OK") {
                _this.context.showMessage("This user has been deleted.", 2000);
                Cache.UserCaching.clear();
                var rows = this.state.originalData;
                rows = _.filter(rows, q => {
                    return q.id != id
                });
                _this.initTable(rows);
            }
            else if (json.status == "FAIL") {
                _this.context.showMessage("Deleting fail.", 2000);
            }
            else {
                _this.context.showMessage("An error occured.", 2000);
            }

        }).catch(err=> {
            _this.context.showMessage("An error occured.", 2000);
        });

    };
    getRows = function () {
        return Selectors.getRows(this.state);
    };
    getSize = function () {
        return this.getRows().length;
    };
    rowGetter = function (rowIdx) {
        var rows = this.getRows();
        return rows[rowIdx];
    };

    handleFilterChange = function (filter) {
        //log(filter);
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter.filterTerm;
        }
        else {
            delete newFilters[filter.column.key];
        }
        //log("filter",newFilters);
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
    }
    handleGridSort = function (sortColumn, sortDirection) {
        var comparer = function (a, b) {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            }
            else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        }
        var rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
        this.setState({rows: rows});
    }

    render() {
        return (
            <div>
                <div>
                    <br/>
                    <h4>List of User</h4>
                </div>
                <br/>
                <div>
                    <LinearProgress mode="indeterminate" color="red"
                                    style={{display: this.state.showWaitingPanel ? "" : "none"}}/>
                    {
                        (()=> {
                            var content;
                            if (this.state.dataLoaded) {
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
UserList.contextTypes = {
    showMessage: React.PropTypes.func
};