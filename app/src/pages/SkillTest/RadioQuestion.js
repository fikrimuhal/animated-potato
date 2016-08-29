//core imports
import React                            from 'react'
import {RadioButton, RadioButtonGroup}  from 'material-ui/RadioButton';
import FontIcon                         from 'material-ui/FontIcon';
import {pink500}                        from 'material-ui/styles/colors';
import * as util                        from '../../utils/utils'
import log2                             from '../../utils/log2'
import * as s                           from '../../layouts/style'
import Mousetrap                        from 'mousetrap'
import * as _                           from 'lodash'
import Badge                            from 'material-ui/Badge';
//variables and const definitions
const log=log2("RadioQuestion");

//React component
export default class RadioQuestion extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['radioChange', 'handleHotkey', 'radioQuestionText']);
        this.state={
            valueSelected: ""
        }
    }

    radioChange=function (value) {
        log("radioChange value", value);
        this.setState({
            valueSelected: value
        });
        this.props.onChange([value]);

    };
    shouldComponentUpdate=function (nextProps, nextState) {
        return true;
    };
    handleHotkey=function (e, combo) {
        log("combo", combo);
        var options=util.obj2Array(this.props.question.options);
        if(combo == "e") {
            var yesOption=_.filter(options, (q)=> {
                return q.text.trim().toLowerCase() == "yes"
                    || q.text.trim().toLowerCase() == "evet"
            });
            yesOption=yesOption[0];
            log("yesOption", yesOption)
            this.radioChange(yesOption.id);
        }
        else if(combo == "h") {
            var noOption=_.filter(options, (q)=> {
                return q.text.trim().toLowerCase() == "no"
                    || q.text.trim().toLowerCase() == "hayır"
            });
            noOption=noOption[0];
            log("yesOption", noOption);
            this.radioChange(noOption.id);

        }

    };
    componentDidMount=()=> {
        if(this.props.question.type == "yesno") {
            Mousetrap.bind([`e`, `h`], this.handleHotkey);
        }
    };
    componentWillUnmount=function () {
        if(this.props.question.type == "yesno") {
            Mousetrap.unbind([`e`, `h`], this.handleHotkey);
        }
    };
    radioQuestionText=(option)=> {
        if(this.props.question.type == "yesno") {
            var buttonText=(["yes", "evet"].includes(option.text.toLowerCase().trim())) ? "E" : "H";
            return <span>{option.text}<i style={s.userLayoutStyles.tusStili}>{buttonText}</i></span>
        }
        else {
            return <span>{option.text}</span>
        }
    }
    render=function () {
        log("rendered",s.userLayoutStyles.questionBadgeBlue);
        var options=util.obj2Array(this.props.question.options);
       // log(s.userLayoutStyles.questionBadgeBlue)
        return (
            <div>
                {/*<FontIcon color={pink500} className="material-icons md-dark md-inactive">flag</FontIcon>*/}

                <Badge badgeContent={this.props.currentQuestionNumber} primary={true}  badgeStyle={s.userLayoutStyles.questionBadgeBlue}>
                    <p style={s.userLayoutStyles.questionText}>
                        {this.props.question.title}
                    </p>
                </Badge>


                <RadioButtonGroup name={this.props.question.id} valueSelected={this.state.valueSelected}
                                  onChange={(event, value)=> this.radioChange(value)}>
                    {
                        options.map((option) => {
                            return (
                                <RadioButton
                                    key={option.id}
                                    value={option.id}
                                    label={this.radioQuestionText(option)}
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

RadioQuestion.propTypes={
    question: React.PropTypes.any.isRequired
}
