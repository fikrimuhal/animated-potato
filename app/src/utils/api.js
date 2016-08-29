import * as db from './data.js'
//region Authentication
    /**
     *  request:    username:string, required
     *              password:string, required
     *
     *  response-success:
     *              status:"ok"
     *              userInfo: {}
     *              isAdmin=:booelan
     *              Authorization token in header
     *  response-fail
     *              status:"fail",
     *              faultCode:string
     *              message:string
     */
    export const authenticate = db.getApiPromise("login");
//endregion

export const questionList = db.getApiPromise("questionList");
export const getCategoryList = db.getApiPromise("admin/getCategories");
export const getAllQuestionSet = db.getApiPromise("admin/getSets");
export const setQuestionSet = db.getApiPromise("admin/insertSet");

//region Save Question
    /**
     *  request:    {questionModel}
     *
     *  response-success:
     *              status:"OK"
     *              message: ""
     *  response-fail
     *              status:"FAIL"
     *              faultCode:string
     *              message:string
     */
    export const insertQuestion = db.getApiPromise("admin/insertQuestion");
//endregion

export const signUp = db.getApiPromise("signUp");
