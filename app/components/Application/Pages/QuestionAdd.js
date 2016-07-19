import React from 'react'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField'
import * as Db from '../data'
import {allQuestions} from './Questions'
import * as Utils from '../utils'
import log2 from '../log2'
import _ from 'lodash'
const log = log2("questionAdd")

const styles = {
  radioButton: {
    marginBottom: 16,
  },
  fieldDiv : {
    position:'relative',
    float:'left',
    width:'30%'
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
  category:"Back-End",
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

  addOption  = function () {
    var model = this.state.data;
    var key = Utils.guid();
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
      this.setState({
        data : model
     });
    }

  }
  handleSaveQuestion = function () {
    Db.setQuestionToStorage(this.state.data,Utils.guid());
    this.showToast("Başarılı",5000);
  }
  render() {
      return (
        <div>
          <div>
              <h3>Soru Ekle</h3>
          </div>
          <TextField style={styles.fieldDiv}
            hintText="Soru Metni" onChange={this.handleQuestionTextChange.bind(this)}/><br />
          <KategoriAgirliklari parent={this} style={styles.fieldDiv} />
              <SoruSetleri parent={this}   style={styles.fieldDiv}/>
          <div style={styles.fullWidth}>
            <RaisedButton label="+Seçenek Ekle" secondary={true} onClick={this.addOption.bind(this)} disabled={this.state.addOptionDisplay}/>
          </div>
          <CevapTurleri parent={this} />
          <Secenek secenekler={this.state.data.options}  parent={this} />

          <RaisedButton style={styles.fullWidth} label="Soruyu Kaydet" secondary={true}  onClick={this.handleSaveQuestion.bind(this)}/>
          <Toast settings={this.state.toastSettings} />
    </div>
    );
  }
}



class CevapTurleri  extends React.Component {
  constructor(props){
    super(props);
  }
  handleFieldTypeChange = function (event,value) {

    var model = this.props.parent.state.data;
    if (value == "radio" || value=="checkbox") {

         model.type = value;
         this.props.parent.setState({
          addOptionDisplay: false,
           data : model
        });
    }
    else {
        model.options = [];
        this.props.parent.setState({
         addOptionDisplay: true,
          data : model
       });
    }
  }

  render () {
    return (
      <div style={styles.fullWidth}>
        <b>Cevap Türü:</b> <br/><br/>
        <RadioButtonGroup name="shipSpeed" defaultSelected="radio"  onChange={this.handleFieldTypeChange.bind(this)}>
            <RadioButton value="radio" label="Radio" style={styles.radioButton}/>
            <RadioButton value="checkbox" label="Checkbox" style={styles.radioButton}/>
            <RadioButton value="freetext" label="FreeText(Tek Satır)" style={styles.radioButton} />
            <RadioButton value="number" label="Rakam" style={styles.radioButton}/>
        </RadioButtonGroup>
      </div>
    )
  }
}

class SoruSetleri extends React.Component {
  constructor(props)
  {
    super(props);
  }
  handleQuestionSetChange= (event,value) => {
    var model = this.props.parent.state.data;
    if (value != null && value!="") {
      model.set = event.target.textContent;
      this.props.parent.setState({
        data : model
     });
    }
  }
  render= ()=> {
    return (
      <div style={styles.fieldDiv} >
        <SelectField value={this.props.parent.state.data.set} onChange={this.handleQuestionSetChange.bind(this)}>
          <MenuItem value="" primaryText="Soru Seti Seç" />
          <MenuItem value="Set 1" primaryText="Set 1" />
          <MenuItem value="Set 2" primaryText="Set 2" />
          <MenuItem value="Set 3"primaryText="Set 3" />
        </SelectField>
      </div>
    )
  }
}

class Secenek extends React.Component{
  constructor(props){
    super(props);
  }
  handleSliderValueChange = function (secenekItem,event,value) {

   var model = this.props.parent.state.data;
   var index = _.findIndex(model.options, function(o) { return o.id == secenekItem.id; });
      console.dir(index);
        console.dir(   model.options[index]);
   model.options[index].weight = value;
     this.props.parent.setState({
       data : model
    });
       console.dir(this.props.parent.state.data);
  }
  render= ()=> {
    //console.dir(this.handleSliderValueChange);7
    var _this = this;
    return (
      <div >
        {
          this.props.secenekler.map(function(item) {

                return (

                  <div key={item.id} style={styles.secenekBox}>
                    <p>Seçenek Detayları</p>
                    <hr></hr>
                    <TextField
                      hintText="Seçenek" defaultValue={item.text}/><br />
                    <RaisedButton label="Sil" primary={true}/>
                      <Slider  onChange={_this.handleSliderValueChange.bind(_this,item)}  defaultValue={item.weight} /><b>Ağırlık: {item.weight}</b>
                        <hr></hr>
                  </div>

                 )
          })
        }

      </div>
    )
  }
}

class KategoriAgirliklari extends React.Component{
  constructor(props)
  {
    super(props)
  }
  handleQuestionCategoryChange = function (event,value) {
    var model = this.props.parent.state.data;
    if (value != null && value!="") {
      model.category = event.target.textContent;
      this.props.parent.setState({
        data : model
     });
    }
  }
  render= ()=>{
    return (
      <div style={styles.fieldDiv}>
        <SelectField value={this.props.parent.state.data.category} onChange={this.handleQuestionCategoryChange.bind(this)}>
          <MenuItem value="" primaryText="Soru Kategorisi" />
          <MenuItem value="Back-End" primaryText="Back-End" />
          <MenuItem value="Front-End"  primaryText="Front-End" />
          <MenuItem value="Sistem Yönetimi"  primaryText="Sistem Yönetimi" />
        </SelectField>
      </div>
    )

  }
}

class Toast extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Snackbar
          open={this.props.settings.open}
          message={this.props.settings.message}
          autoHideDuration={this.props.settings.duration}

        />
      </div>
    );
  }
}
