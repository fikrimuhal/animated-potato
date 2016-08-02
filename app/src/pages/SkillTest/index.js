import React from 'react'
import SkillTest from './SkillTest'
import {util,log2,db} from '../../utils/'
import {Toast} from '../../components/MyComponents'
const log = log2("SkillTestContainer")
const _questions = db.getQuestionsBySetName("Set 1");
var answers = [];
var showToast=null;
export default class SkillTestContainer extends React.Component{
constructor(props){
  super(props);
  var applicant = db.getApplicantByUserId(props.params.userId);
  log("applicant",applicant)
  //answers = (applicant!=null)?applicant.answers:[];
  var readMode = false;
  if (applicant!=null) {
    answers=applicant.answers;
    readMode=true;
  }
  else {
    answers=[];
  }
  this.state = {
    answers:answers,
    toastSettings : {
      open:false,
      message :"",
      duration: 2000
    },
    readMode:readMode
  }
  util.bindFunctions.call(this,['handleOnChangeAnswer','handleOnSaveTest','showMessage']);
  showToast=util.myToast("toastSettings",this.setState,this.state);
}
handleOnChangeAnswer = function (newData) {
  if (this.state.readMode) {
      this.showMessage("Your cannot edit answers",2000);
  }
  else {
    this.setState({
      answers:newData
    })
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
handleOnSaveTest = function () {
  if (this.state.readMode) {
    this.showMessage("Your answers has been saved before !!",3000);
  }
  else {
    log("saved.");
    var userId = this.props.params.userId;
    var answers = this.state.answers;
    db.setApplicant(userId,answers);
    this.showMessage("Your answers succesfully saved. !!",3000);
  }

}
render = function () {
  log("rendered",this.state)
  return (

    <div>
      <SkillTest questions={_questions}  answers={this.state.answers} onChangeAnswer={this.handleOnChangeAnswer} onSaveTest={this.handleOnSaveTest} readMode={this.state.readMode} />
      <Toast settings={this.state.toastSettings} />
    </div>


)
}
}
