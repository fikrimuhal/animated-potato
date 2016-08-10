//core imports
import React        from 'react'
import log2         from '../../utils/log2'
import * as util    from '../../utils/utils'
import Checkbox     from 'material-ui/Checkbox';
import FontIcon     from 'material-ui/FontIcon';
import {blue500}    from 'material-ui/styles/colors';
import _            from 'lodash'

//variables and const definitions
const log = log2("CheckboxQuestion");

//React component
export default class CheckboxQuestion extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['handleCheckbox'])
    }

    handleCheckbox = function (optionId, checked) {
        var options = util.obj2Array(this.props.question.options);
        options.map((opt)=> {
            console.dir(this.refs[opt.id])
        });
    };
    render = function () {
        log("rendered");
        var options = util.obj2Array(this.props.question.options);
        return (
            <div>
                <FontIcon color={blue500} className="material-icons md-dark md-inactive">label</FontIcon>
                {this.props.question.title}
                {
                    options.map((option) => {

                        return (
                            <Checkbox
                                ref={option.id}
                                key={option.id}
                                value={option.id}
                                label={option.text}
                                //checked={checked}
                                onCheck={(event, checked)=> this.handleCheckbox(option.id, checked)}
                            />
                        )
                    })
                }
            </div>
        )
    }
}
CheckboxQuestion.propTypes = {
    question: React.PropTypes.any.isRequired
}
