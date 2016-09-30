/**
 * Created by MYigit on 23.8.2016.
 */
//core imports
import React            from 'react'
import RadioQuestion    from './RadioQuestion'
import CheckboxQuestion from './CheckboxQuestion'
import FreeTextQuestion from './FreeTextQuestion'
import NumberQuestion   from './NumberQuestion'
import YesNoQuestion    from './YesNoQuestion'
import * as util        from '../../utils/utils'
import log2             from '../../utils/log2'
import * as s           from '../../layouts/style'

//variables and const definitions
const log = log2("Question");

//React component
export default class Question extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['getQuestionComponent'])
    }

    getQuestionComponent = () => {
        var questionType = this.props.question.qType;
        var component;
        switch (questionType) {
            case "radio":
                component = <RadioQuestion question={this.props.question}
                                           currentQuestionNumber={this.props.currentQuestionNumber}/>;
                break;
            case "checkbox":
                component = <CheckboxQuestion question={this.props.question}
                                              currentQuestionNumber={this.props.currentQuestionNumber}/>;
                break;
            case "freetext":
                component = <FreeTextQuestion question={this.props.question}
                                              currentQuestionNumber={this.props.currentQuestionNumber}/>;
                break;
            case "number":
                component = <NumberQuestion question={this.props.question}
                                            currentQuestionNumber={this.props.currentQuestionNumber}/>;
                break;
            case "yesno":
                component = <YesNoQuestion onChange={this.onChange}
                                           currentQuestionNumber={this.props.currentQuestionNumber}/>;
                break;
            default:
                <div></div>

        }
        return component
    }
    shouldComponentUpdate = function (nextProps, nextState) {
        return true;
    }
    render = function () {
        log("rendered");
        return (
            <div style={s.userLayoutStyles.questionContainer}>
                {this.getQuestionComponent()}
            </div>
        )
    }
}
