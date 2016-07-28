import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Form from "react-jsonschema-form"
import {log2,util,db} from '../../utils/'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ApplyCompleted from '../ApplyCompleted'
import {Toast} from '../../components/MyComponents'
var showToast=null;
const log = log2("QuestionAdd: ")
const styles = {
  button:{
  marginRight: 12,
  },
};
//form api documentation : https://github.com/mozilla-services/react-jsonschema-form
const schema = {
  title: "Interview Form",
  type: "object",
  required: ["name","lastname","email","phone"],
  properties: {
    name:     {type: "string", title: "Name"},
    lastname: {type: "string", title: "Last Name"},
    email:    {type: "string", title: "Email"},
    phone:    {type: "string", title: "Phone"},
    photo:    {type: "string", title: "Photo", format: "data-url"},
    website:  {type: "string", title: "Website"},
    notes:    {type: "string", title: "Your Notes"},
  }
};
const uiSchema = {
  "notes": {
    "ui:widget": "textarea"
  }
}

export default class ApplyForm extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      userId:"",
      open:false,
      toastSettings:{
          open:false,
          message :"",
          duration: 0
        }
    }
    util.bindFunctions.call(this,['onSubmit','showMessage'])
    showToast=util.myToast("toastSettings",this.setState,this.state);
  }
  onSubmit = function onSubmit(data) {
    log(data);
    var userInfo = data.formData;
    var validUser= db.getUserByEmail(userInfo.email) == null;
    if (validUser) {
      userInfo.id = util.guid();
      db.setUser(userInfo);
      this.setState({
        userId:userInfo.id,
        open:true
      })
    }
    else {
      this.showMessage("Bu kullanıcı mevcuttur!!!!!",2000);
    }

  }
  showMessage = function(message,duration) {
    var toastSettings= {
      open:true,
      message :message,
      duration: duration
    }
    this.setState({toastSettings:toastSettings});
    var _this = this;
    setTimeout( () =>  {
      toastSettings.open=false;
      this.setState({toastSettings:toastSettings});
    },duration);
  }
  render = function () {
    const actions = [
         <FlatButton
           label="Go to Test"
           primary={true}
           onTouchTap={this.handleClose}
         />,
       ];
  return  (
      <div style={styles} className="container">
          <Form schema={schema}
          onChange={()=> log("changed")}
          onSubmit={(formData)=>this.onSubmit(formData)}
          onError={()=> log("errors")}
          uiSchema={uiSchema}
          />

          <Dialog
             title="Your info saved!"
             actions={actions}
             modal={true}
             open={this.state.open}
           >
           <ApplyCompleted userId={this.state.userId} />
           </Dialog>
           <Toast settings={this.state.toastSettings} />
    </div>
    )
  }
}

// export default React.createClass({
//   render() {
//     return (
//       <div style={styles} className="container">
//           <p>*Lütfen aşağıdaki bilgileri eksiksiz bir şekilde doldurunuz.</p>
//           <h2>Başvuru Formu</h2>
//
//           {
//         //     <div>
//         //         <TextField    hintText="Ad" floatingLabelText="Ad" />
//         //         <TextField    hintText="Soyad" floatingLabelText="Soyad" /> <br/>
//         //         <TextField    hintText="E mail" floatingLabelText="E mail" />
//         //         <TextField    hintText="Telefon" floatingLabelText="Telefon" /><br/>
//         //     <div>
//         //     <div>
//         //       <h4>Fotoğraf</h4>
//         //     </div>
//         //     <div style={styles.button}>
//         //         <RaisedButton label="Yükle" primary={true}/>
//         //         <RaisedButton label="İptal" secondary={true}/>
//         //     </div>
//         //   <br/>
//         //   <TextField hintText="Kişisel Web Sayfanız" floatingLabelText="Kişisel Web Sayfanız"/>
//         //   <br/>
//         //   <TextField hintText="Ek notlarınız" floatingLabelText="Ek notlarınız" />
//         //   </div>
//         //   <br/>
//         //     <div style={styles.button}>
//         //         <Link to="/interview/detailssaved"><RaisedButton label="Kaydet" primary={true}/></Link>
//         //     </div>
//         // </div>
//       }
//       </div>
//     )}
// })
