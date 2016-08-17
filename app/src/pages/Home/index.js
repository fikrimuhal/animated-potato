import React        from 'react'
import RaisedButton   from 'material-ui/RaisedButton'
import FontIcon     from 'material-ui/FontIcon';
import Paper        from 'material-ui/Paper'
import TextField    from 'material-ui/TextField'
import {Link, browserHistory}       from 'react-router'
import {log2}       from '../../utils/log2'
import * as s       from '../../layouts/style'
import * as util    from '../../utils/utils'
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
        var query=this.props.location.search + "&email=" + email;
        log(query);
        browserHistory.push("/skilltest" + query)
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
