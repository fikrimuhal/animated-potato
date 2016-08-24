import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import * as util from '../../utils/utils'
import * as db from '../../utils/data'
import log2 from '../../utils/log2'
import AnswerTypes from './AnswerTypes';
import QuestionSets from './QuestionSets'
import CategoryWeights from './CategoryWeights'
import QuestionOptions from './QuestionOptions'
import Immutable from 'immutable'
import Mousetrap from 'mousetrap';

const log=log2("QuestionAdd: ")
const styles={
    w100: {
        width: 'auto'
    },
    rightFloated: {
        float: "right"
    }
};
const answerType=["radio", "checkbox", "freetext", "number", "yesno"];
var lastCommandTexts={
    categoryCommand: "",
    setCommand: "",
    typeCommand: ""
};
export default class QuestionAdd extends React.Component {
    constructor(props) {
        super(props);
        //Fonksiyonların this binding işlemi
        util.bindFunctions.call(this, ['addNewOption', 'handleQuestionTextChange',
            'handleSaveQuestion', 'categoryWeightsChanged',
            'handleOnChangeSetsOfQuestion', 'handleOnChangeAnswerType',
            'handleOnQuestionOptionsChange'
        ]);
    }

    shouldComponentUpdate=function (nextProps, nextState) {
        return true;
    }

    categoryHotkey=(e, combo)=> {

    }
    componentDidMount=()=> {

    }
    componentWillUnmount=()=> {

    }
    addNewOption=function () {
        var newKey=util.guid();
        var oldStateData=this.props.data;
        var newOption=Immutable.fromJS({id: newKey, text: "deneme", weight: 0.5},
            (k, v)=> {return v.toOrderedMap()}
        )
        var oldOptionsMap=oldStateData.get("options");
        var newOptionsMap=oldOptionsMap.toList().push(newOption).toOrderedMap();
        var newStateData=oldStateData.remove("options");
        newStateData=oldStateData.set("options", newOptionsMap);
        log(newStateData);
        this.props.onChange(newStateData, oldStateData);
    }
    handleQuestionTextChange=function (event, value) {
        //Sorunun başlığı değiştiği zaman tetiklenen fonksiyon
        var oldStateData=this.props.data;
        var categoryProps=this.props.categoryList;
        //log("categoryProps", categoryProps);
        value=value.trim();
        if(value.indexOf('//') != -1) {
            var title=value.split('//')[0];
            var titleScript=value.split('//')[1].trim().toLowerCase();
            if(titleScript.length > 2) {
                var scriptCommands=titleScript.split(' ');
                scriptCommands.forEach(command=> {

                    if(command.indexOf(':') != -1) {
                        var commandType=command.split(':')[0];
                        var commandText=command.split(':')[1];
                        //log("commandType,commandText", commandType, commandText);
                        if(commandType == 'c' && lastCommandTexts.categoryCommand!=commandText) {
                            //bu kısım sorunun kategorilerini ve ağırlıklarını ayarlar
                            //TODO
                            var categoryCommands=commandText.split(',');
                            var newCategories=[];
                            categoryCommands.forEach(categoryCommand=> {
                                if(categoryCommand.length > 2 && categoryCommand.indexOf('-') != -1) {
                                    var cNameIndex=categoryCommand.split('-')[0];
                                    var cWeight=categoryCommand.split('-')[1];
                                    if(util.isNumeric(cNameIndex) && util.isNumeric(cWeight)) {
                                        cNameIndex=parseInt(cNameIndex);
                                        var cName=categoryProps[cNameIndex - 1];
                                        cWeight=parseInt(cWeight);
                                        newCategories.push({
                                            category: cName,
                                            weight: cWeight
                                        });
                                    }
                                }
                            });

                            log("newCategories", newCategories);

                            var newCategoryWeightsImmutable=
                                Immutable.fromJS(newCategories,
                                    (key, value)=> {return value.toOrderedMap()}
                                );
                            lastCommandTexts.categoryCommand = commandText;
                            setTimeout(()=> {
                                log("degisen -> c");
                                this.categoryWeightsChanged(newCategoryWeightsImmutable)
                            }, 100)

                        }
                        else if(commandType == 's' && lastCommandTexts.setCommand!=commandText) {
                            //bu kısım sorunun dahil olduğu setleri değiştirir
                            var selectedSetIndexes=commandText.split(',');
                            var selectedSets=[];
                            selectedSetIndexes.forEach(index=> {
                                if(util.isNumeric(index)) {
                                    index=parseInt(index);
                                    selectedSets.push(this.props.allSet[index - 1])
                                }
                            });
                            //log("s command", selectedSetIndexes, selectedSets);
                            var newData=Immutable.fromJS(selectedSets, (key, value)=> {return value.toOrderedMap()})
                            lastCommandTexts.setCommand = commandText;
                            setTimeout(()=> {
                                log("degisen -> s");
                                this.handleOnChangeSetsOfQuestion(newData);
                            }, 100)
                        }
                        else if(commandType == 't' && util.isNumeric(commandText) && lastCommandTexts.typeCommand!=commandText) {
                            //Bu kısım sorunun cevap türünü değiştirir
                            var selectedType=parseInt(commandText);
                            //log("t command", selectedType, answerType[selectedType - 1]);
                            //this.handleOnQuestionOptionsChange(answerType[typeKomutu - 1])
                            lastCommandTexts.typeCommand=commandText;
                            setTimeout(()=> {
                                log("degisen -> t");
                                this.handleOnChangeAnswerType(answerType[selectedType - 1])
                            }, 100)

                        }
                        ;
                    }

                });
            }

        }

    }
    categoryWeightsChanged=function (newCategoryWeights) {
        //sorunun kategorisinde herhangi bir değişiklik olduğunda tetiklenir
        var oldStateData=this.props.data;
        var newStateData=oldStateData.set('categoryWeights', newCategoryWeights);
        this.props.onChange(newStateData, oldStateData); //Üst parent state tutan olduğu için bu kısım ona aktarılır
    }
    handleOnChangeSetsOfQuestion=function (newSetsOfQuestion) {
        //Sorunun dahil olduğu setlerde bir değişiklik olduğunda burası tetiklenir
        var oldStateData=this.props.data;
        var newStateData=oldStateData.set('setList', newSetsOfQuestion);
        this.props.onChange(newStateData, oldStateData); //Üst parent state tutan olduğu için bu kısım ona aktarılır
    }
    handleOnChangeAnswerType=function (newAnswerType) {
        //Sorunun cevap türü değişikliği üste aktaran event
        var oldStateData=this.props.data;
        var newStateData=oldStateData.update("type", (v) => {return newAnswerType;});
        if(newAnswerType != "radio" && newAnswerType != "checkbox" && newAnswerType != "yesno") {
            newStateData=newStateData.remove("options");
            newStateData=newStateData.set("options", Immutable.fromJS([]));
        }
        if(newAnswerType === "yesno") {
            var newKey1=util.guid();
            var newKey2=util.guid();
            var options=[{id: newKey1, text: "Yes", weight: 1}, {id: newKey2, text: "No", weight: 0}]
            newStateData=newStateData.set("options", Immutable.fromJS(options));
        }

        this.props.onChange(newStateData, oldStateData);
        //log("handleOnChangeAnswerType", newAnswerType);
        //log("types", oldStateData.get("type"), newStateData.get("type"));
    }
    handleOnQuestionOptionsChange=function (newOptions) {
        //Sorunun seçeneklerinde bir değişiklik olduğundan bu değişikliği üste aktaran event
        var oldStateData=this.props.data;
        var newStateData=oldStateData.remove("options");
        newStateData=newStateData.set("options", newOptions);
        this.props.onChange(newStateData, oldStateData);
    }
    handleSaveQuestion=function () {
        //Soruyu kaydet butonuna basınca sorunun storage'ye eklenmesi
        this.props.onSave();
    }

