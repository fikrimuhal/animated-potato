/**
 * Created by MYigit on 19.8.2016.
 */
import * as db  from './data'
import * as mockDataFactory from './mock_data'
import * as Cache from './cache'
export const getUserSkillTestReport = userId =>{
    var promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            var response = {
                isValidUser:true,
                userInfo:{
                    name:"Mesut",
                    lastname:"Yiğit",
                    id:userId
                },
                reportHtml:'<div>Server side rendering html content of skill test report....</div>'
            };
            if(response.isValidUser) {
                Cache.cacheTestResultReport(response.userInfo,response.reportHtml);
            }
            resolve(JSON.stringify(response));
        },Math.floor(Math.random() * 1500))
    });
    return promise;
};

export const getQuestionSets = () =>{
    var promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            var response = mockDataFactory.questionSets(5);
            resolve(JSON.stringify(response));
        },Math.floor(Math.random() * 2000));
    });
    return promise;
};
