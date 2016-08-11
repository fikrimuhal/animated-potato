//core imports
import React                            from 'react'
import {RadioButton, RadioButtonGroup}  from 'material-ui/RadioButton';
import FontIcon                         from 'material-ui/FontIcon';
import {pink500}                        from 'material-ui/styles/colors';
import * as util                        from '../../utils/utils'
import log2                             from '../../utils/log2'
import * as s                           from '../../layouts/style'
import Mousetrap                        from 'Mousetrap'
import * as _                           from 'lodash'
//variables and const definitions
const log = log2("RadioQuestion");

//React component
export default class RadioQuestion extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['radioChange','handleHotkey']);
        this.state={
            valueSelected:""
        }
    }

    radioChange = function (value) {
        log("radioChange value",value);
        this.setState({
            valueSelected:value
        });
        this.props.onChange([value]);


    };
    shouldComponentUpdate = function (nextProps, nextState) {
        return true;
    };
    handleHotkey = function (e,combo) {
        log("combo",combo);
        var options = util.obj2Array(this.props.question.options);
        if(combo=="e"){
            var yesOption = _.filter(options,(q)=>{return q.text.trim().toLowerCase() =="yes"
                                                                              || q.text.trim().toLowerCase() =="evet"});
            yesOption=yesOption[0];
            log("yesOption",yesOption)
            this.radioChange(yesOption.id);
        }
        else{
            var noOption = _.filter(options,(q)=>{return q.text.trim().toLowerCase() =="no"
                                                                              || q.text.trim().toLowerCase() =="hayır"});
            noOption=noOption[0];
            log("yesOption",noOption);
            this.radioChange(noOption.id);

        }
    };
    componentDidMount = ()=> {
        if (this.props.question.type == "yesno") {
            Mousetrap.bind([`e`, `h`], this.handleHotkey);
        }
    };
    componentWillUnmount = function () {
        if (this.props.question.type == "yesno") {
            Mousetrap.unbind([`e`, `h`], this.handleHotkey);
        }
    };
    render = function () {
        log("rendered",);
        var options = util.obj2Array(this.props.question.options);
        return (
            <div>
                <FontIcon color={pink500} className="material-icons md-dark md-inactive">flag</FontIcon>

                <p style={s.userLayoutStyles.questionText}>
                    {this.props.question.title}
                </p>


                <RadioButtonGroup name={this.props.question.id}  valueSelected={this.state.valueSelected} onChange={(event, value)=> this.radioChange(value)}>
                    {
                        options.map((option) => {
                            return (
                                <RadioButton
                                    key={option.id}
                                    value={option.id}
                                    label={option.text}
                                    labelStyle={s.userLayoutStyles.optionText}
                                />
                            )
                        })
                    }
                </RadioButtonGroup>
            </div>
        )
    }
}

RadioQuestion.propTypes = {
    question: React.PropTypes.any.isRequired
}
