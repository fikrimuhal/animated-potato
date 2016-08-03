//core imports
import React            from 'react'
import FlatButton       from 'material-ui/FlatButton'
import FontIcon         from 'material-ui/FontIcon';
import Paper            from 'material-ui/Paper'
import {Router, Route, Link,browserHistory}           from 'react-router'
import Subheader        from 'material-ui/Subheader';
import SmartForm        from "react-jsonschema-form"
//my imports
import {log2,util,db}   from '../../utils/'
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
     var validUser= db.getUserByEmail(userInfo.email) == null;
     if (validUser) {
         userInfo.id = util.guid();
         var info = db.setUser(userInfo);
         console.dir(info);
        if (info.status=="ok") {
            toastHelper("Your info succesfully saved.",2000);
            util.setToken(info.token);
             browserHistory.push("/home")
        }
        else {
            toastHelper("An error occured when saving info. Try again.",2000);
        }
     }
     else {
           toastHelper("usernam/email invalid !!!!",2000);

     }
   }

   render=function () {
     return(
       <div>
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
