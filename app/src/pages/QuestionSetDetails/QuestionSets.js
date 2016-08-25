import RaisedButton                 from 'material-ui/RaisedButton';
import {Table,TableBody,TableHeader,
        TableHeaderColumn,TableRow,
        TableRowColumn}             from 'material-ui/Table';
import TextField                    from 'material-ui/TextField'
import React,{Component,PropTypes}  from 'react';
import $                            from "jquery";
import {DataTable}                  from 'react-jquery-datatables';
import QuestionSetCreateToolbar     from './SetCreateToolbar'


export default class QuestionSets extends React.Component {
    constructor(props){
        super(props);
        this.state = {data:this.loadData()};
    }

    loadData = function (){
        return this.props.sets
    }
    componentDidMount = function (){
        var self = this;
        $('#mytable').dataTable({
            "sPaginationType":"full_numbers",
            "bAutoWidth":false,
            "bDestroy":true,
            "fnDrawCallback":function (){
                self.forceUpdate();
            },
        });
    }
    componentDidUpdate = function (){
        $('#mytable').dataTable({
            "sPaginationType":"full_numbers",
            "bAutoWidth":false,
            "bDestroy":true,
        });
    }
    handleSetAdd = function (){

    }
    render = function (){
        var x = this.state.data.map(function (d,index){
            return <tr>
                <td>{d.title}</td>
                <td>{d.count}</td>
                <td><RaisedButton label="Düzenle" primary={true}/>
                    <RaisedButton label="Sil" secondary={true}/></td>
            </tr>
        })
        return (
            <div className="table-responsive">
                <h4>Users Profiles</h4>
                <table key={this.state.data.count} className="table table-bordered" id="mytable">
                    <thead>
                    <tr className="success">
                        <td>Soru Seti Adı</td>
                        <td>Soru Sayısı</td>
                        <td>İşemler</td>
                    </tr>
                    </thead>
                    <tbody>
                    {x}
                    </tbody>
                </table>

            </div>
        );
    }
}
