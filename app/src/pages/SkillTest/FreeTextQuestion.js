//core imports
import React        from 'react';
import log2         from '../../utils/log2';
import TextField    from 'material-ui/TextField';
import FontIcon     from 'material-ui/FontIcon';
import {yellow500}  from 'material-ui/styles/colors';
import * as util    from '../../utils/utils';
import * as s       from '../../layouts/style'
//variables and const definitions
const log = log2("FreeTextQuestion");

//React component
export default class FreeTextQuestion extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['handleTextboxChange'])
    }

    handleTextboxChange = function (event, value) {
        //log(value);
        this.props.onChange([value]);
    };
    render = function () {
        log("rendered");
        return (
            <div>
                <FontIcon color={yellow500} className="material-icons md-dark md-inactive">extension</FontIcon>
                <p style={s.userLayoutStyles.questionText}>
                    {this.props.question.title}
                </p>
                <TextField floatingLabelText="Your answer" hintText="Your answer" onChange={this.handleTextboxChange}
                           multiLine={true} rows={3} fullWidth={true}/>

            </div>
        )
    }
}
FreeTextQuestion.propTypes = {
    question: React.PropTypes.any.isRequired
}
