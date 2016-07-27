import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import{ Question,QuestionYesNo }from '../../components/Question';
import _ from 'lodash'

const questions = {
  1: {
    title: "JavaScript biliyor musunuz?",
    id: 1,
    type: "radioButtonYesNo",
  },
  2: {
    title: "Daha önce iş tecrübeniz oldu mu?",
    id: 2,
    type: "radioButtonYesNo",
  },
  3: {
    title: "Bizi sosyal medya aracılığı ile mi buldunuz?",
    id: 3,
    type: "radioButtonYesNo",
  },
  4: {
    title: "Aşağıdakilerden hangisinde daha iyisiniz?",
    answers: [
      { title: "front end", value: 1},
      { title: "back end", value: 2},
      { title: "sistem yönetimi", value: 3}
    ],
    id: 4,
    type: "radioButton"
  },
  5: {
    title: "Aşağıdakilerden hangisinde daha kötüsünüz?",
    answers: [
      {title:"JavaScript", value: 1},
      {title:"Scala", value: 2},
      {title:"Haskell", value: 3},
      {title: "Java", value: 4}
    ],
    id: 5,
    type: "radioButton",
  },
  6: {
    title: "Aşağıdaki programlama dillerinden hangisi/hangilerinde bilgi sahibisiniz?",
    answers: [
      { title: "Python", value: 1},
      { title: "JavaScript", value: 2},
      { title: "C", value: 3},
      { title: "C++", value: 4}
    ],
    id: 6,
    type: "checkbox",
  },
  7: {
    title: "Aşağıdailerden hangisini bilmiyorsunuz?",
    id: 7,
    answers: [
      {title: "C", value: 1},
      {title: "Scala", value: 2},
      {title: "React", value: 3},
      {title: ".Net", value: 4},
    ],
    type: "checkbox",
  },
  8: {
    title: "Kaç yıldır aktif olarak çalışıyorsun?",
    id: 8,
    type: "FreeText",
  },
  9: {
    title: "Kaç yaşındasın?",
    id: 9,
    type: "FreeText",
  },
  10: {
    title: "Naber",
    id: 10,
    type: "FreeTextMultiLine",
    multiLine:true
  },
  11: {
    title: "Kaç yaşındasın?",
    id: 11,
    type: "FreeTextMultiLine",
    multiLine:true
  },
}
const styles = {
  button:{
    marginRight: 12,
  }
};
export default React.createClass({
  getInitialState: function(){
    return { sayac: 1}
  },

  artir: function(){
    var suAnkiSoru = this.state.sayac
    this.setState({sayac: suAnkiSoru +1})
  },
  render(){

    return (
        <div>
          <div style={styles}>
            <h3>Sorular</h3>
          </div>
            <div>

            <Question key={this.state.sayac} questionId={questions[this.state.sayac].id} question={questions[this.state.sayac].title}
            questionType={questions[this.state.sayac].type} answers={questions[this.state.sayac].answers} multiLine={questions[this.state.sayac].multiLine} />
            <br/>
            <br/>
            <button onClick={this.artir}>İleri</button>


            </div>
        </div>
    )}
})
