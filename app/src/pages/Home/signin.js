import React        from 'react'
import FlatButton   from 'material-ui/FlatButton'
import TextField    from 'material-ui/TextField'
import RaisedButton    from 'material-ui/RaisedButton'
import FontIcon     from 'material-ui/FontIcon';
import Paper        from 'material-ui/Paper'
import {Link,browserHistory}       from 'react-router'
import Subheader    from 'material-ui/Subheader'
//my imports
import {log2,util,db}   from '../../utils/'
import {Toast}          from '../../components/MyComponents'

//variables and consts
var toastHelper=null;

//Styles
const styles = {
  paperStyle: {
    width:"500px",
    height:300,
    margin:"0 auto",
    marginTop:"20px",
    padding:"10px",
    paddingLeft:"5%"
  },
  rightFloated:{
    float:"right",
    marginRight:"5px"
  }
}

export default class UserSignIn extends React.Component{
   constructor(props){
     super(props);
     this.state = {
       toastSettings:{
           open:false,
           message :"",
           duration: 0
         }
     }
     util.bindFunctions.call(this,['signIn']);
     toastHelper=util.myToast("toastSettings",this);
   }
   signIn = function () {
     var username = this.refs.username.input.value;
     var password = this.refs.password.input.value;
     if (username == "" || password == "") {
       toastHelper("Fields are required!",2000);
       return;
     }
      //var promise = db.getApiPromise("authenticate")({"username":username,"password":password})
     db.authenticate(username,password).then((message)=>{
       console.log("authenticate then",message);
        if (message.status=="ok") {
          util.setToken(message.token);
           toastHelper("Authentication success. Navigating to homepage...",2000);
           browserHistory.push("/home");
        }
        else {
          toastHelper("Authentication failed. Try again",2000);
        }

     });


   }
   render=function () {
     return(
       <div>
         <Paper style={styles.paperStyle}>
          <Subheader>Fikrimuhal - User Sign In</Subheader>
          <TextField ref={"username"} hintText="Username"   floatingLabelText="Username" /><br/>
          <TextField ref={"password"} hintText="Password"   floatingLabelText="Password" /> <br/>
          <div>
            <RaisedButton label="SignIn" primary={true} onClick={this.signIn}/>
            <RaisedButton label="Forget password" secondary={true}/>
          </div>
         </Paper>
         <Toast settings={this.state.toastSettings} />
       </div>
     )
   }
}
