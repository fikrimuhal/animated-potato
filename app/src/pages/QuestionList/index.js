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
import CircularProgress                     from 'material-ui/CircularProgress';
import  CategoryFilterToolbar               from './CategoryFilterToolbar'
import {Row, Col}                           from 'react-flexbox-grid'
import ResponseMessages                     from '../../utils/static-messages'
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
            selectedCategories: [-1],
            selectedCollections: [-1],
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
        // log("state",this.state);
        // log("nextState",nextState);
        // var im_currentProp = Immutable.fromJS(this.props, (k, v)=> {
        //     return v.toOrderedMap()
        // });
        // var im_nextProp = Immutable.fromJS(nextProps, (k, v)=> {
        //     return v.toOrderedMap()
        // });
        // var im_currentState = Immutable.fromJS(this.state, (k, v)=> {
        //     return v.toOrderedMap()
        // });
        // var im_nextState = Immutable.fromJS(nextState, (k, v)=> {
        //     return v.toOrderedMap()
        // });
        // var propEquality = im_currentProp.equals(im_nextProp);
        // var stateEquality = im_currentState.equals(im_nextState);
        // log("shouldComponentUpdate", propEquality, stateEquality, (!propEquality || !stateEquality));
        // return (!propEquality || !stateEquality);
        return true;
    };

    initializeData = function () {
        if (Cache.QuestionCaching.checkAll()) {
            log("**********From CACHE************");
            var rows = Cache.QuestionCaching.getAll();
            //this.initData(rows,[-1]);
            var tableData = this.convertTableRawData(rows);
            this.state = {
                rows: tableData,
                originalRows: tableData,
                filters: {},
                originalData: rows,
                dataWaiting: false,
                selectedCategories: [-1],
                selectedCollections: [-1]
            };
        }
        else {
            this.initializeFromAPI();
        }
    };
    initializeFromAPI = function () {
        log("**********From API************");
        QuestionAPI.getAll().then(response=> {
            response.json().then(
                json=> {
                    if (json.status == ResponseMessages.SESSION_EXPIRED || json.status == ResponseMessages.UNAUTHORIZED) {
                        util.clearToken();
                        this.context.showMessage(json.message, 2000);
                        setTimeout(()=> {
                            browserHistory.push("/signin")
                        }, 2000);
                        return;
                    }
                    else if (json.status == ResponseMessages.FORBIDDEN) {
                        browserHistory.push("/")
                    }
                    else {
                        var rows = json;
                        Cache.QuestionCaching.cacheAll(rows);
                        this.initData(rows, [-1], [-1]);
                    }

                }
            )
        })
    };
    initData = (rows, selectedCategories, selectedCollections)=> {
        var tableRows = this.convertTableRawData(rows);
        this.setState({
            rows: tableRows,
            originalRows: tableRows,
            originalData: rows,
            filters: {},
            dataWaiting: false,
            selectedCategories: selectedCategories,
            selectedCollections: selectedCollections
        });
    }
    convertTableRawData = function (rows) {
        var cloneOfRows = JSON.parse(JSON.stringify(rows));
        var selectedCategories = this.state.selectedCategories;
        var selectedCollections = this.state.selectedCollections;
        cloneOfRows = _.filter(cloneOfRows, o=> {
            var result = false;
            if (selectedCategories.includes(-1) && selectedCollections.includes(-1)) {
                result = true;
            }
            else {
                var isIncludeCategories = false, isIncludeCollection = false;

                selectedCategories.forEach(categoryId=> {

                    if (_.findIndex(o.categoryWeights, q => {
                            return q.id == categoryId
                        }) != -1 || selectedCategories.includes(-1)) {
                        isIncludeCategories = true;
                    }
                });

                selectedCollections.forEach(setId=> {
                    if (_.findIndex(o.setList, (item) => {
                            return item.id == setId
                        }) != -1 || selectedCollections.includes(-1)) {
                        isIncludeCollection = true;
                    }
                });
                //log("isIncludeCollection,isIncludeCategories",isIncludeCollection,isIncludeCategories)
                result = (selectedCollections.length == 0 || isIncludeCollection) && (selectedCategories.length == 0 || isIncludeCategories);
            }
            return result;
        })
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
            log("question delete error", err);
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
    categorySelectChanged = (id)=> {
        var selectedCategories = this.state.selectedCategories;
        //log("->selectedCategories", selectedCategories);
        if (selectedCategories.includes(id))
            _.pull(selectedCategories, id);
        else
            selectedCategories.push(id);

        //log("selectedCategories->", selectedCategories);
        this.initData(this.state.originalData, selectedCategories, this.state.selectedCollections);

    };
    collectionSelectChanged = (id)=> {
        log("handle collectionSelectChanged", id);
        var selectedCollections = this.state.selectedCollections;
        if (selectedCollections.includes(id))
            _.pull(selectedCollections, id);
        else
            selectedCollections.push(id);
        this.initData(this.state.originalData, this.state.selectedCategories, selectedCollections);
    }

    render() {
        var _this = this;
        log("this.state", this.state);
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
                                    <div>
                                        <Row>
                                            <Col lg={12} md={12}>
                                                <CategoryFilterToolbar
                                                    selectedCategories={_this.state.selectedCategories}
                                                    categorySelectChanged={_this.categorySelectChanged}
                                                    selectedCollections={this.state.selectedCollections}
                                                    collectionSelectChanged={this.collectionSelectChanged}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
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
                                        </Row>

                                    </div>

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
