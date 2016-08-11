//core imports
// import formCss from '../../assets/css/bootstrap-paper.min.css'
// var formCss = require("style!css!../../assets/css/bootstrap-paper.min.css");
import React            from 'react'
import FlatButton       from 'material-ui/FlatButton'
import FontIcon         from 'material-ui/FontIcon';
import Paper            from 'material-ui/Paper'
import {Router, Route, Link,browserHistory}           from 'react-router'
import Subheader        from 'material-ui/Subheader';
import SmartForm        from "react-jsonschema-form"
//my imports
import {log2,util}   from '../../utils/'
import * as db from '../../utils/data'
import * as api from '../../utils/api'
import {Toast}          from '../../components/MyComponents'

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
    name:     {type: "string", title: "Name"},
    lastname: {type: "string", title: "Last Name"},
    email:    {type: "string", title: "Email"},
    phone:    {type: "string", title: "Phone"},
    photo:    {type: "string", title: "Photo", format: "data-url"},
    website:  {type: "string", title: "Website"},
    notes:    {type: "string", title: "Your Notes"},
    username: {type: "string", title: "User Name"},
    password: {type: "string", title: "Password"}
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
          console.dir(res);
           log(res.headers.get("user"));
           log(res.headers.get('Authorization'));
       }).catch((err)=>{
           console.dir(err);
       });
     //var validUser= db.getUserByEmail(userInfo.email) == null;
     // if (validUser) {
     //     userInfo.id = util.guid();
     //     var info = db.setUser(userInfo);
     //     console.dir(info);
     //    if (info.status=="ok") {
     //        toastHelper("Your info succesfully saved.",2000);
     //        util.setToken(info.token);
     //         browserHistory.push("/home")
     //    }
     //    else {
     //        toastHelper("An error occured when saving info. Try again.",2000);
     //    }
     // }
     // else {
     //       toastHelper("usernam/email invalid !!!!",2000);
     //
     // }
   };

   render=function () {

     return(
       <div>
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
