/**
 * Created by MYigit on 20.9.2016.
 */
import React from 'react'
import {Row, Col}           from 'react-flexbox-grid'
import LinearProgress       from 'material-ui/LinearProgress';
import Paper                from 'material-ui/Paper'
import RaisedButton         from 'material-ui/RaisedButton'
import Divider              from  'material-ui/Divider'
import * as api             from '../../utils/api'
import * as Cache           from '../../utils/cache'
import  log2                from '../../utils/log2'
import * as mockData        from '../../utils/mock_data'
import sorular              from '../../../../design/sorular';

const log = log2("DbInitialization");
export default  class DbInitialization extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            waiting: false
        }
    }

    initCategory = ()=> {
        this.setState({
            waiting: true
        });
        var categories = ["Java", "C#", "Backend", "Frontend", "Javascript", "Scala",
                          "PHP", "ASP.NET", "Machine Learning", "ReactJS","Spark","Hadoop",
                          "OOP","C++","Unity","Objective C","Swift","Phyton","Ruby","Haskell"];
        var processedCategoryCount = 0;
        var checkFinish = ()=> {
            if (processedCategoryCount == categories.length) {
                this.setState({
                    waiting: false
                });
                this.context.showMessage("Finished.", 3000);
                Cache.CategoryCaching.clear();
            }
        }
        categories.forEach((category, index, array)=> {
            var request = {
                category: category,
                id: index
            };
            api.CategoryAPI.insert(request).then(response=> {
                return response.json()
            }).then(json=> {
                if (json.status == "OK") {
                    this.context.showMessage(category + " successfully added.", 3000);
                } else {
                    this.context.showMessage(category + " failed to add.", 3000);
                }
                processedCategoryCount++;
                checkFinish();
            }).catch(err=> {
                processedCategoryCount++;
                checkFinish();
            });
        });


    };
    initQuestionSet = ()=> {
        this.setState({
            waiting: true
        });
        var questionSets = [
            {title: "Arşiv", isDefaultSet: true},
            {title: "Mülakat Soruları", isDefaultSet: false},
            {title: "İşlenecek Sorular", isDefaultSet: false}
        ];
        var processedItems = 0;
        var checkFinish = ()=> {
            if (processedItems == questionSets.length) {
                this.setState({
                    waiting: false
                });
                this.context.showMessage("Finished.", 3000);
                Cache.QuestionSetCaching.clear();
            }
        }
        questionSets.forEach((questionSet, index, array)=> {
            var request = questionSet;
            api.QuestionSetAPI.setQuestionSet(request).then(response=> {
                return response.json()
            }).then(json=> {
                if (json.status == "OK") {
                    this.context.showMessage(category + " successfully added.", 3000);
                } else {
                    this.context.showMessage(category + " failed to add.", 3000);
                }
                processedItems++;
                checkFinish();
            }).catch(err=> {
                processedItems++;
                checkFinish();
            });
        });
    }
    initQuestions = ()=> {
        this.setState({
            waiting: true
        });

        var data;
        var processedItem = 0;
        var getCategoryWeights = (cw)=> {
            return cw.map(item=> {
                return {
                    id: parseInt(item.c),
                    weight: item.w
                }
            });
        };
        data = sorular.map(soru=> {
            return {
                title: soru.t,
                qType: "yesno",
                options: [
                    {"title": "Evet", "weight": 1.0},
                    {"title": "Hayır", "weight": 0.0}
                ],
                "setList": [1, 2],
                categoryWeights: getCategoryWeights(soru.cw)
            }
        });
        var checkFinish = ()=> {
            if (processedItem == data.length) {
                this.setState({
                    waiting: false
                });
                this.context.showMessage("Finished.", 3000);
                Cache.QuestionCaching.clear();
            }
        }
        data.forEach(soru=> {
            processedItem++;
            api.QuestionAPI.create(soru);
            checkFinish();
        });
    }
    initUsers = ()=>{
        this.setState({
            waiting: true
        });
        var processedItem = 0;
        var checkFinish = ()=> {
            if (processedItem == mockData.mock_users.length) {
                this.setState({
                    waiting: false
                });
                this.context.showMessage("Finished.", 3000);
            }
        }
        mockData.mock_users.forEach(user=>{
            api.signUp(user);
            processedItem++;
            checkFinish();
        })
    }
    render = ()=> {
        return (
            <div>
                <Row>
                    <LinearProgress mode="indeterminate"
                                    color="red"
                                    style={{height: "10px", display: this.state.waiting ? "" : "none"}}/>
                </Row>
                <hr/>
                <Row>
                    <Col lg={3}>
                        <RaisedButton label={"Init Category"} primary={true} onClick={this.initCategory}></RaisedButton>
                    </Col>
                    <Col lg={3}>
                        <RaisedButton label={"Init Question Sets"} primary={true}
                                      onClick={this.initQuestionSet}></RaisedButton>
                    </Col>
                    <Col lg={3}>
                        <RaisedButton label={"Init Questions"} primary={true}
                                      onClick={this.initQuestions}></RaisedButton>
                    </Col>
                    <Col lg={3}>
                        <RaisedButton label={"Init Users"} primary={true} onClick={this.initUsers}></RaisedButton>
                    </Col>
                </Row>
            </div>
        )
    }
}

DbInitialization.contextTypes = {
    showMessage: React.PropTypes.func
}