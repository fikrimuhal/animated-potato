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
const setModels = [
  {
    title: "Set 1",
    count: 23,
    id: 45
  },
  {
    title: "Set 4",
    count: 65,
    id:67
  },

]
export const getQuestionsFromStorage = function getQuestionsFromStorage() {
  var storage = localStorage.getItem('questions');
  if (storage == null) {
    localStorage.setItem('questions',JSON.stringify(questions));
    storage = localStorage.getItem('questions');
  }
  return JSON.parse(storage);
}

export const setQuestionToStorage = function setQuestionToStorage(question){
    //var storage = localStorage.getItem('questions');
    var list = getQuestionsFromStorage();
    list.push(question);
    localStorage.setItem('questions',JSON.stringify(list));
}

export const getQuestionSetAddToStorage = function getQuestionSetAddToStorage(){
  var storage = localStorage.getItem('setModels');
  if(storage == null){
    localStorage.setItem('setModels', JSON.stringify(setModels));
    storage = localStorage.getItem('setModels')
  }
  return JSON.parse(storage);
}

export const setQuestionSetAddToStorage = function setQuestionSetAddToStorage(setModels, key){
  var record = {title:setModels, count: 0, id: key}
  var list = getQuestionSetAddToStorage()

  list.push(record)
  localStorage.setItem('setModels', JSON.stringify(list))
}
