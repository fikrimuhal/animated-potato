import * as time    from './timeUtil';
import * as _       from 'lodash'
import log2         from './log2'
const log = log2("Cache.js->");

//region Katılımcısı Listesi cache kontrol
// ************Katılımcısı Listesi cache kontrol**********start
/*
 * katılımcı listesi cache verisi formatı
 * {
 *   data: -> json formatında data verisi
 *   createdTime-> cachelenme zamanı
 * }
 * */
//katılımcı listesi cache'de varmı yokmu onu kontrol eder.(olumlu sonuc döndürmesi için cachelenmiş ve 2 dk' bekleme süresini geçmemiş olmaması lazım)
export const checkParticipantListFromCache = ()=>{
    var participantListCache = localStorage.getItem("participantListCache");
    if(participantListCache == null)return false;
    var cache = JSON.parse(participantListCache);
    var cacheTime = cache.createdTime;
    if(participantListCache == null)return false;
    var now = Date.now();
    var diff = time.timeDiff(now,cacheTime);
    return diff.minute <= 2;

};

//cache'den katılımcı  listesini  getirir
export const getParticipantListFromCache = ()=>{
    var participantListCache = localStorage.getItem("participantListCache");
    var list = [];
    if(participantListCache != null) {
        list = JSON.parse(participantListCache).data;
    }
    return list;
};

export const cacheParticipantList = list =>{
    var cacheData = {
        data:list,
        createdTime:Date.now()
    };
    localStorage.setItem("participantListCache",JSON.stringify(cacheData));
};
// ************Katılımcısı Listesi cache kontrol**********end
//endregion
//region Katılımcı Test Sonuç Raporu Cache Kontrol
// ************Katılımcı Test Sonuç Raporu Cache Kontrol***************start
/**
 * veri yapısı :
 * {
 *    userInfo -> obj,
 *    reportHtml   -> html string,
 *    createdTime -> cache time
 * }
 */
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
// ************Katılımcı Test Sonuç Raporu Cache Kontrol***************end
//endregion
//region Soru Kategorileri Cacheleme
/**
 * veri yapısı :
 * kategori listesi cache veri yapısı :
 * {
 *      data : Array of categoryInfo
 *      createdTime   -> cache time
 * }
 *      categoryInfo ->
 *      {
 *         id               -> int
 *         category         -> string,
 *
 *      }
 */

export const cacheCategories = data =>{
    var cacheData = {
        data:data,
        createdTime:Date.now()
    };
    localStorage.setItem("categoriesCache",JSON.stringify(cacheData));
};

export const getCategoriesFromCache = ()=>{
    var categoriesCache = localStorage.getItem("categoriesCache");
    var list = [];
    if(categoriesCache != null) {
        list = JSON.parse(categoriesCache).data;
    }
    return list;
};

export const checkCategoriesFromCache = ()=>{
    var categoriesCache = localStorage.getItem("categoriesCache");
    if(categoriesCache == null)return false;
    var cache = JSON.parse(categoriesCache);
    var cacheTime = cache.createdTime;
    var now = Date.now();
    var diff = time.timeDiff(now,cacheTime);
    return diff.minute <= 1;
};
//endregion
//region Soru Setlerini Cacheleme
/**
 * veri yapısı :
 * soru setleri listesi cache veri yapısı :
 * {
 *      data : Array of setInfo
 *      createdTime   -> cache time
 * }
 *      setInfo ->
 *      {
 *         id            -> int
 *         title        -> string,
 *         count:       -> int (setdeki soru sayısı)
 *         isdefaultset -> boolean (default soru setimi)
 *      }
 */

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

//endregion

//region All Question Caching
export const cacheAllQuestion = data =>{
    var cacheData = {
        data:data,
        createdTime:Date.now()
    };
    localStorage.setItem("allQuestionCache",JSON.stringify(cacheData));
};
export const getAllQuestionFromCache = ()=>{
    var allQuestionCache = localStorage.getItem("allQuestionCache");
    var list = [];
    if(allQuestionCache != null) {
        list = JSON.parse(allQuestionCache).data;
    }
    return list;
};
export const checkAllQuestionFromCache = ()=>{
    var allQuestionCache = localStorage.getItem("allQuestionCache");
    if(allQuestionCache == null)return false;
    var cache = JSON.parse(allQuestionCache);
    var cacheTime = cache.createdTime;
    var now = Date.now();
    var diff = time.timeDiff(now,cacheTime);
    return diff.minute <= 5;
};
export const checkQuestionFromCache = (questionId)=>{
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
};
export const getQuestionFromCache = (questionId)=>{
    var allQuestionCache = localStorage.getItem("allQuestionCache");
    var cache = JSON.parse(allQuestionCache).data;
    var question = _.filter(cache,(q)=>{return q.id == questionId})[0];
    return question;
};
//endregion