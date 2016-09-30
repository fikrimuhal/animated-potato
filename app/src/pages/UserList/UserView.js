import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem';
import React, {Component, PropTypes} from 'react';
import $ from "jquery";
import {DataTable} from 'react-jquery-datatables';

const users = {
    a: [1, 2, 3]
}

export default class UserProfiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: this.loadData()}

    }

    componentWillMount = function () {
        this.loadData();
    }
    loadData = function () {
        return this.props.users
    }
    componentDidMount = function () {
        var self = this;
        $('#mytable').dataTable({
            "sPaginationType": "full_numbers",
            "bAutoWidth": false,
            "bDestroy": true,
            "fnDrawCallback": function () {
                self.forceUpdate();
            },
        });
    }
    componentDidUpdate = function () {
        $('#mytable').dataTable({
            "sPaginationType": "full_numbers",
            "bAutoWidth": false,
            "bDestroy": true,
        });
    }
    render = function () {
        var x = this.state.data.map(function (d, index) {
            return <tr>
                <td>{d.a}</td>
                <td>{d.b}</td>
                <td><RaisedButton label="Düzenle" primary={true}/>
                    <RaisedButton label="Sil" secondary={true}/></td>
            </tr>
        });

        return (
            <div className="table-responsive">
                <h4>Users Profiles</h4>
                <table key={this.state.data.a} className="table table-bordered" id="mytable">
                    <thead>
                    <tr className="success">
                        <td>Id</td>
                        <td>Adı Soyadı</td>
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
