import React from 'react'
const questions = {
  1: {
    title: "Aşağıdakilerden hangisinde daha iyisiniz?",
    id: 1,
    type: "radio",
    category:"Back-End",
    options:[],
    weight:2,
    set:"Set 1"
  },
  2: {
    title: "Aşağıdakilerden hangisinde daha kötüsünüz?",
    id: 2,
    type: "radio",
    category:"Front-End",
    options:[],
    weight:1,
    set:"Set 2"
  }
}
export const getQuestionFromStorage = function () {
  var storage = localStorage.getItem('questions');
  if (storage == null) {
    localStorage.setItem('questions',JSON.stringify(questions));
    storage = localStorage.getItem('questions');
  }
  return JSON.parse(storage);
}

export const setQuestionToStorage = function(question,key){
    var storage = localStorage.getItem('questions');
    var list = JSON.parse(storage);
    list[key] = question;
    localStorage.setItem('questions',JSON.stringify(list));
}
