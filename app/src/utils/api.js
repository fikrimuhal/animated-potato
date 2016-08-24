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
export const signUp = db.getApiPromise("signUp");
