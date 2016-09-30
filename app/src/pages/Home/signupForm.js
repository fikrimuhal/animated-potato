//core imports
import React                    from 'react'
import SmartForm                from "react-jsonschema-form"
import {browserHistory}         from 'react-router'
import LinearProgress           from 'material-ui/LinearProgress';
import {log2, util}             from '../../utils/'
import * as db                  from '../../utils/data'
import * as api                 from '../../utils/api'
import * as s                   from '../../layouts/style'
import {Row, Col}               from 'react-flexbox-grid'
import TextField                from "material-ui/TextField"
import FlatButton               from 'material-ui/FlatButton';
import * as Cache               from '../../utils/cache'
const log = log2("SignUpForm")
const styles = {
    formButton: {
        textTransform: "none",
        border: "1px solid teal",
        float: "right",
        margin: "5px"
    }
};


export default class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progressDisplay: "none"
        };
        util.bindFunctions.call(this, ['onSubmit', 'handleSubmit'])

    }

    displayProgress = function (show) {
        this.setState({
            progressDisplay: show ? "" : "none"
        });
    };
    onSubmit = function (data) {

        log(data);
        var userInfo = data.formData;
        //formData = userInfo;
        this.displayProgress(true);
        api.signUp(userInfo).then((response)=> {
            response.json().then(json=> {
                if (json.status == "ok") {
                    this.context.showMessage("Bilgileriniz kaydedildi.", 2000);
                    util.setToken(response.headers.get("Authorization"));
                    json.userInfo.admin = json.isAdmin;
                    db.setUserInfo(json.userInfo);
                    if (json.isAdmin) browserHistory.push("/adminpanel");
                    else browserHistory.push("/home");
                }
                else if (json.status == "fail") {
                    this.context.showMessage(json.message, 1000);
                }
                else {
                    this.context.showMessage("Sunucuda hata oluştu.", 1000);
                }
                this.displayProgress(false);
            });
        }).catch((err)=> {
            this.context.showMessage("Hata oluştu.", 1000);
            log(err);
            this.displayProgress(false);
        });
    };
    handleSubmit = function () {
        //log(this.refs);
        var data = {};
        ["name", "lastname", "email", "phone", "github", "website", "username", "password", "notes"].forEach(field=> {
            //log(field,this.refs[field].input.value);
            data[field] = this.refs[field].input.value;
        })
        data["notes"] = this.refs["notes"].input.refs.input.value
        log(data);
        log(this.refs.notes);

        var requiredFields = ["name", "lastname", "email", "phone", "username", "password"];
        var valid = true;
        requiredFields.forEach(field=> {
            if (data[field] == undefined || data[field] == "") {
                valid = false;
            }
        });
        if (!valid) {
            this.context.showMessage("Gerekli alanları doldurunuz", 3000);
            return;
        }
        var userInfo = data;
        //formData = userInfo;
        this.displayProgress(true);
        api.signUp(userInfo).then((response)=> {
            response.json().then(json=> {
                if (json.status == "OK") {
                    this.context.showMessage("Bilgileriniz kaydedildi.", 2000);
                    util.setToken(response.headers.get("Authorization"));
                    json.userInfo.admin = json.isAdmin;
                    db.setUserInfo(json.userInfo);
                    Cache.UserCaching.clear();
                    if (json.isAdmin) browserHistory.push("/adminpanel");
                    else browserHistory.push("/home");
                }
                else if (json.status == "FAIL") {
                    this.context.showMessage(json.message, 1000);
                }
                else {
                    this.context.showMessage("Sunucuda hata oluştu.", 1000);
                }
                this.displayProgress(false);
            });
        }).catch((err)=> {
            this.context.showMessage("Hata oluştu.", 1000);
            log(err);
            this.displayProgress(false);
        });
    };
    render = function () {


        return (
            <div style={s.userLayoutStyles.signInContainer}>
                <LinearProgress mode="indeterminate" color="red" style={{display: this.state.progressDisplay}}/>
                <h5>Fikrimuhal Hızlı Mülakat - Kayıt Formu</h5>

                <form ref={"vForm"}>
                    <Row>
                        <Col lg={6}>
                            <TextField ref={"name"}
                                       hintText="Adınız(*)"
                                       floatingLabelText="Adınız(*)"
                                       style={{width: "100%"}} name={"name"}/>
                        </Col>
                        <Col lg={6}>
                            <TextField ref={"lastname"}
                                       hintText="Soyadınız(*)"
                                       floatingLabelText="Soyadınız(*)"
                                       style={{width: "100%"}} name={"lastname"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <TextField ref={"email"}
                                       hintText="Eposta(*)"
                                       floatingLabelText="Eposta(*)"
                                       style={{width: "100%"}} name={"lastname"}/>
                        </Col>
                        <Col lg={6}>
                            <TextField ref={"phone"}
                                       hintText="Telefon(*)"
                                       floatingLabelText="Telefon(*)"
                                       style={{width: "100%"}} name={"phone"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <TextField ref={"github"}
                                       hintText="Github"
                                       floatingLabelText="Github adresiniz"
                                       style={{width: "100%"}} name={"github"}/>
                        </Col>
                        <Col lg={6}>
                            <TextField ref={"website"}
                                       hintText="Website adresiniz"
                                       floatingLabelText="Website adresiniz"
                                       style={{width: "100%"}} name={"website"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <TextField ref={"username"}
                                       hintText="Kullanıcı Adınız(*)"
                                       floatingLabelText="Kullanıcı Adınız(*)"
                                       style={{width: "100%"}} name={"username"}/>
                        </Col>
                        <Col lg={6}>
                            <TextField ref={"password"}
                                       hintText="Şifreniz(*)"
                                       floatingLabelText="Şifreniz(*)"
                                       style={{width: "100%"}}
                                       type="password"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <TextField ref={"notes"}
                                       hintText="Not/Açıklama(*)"
                                       floatingLabelText="Not/Açıklama(*)"
                                       style={{width: "100%"}}
                                       multiLine={true}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <FlatButton label={"Kaydet"} primary={true} labelStyle={{textTransform: "none"}}
                                        style={styles.formButton} onClick={this.handleSubmit}/>
                            <FlatButton label={"Giriş Yap"} labelStyle={{textTransform: "none"}} onClick={()=> {
                                browserHistory.push("/signin")
                            }} style={styles.formButton}/>

                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}
SignUpForm.contextTypes = {
    showMessage: React.PropTypes.func
};