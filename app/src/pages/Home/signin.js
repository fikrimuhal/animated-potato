import React        from 'react'
import FlatButton   from 'material-ui/FlatButton'
import TextField    from 'material-ui/TextField'
import RaisedButton    from 'material-ui/RaisedButton'
import {browserHistory}       from 'react-router'
import Subheader    from 'material-ui/Subheader'
import * as s       from '../../layouts/style'
import LinearProgress from 'material-ui/LinearProgress';
import log2 from '../../utils/log2'
import * as util from '../../utils/utils'
import * as api from '../../utils/api'
import * as db from '../../utils/data.js'
import {Toast}          from '../../components/MyComponents'
require("../../utils/extentions")
//variables and consts
var toastHelper = null;
const log = log2("SignIn.js");
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
        this.state = {
            toastSettings: {
                open: false,
                message: "",
                duration: 0
            },
            progressDisplay: "none"
        }
        util.bindFunctions.call(this, ['signIn', 'signUp', 'onKeyDown']);
        toastHelper = util.myToast("toastSettings", this);
    }

    componentWillMount = function () {
        if (db.isLoggedIn()) {
            if (db.isUser()) {
                browserHistory.push("/home")
            }
            else if (db.isAdmin()) {
                browserHistory.push("/adminpanel")
            }
        }
        else {
            //browserHistory.push("/signin")
        }
    };
    displayProgress = function (mode) {
        this.setState({
            progressDisplay: mode
        });
    };
    signIn = function () {
        this.displayProgress("");
        var email =  String(this.refs.email.input.value);
        var password = this.refs.password.input.value;
        //validation
        if (email == "" || password == "") {
            toastHelper("Eposta ve şifre alanlarını boş geçilemez!.", 2000);
            this.displayProgress("none");
            return;
        }
        else if(!email.validateForEmail())
        {
            toastHelper("Eposta formatı yanlış", 2000);
            this.displayProgress("none");
            return;
        }

        var loginRequest = {
            "email": email,
            "password": password
        };

        api.authenticate(loginRequest).then(response=> {
            response.json().then(json=> {
                log(json, response.headers.get("Authorization"));
                if (json.status == "FAIL") {
                    toastHelper(json.message, 2000);
                }
                else if (json.status == "OK") {
                    //toastHelper("Eposta adı şifre doğru.", 2000);
                    log("authorization header", response.headers.get("Authorization"));
                    util.setToken(response.headers.get("Authorization"));
                    json.userInfo.admin = json.isAdmin;
                    db.setUserInfo(json.userInfo);
                    if (json.isAdmin) browserHistory.push("/dashboard");
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

        //api çalışmadığında buradan giriş yapınız - test amaçlı
        // db.authenticate(username,password).then((message)=>{
        //     console.log("authenticate then",message);
        //     if(message.status == "ok") {
        //         util.setToken(message.token);
        //         db.setUserInfo(message.userInfo);
        //         if(db.isUser())
        //             browserHistory.push("/home");
        //         else
        //             browserHistory.push("/dashboard");
        //     }
        //     else {
        //         toastHelper("Authentication failed. Try again",1000);
        //         this.displayProgress("none");
        //     }
        //
        // });
    };
    signUp = function () {
        browserHistory.push("/signup");
    };
    onKeyDown = function (event, keyCode) {
        // console.log(event);
        // console.log(keyCode);
        this.signIn();
    }
    render = function () {
        return (
            <div style={s.userLayoutStyles.signInContainer}>
                <Subheader style={styles.header}><b> Fikrimuhal Hızlı Mülakat - Giriş</b></Subheader>

                <TextField ref={"email"} hintText="Eposta"
                           floatingLabelText="Eposta"/><br/>
                <TextField ref={"password"}
                           hintText="Şifre"
                           floatingLabelText="Şifre"
                           onEnterKeyDown={(e, v)=>this.onKeyDown(e, v)}
                           type={"password"}/> <br/>
                <div>
                    <RaisedButton label="Giriş" primary={true} onClick={this.signIn}
                                  disabled={this.state.progressDisplay != "none"} labelStyle={{textTransform: "none"}}/>
                    <FlatButton label="Kayıt ol" onClick={this.signUp} style={{marginLeft: "5px"}}
                                labelStyle={{textTransform: "none"}}/>
                    <FlatButton label="Şifremi unuttum.." labelStyle={{textTransform: "none"}}/>
                </div>
                <br/>
                <LinearProgress mode="indeterminate" color="red" style={{display: this.state.progressDisplay}}/>
                <Toast settings={this.state.toastSettings}/>
            </div>
        )
    }
}
