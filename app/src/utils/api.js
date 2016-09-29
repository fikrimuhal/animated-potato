import * as db from './data.js'
const SecureLevel = {
    SECURED: true,
    ANONYM: false
}
export const authenticate = db.getApiPromise("login", "POST", SecureLevel.ANONYM);
export const signUp = db.getApiPromise("signUp", "POST", SecureLevel.ANONYM);
export const getParticipants = db.getApiPromise("admin/getParticipants", "GET", SecureLevel.SECURED);
export const getCategoryList = db.getApiPromise("admin/getCategories", "POST", SecureLevel.SECURED);
export const getApplicants = db.getApiPromise("admin/getApplicants", "GET", SecureLevel.SECURED)
export const QuestionSetAPI = {
    getAllQuestionSet: db.getApiPromise("admin/getSets", "GET", SecureLevel.SECURED),
    setQuestionSet: db.getApiPromise("admin/insertSet", "POST", SecureLevel.SECURED),
    deleteQuestionSet: db.getApiPromise("admin/deleteSet", "POST", SecureLevel.SECURED),
    makeDefaultSet: db.getApiPromise("admin/makeDefaultSet", "POST", SecureLevel.SECURED),
    updateQuestionSet: db.getApiPromise("admin/updateSet", "POST", SecureLevel.SECURED)
};

export const QuestionAPI = {
    getAll: db.getApiPromise("admin/getQuestions", "GET", SecureLevel.SECURED),
    getById: questionId => db.getApiPromise("admin/getQuestion/" + questionId, "GET", SecureLevel.SECURED),
    create: db.getApiPromise("admin/insertQuestion", "POST", SecureLevel.SECURED),
    update: db.getApiPromise("admin/updateQuestion", "POST", SecureLevel.SECURED),
    deleteById: db.getApiPromise("admin/deleteQuestion", "POST", SecureLevel.SECURED)
};

export const InterviewAPI = {
    startTest: db.getApiPromise("startTest", "POST", SecureLevel.ANONYM),
    startTestWithoutAuthentication: (email)=> db.getApiPromise("startTest", "POST", SecureLevel.ANONYM),
    nextQuestion: db.getApiPromise("nextQuestion", "POST", SecureLevel.ANONYM),
    deleteInterview: db.getApiPromise("admin/deleteInterview","POST",SecureLevel.SECURED)
};

export const UserAPI = {
    getUsers: db.getApiPromise("admin/getUsers", "GET", SecureLevel.SECURED),
    getStaffs: db.getApiPromise("admin/getPersonnels", "GET", SecureLevel.SECURED),
    makeStaff: db.getApiPromise("admin/makePersonnel", "POST", SecureLevel.SECURED),
    deleteUser: db.getApiPromise("admin/deleteUser", "POST", SecureLevel.SECURED),
    makeAdmin: db.getApiPromise("admin/makeAdmin", "POST", SecureLevel.SECURED),
    unmakeStaff: db.getApiPromise("admin/makeUnPersonnel", "POST", SecureLevel.SECURED),
    unmakeAdmin: db.getApiPromise("admin/makeUnadmin", "POST", SecureLevel.SECURED)
};

export const ReportAPI = {
    getAllResult: db.getApiPromise("admin/getUsersResults", "POST", SecureLevel.SECURED),
    getComparativeResult: db.getApiPromise("getComparativeReport", "POST", SecureLevel.SECURED),
    getScoreTable: db.getApiPromise("admin/getCategoryResults", "POST", SecureLevel.SECURED),
    getAnswersByInterviewId: db.getApiPromise("admin/getInterviewAnswers", "POST", SecureLevel.SECURED)
}

export const CategoryAPI = {
    insert: db.getApiPromise("admin/insertCategory", "POST")
}