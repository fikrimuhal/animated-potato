import * as time    from './timeUtil';
import * as _       from 'lodash'
import log2         from './log2'
const log = log2("Cache.js->");
/*
 * katılımcı listesi cache verisi formatı
 * {
 *   data: -> json formatında data verisi
 *   createdTime-> cachelenme zamanı
 * }
 * */
//katılımcı listesi cache'de varmı yokmu onu kontrol eder.(olumlu sonuc döndürmesi için cachelenmiş ve 2 dk' bekleme süresini geçmemiş olmaması lazım)
export const ParticipantsCache = {
    cache:data=>{
        var cacheData = {
            data:data,
            createdTime:Date.now()
        };
        localStorage.setItem("participantListCache",JSON.stringify(cacheData));
    },
    check:()=>{
        var participantListCache = localStorage.getItem("participantListCache");
        if(participantListCache == null)return false;
        var cache = JSON.parse(participantListCache);
        var cacheTime = cache.createdTime;
        if(participantListCache == null)return false;
        var now = Date.now();
        var diff = time.timeDiff(now,cacheTime);
        return diff.minute <= 2;
    },
    get:()=>{
        var participantListCache = localStorage.getItem("participantListCache");
        var list = [];
        if(participantListCache != null) {
            list = JSON.parse(participantListCache).data;
        }
        return list;
    },
    clear:()=>{
        localStorage.removeItem("participantListCache");
    }
};

export const checkTestResultReportCache = userId=>{
    var info = getTestResultReportFromCache(userId);
    log("info",info)
    if(info == null) return false;
    var cacheTime = info.createdTime;
    var now = Date.now();
    var diff = time.timeDiff(now,cacheTime);
    return diff.minute <= 2;
};
export const cacheTestResultReport = (userInfo,report)=>{
    var cacheData = {
        userInfo:userInfo,
        reportHtml:report,
        createdTime:Date.now()
    };
    var testResults = localStorage.getItem("testResults") || "[]";
    testResults = JSON.parse(testResults);
    var data = _.filter(testResults,(result)=>{
        result.id != userInfo.id
    });
    data.push(cacheData);
    localStorage.setItem("testResults",JSON.stringify(data));
};
export const getTestResultReportFromCache = (userId)=>{
    var testResults = localStorage.getItem("testResults") || "[]";
    testResults = JSON.parse(testResults);
    var newResult = _.filter(testResults,(result)=>{
        //log("filter inside",result.userInfo.id,userId,result.userInfo.id == userId)
        return result.userInfo.id == userId
    });
    //log("result,newResult",testResults,newResult);
    return (newResult.length > 0) ? newResult[0] : null;
};

export const CategoryCaching = {
    cache:data=>{
        var cacheData = {
            data:data,
            createdTime:Date.now()
        };
        localStorage.setItem("categoriesCache",JSON.stringify(cacheData));
    },
    get:()=>{
        var categoriesCache = localStorage.getItem("categoriesCache");
        var list = [];
        if(categoriesCache != null) {
            list = JSON.parse(categoriesCache).data;
        }
        return list;
    },
    check:()=>{
        var categoriesCache = localStorage.getItem("categoriesCache");
        if(categoriesCache == null)return false;
        var cache = JSON.parse(categoriesCache);
        var cacheTime = cache.createdTime;
        var now = Date.now();
        var diff = time.timeDiff(now,cacheTime);
        return diff.minute <= 1;
    },
    clear:()=>{
        localStorage.removeItem("categoriesCache");
    }
}

export const QuestionSetCaching = {
    cache:(data)=>{
        var cacheData = {
            data:data,
            createdTime:Date.now()
        };
        localStorage.setItem("questionSetsCache",JSON.stringify(cacheData));
    },
    get:()=>{
        var questionSetsCache = localStorage.getItem("questionSetsCache");
        var list = [];
        if(questionSetsCache != null) {
            list = JSON.parse(questionSetsCache).data;
        }
        return list;
    },
    check:()=>{
        var questionSetsCache = localStorage.getItem("questionSetsCache");
        if(questionSetsCache == null)return false;
        var cache = JSON.parse(questionSetsCache);
        var cacheTime = cache.createdTime;
        var now = Date.now();
        var diff = time.timeDiff(now,cacheTime);
        return diff.minute <= 1;
    },
    clear:()=>{
        localStorage.removeItem("questionSetsCache");
    }
};

export const QuestionCaching = {
    cacheAll:data=>{
        var cacheData = {
            data:data,
            createdTime:Date.now()
        };
        localStorage.setItem("allQuestionCache",JSON.stringify(cacheData));
    },
    getAll:()=>{
        var allQuestionCache = localStorage.getItem("allQuestionCache");
        var list = [];
        if(allQuestionCache != null) {
            list = JSON.parse(allQuestionCache).data;
        }
        return list;
    },
    checkAll:()=>{
        var allQuestionCache = localStorage.getItem("allQuestionCache");
        if(allQuestionCache == null)return false;
        var cache = JSON.parse(allQuestionCache);
        var cacheTime = cache.createdTime;
        var now = Date.now();
        var diff = time.timeDiff(now,cacheTime);
        return diff.minute <= 5;
    },
    check:(questionId)=>{
        var allQuestionCache = localStorage.getItem("allQuestionCache");
        var result;
        if(allQuestionCache == null)return false;
        var cache = JSON.parse(allQuestionCache);
        var cacheTime = cache.createdTime;
        var now = Date.now();
        var diff = time.timeDiff(now,cacheTime);
        if(diff.minute > 5) result = false;
        else {
            var questions = _.filter(cache.data,(q)=>{return q.id == questionId});
            result = questions.length > 0;
        }

        return result;
    },
    get:(questionId)=>{
        var allQuestionCache = localStorage.getItem("allQuestionCache");
        var cache = JSON.parse(allQuestionCache).data;
        var question = _.filter(cache,(q)=>{return q.id == questionId})[0];
        return question;
    },
    clear:()=>{
        localStorage.removeItem("allQuestionCache");
    }
};

export const UserCaching = {
    cache:data =>{
        var cacheData = {
            data:data,
            createdTime:Date.now()
        };
        localStorage.setItem("usersCache",JSON.stringify(cacheData));
    },
    getAll:()=>{
        var cacheData = localStorage.getItem("usersCache");
        var list = [];
        if(cacheData != null) {
            list = JSON.parse(cacheData).data;
        }
        return list;
    },
    check:()=>{
        var cacheData = localStorage.getItem("usersCache");
        if(cacheData == null)return false;
        var cache = JSON.parse(cacheData);
        var cacheTime = cache.createdTime;
        var now = Date.now();
        var diff = time.timeDiff(now,cacheTime);
        return diff.minute <= 5;
    },
    clear:()=>{
        localStorage.removeItem("usersCache");
    }
};

export const StaffCaching = {
    cache:data =>{
        var cacheData = {
            data:data,
            createdTime:Date.now()
        };
        localStorage.setItem("staffsCache",JSON.stringify(cacheData));
    },
    getAll:()=>{
        var cacheData = localStorage.getItem("staffsCache");
        var list = [];
        if(cacheData != null) {
            list = JSON.parse(cacheData).data;
        }
        return list;
    },
    check:()=>{
        var cacheData = localStorage.getItem("staffsCache");
        if(cacheData == null)return false;
        var cache = JSON.parse(cacheData);
        var cacheTime = cache.createdTime;
        var now = Date.now();
        var diff = time.timeDiff(now,cacheTime);
        return diff.minute <= 100;
    },
    clear:()=>{
        localStorage.removeItem("staffsCache");
    }
};