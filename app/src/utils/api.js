import * as db from './data.js'

export const authenticate = db.getApiPromise("login","POST");
export const signUp = db.getApiPromise("signUp","POST");
export const getParticipants = db.getApiPromise("admin/getParticipants","GET");
export const getCategoryList = db.getApiPromise("admin/getCategories","POST");

export const QuestionSetAPI = {
    getAllQuestionSet:db.getApiPromise("admin/getSets","GET"),
    setQuestionSet:db.getApiPromise("admin/insertSet","POST"),
    deleteQuestionSet: db.getApiPromise("admin/deleteSet","POST"),
    makeDefaultSet:db.getApiPromise("admin/makeDefaultSet","POST"),
    updateQuestionSet:db.getApiPromise("admin/updateSet","POST")
};

export const QuestionAPI = {
    getAll : db.getApiPromise("admin/getQuestions","GET"),
    getById: questionId => db.getApiPromise("admin/getQuestion/" + questionId,"GET"),
    create:db.getApiPromise("admin/insertQuestion","POST"),
    update:db.getApiPromise("admin/updateQuestion","POST"),
    deleteById:db.getApiPromise("admin/deleteQuestion","POST")
};

export const InterviewAPI = {
    startTest: db.getApiPromise("startTest","POST"),
    startTestWithoutAuthentication: (email)=> db.getApiPromise("startTest","POST"),
    nextQuestion: db.getApiPromise("nextQuestion","POST")
}