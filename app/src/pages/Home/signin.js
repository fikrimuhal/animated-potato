import React        from 'react'
import FlatButton   from 'material-ui/FlatButton'
import TextField    from 'material-ui/TextField'
import RaisedButton    from 'material-ui/RaisedButton'
import FontIcon     from 'material-ui/FontIcon';
import Paper        from 'material-ui/Paper'
import {Link, browserHistory}       from 'react-router'
import Subheader    from 'material-ui/Subheader'
import * as s       from '../../layouts/style'
//my imports
import {log2, util}   from '../../utils/'
import * as db from '../../utils/data.js'
import {Toast}          from '../../components/MyComponents'

//variables and consts
var toastHelper = null;

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
    },
    header:{
        fontSize:"15px"

    }
}

export default class UserSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toastSettings: {
                open: false,
                message: "",
                duration: 0
            }
        }
        util.bindFunctions.call(this, ['signIn','signUp','onKeyDown']);
        toastHelper = util.myToast("toastSettings", this);
    }

    signIn = function () {
        var username = this.refs.username.input.value;
            var password = this.refs.password.input.value;
            if (username == "" || password == "") {
                toastHelper("Fields are required!", 2000);
                return;
        }
        db.authenticate(username, password).then((message)=> {
            console.log("authenticate then", message);
            if (message.status == "ok") {
                util.setToken(message.token);
                db.setUserInfo(message.userInfo);
                if(db.isUser())
                    browserHistory.push("/home");
                else
                    browserHistory.push("/adminpanel");
            }
            else {
                toastHelper("Authentication failed. Try again", 1000);
            }

        });


    }
    signUp = function () {
        browserHistory.push("/signup");
    };
    onKeyDown= function(event,keyCode){
        // console.log(event);
        // console.log(keyCode);
        this.signIn();
    }
    render = function () {
        return (
            <div className="xx" style={s.userLayoutStyles.signInContainer}>
                    <Subheader style={styles.header}><b> Fikrimuhal HR - Giriş</b></Subheader>
                    <TextField ref={"username"} hintText="Kullanıcı Adı/Eposta" floatingLabelText="Kullanıcı Adı/Eposta"/><br/>
                    <TextField ref={"password"} hintText="Şifre" floatingLabelText="Şifre" onEnterKeyDown={(e,v)=>this.onKeyDown(e,v)} /> <br/>
                    <div>
                        <RaisedButton label="Giriş" primary={true} onClick={this.signIn}/>
                        <FlatButton label="Kayıt ol"  onClick={this.signUp} style={{marginLeft:"10px"}}/>
                        <FlatButton label="Şifremi unuttum.."/>
                    </div>

                <Toast settings={this.state.toastSettings}/>
            </div>
        )
    }
}
