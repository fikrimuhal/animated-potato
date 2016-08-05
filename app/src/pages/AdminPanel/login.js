/**
 * Created by MYigit on 5.8.2016.
 */
import  React from 'react'
import {browserHistory} from 'react-router'
import Paper        from 'material-ui/Paper'
import TextField    from 'material-ui/TextField'
import RaisedButton    from 'material-ui/RaisedButton'
import {log2, util}   from '../../utils/'
import db from '../../utils/data.js'
import {Toast}          from '../../components/MyComponents'

//Styles
const styles = {
    paperStyle: {
        width: "500px",
        height: 300,
        margin: "0 auto",
        marginTop: "20px",
        padding: "10px",
        paddingLeft: "5%"
    },
    rightFloated: {
        float: "right",
        marginRight: "5px"
    }
}

//variables and consts
var toastHelper = null;

export default  class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toastSettings: {
                open: false,
                message: "",
                duration: 0
            }
        }
        util.bindFunctions.call(this, ['signIn']);
        toastHelper = util.myToast("toastSettings", this);
    }
    signIn=function () {
        var username = this.refs.username.input.value;
        var password = this.refs.password.input.value;
        if (username == "" || password == "") {
            toastHelper("Fields are required!", 2000);
            return;
        }
    }
    render = ()=> {
        return (
            <div>
                <Paper style={styles.paperStyle}>
                    <Subheader>Fikrimuhal HR - Admin Login</Subheader>
                    <TextField ref={"username"} hintText="Username" floatingLabelText="Username"/><br/>
                    <TextField ref={"password"} hintText="Password" floatingLabelText="Password"/> <br/>
                    <div>
                        <RaisedButton label="SignIn" primary={true} onClick={this.signIn}/>
                        <RaisedButton label="Forget password" secondary={true}/>
                    </div>
                </Paper>
                <Toast settings={this.state.toastSettings}/>
            </div>
        )
    }
}

