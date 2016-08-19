import * as db from './data.js'
export const authenticate = db.getApiPromise("//192.168.1.61:9000/signup");
export const questionList = db.getApiPromise("questionList");
export const signUp = db.getApiPromise("signUp");
