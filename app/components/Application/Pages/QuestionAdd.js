import React from 'react'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField'
import {getQuestionFromStorage,setQuestionToStorage} from '../data'
import {allQuestions} from './Questions'
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
  }
};
const questionModel = {
  questionText:"",
  questionType:"",
  category:"",
  fields:[],
  weight:0,
  set:"Set 1"
};
export default class QuestionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : questionModel,
      addOptionDisplay:false
    }
}

  addOption  = function () {
    //console.dir(this);
    var model = this.state.data;
      model.fields.push({
       type :"radio",
       text : "seçenek detayı"
    })
   this.setState({data: model});
 }
  handleChange = (event, index, value) => this.setState({value});
  handleOptionTextChanged = function (event,index,value){
    console.dir(event);
    console.dir(index);
    console.dir(value);
  }
  handleFieldTypeChange = function (event,value) {
      //console.dir(value);
    var model = this.state.data;
    if (value == "radio" || value=="checkbox") {

         model.questionType = value;
         this.setState({
          addOptionDisplay: false,
           data : model
        });
    }
    else {

        model.fields = [];
        this.setState({
         addOptionDisplay: true,
          data : model
       });
    }

  }
  handleQuestionSetChange = function (event,value) {
    //console.dir(event);
  //  console.dir(value);
    var model = this.state.data;
    if (value != null && value!="") {
      model.set = event.target.textContent;
      this.setState({
        data : model
     });
    }

  }
  handleQuestionCategoryChange = function (event,value) {
    var model = this.state.data;
    if (value != null && value!="") {
      model.category = event.target.textContent;
      this.setState({
        data : model
     });
    }
  }
  handleQuestionTextChange = function (event,value) {
    var model = this.state.data;
    //console.dir(event);
    //console.dir(value);
    if (value != null && value!="") {
      model.questionText = value;
      this.setState({
        data : model
     });
    }

  }
  handleSaveQuestion = function () {
   allQuestions.push(this.state.data);
  }
  render() {
    console.dir(getQuestionFromStorage());
    return (
        <div>
          <div>
              <h3>Soru Ekle</h3>
          </div>
        <div>
          <TextField
            hintText="Soru Kalıbı" onChange={this.handleQuestionTextChange.bind(this)}/><br />
        </div>

        <div style={styles.fullWidth}>
          <SelectField value={this.state.data.category} onChange={this.handleQuestionCategoryChange.bind(this)}>
            <MenuItem value="" primaryText="Soru Kategorisi" />
            <MenuItem value="Back-End" primaryText="Back-End" />
            <MenuItem value="Front-End"  primaryText="Front-End" />
            <MenuItem value="Sistem Yönetimi"  primaryText="Sistem Yönetimi" />
          </SelectField>
        </div>

        <div style={styles.fullWidth}>
          <RaisedButton label="+Seçenek Ekle" secondary={true} onClick={this.addOption.bind(this)} disabled={this.state.addOptionDisplay}/>
        </div>
        <br/>
        <br/>
          <div style={styles.fullWidth}>
            <b>Cevap Türü:</b> <br/><br/>
            <RadioButtonGroup name="shipSpeed" defaultSelected="radio"  onChange={this.handleFieldTypeChange.bind(this)}>

            <RadioButton

               value="radio"
               label="Radio"
               style={styles.radioButton}

             />

             <RadioButton
                 value="checkbox"
                label="Checkbox"
                style={styles.radioButton}

              />

              <RadioButton
                value="freetext"
                 label="FreeText(Tek Satır)"
                 style={styles.radioButton}

               />



                <RadioButton
                  value="number"
                   label="Rakam"
                   style={styles.radioButton}

                 />
              </RadioButtonGroup>

          </div>
          {
            this.state.data.fields.map(function(soru) {
                  return (
                    <div style={styles.fieldDiv}>


                    <div>
                      <TextField
                        hintText="Seçenek" defaultValue="Option Text" /><br />
                        <RaisedButton label="Sil" primary={true}/>
                        <br/><br/><br/>
                        <TextField
                          hintText="Ağırlık" defaultValue="1"/><br />
                    </div>
                    </div>
                  )
                    })
          }
      <br></br>
          <div style={styles.fullWidth}>
            <SelectField value={this.state.data.set} onChange={this.handleQuestionSetChange.bind(this)}>
              <MenuItem value="" primaryText="Soru Seti Seç" />
              <MenuItem value="Set 1" primaryText="Set 1" />
              <MenuItem value="Set 2" primaryText="Set 2" />
              <MenuItem value="Set 3"primaryText="Set 3" />

            </SelectField>
          </div>
          <br/><br/>
          <div style={styles.fullWidth}>
              <RaisedButton label="Soruyu Kaydet" secondary={true}  onClick={this.handleSaveQuestion.bind(this)}/>
          </div>

      </div>
    );
  }
}
