import React from 'react'
import {log2,db,util} from '../../utils/'
import {Toast} from '../../components/MyComponents'
import RaisedButton from 'material-ui/RaisedButton';
import Immutable from 'Immutable'
import QuestionAdd from './QuestionAdd'
import _lodash from 'lodash'
const log = log2("QuestionAdd Index: ")
var showToast=null;

const categoryList = [
  "Back-End","Front-End","Sistem-Yöneticisi","DBA","Java EE"
];
const allSet = [
  "Set 1","Set 2","Set 3"
]
const questionModel = {
  title: "Aşağıdakilerden hangisinde daha iyisiniz?",
  id: 1,
  type: "radio",
  categoryWeights:[
    {
      category:"Back-End",
      weight:0.1
    },
    {
      category:"Front-End",
      weight:0.3
    }
  ],
  options:[],
  setList:["Set 1"]
};

export default class QuestionAddContainer extends React.Component {
  constructor(props) {
    super(props);
    var immutableData = Immutable.fromJS(questionModel,(key,value)=>{return  value.toOrderedMap();});
    this.state=  {
      data : immutableData,
      toastSettings : {
        open:false,
        message :"",
        duration: 2000
      }
    };
    showToast=util.myToast("toastSettings",this.setState,this.state);
    util.bindFunctions.call(this,['modelChanged','showMessage','onSave']);
}
modelChanged = function changed(newData,oldData) {
  this.setState({data:newData});
}
onSave = function () {
 var questionObj = this.state.data.toJS();
 log(questionObj)
 if (questionObj.type == "radio" || questionObj.type=="checkbox") {
   questionObj = this.normalizeOptionWeight(questionObj);
 }
  questionObj = this.normalizeCategoryWeight(questionObj);

 log("questionObj: ",questionObj);
 questionObj.id = util.guid();
 db.setQuestionToStorage(questionObj);
 this.showMessage("Question saved!!",2000);
 log(questionObj)
}
normalizeOptionWeight = function (questionObj) {
  var keys = Object.keys(questionObj.options);
    if (keys.length>0) {

      var optionArr = keys.map((key)=>{return questionObj.options[key]});
      var sumWeight = _.sumBy(optionArr,(o)=> {return o.weight});
      keys.forEach((key)=>{
        var obj = questionObj.options[key];
        var weight = obj.weight;
        var normWeight = weight / sumWeight;
        questionObj.options[key].weight = normWeight;
      })
    }
    return questionObj;
}
normalizeCategoryWeight = function (questionObj) {
    var keys = Object.keys(questionObj.categoryWeights);
    if (keys.length>0) {

      var arr = keys.map((key)=>{return questionObj.categoryWeights[key]});
      var sumWeight = _.sumBy(arr,(o)=> {return o.weight});
      keys.forEach((key)=>{
        var obj = questionObj.categoryWeights[key];
        var weight = obj.weight;
        var normWeight = weight / sumWeight;
        questionObj.categoryWeights[key].weight = normWeight;
      })
    }
    return questionObj;
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

backToList = function () {
  window.location.href="/adminpanel/questionlist";
}
  render() {
      return (
              <div>
                  <RaisedButton label="<- Back to list" secondary={true} onClick={()=> this.backToList()} />
                  <QuestionAdd onChange={this.modelChanged} onSave={this.onSave} data={this.state.data} allSet={allSet} categoryList={categoryList} />
                  <Toast settings={this.state.toastSettings} />
              </div>
            );
  }
}
