import React from 'react';
import QuestionFreeText from '../../components/QuestionFreeText';

const questions = {
  1: {
    title: "Naber",
    id: 1,
  },
  2: {
    title: "Kaç yaşındasın?",
    id: 2,
  },
  multiLine:true
}
const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};
export default React.createClass({
  render() {
    return (
            <div>
            <QuestionFreeText questionid={questions[1].id} question={questions[1].title} multiLine={questions.multiLine}/>
              <QuestionFreeText questionid={questions[2].id} question={questions[2].title} multiLine={questions.multiLine}/>
            </div>
        )}
    })
