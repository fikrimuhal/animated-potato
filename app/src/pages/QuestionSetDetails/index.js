import React from 'react'
require("!style!css!react-data-grid/themes/react-data-grid.css")
import {Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import {db,log2,util} from '../../utils/'
import {Table} from 'material-ui/Table';
import ReactDataGrid from 'react-data-grid';
import {Toolbar,Data} from 'react-data-grid/addons';
import _ from 'lodash'
import TextField from 'material-ui/TextField';

//const and variable
const Selectors = Data.Selectors;
const log = log2("Question Set Details")
//log("Question Set ReactDataGrid",Data)

const styles = {
    customWidth:{
        width:150,
    },
};

var questionSetInstance;

class ButtonsColFormatter extends React.Component {
    constructor(props){
        super(props);
        this.state={
          dataWaiting:true
        };
        util.bindFunctions.call(this,['onClick'])
    }

    onClick = function (){
        console.dir(questionSetInstance);
        var rows = questionSetInstance.state.rows;
        var news = _.filter(rows,(o)=>{return o.id != this.props.value});
        questionSetInstance.state = {
            rows:news,
            originalRows:news,
            filters:{}
        };
        questionSetInstance.forceUpdate();

    }
    render = function (){
        console.log("ButtonsColFormatter");
        return (<div style={{padding:"5px 5px 5px 5px"}}>
            <RaisedButton primary={true} onClick={this.onClick}>Sil</RaisedButton>
        </div>)
    }
}

var columns = [
    {
        key:'id',
        name:'ID',
        width:80,
        filterable:true
    },
    {
        key:'title',
        name:'Set Adı',
        sortable:true,
        editable:true,
        filterable:true
    },
    {
        key:'count',
        name:'Soru Sayısı',
        sortable:true
    },
    {
        key:'id',
        name:'İşlemler',
        formatter:ButtonsColFormatter
    }
]

export default class QuestionSetDetails extends React.Component {
    constructor(props){
        super(props);
        var rows = db.getQuestionSetAddToStorage();
        this.state = {
            rows:rows,filters:{},
            originalRows:rows
        };
        util.bindFunctions.call(this,['getRows','getSize',
            'rowGetter','handleFilterChange',
            'handleGridSort','handleRowUpdated','handleSetSave'])
        questionSetInstance = this;
    }

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
                <div>
                    <br/>
                    <h4>Question Set Details</h4>
                </div>
                <div>
                    <TextField ref="inputQuestionSet"
                               hintText="Soru Seti Ekle"
                    />
                    <br/>
                    <RaisedButton label="Ekle" secondary={true} onClick={this.handleSetSave}/>
                </div>

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
