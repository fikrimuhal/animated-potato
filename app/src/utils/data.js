import React from 'react'
const questions = [
  {
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
        weight:0.6
      }
    ],
    options:[],
    setList:["Set 1"]
  },
  {
    title: "Aşağıdakilerden hangisinde daha kötüsünüz?",
    id: 1,
    type: "radio",
    categoryWeights:[
      {
        category:"Front-End",
        weight:0.5
      }
    ],
    options:[],
    setList:["Set 2"]
  }
]
export const getQuestionFromStorage = function () {
  var storage = localStorage.getItem('questions');
  if (storage == null) {
    localStorage.setItem('questions',JSON.stringify(questions));
    storage = localStorage.getItem('questions');
  }
  return JSON.parse(storage);
}

export const setQuestionToStorage = function(question){
    //var storage = localStorage.getItem('questions');
    var list = getQuestionFromStorage();
    list.push(question);
    localStorage.setItem('questions',JSON.stringify(list));
}
