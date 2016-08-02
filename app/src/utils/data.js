import _ from 'lodash'
import {util} from './'
const questions = []
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
  }

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
export const getQuestionsBySetName = function getQuestionsBySetName(setName) {
  var allQuestion = getQuestionsFromStorage();
  var _questions  = _.filter(allQuestion,(q)=> {return _.includes(q.setList,setName);});
  return _questions;
}
export const getQuestionsByCategory = function getQuestionsByCategory(category) {
  var allQuestion = getQuestionsFromStorage();

  var _questions  = _.filter(allQuestion,
                            (q)=> {
                                    let index= _.findIndex(util.obj2Array(q.categoryWeights),
                                                      (c)=>{
                                                              return c.category==category;
                                                            });
                                    return index != -1;
                                  });
  return _questions;
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

export const setApplicant = function setApplicant(userId,answers) {
  var applicants = getApplicants();
  var isNew  = getApplicantByUserId(userId) == null;
  if (isNew) {
    var newApplicant = {
      "userId" : userId,
      "date": Date.now(),
      "answers": answers
    }
    applicants.push(newApplicant);
    localStorage.setItem('applicants', JSON.stringify(applicants));
  }
  else {
    console.log("User has applyed before.");
  }


}

export const getApplicantByUserId=function getApplicantByUserId(userId){
    var applicants = getApplicants();
    var applicant = _.filter(applicants,(x)=>{return x.userId==userId});
    var result = (applicant.length > 0)? applicant[0]:null;
    return result;
}
export const getApplicantList = function getApplicantList() {
  var result = [];
  var seed = 1;
  var names = ["Ahmet","Mehmet","Can","Veli","Öztürk","Türk","Ali","Ayşe","Gül","Levent"]
  for (var i = 0; i <500; i++) {
     var name = names[Math.floor(Math.random()*10)];
     var lastName = names[Math.floor(Math.random()*10)];
     var score = Math.floor(Math.random()*100);
     var date = Date.now() - (Math.floor(Math.random()*10)*60*60*60);
     result.push({
       fullName: name +' ' + lastName,
       score:score,
       date:date,
       id:i
     })
  };
  return result;
}

export const getQuestionSets = function getQuestionSets() {
  return ["Set 1","Set 2","Set 2"];
}
