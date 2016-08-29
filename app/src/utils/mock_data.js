import * as faker from 'Faker';
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