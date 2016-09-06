/**
 * Created by MYigit on 6.9.2016.
 */
import React               from 'react'
import * as s              from '../../layouts/style'
import QuestionTitle       from './QuestionTitleBar'
import log2                from '../../utils/log2'
import Mousetrap           from 'mousetrap'
import * as util           from '../../utils/utils'
import {
    RadioButton,
    RadioButtonGroup
}  from 'material-ui/RadioButton';

const log = log2("YesNoQuestion");
export default  class YesNoQuestion extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            valueSelected:""
        }
        util.bindFunctions.call(this,['handleHotkey']);
    }

    radioChange = function (value){
        log("radioChange value",value);
        this.setState({
            valueSelected:value
        });
        this.context.saveAnswer(value);
    };
    radioQuestionText = (text)=>{

        var buttonText = (["yes","evet"].includes(text.toLowerCase())) ? "E" : "H";
        return <span>
                    {text} <i style={s.userLayoutStyles.tusStili}>{buttonText}</i>
                </span>

    };
    componentDidMount = ()=>{
        Mousetrap.bind([`e`,`h`],this.handleHotkey);
    };
    componentWillUnmount = function (){
        Mousetrap.unbind([`e`,`h`],this.handleHotkey);
    };
    handleHotkey = function (e,combo){
        log("combo",combo);
        if(combo == "e")
            this.radioChange("yes");
        else if(combo == "h")
            this.radioChange("no");
    };
    render = ()=>{
        return (
            <div>
                <QuestionTitle number={this.props.currentQuestionNumber}
                               color={"blue"}
                               questionTitle={this.context.currentQuestion.title}/>

                <RadioButtonGroup name={this.context.currentQuestion.id}
                                  onChange={(event,value)=> this.radioChange(value)}
                                  valueSelected={this.state.valueSelected}>
                    <RadioButton
                        key={"yes"}
                        value={"yes"}
                        label={this.radioQuestionText("Evet")}
                        labelStyle={s.userLayoutStyles.optionText}
                    />
                    <RadioButton
                        key={"no"}
                        value={"no"}
                        label={this.radioQuestionText("Hayır")}
                        labelStyle={s.userLayoutStyles.optionText}
                    />

                </RadioButtonGroup>
            </div>
        )
    }
}

YesNoQuestion.contextTypes = {
    currentQuestion:React.PropTypes.object,
    saveAnswer:React.PropTypes.func
};