import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import QuestionCheckbox from '../../components/QuestionCheckbox'

const questions = {
  1: {
    title: "Aşağıdaki programlama dillerinden hangisi/hangilerinde bilgi sahibisiniz?",
    answers: [
      { title: "Python", value: 1},
      { title: "JavaScript", value: 2},
      { title: "C", value: 3},
      { title: "C++", value: 4}
    ],
    id: 1,
    type: "checkbox"
  },
}

const styles = {
  button:{
    marginRight: 12,
  },
  position: 'absolute',
  display: 'inline-block',
  alignItems: 'center',
  marginLeft: 250

  };
export default React.createClass({
  render() {
    return (<MuiThemeProvider>
        <div>

        <div style={styles}>
          <h3>Sorular</h3>

                <QuestionCheckbox questionId={questions[1].id} question={questions[1].title} answers={questions[1].answers}/>

              <br/><br/><br/>
            <div style={styles.button}>
            <Link to="/testover"><RaisedButton label="İleri" primary={true}/></Link>
            </div>

        </div>
</div>
      </MuiThemeProvider>
    )}
})
