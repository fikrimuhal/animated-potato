import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import QuestionYesNo from '../../components/QuestionYesNo'
import { Link } from 'react-router'
export const allQuestions = [];
const questions = {
  1: {
    title: "Aşağıdakilerden hangisinde daha iyisiniz?",
    id: 1,
    type: "radioButtonTwoUp",
  },
  2: {
    title: "Aşağıdakilerden hangisinde daha kötüsünüz?",
    id: 2,
    type: "radioButtonTwoUp",
  },
}
const styles = {
  button:{
    marginRight: 12,
  }
};
export default React.createClass({
  render(){
    console.dir(allQuestions);
    return (
        <div>
          <div style={styles}>
            <h3>Sorular</h3>
          </div>
          <QuestionYesNo questionId={questions[1].id} question={questions[1].title}/>
            <QuestionYesNo questionId={questions[2].id} question={questions[2].title}/>
          <br/><br/><br/>
            <Link to="/questions3"><RaisedButton label="İleri" primary={true}/></Link>
            <div>

              <span>Klavyeden evet için <b>"e"</b> hayır için <b>"h"</b> tuşlarını kullanabilirsiniz.</span>
            </div>

        </div>
    )}
})
