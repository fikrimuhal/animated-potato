import * as db from './data.js'
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
export const questionList = db.getApiPromise("questionList");
export const getCategoryList = db.getApiPromise("admin/getCategories");
export const getAllQuestionSet = db.getApiPromise("admin/getSets");
export const setQuestionSet = db.getApiPromise("admin/insertSet");
export const signUp = db.getApiPromise("signUp");
