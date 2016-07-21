import React from 'react'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import {log2,db,util} from '../../utils/'
import _ from 'lodash'
import  CevapTurleri from './CevapTurleri';
import SoruSetleriDropdown from './SoruSetleriDropdown'
import KategoriAgirliklari from './KategoriAgirliklari'
import Secenekler from './Secenekler'
import {Toast} from '../../components/MyComponents'
const log = log2("QuestionAdd: ")
log("db",db,"Utils",util)
const kategoriler = [
  "Back-End","Front-End","Sistem-Yöneticisi"
];
const styles = {
  radioButton: {
    marginBottom: 16,
  },
  fieldDiv : {
    position:'relative',
    float:'left',
    width:'30%'
  },
  w100:{
      width:'auto'
  },
  fullWidth: {
    width:'100%',
    float:'left'
  },
  secenekBox:{
    border:'1px solid teal',
    borderRadius:'5px',
    padding:'5px 5px 5px 5px',
    marginBottom:'5px',
    marginLeft:'10px',
    float:'left'
  }
};

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
  weight:2,
  set:"Set 1"
};

export default class QuestionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : questionModel,
      addOptionDisplay:false,
      toastSettings : {
        open:false,
        message :"",
        duration: 2000
      }
    }
}

shouldComponentUpdate= function(nextProps, nextState) {
  log(nextState);
  return true;
}

 kategoriListesiniGetir = function () {
   return kategoriler;
 }
 showToast=function (message,duration) {
   var toastSettings  = this.state.toastSettings;
   toastSettings.open=true;
   toastSettings.message=message;
   this.setState({
     toastSettings : toastSettings
  });
  setTimeout(function () {
    toastSettings.open=close;
    this.setState({
      toastSettings : toastSettings
   });
  },duration)
 }
 handleToastClose = function () {
   var toastSettings  = this.state.toastSettings;
   toastSettings.open=false;
   this.setState({
     toastSettings : toastSettings
  });
 }

  addOption=function () {
    var model = this.state.data;
    var key = util.guid();
      model.options.push({
        id:key,
        text : "",
        weight:0.5
      }
    );
   this.setState({data: model});
 }

  handleOptionTextChanged = function (event,index,value){

  }

  handleQuestionTextChange = function (event,value) {
    var model = this.state.data;
    if (value != null && value!="") {
      model.title = value;
    }

  }

  handleSaveQuestion = function () {
    db.setQuestionToStorage(this.state.data,utils.guid());
    this.showToast("Başarılı, Soru kaydedilmiştir.",5000);
  }
  render() {
      //log("main")
      return (
              <div>
                  <div>
                      <h3>Soru Ekle</h3>
                  </div>
                  <TextField hintText="Soru Metni" onChange={this.handleQuestionTextChange.bind(this)}/>
                  <TextField hintText="Ağırlık" onChange={this.handleQuestionTextChange.bind(this)}/>
                  <KategoriAgirliklari parent={this} style={styles.w100}  kategoriler={this.kategoriListesiniGetir()} />
                  <SoruSetleriDropdown parent={this}  style={styles.w100}  setler={["Set 1","Set 2","Set 3"]}/>
                  <CevapTurleri parent={this} /><br/>
                  <RaisedButton label="+Seçenek Ekle" secondary={true} onClick={this.addOption.bind(this)} style={{float:"right"} }  disabled={this.state.addOptionDisplay}/> <br/>
                  <Secenekler secenekler={this.state.data.options}  parent={this} /><br/>
                  <RaisedButton style={styles.fullWidth} label="Soruyu Kaydet" secondary={true}   onClick={this.handleSaveQuestion.bind(this)}/>
                  <Toast settings={this.state.toastSettings} />
              </div>
            );
  }
}