    render() {

        //log("rendered");
        var categoryWeights=this.props.data.get("categoryWeights");//sorunun kategori ağırlıklar
        var setsOfQuestion=this.props.data.get("setList");//sorunun dahil olduğu setler
        var answerType=this.props.data.get("type");//sorunun cevap tipi
        var optionList=this.props.data.get("options");//sorunun seçenek listesi
        var addOptionDisabled=true; //yeni seçenek ekle butonunun gözükürlüğü
        if(answerType == "radio" || answerType == "checkbox") {
            addOptionDisabled=false;
        }
        //console.log("bu ağırlık", categoryWeights)
        return (
            <div>
                <div>
                    <h3>New Question</h3>
                </div>
                <RaisedButton style={styles.rightFloated} label="Save Question" secondary={true}
                              onClick={()=>this.handleSaveQuestion()}/>
                <TextField hintText="Question Title" onChange={this.handleQuestionTextChange}/>
                <CategoryWeights style={styles.w100} categoryList={this.props.categoryList}
                                 categoryWeights={categoryWeights}
                                 categoryWeightsChanged={this.categoryWeightsChanged}/>
                <QuestionSets style={styles.w100} allSet={this.props.allSet} setsOfQuestion={setsOfQuestion}
                              onChangeSetsOfQuestion={this.handleOnChangeSetsOfQuestion}/>
                <AnswerTypes onChangeAnswerType={this.handleOnChangeAnswerType} answerType={answerType}/><br/>
                <RaisedButton label="+Add Option" secondary={true} onClick={()=> this.addNewOption()}
                              style={{float: "right"} } disabled={addOptionDisabled}/>
                <QuestionOptions optionList={optionList}
                                 onQuestionOptionsChange={this.handleOnQuestionOptionsChange}/><br/>

            </div>
        );
    }
}
QuestionAdd.PropTypes={
    data: React.PropTypes.any.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
}
