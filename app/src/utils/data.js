import _ from 'lodash'
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

const _users =[];
const _applicants = []

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
export const QuestionSetDelete = function QuestionSetDelete(key){

  var sets = getQuestionSetAddToStorage();
  var newSet = _.filter(sets, function(set){return set.id != key});
  localStorage.setItem('setModels', JSON.stringify(newSet))
}

export const UserDelete = function UserDelete(key){
  var users = getUsers();
  var newUsers = _.filter(users, function(user){return user.id != key});
  localStorage.setItem('users', JSON.stringify(newUsers))
}

export const getUsers= function getUsers() {
  var storage = localStorage.getItem('users');
  if(storage == null){
    localStorage.setItem('users', JSON.stringify(_users));
    storage = localStorage.getItem('users')
  }
  return JSON.parse(storage);
}
export const getUserByEmail = function getUserByEmail(email) {
  var users = getUsers();
  var findIndex = _.findIndex(users,(user)=>{return user.email==email});
  return (findIndex == -1)? null:users[findIndex];
}
export const getUserById = function getUserById(id) {
  var users = getUsers();
  var findIndex = _.findIndex(users,(user)=>{return user.id==id});
  return (findIndex == -1)? null:users[findIndex];
}
export const setUser = function setUser(userInfo) {
  var users = getUsers();
  users.push(userInfo);
  localStorage.setItem('users', JSON.stringify(users));
}

export const getApplicants = function getApplicants() {
  var storage = localStorage.getItem('applicants');
  if(storage == null){
    localStorage.setItem('applicants', JSON.stringify(_applicants));
    storage = localStorage.getItem('applicants')
  }
  return JSON.parse(storage);
}

export const setApplicant = function setApplicant(userId) {
  var applicants = getApplicants();
  var newApplicant = {
    userId : userId,
    date: Date.now(),
    answers: []
  }
  applicants.push(newApplicant);
  localStorage.setItem('applicants', JSON.stringify(applicants));
}

export const setUserToStorage = function setUserToStorage(user){
    var list = getQuestionsFromStorage();
    list.push(user);
    localStorage.setItem('users',JSON.stringify(list));
}

export const getUserFromStorage = function getUserFromStorage() {
  var storage = localStorage.getItem('users');
  if (storage == null) {
    localStorage.setItem('users', JSON.stringify(users));
    storage = localStorage.getItem('users');
  }
  return JSON.parse(storage);
}
