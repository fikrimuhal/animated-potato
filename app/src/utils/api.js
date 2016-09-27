import * as db from './data.js'

export const authenticate = db.getApiPromise("login", "POST",false);
export const signUp = db.getApiPromise("signUp", "POST",false);
export const getParticipants = db.getApiPromise("admin/getParticipants", "GET");
export const getCategoryList = db.getApiPromise("admin/getCategories", "POST");
export const getApplicants = db.getApiPromise("admin/getApplicants", "GET")
export const QuestionSetAPI = {
    getAllQuestionSet: db.getApiPromise("admin/getSets", "GET"),
    setQuestionSet: db.getApiPromise("admin/insertSet", "POST"),
    deleteQuestionSet: db.getApiPromise("admin/deleteSet", "POST"),
    makeDefaultSet: db.getApiPromise("admin/makeDefaultSet", "POST"),
    updateQuestionSet: db.getApiPromise("admin/updateSet", "POST")
};

export const QuestionAPI = {
    getAll: db.getApiPromise("admin/getQuestions", "GET"),
    getById: questionId => db.getApiPromise("admin/getQuestion/" + questionId, "GET"),
    create: db.getApiPromise("admin/insertQuestion", "POST"),
    update: db.getApiPromise("admin/updateQuestion", "POST"),
    deleteById: db.getApiPromise("admin/deleteQuestion", "POST")
};

export const InterviewAPI = {
    startTest: db.getApiPromise("startTest", "POST",false),
    startTestWithoutAuthentication: (email)=> db.getApiPromise("startTest", "POST",false),
    nextQuestion: db.getApiPromise("nextQuestion", "POST",false)
};

export const UserAPI = {
    getUsers: db.getApiPromise("admin/getUsers", "GET"),
    getStaffs: db.getApiPromise("admin/getPersonnels", "GET"),
    makeStaff: db.getApiPromise("admin/makePersonnel", "POST"),
    deleteUser: db.getApiPromise("admin/deleteUser", "POST"),
    makeAdmin: db.getApiPromise("admin/makeAdmin", "POST")
};

export const ReportAPI = {
    getAllResult: db.getApiPromise("admin/getUsersResults", "POST"),
    getComparativeResult:db.getApiPromise("getComparativeReport","POST"),
    getScoreTable:db.getApiPromise("admin/getCategoryResults","POST"),
    getAnswersByInterviewId:db.getApiPromise("admin/getInterviewAnswers","POST")
}

export const CategoryAPI = {
    insert: db.getApiPromise("admin/insertCategory", "POST")
}