//imports
import React                                from 'react'
import RaisedButton                         from 'material-ui/RaisedButton';
import ReactDataGrid                        from 'react-data-grid';
import {Toolbar, Data}                       from 'react-data-grid/addons';
import FlatButton                           from 'material-ui/FlatButton';
import DeleteIcon                           from 'material-ui/svg-icons/action/delete';
import ViewIcon                             from 'material-ui/svg-icons/action/visibility';
import {browserHistory}                     from 'react-router'
import  {QuestionAPI}                       from '../../utils/api'
import * as Cache                           from '../../utils/cache'
import * as util                            from '../../utils/utils'
import  log2                                from '../../utils/log2'
import * as db                              from '../../utils/data'
import * as _                               from 'lodash'
import  Immutable                           from 'immutable'
import CircularProgress from 'material-ui/CircularProgress';
require("!style!css!react-data-grid/themes/react-data-grid.css")

const Selectors = Data.Selectors;
const log = log2("Question List");
var columns = [
    {
        key: 'id',
        name: 'ID',
        width: 80,
        filterable: true,
        resizable: false,
        sortable: true
    },
    {
        key: 'title',
        name: 'Title',
        sortable: true,
        editable: true,
        filterable: true
    },
    {
        key: 'qType',
        name: 'Answer Type',
        filterable: true,
        resizable: false,
        sortable: true
    },

    {
        key: 'options',
        name: 'Options'
    },
];

export default class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            filters: {},
            originalRows: [],
            originalData: [],
            dataWaiting: true
        };
        util.bindFunctions.call(this, ['getRows', 'getSize',
            'rowGetter', 'handleFilterChange', 'handleClearFilters',
            'handleGridSort', 'handleRowUpdated', 'createNew', 'initializeData']);

        this.initializeData();
    }

    shouldComponentUpdate = (nextProps, nextState)=> {
        var im_currentProp = Immutable.fromJS(this.props, (k, v)=> {
            return v.toOrderedMap()
        });
        var im_nextProp = Immutable.fromJS(nextProps, (k, v)=> {
            return v.toOrderedMap()
        });
        var im_currentState = Immutable.fromJS(this.state, (k, v)=> {
            return v.toOrderedMap()
        });
        var im_nextState = Immutable.fromJS(nextState, (k, v)=> {
            return v.toOrderedMap()
        });
        var propEquality = im_currentProp.equals(im_nextProp);
        var stateEquality = im_currentState.equals(im_nextState);
        //log("shouldComponentUpdate", propEquality, stateEquality, (!propEquality || !stateEquality));
        return (!propEquality || !stateEquality);
    };

    initializeData = function () {
        if (Cache.QuestionCaching.checkAll()) {
            log("**********From CACHE************");
            var rows = Cache.QuestionCaching.getAll();
            var tableData = this.convertTableRawData(rows);
            this.state = {
                rows: tableData,
                originalRows: tableData,
                filters: {},
                originalData: rows,
                dataWaiting: false
            };
        }
        else {
            this.initializeFromAPI();
        }
    };
    initializeFromAPI = function () {
        log("**********From API************");
        QuestionAPI.getAll().then(response=>response.json()).then(json=> {
            var rows = json;
            Cache.QuestionCaching.cacheAll(rows);
            rows = this.convertTableRawData(rows);

            this.setState({
                rows: rows,
                originalRows: rows,
                originalData: rows,
                filters: {},
                dataWaiting: false
            });
        });
    };
    convertTableRawData = function (rows) {
        var cloneOfRows = JSON.parse(JSON.stringify(rows));
        var tableData = cloneOfRows.map(r => {
            r.options = this.getOptionCell(r)
            return r;
        });
        return tableData;
    };
    getOptionCell = (rowData) => {
        return (<div>
            <FlatButton icon={<DeleteIcon/>} onClick={this.deleteQuestion(rowData.id)}></FlatButton>
            <FlatButton icon={<ViewIcon/>} onClick={this.viewQuestion(rowData.id)}></FlatButton>
        </div>);
    };
    createNew = function () {
        browserHistory.push('/dashboard/QuestionAdd')
    };
    deleteQuestion = id => ()=> {
        log("deleting-> ", id);
        QuestionAPI.deleteById({id: id}).then(response=> {
            return response.json()
        }).then(json=> {
            if (json.status == "OK") {
                this.context.showMessage("Question deleted", 2000);
                var rows = this.state.originalData;
                rows = _.filter(rows, q => {
                    return q.id != id
                });
                this.setState({
                    rows: rows
                });
                Cache.QuestionCaching.clear();
            }
            else if (status == "FAIL") {
                this.context.showMessage("Deleting Fail!", 2000);
            }
        }).catch(err=> {
            log("question delete error",err);
            this.context.showMessage("An error occured", 2000);
        });
    };
    viewQuestion = id => ()=> {
        log("viewing-> ", id);
        browserHistory.push("/dashboard/QuestionDetail/" + id);
    };
    getRows = function () {
        return Selectors.getRows(this.state);
    }
    handleRowUpdated = function (e) {

        var rows = this.state.rows;
        Object.assign(rows[e.rowIdx], e.updated);
        this.setState({rows: rows});
    }

    getSize = function () {
        return this.getRows().length;
    };
    rowGetter = function (rowIdx) {
        var rows = this.getRows();
        return rows[rowIdx];
    };

    handleFilterChange = function (filter) {
        //log("handleFilterChange", filter)
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter.filterTerm;
        }
        else {
            delete newFilters[filter.column.key];
        }

        var rows = this.state.originalRows;

        rows = _.filter(rows, row=> {
            var result = false;
            if (Object.keys(newFilters).length == 0) {
                return true;
            }
            else {
                Object.keys(newFilters).forEach(key=> {
                    if (row[key].toLowerCase().includes(newFilters[key].toLowerCase())) result = true;
                })
            }
            return result;
        });
        this.setState({
            filters: newFilters,
            rows: rows
        });

    };
    handleGridSort = function (sortColumn, sortDirection) {
        var comparer = function (a, b) {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            }
            else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        };
        var rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
        this.setState({rows: rows});
    };
    handleClearFilters = function () {
        //all filters removed
        this.setState({filters: {}});
    };

    render() {
        return (

            <div>
                <div>
                    <br/>
                    <h4>Question List</h4>
                    <RaisedButton label="+Create New" secondary={true} onClick={()=> this.createNew()}
                                  style={{float: "right"} }/>
                </div>

                <div>
                    {
                        (()=> {
                            //log("this.state.dataWaiting", this.state.dataWaiting);
                            var content;
                            if (this.state.dataWaiting) {
                                content = <CircularProgress size={1}/>
                            }
                            else {
                                content =
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
                            }
                            return content;
                        })()
                    }

                </div>
            </div>
        );
    }
}

QuestionList.contextTypes = {
    showMessage: React.PropTypes.func
};
