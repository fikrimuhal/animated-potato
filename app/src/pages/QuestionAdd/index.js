import React            from 'react'
import {browserHistory} from 'react-router'
import {Toast}          from '../../components/MyComponents'
import RaisedButton     from 'material-ui/RaisedButton';
import QuestionAdd      from './QuestionAdd'
import * as api         from '../../utils/api';
import * as Cache       from '../../utils/cache'
import * as util        from '../../utils/utils'
import * as db          from  '../../utils/data'
import log2             from '../../utils/log2'
import * as Immutable from 'immutable'

const log = log2("QuestionAdd Index: ");
var showToast = null;
const questionModel = {
    title:"Başlıksız soru ?",
    qType:"radio",
    categoryWeights:[],
    options:[],
    setList:[]
};

export default class QuestionAddContainer extends React.Component {
    constructor(props){
        super(props);
        var immutableData = Immutable.fromJS(questionModel,(key,value)=>{return value.toOrderedMap();});
        this.state = {
            data:immutableData,
            toastSettings:{
                open:false,
                message:"",
                duration:2000
            },
            categoryList:[],
            allQuestionSets:[]
        };
        showToast = util.myToast("toastSettings",this.setState,this.state);
        util.bindFunctions.call(this,['modelChanged','showMessage','onSave','initialize']);

    }

    componentDidMount = function (){
        log("componentDidMount");
        this.initialize();
    };
    componentWillMount = function (){
        log("componentDidMount");
    };
    initialize = function (){
        log("initializing***");
        this.initCategories();
        this.initQuestionSets();
    };
    initCategories = function (){
        if(Cache.checkCategoriesFromCache()) {
            log("categories from CACHE");
            this.setState({
                categoryList:Cache.getCategoriesFromCache()
            });
            //this.state.categoryList = Cache.getCategoriesFromCache();
        }
        else {
            log("categories from API");
            api.getCategoryList({}).then(response=>{
                log("response",response);
                return response.json();
            }).then(json=>{
                log("json",json);
                //categoryList = json;
                Cache.cacheCategories(json);
                this.setState({
                    categoryList:json
                });
            }).catch(err=>{
                log("error",err);
            });
        }

    }
    initQuestionSets = function (){
        if(Cache.checkQuestionSetsFromCache()) {
            log("question sets from CACHE");
            this.setState({
                allQuestionSets:Cache.getQuestionSetsFromCache()
            });
            //this.state.allQuestionSets = Cache.getQuestionSetsFromCache();
        }
        else {
            log("question sets from API");
            api.getAllQuestionSet({}).then(response=>{
                log("getAllQuestionSet api response",response);
                return response.json();
            }).then(json=>{
                log("getAllQuestionSet api json",json);
                Cache.cacheQuestionSets(json);
                this.setState({
                    allQuestionSets:json
                });
            }).catch(err=>{
                log("getAllQuestionSet api ERROR",err);
            });
        }
    };
    categoryWeightHotkey = (e,combo)=>{
        if(combo.indexOf("alt") != -1) {
            var indis = parseInt(combo.split('+')[2]);
            if(indis !== NaN) {
                this.categorySelected(catMap[indis - 1],null);
            }
        }

    }
    setsHotkey = (e,combo)=>{

    }
    categoryHotkey = (e,combo)=>{

    }
    modelChanged = function changed(newData,oldData){
        this.setState({data:newData});
    }
    onSave = function (){
        //TODO API kullanılarak sunucuya gönderilecek.
        var questionObj = this.state.data.toJS();
        log(questionObj);
        if(questionObj.qType == "radio" || questionObj.qType == "checkbox") {
            questionObj = this.normalizeOptionWeight(questionObj);
        }
        questionObj = this.normalizeCategoryWeight(questionObj);
        questionObj.title = this.normalizeTitle(questionObj.title);
        //db.setQuestionToStorage(questionObj);
        var questionModel = this.createQuestionModel(questionObj);
        log("questionObj: ",questionModel);
        this.showMessage("Question saved!!",2000);

    };
    createQuestionModel = function (questionObj){
        questionObj.setList = util.obj2Array(questionObj.setList);
        questionObj.categoryWeights = util.obj2Array(questionObj.categoryWeights);
        questionObj.options = util.obj2Array(questionObj.options);
        return questionObj;
    };
    normalizeTitle = function (title){
        var result = title.split('//')[0].trim();
        //log("normalizeTitle x->y",title,result);
        return result;
    };
    normalizeOptionWeight = function (questionObj){
        var keys = Object.keys(questionObj.options);
        if(keys.length > 0) {

            var optionArr = keys.map((key)=>{return questionObj.options[key]});
            var sumWeight = _.sumBy(optionArr,(o)=>{return o.weight});
            keys.forEach((key)=>{
                var obj = questionObj.options[key];
                var weight = obj.weight;
                var normWeight = weight / sumWeight;
                questionObj.options[key].weight = normWeight;
            })
        }
        return questionObj;
    }
    normalizeCategoryWeight = function (questionObj){
        var keys = Object.keys(questionObj.categoryWeights);
        if(keys.length > 0) {

            var arr = keys.map((key)=>{return questionObj.categoryWeights[key]});
            var sumWeight = _.sumBy(arr,(o)=>{return o.weight});
            keys.forEach((key)=>{
                var obj = questionObj.categoryWeights[key];
                var weight = obj.weight;
                var normWeight = weight / sumWeight;
                questionObj.categoryWeights[key].weight = normWeight;
            })
        }
        return questionObj;
    }
    showMessage = function (message,duration){
        var toastSettings = {
            open:true,
            message:message,
            duration:duration
        }
        this.setState({toastSettings:toastSettings});
        var _this = this;
        setTimeout(() =>{
            toastSettings.open = false;
            this.setState({toastSettings:toastSettings});
        },duration);
    }

    backToList = function (){
        browserHistory.push("/adminpanel/questionlist");

    }

    render(){
        return (
            <div>
                <RaisedButton label="<- Back to list" secondary={true} onClick={this.backToList}/>
                <QuestionAdd onChange={this.modelChanged} onSave={this.onSave} data={this.state.data}
                             allSet={this.state.allQuestionSets}
                             categoryList={this.state.categoryList}/>
                <Toast settings={this.state.toastSettings}/>
            </div>
        );
    }
}