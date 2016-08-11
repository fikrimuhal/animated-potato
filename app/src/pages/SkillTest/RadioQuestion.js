//core imports
import React                            from 'react'
import {RadioButton, RadioButtonGroup}  from 'material-ui/RadioButton';
import FontIcon                         from 'material-ui/FontIcon';
import {pink500}                        from 'material-ui/styles/colors';
import * as util                        from '../../utils/utils'
import log2                             from '../../utils/log2'
import * as s                           from '../../layouts/style'
//variables and const definitions
const log = log2("RadioQuestion");

//React component
export default class RadioQuestion extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['radioChange']);
    }
    radioChange = function (value) {
        log(value);
        this.props.onChange([value]);
    };
    shouldComponentUpdate = function (nextProps, nextState) {
        return true;
    };
    render = function () {
        log("rendered");
        var options = util.obj2Array(this.props.question.options);
        return (
            <div>
                <FontIcon color={pink500} className="material-icons md-dark md-inactive">flag</FontIcon>

                    <p style={s.userLayoutStyles.questionText}>
                        {this.props.question.title}
                    </p>


                <RadioButtonGroup name={this.props.question.id} onChange={(event, value)=> this.radioChange(value)}>
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
