import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import LinearProgress from 'material-ui/LinearProgress';
import QuestionRadioButton from '../../components/QuestionRadioButton'

export const questions = [
   {
    title: "Aşağıdakilerden hangisinde daha iyisiniz?",
    answers: [
      { title: "front end", value: 1},
      { title: "back end", value: 2},
      { title: "sistem yönetimi", value: 3}
    ],
    id: 1,
    type: "radioButton"
  },
    {
    title: "Aşağıdakilerden hangisinde daha kötüsünüz?",
    answers: [
      {title:"JavaScript", value: 1},
      {title:"Scala", value: 2},
      {title:"Haskell", value: 3},
      {title: "Java", value: 4}
    ],
    id: 2,
    type: "radioButton"
  }]


const styles = {
  button:{
    marginRight: 12,
  },
  position: 'absolute',
  display: 'inline-block',
  alignItems: 'center',
  };
export default React.createClass({
  render() {
  console.dir(questions);
    return (<MuiThemeProvider>
        <div>
        <div style={styles}>

          <h3>Sorular</h3>
            <div>
              {
                questions.map(function(x) {
                      return  <QuestionRadioButton questionId={x.id} question={x.title} answers={x.answers} key={x.id}/>
                        })
              }

            </div>
            <br/><br/><br/>
            <div style={styles.button}>
            <Link to="/questions3"><RaisedButton label="İleri" primary={true}/></Link>

            </div>

        </div>
</div>
      </MuiThemeProvider>
    )}
})
