/**
 * Created by MYigit on 31.8.2016.
 */
import React            from 'react'
import {Row,Col}        from 'react-flexbox-grid/lib/index';
import * as Cache       from '../../utils/cache'
import LinearProgress   from 'material-ui/LinearProgress';
import log2             from '../../utils/log2'
import Divider          from 'material-ui/Divider';
import FlatButton       from 'material-ui/FlatButton'
import {browserHistory} from 'react-router'
import QuestionEdit     from '../QuestionAdd/index'
import * as api         from '../../utils/api'
const log = log2("QuestionDetail");
export default  class QuestionDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question:{},
            dataWaiting:true
        };
        //log(this.props);
        var questionId = this.props.params.questionId;
        this.initializeData(questionId);

    }

    initializeData = function (questionId){
        log("initializeData",Cache.QuestionCaching.check(questionId))
        if(Cache.QuestionCaching.check(questionId)) {
            var question = Cache.QuestionCaching.get(questionId);
            this.state = {
                question:question,
                dataWaiting:false
            };
        }
        else {
            this.initializeFromAPI(questionId);
        }
    };
    initializeFromAPI = function (questionId){
        log("api",api.QuestionAPI.getById(questionId));
        api.QuestionAPI.getById(questionId)().then(response=>{
            return response.json()
        }).then(json=>{
            this.setState({
                question:json,
                dataWaiting:false
            })
        })
    };
    getQuestionSetInfo = function (question){
        var content = question.setList.map(setInfo=>{
            return (
                <span> {setInfo} </span>
            )
        });
        return content;
    }
    getQuestionCategoryInfo = function (question){
        var content = question.categoryWeights.map(item=>{
            return (
                <span> {item.id} -> {item.weight} ; </span>
            )
        });
        return content;
    };
    render = ()=>{
        var question = this.state.question;
        log("rendered",question);
        return (
            <div>
                <LinearProgress mode="indeterminate"
                                color="red"
                                style={{display:this.state.dataWaiting ? "" : "none"}}/>
                {
                    (()=>{
                        if(!this.state.dataWaiting) {
                            return ( <QuestionEdit editMode={true} question={question}/>);
                        }
                    })()
                }

                {/*<FlatButton label={"<- Back to List"}*/}
                {/*onClick={()=>{browserHistory.push("/adminpanel/questionlist")}}*/}
                {/*style={{float:"right"}}*/}
                {/*></FlatButton>*/}
                {/*<h5>Question Detail</h5><br/>*/}
                {/*<LinearProgress mode="indeterminate"*/}
                {/*color="red"*/}
                {/*style={{display:this.state.dataWaiting ? "" : "none"}}/>*/}
                {/*{*/}
                {/*(()=>{*/}
                {/*if(!this.state.dataWaiting) {*/}
                {/*return (*/}
                {/*<Row>*/}
                {/*<Col lg={12}>*/}
                {/*Question ID : <b>{question.id}</b>*/}
                {/*<Divider></Divider>*/}
                {/*</Col>*/}
                {/*<Col lg={12}>*/}
                {/*Question Title : <b>{question.title}</b>*/}
                {/*<Divider></Divider>*/}
                {/*</Col>*/}

                {/*<Col lg={12}>*/}
                {/*Question Type : <b>{question.qType}</b>*/}
                {/*<Divider></Divider>*/}
                {/*</Col>*/}
                {/*<Col lg={12}>*/}
                {/*Question Sets : <b>{this.getQuestionSetInfo(question)}</b>*/}
                {/*<Divider></Divider>*/}
                {/*</Col>*/}
                {/*<Col lg={12}>*/}
                {/*Question Categories And Weigths :*/}
                {/*<b>{this.getQuestionCategoryInfo(question)}</b>*/}
                {/*<Divider></Divider>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                {/*)*/}

                {/*}*/}
                {/*})()*/}
                {/*}*/}


            </div>
        )
    }
}

React.propTypes = {
    question:React.PropTypes.object.isRequired
}