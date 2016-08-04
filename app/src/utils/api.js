import db from './data.js'
export const authenticate = db.getApiPromise("authenticate")
export const questionList = db.getApiPromise("questionList")
