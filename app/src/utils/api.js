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
    export const authenticate = db.getApiPromise("login","POST");
//endregion

export const questionList = db.getApiPromise("questionList","POST");
export const getCategoryList = db.getApiPromise("admin/getCategories","POST");
export const getAllQuestionSet = db.getApiPromise("admin/getSets","POST");
export const setQuestionSet = db.getApiPromise("admin/insertSet","POST");

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
    export const insertQuestion = db.getApiPromise("admin/insertQuestion","POST");
//endregion

export const signUp = db.getApiPromise("signUp","POST");

//region Get Questions
/**
 *  request:    {}
 *
 *  response-success:
 *              List of question
 *  response-fail
 */
export const getAllQuestion = db.getApiPromise("admin/getQuestions","GET");
//endregion