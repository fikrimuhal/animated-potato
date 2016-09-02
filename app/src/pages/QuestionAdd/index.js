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
import LinearProgress from 'material-ui/LinearProgress';
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
        var immutableData;
        if(this.props.editMode) {
            var question = this.unNormalizeCategoryWeights(this.props.question);
            immutableData = Immutable.fromJS(question,(key,value)=>{return value.toOrderedMap();});
        }
        else {
            immutableData = Immutable.fromJS(questionModel,(key,value)=>{return value.toOrderedMap();});
        }

        this.state = {
            data:immutableData,
            toastSettings:{
                open:false,
                message:"",
                duration:2000
            },
            categoryList:[],
            allQuestionSets:[],
            loadingShow:false,
            categoriesWaiting:true,
            setListWaiting:true,
            editMode:this.props.editMode || false
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
                categoryList:Cache.getCategoriesFromCache(),
                categoriesWaiting:false
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
                    categoryList:json,
                    categoriesWaiting:false
                });
            }).catch(err=>{
                log("error",err);
            });
        }

    }
    initQuestionSets = function (){
        if(Cache.QuestionSetCaching.check()) {
            log("question sets from CACHE");
            this.setState({
                allQuestionSets:Cache.QuestionSetCaching.get(),
                setListWaiting:false
            });
            //this.state.allQuestionSets = Cache.getQuestionSetsFromCache();
        }
        else {
            log("question sets from API");
            api.QuestionSetAPI.getAllQuestionSet().then(response=>{
                log("getAllQuestionSet api response",response);
                return response.json();
            }).then(json=>{
                log("getAllQuestionSet api json",json);
                Cache.QuestionSetCaching.cache(json);
                this.setState({
                    allQuestionSets:json,
                    setListWaiting:false
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
    modelChanged = function changed(newData,oldData){
        this.setState({data:newData});
    }
    onSave = function (){
        var questionObj = this.state.data.toJS();
        if(this.checkModelValid(this.state.data)) {
            this.setState({
                loadingShow:true
            });

            log(questionObj);
            if(questionObj.qType == "radio" || questionObj.qType == "checkbox") {
                questionObj = this.normalizeOptionWeight(questionObj);
            }
            questionObj = this.normalizeCategoryWeight(questionObj);
            questionObj.title = this.normalizeTitle(questionObj.title);
            //db.setQuestionToStorage(questionObj);
            var questionModel = this.createQuestionModel(questionObj);
            log("questionObj: ",questionModel);
            api.insertQuestion(questionModel).then(response=>{
                return response.json();
            }).then(json=>{
                if(json.status == "OK") {
                    this.showMessage("Question saved!!",2000);
                }
                else if(json.status == "FAIL") {
                    this.showMessage("An error encountered!! Question hasn't saved.",2000);
                    log(json.message);
                }
                this.setState({
                    loadingShow:false
                });
            });
        }
    };

    checkModelValid = function (immutableQuestion){
        var qType = immutableQuestion.get("qType");
        var options = immutableQuestion.get("options");
        var cWeights = immutableQuestion.get("categoryWeights");
        var title = immutableQuestion.get("title");
        var setList = immutableQuestion.get("setList");
        var result = true;
        if((qType == "radio" || qType == "checkbox" || qType == "yesno") && options.size == 0) {
            this.showMessage("You must add option",1000);
            result = false;
        }
        if(title.length == 0) {
            this.showMessage("Title required",1000);
            result = false;
        }
        if(cWeights.size == 0) {
            this.showMessage("You must add category&weights",1000);
            result = false;
        }
        if(setList.size == 0) {
            this.showMessage("You must add question set",1000);
            result = false;
        }

        return result;
    }

    createQuestionModel = function (questionObj){
        questionObj.setList = util.obj2Array(questionObj.setList);
        questionObj.categoryWeights = util.obj2Array(questionObj.categoryWeights);
        questionObj.options = util.obj2Array(questionObj.options);
        questionObj.options = questionObj.options.map(opt =>{
            return {
                title:opt.title,
                weight:opt.weight
            }
        });

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
    unNormalizeCategoryWeights = function (question){
        log("unNormalizeCategoryWeights",question);
        question.categoryWeights.forEach(item=>{
            item.weight *= 10;
        })
        return question;
    };
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
        browserHistory.push("/dashboard/QuestionList");

    }

    render(){
        var editMode = this.props.editMode || false;
        return (
            <div>
                <LinearProgress mode="indeterminate" color="red"
                                style={{display:this.state.loadingShow ? "" : "none"}}/><br/>
                <RaisedButton label="<- Back to list" secondary={true} onClick={this.backToList}/>
                <QuestionAdd onChange={this.modelChanged}
                             onSave={this.onSave}
                             data={this.state.data}
                             allSet={this.state.allQuestionSets}
                             categoryList={this.state.categoryList}
                             setListWaiting={this.state.setListWaiting}
                             categoriesWaiting={this.state.categoriesWaiting}
                             editMode={editMode}/>
                <Toast settings={this.state.toastSettings}/>
            </div>
        );
    }
}

QuestionAddContainer.propTypes = {
    editMode:React.PropTypes.bool,
    question:React.PropTypes.object
}