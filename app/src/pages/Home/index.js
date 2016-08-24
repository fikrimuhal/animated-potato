import React                   from 'react'
import RaisedButton            from 'material-ui/RaisedButton'
import TextField               from 'material-ui/TextField'
import {browserHistory}        from 'react-router'
import {log2}                  from '../../utils/log2'
import * as s                  from '../../layouts/style'
import * as util               from '../../utils/utils'
import * as db                 from '../../utils/data'
const log=log2("StartTest");
export default class StartTest extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['onClick'])
    }

    onClick=function () {
        log(this.refs.txtEmail);
        var email=this.refs.txtEmail.input.value;
        log(this.props, this.props.location.search);
        var query="";
        if(this.props.location.search.length >0){
            query="?"+this.props.location.search + "&email=" + email;
        }
        //var query=this.props.location.search + "&email=" + email;
        log(query);
        browserHistory.push("/skilltest/?" + query)
    };
    componentWillMount=function () {
        if(db.isLoggedIn()) {
            browserHistory.push("/")
        }
        else {
            //browserHistory.push("/interview")
        }
    };
    render=function () {
        log("rendered");
        return (

            <div style={s.userLayoutStyles.signInContainer}>
                <h4>Fikrimuhal Mülakat Testi</h4>
                Eposta Adresiniz: <TextField ref="txtEmail" hintText={"Eposta"} floatingLabelText={"Eposta"}
                                             type={"email"} required="required"></TextField><br/>
                <RaisedButton label={"Test başla"} style={{float: "right"}} onClick={this.onClick}></RaisedButton>
            </div>
        )
    }
}
