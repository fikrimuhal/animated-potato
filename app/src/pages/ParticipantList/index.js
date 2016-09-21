import React            from 'react';
import {log2, util}      from '../../utils/';
import * as db          from '../../utils/data';
import ReactDataGrid    from 'react-data-grid';
import {Toolbar, Data}   from 'react-data-grid/addons';
import FlatButton       from 'material-ui/FlatButton';
import DeleteIcon       from 'material-ui/svg-icons/action/delete';
import ViewIcon         from 'material-ui/svg-icons/action/visibility';
import {browserHistory} from 'react-router'
import CircularProgress from 'material-ui/CircularProgress';
import * as Cache       from  '../../utils/cache'
import * as api         from '../../utils/api'
import  moment          from 'moment'
import {Row, Col}        from 'react-flexbox-grid'
import * as _           from 'lodash'
require("!style!css!react-data-grid/themes/react-data-grid.css");

const Selectors = Data.Selectors;
const log = log2("ParticipantList");
var columns = [
    {
        key: 'interviewId',
        name: 'ID',
        width: 40,
        resizable: false
    },
    {
        key: 'fullName',
        name: 'Full Name',
        filterable: true,
        sortable: true,
        width: 150,
        resizable: true
    },
    {
        key: 'email',
        name: 'Email',
        filterable: true,
        sortable: true,
        width: 160,
        resizable: false
    },
    {
        key: 'phone',
        name: 'Phone',
        filterable: true,
        sortable: true,
        width: 100,
        resizable: false
    },
    {
        key: 'date',
        name: 'Apply Date',
        filterable: true,
        sortable: true,
        width: 120,
        resizable: true
    },
    {
        key: 'formattedScore',
        name: 'Score',
        sortable: true,
        width: 50,
        resizable: false
    },
    {
        key: 'options',
        name: 'Options'

    }
]
export default class ParticipantList extends React.Component {

    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['getRows', 'getSize',
            'rowGetter', 'handleFilterChange',
            'handleGridSort', 'getOptionCell',
            'initializeDataFromCache', 'initializeDataFromApi']);
        this.state = {
            dataLoaded: false,
            filters: {}
        };
        if (Cache.ParticipantsCache.check())
            this.initializeDataFromCache();
        else
            this.initializeDataFromApi();

    };

    initializeDataFromCache = function () {
        log("Data from CACHE");
        var rows = Cache.ParticipantsCache.get();
        var tableData = this.convertTableRawData(rows);
        this.state = {
            rows: tableData,
            originalRows: tableData,
            dataLoaded: true
        };
    };
    initializeDataFromApi = function () {
        log("Data from SERVER");
        // api.getParticipants().then(response=>{
        //     return response.json();
        // }).then(json=>{
        //     var rows = json;
        //     Cache.ParticipantsCache.cache(rows);
        //     var tableData = this.convertTableRawData(rows);
        //     this.setState({
        //         rows:tableData,
        //         originalRows:tableData,
        //         dataLoaded:true
        //     });
        // });

        api.getApplicants().then(response=> {
            return response.json()
        }).then(json=> {
            var rows = json;
            Cache.ParticipantsCache.cache(rows);
            var tableData = this.convertTableRawData(rows);
            this.setState({
                rows: tableData,
                originalRows: tableData,
                dataLoaded: true
            });
        })

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
    convertTableRawData = (rows)=> {

        var tableData = rows.map(r => {
            r.options = this.getOptionCell(r);
            r.date = moment(r.applyDate, "DD-MM-YYYY hh:mm:ss").format('YYYY-MM-DD');
            r.fullName = r.info.name + ' ' + r.info.lastname;
            r.email = r.info.email;
            r.phone = r.info.phone;
            r.formattedScore = (r.averageScore * 100).toFixed(2);

            //r.score = Math.floor(Math.random() * 100);

            return r;
        });
        var sortedData=_.orderBy(tableData,["date","averageScore"],["desc","desc"]);
        return sortedData;
    };
    getOptionCell = (rowData) => {
        return (<Row>
            <Col lg={3}>
                <FlatButton icon={<DeleteIcon/>} onClick={this.deleteRow(rowData.interviewId)}
                            style={{minWidth: "50px"}}></FlatButton>
            </Col>
            <Col lg={3}>
                <FlatButton icon={<ViewIcon/>} onClick={this.viewRow(rowData.info.id, rowData.interviewId)}
                            style={{minWidth: "50px"}}></FlatButton>
            </Col>
        </Row>);
    };
    deleteRow = index => ()=> {
        log("deleting row ->", index);
    };
    viewRow = (userId, interviewId) => ()=> {
        log("viewing row ->", interviewId);
        browserHistory.push("/dashboard/skilltestreport/" + userId + "/" + interviewId);
    };
    getRows = function () {
        return Selectors.getRows(this.state);
    }

    getSize = function () {
        return this.getRows().length;
    }

    rowGetter = function (rowIdx) {
        var rows = this.getRows();
        return rows[rowIdx];
    }

    handleFilterChange = function (filter) {
        //TODO filtering calışmıyor
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.columnKey] = filter.filterTerm;
        }
        else {
            delete newFilters[filter.columnKey];
        }
        this.setState({filters: newFilters});
    }
    handleGridSort = function (sortColumn, sortDirection) {
        log("rows-1", this.state.rows)
        var comparer = function (a, b) {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            }
            else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        }
        //var rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
        if (sortDirection != 'NONE') {
            log("rows-2", this.state.rows.sort(comparer))
        }
        //this.setState({rows:rows});
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
