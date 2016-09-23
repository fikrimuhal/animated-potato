import * as faker from 'Faker';
import {log2} from '../utils'
import * as api from '../utils/api'
import sorular from '../../../design/sorular';
const log = log2("MockData");

export const questionSets = (count)=> {
    var result = [];
    for (var i = 0; i < count; i++) {
        result.push({
            id: i,
            title: "Set-" + faker.Name.firstName(),
            questionCount: Math.floor(Math.random() * 100),
            isDefault: (i == 3)
        });
    }
    return result;
};

export const TestResultMockDataCreator = {
    createRadarData: ()=> {
        return ["Java", "Backend", "Frontend", "XML", "C#", "Machine Learning", "A", "B", "C", "D"].map(category=> {
            return {
                category: category,
                score: Math.random()
            }
        })
    },
    getRadarData: ()=> {
        return {
            score: TestResultMockDataCreator.createRadarData(),
            companyScore: TestResultMockDataCreator.createRadarData(),
            generalScore: TestResultMockDataCreator.createRadarData()
        };

    },
    createScoresData: (count)=> {
        var data = [];
        var categories = ["Java", "C#", "Backend", "Frontend", "ReactJS", "BackboneJS", "MeteorJs", "Scala", "PlayFW", "Matlab", "Webpack", "Asp.NET", "PHP", "JS"];
        for (var i = 0; i < count; i++) {
            var item = {};
            item.participantId = i;
            item.inteviewId = i;
            item.name = faker.Name.firstName();
            item.lastName = faker.Name.firstName();
            item.overallPercentage = Math.floor(Math.random() * 100);
            item.overallScore = Math.floor(Math.random() * 100);
            item.overAllConfidence = Math.floor(Math.random() * 10);
            item.scores = (()=> {
                return categories.map(cat=> {
                    var score = {};
                    score.category = {category: cat, id: Math.floor(Math.random() * 100)};
                    score.score = Math.floor(Math.random() * 100);
                    score.percentage = Math.floor(Math.random() * 100);
                    score.confidence = Math.floor(Math.random() * 10);
                    return score;
                });
            })();
            data.push(item);
        }
        console.log("createScoresData", data);
        return data;
    }
};


export const MockQuestionCreator = {
    getCategoryWeights: (cw)=> {
        return cw.map(item=> {
            return {
                id: parseInt(item.c),
                weight: item.w
            }
        });
    },
    initQuestions: ()=> {
        log("questionsJson", sorular);
        var data;
        data = sorular.map(soru=> {
            return {
                title: soru.t,
                qType: "yesno",
                options: [
                    {"title": "Evet", "weight": 1.0},
                    {"title": "Hayır", "weight": 0.0}
                ],
                "setList": [1, 2],
                categoryWeights: MockQuestionCreator.getCategoryWeights(soru.cw)
            }
        });
        // api.QuestionAPI.create(data[0]);
        data.forEach(soru=> {
            api.QuestionAPI.create(soru);
        });
        log("data", data);
    }
};

export const mock_users = [

    {
        name: "Ahmet",
        lastname: "Yiğit",
        email: "ahmet@mesut.com",
        phone: "123321123",
        photo: "",
        website: "",
        notes: "",
        username: "ahmet",
        password: "123321"
    },
    {
        name: "Mehmet",
        lastname: "Tazegül",
        email: "mehmet@mesut.com",
        phone: "123321123",
        photo: "",
        website: "",
        notes: "",
        username: "mehmet",
        password: "123321"
    },
    {
        name: "Veli",
        lastname: "Yiğit",
        email: "veli@mesut.com",
        phone: "123321123",
        photo: "",
        website: "",
        notes: "",
        username: "veli",
        password: "123321"
    }
];