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
        //log("initializeData",Cache.QuestionCaching.check(questionId));
        if(Cache.QuestionCaching.check(questionId)) {
            log("**Question From CACHE");
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
        var _this=this;
        log("**Question From API");
        //log("api",api.QuestionAPI.getById(questionId));
        api.QuestionAPI.getById(questionId)().then(response=>{
            return response.json()
        }).then(json=>{
            this.setState({
                question:json,
                dataWaiting:false
            })
        }).catch(err=>{
            log("fetching error");
            _this.context.showMessage("Fetching error.",5000);
        })
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
            </div>
        )
    }
}

QuestionDetail.propTypes = {
    question:React.PropTypes.object.isRequired
};
QuestionDetail.contextTypes = {
    showMessage:React.PropTypes.func
}