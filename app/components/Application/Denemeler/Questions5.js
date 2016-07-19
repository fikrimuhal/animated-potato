import React from 'react';
import QuestionFreeText from '../../components/QuestionFreeText';

const questions = {
  1: {
    title: "Kaç yıldır aktif olarak çalışıyorsun?",
    id: 1,
  },
  2: {
    title: "Kaç yaşındasın?",
    id: 2,
  },
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
            <QuestionFreeText questionid={questions[1].id} question={questions[1].title}/>
              <QuestionFreeText questionid={questions[2].id} question={questions[2].title}/>
            </div>
        )}
    })
