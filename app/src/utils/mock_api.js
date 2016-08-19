/**
 * Created by MYigit on 19.8.2016.
 */
import * as db  from './data'
export const getUserSkillTestReport=userId => {
    var promise=new Promise((resolve, reject)=> {
        setTimeout(()=> {
            var response={
                isValidUser: true,
                userInfo: {
                    name: "Mesut",
                    lastname: "Yiğit"
                },
                reportHtml: '<div>Server side rendering html content of skill test report....</div>'
            };
            resolve(JSON.stringify(response));
        }, Math.floor(Math.random() * 1500))
    });

    return promise;
};