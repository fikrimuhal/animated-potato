import _ from 'lodash'
import * as util from './utils'
import moment from 'moment'
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
};


export const getUserByEmail = function getUserByEmail(email) {
  var users = getUsers();
  var findIndex = _.findIndex(users,(user)=>{return user.email==email});
  return (findIndex == -1)? null:users[findIndex];
};
export const getUserById = function getUserById(id) {
  var users = getUsers();
  var findIndex = _.findIndex(users,(user)=>{return user.id==id});
  return (findIndex == -1)? null:users[findIndex];
};
export const setUser = function setUser(userInfo) {
  var users = getUsers();
  users.push(userInfo);
  localStorage.setItem('users', JSON.stringify(users));
  var result = {
    status:"ok",
    token:"abc"
  };
  return result;
};

export const getUsersFromAPI =function getUsersFromAPI(){
    var promise = new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve(getUsers());
        },3000);
    });
    return promise;
};
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
  for (var i = 0; i <5; i++) {
     var name = names[Math.floor(Math.random()*10)];
     var lastName = names[Math.floor(Math.random()*10)];
     var score = Math.floor(Math.random()*100);
     var date = Date.now() - (Math.floor(Math.random()*10)*60*60*60);
     result.push({
       fullName: name +' ' + lastName,
       score:score,
       date:moment(date).format('LLL'),
       id:i
     })
  };
  return result;
};

export const getApplicantListFromAPI = function getApplicantListFromAPI() {
    var promise = new Promise((resolve,reject)=>{
        setTimeout(function () {
            resolve(JSON.stringify(getApplicantList()));
        },3000);
    });
    return promise;
}

export const getQuestionSets = function getQuestionSets() {
  return ["Default Set","Set 1","Set 2","Set 3", "Back End Set", "Front End Set"];
}

export const getQuestionCategories = function getQuestionCategories(){

  return ["Default Category","Back-End","Front-End","Sistem-Yöneticisi","DBA","Java EE","Machine Learning"]
}



export const authenticate = function authenticate(username,password) {

  var promise;
  console.log(moment().format('LLLL'));

    promise = new Promise(function(resolve, reject) {

      console.log("username,password",username,password);
      var successMessage = {
        status:"ok",
        token:"abc",
        userInfo:{
          name:"Mesut",
          lastname:"Can",
            email: "mesutcan@gmail.com",
            photo: "img",
            website: "mesutcan.com",
            yournotes: "Beni işe alın!! (^_^) (-_-)",
            admin:(username=="admin")
        }
      };

      var errorMessage = {
        status:"fail"
      };
      var result = (Math.floor(Math.random()*10) % 3) != 0;
      var message = (result)? successMessage:errorMessage;
      resolve(message)
      // setTimeout(()=> resolve(message)
      // ,2000)

    });



  return promise;
  // return (result)? successMessage:errorMessage;
}

export const auth2 = (username,password) => {
    return  fetch("/authentication",{
        method:'POST',
        body:JSON.stringify({"username":username,"password":password})
      });
}

export const getApiPromise = method => data =>{
    return fetch('http://192.168.1.61:9000/'+method,{
        method:'POST',
        body:  JSON.stringify(data),
        headers: new Headers({
         'Content-Type': 'application/json',
         'Accept': 'application/json',
          'mode':'cors'
       })
     });
}

export const getUserInfo= ()=> {
  return JSON.parse(localStorage.getItem("userInfo"));
}
export const setUserInfo= (userInfo)=> {
  localStorage.setItem("userInfo",JSON.stringify(userInfo));
}

export const isLoggedIn = ()=>{
    return util.getToken() != null;
}

export const isAdmin = ()=>{
  var userInfo = getUserInfo();
  if (isLoggedIn() && userInfo.admin)
    return true;
  return false;
}

export const isUser = ()=>{
    var userInfo = getUserInfo();
    if(isLoggedIn() && !userInfo.admin)
        return true;
    return false;
}

export const clearUserAuthenticationInfo = ()=>{
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
}



export const startTest = ()=>{
    var promise = new Promise((resolve,reject)=>{
       setTimeout(()=>{

           var questions = getQuestionsFromStorage();
           var index = Math.floor(Math.random() * questions.length);
           var response = {
               valid:(Math.floor(Math.random()*100) % 7 != 0),
               firstQuestion: questions[index],
               questionCount: Math.floor(Math.random() * 100)
           };
           console.log("startTest()->",response)
            resolve(response);
       },800)
    });
    return promise;
};
export const startTestWithoutAuthentication = (email)=>{
    //Request to API by email and without auth token
    var promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{

            var questions = getQuestionsFromStorage();
            var index = Math.floor(Math.random() * questions.length);
            var response = {
                valid:(Math.floor(Math.random()*100) % 7 != 0),
                firstQuestion: questions[index],
                questionCount: Math.floor(Math.random() * 100)
            };
            console.log("startTest()->",response)
            resolve(response);
        },800)
    });
    return promise;
};

export const answerQuestion = (questionId,answer)=>{
    var data = {
        questionId:questionId,
        answer:answer,
        token:util.getToken()
    };
    var promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            var questions = getQuestionsFromStorage();
            var index = Math.floor(Math.random() * questions.length);
            var response = {
                testOver:(Math.floor(Math.random()*1000) % 7 == 0),
                nextQuestion: questions[index],
                questionCount: Math.floor(Math.random() * 100),
                isValidUser:Math.floor(Math.random() * 100) % 5 == 0 // eğer false ise kayıt olma ekranına gidecek,true ise oturum açma ekranına gidicek
            };
            resolve(response);
        },Math.floor(Math.random()*500))
    });
    return promise;
};
