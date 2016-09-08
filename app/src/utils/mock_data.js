import * as faker from 'Faker';
import {log2} from '../utils'
import * as api from '../utils/api'
const log = log2("MockData");

export const questionSets = (count)=>{
    var result = [];
    for( var i = 0; i < count; i++ ) {
        result.push({
            id:i,
            title:"Set-" + faker.Name.firstName(),
            questionCount:Math.floor(Math.random() * 100),
            isDefault:(i == 3)
        });
    }
    return result;
};

export const TestResultMockDataCreator = {
    createRadarData:()=>{
        return ["Java","Backend","Frontend","XML","C#","Machine Learning"].map(category=>{
            return {
                category:category,
                score:Math.random()
            }
        })
    },
    getRadarData:()=>{
        return {
            score:TestResultMockDataCreator.createRadarData(),
            companyScore:TestResultMockDataCreator.createRadarData(),
            generalScore:TestResultMockDataCreator.createRadarData()
        };

    }
};

import sorular from '../../../design/sorular';


export const MockQuestionCreator = {
    getCategoryWeights:(cw)=>{
      return cw.map(item=>{
         return {
             id:parseInt(item.c),
             weight:item.w
         }
      });
    },
    initQuestions:()=>{
        log("questionsJson",sorular);
        var data;
        data = sorular.map(soru=>{
            return {
                title: soru.t,
                qType:"yesno",
                options:[
                    {"title" : "Evet" ,  "weight" : 1.0},
                    {"title" : "Hayır", "weight" : 0.0}
                ],
                "setList" : [1,2],
                categoryWeights:MockQuestionCreator.getCategoryWeights(soru.cw)
            }
        });
        // api.QuestionAPI.create(data[0]);
        data.forEach(soru=>{
            api.QuestionAPI.create(soru);
        });
        log("data",data);
    }
};