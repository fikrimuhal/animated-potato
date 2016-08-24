//core imports
import React                    from 'react'
import SmartForm                from "react-jsonschema-form"
//my imports
import {log2,util}              from '../../utils/'
import * as db                  from '../../utils/data'
import * as api                 from '../../utils/api'
import {Toast}                  from '../../components/MyComponents'
import * as s                   from '../../layouts/style'

//variables and consts
var toastHelper=null;
const log = log2("SignUpForm")

//Styles
const styles = {
    paperStyle: {
        width:"800px",
        height:300,
        margin:"0 auto",
        marginTop:"10px",
        padding:"10px"
    },
    rightFloated:{
        float:"right",
        marginRight:"5px"
    }
}
//Form schema
const schema = {
    title: "SignUp Form",
    type: "object",
    required: ["name","lastname","email","phone","username","password"],
    properties: {
        name:     {type: "string", title: "Adınız"},
        lastname: {type: "string", title: "Soyadınız"},
        email:    {type: "string", title: "Eposta"},
        phone:    {type: "string", title: "Telefon"},
        photo:    {type: "string", title: "Resim", format: "data-url"},
        website:  {type: "string", title: "Website"},
        notes:    {type: "string", title: "Açıklama,Not"},
        username: {type: "string", title: "Kullanıcı Adı"},
        password: {type: "string", title: "Şifre"}
    }
};
const uiSchema = {
    "notes": {
        "ui:widget": "textarea"
    },
    "password":{
        "ui:widget": "password"
    }
}
var formData={}
export default class SignUpForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toastSettings:{
                open:false,
                message :"",
                duration: 0
            }
        }
        util.bindFunctions.call(this,['onSubmit'])
        toastHelper=util.myToast("toastSettings",this);
    }
    onSubmit = function (data) {
        log(data);
        var userInfo = data.formData;
        formData = userInfo;
        api.signUp(userInfo).then((res)=>{
            log(res);
        }).catch((err)=>{
            console.dir(err);
        });
    };

    render=function () {

        return(
            <div style={s.userLayoutStyles.signInContainer}>
                <style>
                    {
                        ".form-group > input,.form-group > textarea,textarea.form-control, input.form-control, [type=text].form-control, [type=password].form-control, [type=email].form-control, [type=tel].form-control, [contenteditable].form-control {\n    webkit-box-shadow: inset 0 -2px 0 #BDBDBD !important;\n    box-shadow: inset 0 -2px 0 #BDBDBD !important;\n}\n.form-group > input,.form-group > textarea,textarea.form-control:focus, input.form-control:focus,  [type=email].form-control:focus, [type=tel].form-control:focus, [contenteditable].form-control:focus {\n    webkit-box-shadow: inset 0 -2px 0 #00BCD4 !important;\n    box-shadow: inset 0 -2px 0 #00BCD4 !important;\n}"
                    }
                </style>
                <SmartForm schema={schema}
                           onSubmit={(formData)=>this.onSubmit(formData)}
                           onError={()=> log("errors")}
                           uiSchema={uiSchema}
                           formData={formData}
                />
                <Toast settings={this.state.toastSettings} />
            </div>
        )
    }
}
