import React from 'react';
import QuestionCheckbox from '../../components/QuestionCheckbox';

const questions = {
  1: {
    title: "Aşağıdailerden hangisini biliyorsunuz?",
    id: 1,
    answers: [
      {title: "JavaScript", value: 1},
      {title: "Python", value: 2},
      {title: "Html", value: 3},
      {title: "C++", value: 4}
    ]
  },
  2: {
    title: "Aşağıdailerden hangisini bilmiyorsunuz?",
    id: 2,
    answers: [
      {title: "C", value: 1},
      {title: "Scala", value: 2},
      {title: "React", value: 3},
      {title: ".Net", value: 4}
    ]
  }
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
            <QuestionCheckbox questionId={questions[1].id} question={questions[1].title} answers={questions[1].answers} />
              <QuestionCheckbox questionId={questions[2].id} question={questions[2].title} answers={questions[2].answers} />
            </div>
        )}
    })
