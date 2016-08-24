import React        from 'react'
import FlatButton   from 'material-ui/FlatButton'
import TextField    from 'material-ui/TextField'
import RaisedButton    from 'material-ui/RaisedButton'
import {browserHistory}       from 'react-router'
import Subheader    from 'material-ui/Subheader'
import * as s       from '../../layouts/style'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import LinearProgress from 'material-ui/LinearProgress';
//my imports
import log2 from '../../utils/log2'
import * as util from '../../utils/utils'
import * as api from '../../utils/api'
import * as db from '../../utils/data.js'
import {Toast}          from '../../components/MyComponents'

//variables and consts
var toastHelper=null;
const log=log2("SignIn.js");
//Styles
const styles={
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
    header: {
        fontSize: "15px"

    },
    refresh: {
        margin: "0 auto",
        marginLeft: "20%"
    }
}

export default class UserSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            toastSettings: {
                open: false,
                message: "",
                duration: 0
            },
            progressDisplay: "none"
        }
        util.bindFunctions.call(this, ['signIn', 'signUp', 'onKeyDown']);
        toastHelper=util.myToast("toastSettings", this);
    }

    displayProgress=function (mode) {
        this.setState({
            progressDisplay: mode
        });
    };
    signIn=function () {
        this.displayProgress("");
        var username=this.refs.username.input.value;
        var password=this.refs.password.input.value;
        //validation
        if(username == "" || password == "") {
            toastHelper("Kullanıcı adı ve şifre alanlarını boş geçilemez!.", 2000);
            this.displayProgress("none");
            return;
        }
        //api request type
        var loginRequest={
            "username": username,
            "password": password
        };

        api.authenticate(loginRequest).then(response=> {
            response.json().then(json=> {
                log(json, response.headers.get("Authorization"));
                if(json.status == "fail") {
                    toastHelper(json.message, 2000);
                }
                else if(json.status == "ok") {
                    toastHelper("Kullanıcı adı şifre doğru.", 2000);
                    util.setToken(response.headers.get("Authorization"));
                    json.userInfo.admin=json.isAdmin;
                    db.setUserInfo(json.userInfo);
                    if(json.isAdmin) browserHistory.push("/adminpanel");
                    else browserHistory.push("/home");
                }
                else {
                    log("error unexpected", json, response)
                    toastHelper("Sunucuda hata oluştu,tekrar deneyiniz.", 1000);
                    this.displayProgress("none");
                }
            });
            this.displayProgress("none");
        }).catch(err=> {
            log("error", err);
            toastHelper("Sunucuda hata oluştu,tekrar deneyiniz.", 1000);
            this.displayProgress("none");
        });

    };
    signUp=function () {
        browserHistory.push("/signup");
    };
    onKeyDown=function (event, keyCode) {
        // console.log(event);
        // console.log(keyCode);
        this.signIn();
    }
    render=function () {
        return (
            <div className="xx" style={s.userLayoutStyles.signInContainer}>
                <Subheader style={styles.header}><b> Fikrimuhal HR - Giriş</b></Subheader>

                <TextField ref={"username"} hintText="Kullanıcı Adı/Eposta"
                           floatingLabelText="Kullanıcı Adı/Eposta"/><br/>
                <TextField ref={"password"} hintText="Şifre" floatingLabelText="Şifre"
                           onEnterKeyDown={(e, v)=>this.onKeyDown(e, v)}/> <br/>
                <div>
                    <RaisedButton label="Giriş" primary={true} onClick={this.signIn}
                                  disabled={this.state.progressDisplay != "none"}/>
                    <FlatButton label="Kayıt ol" onClick={this.signUp} style={{marginLeft: "10px"}}/>
                    <FlatButton label="Şifremi unuttum.."/>
                </div>
                <br/>
                <LinearProgress mode="indeterminate" color="red" style={{display: this.state.progressDisplay}}/>


                <Toast settings={this.state.toastSettings}/>
            </div>
        )
    }
}
