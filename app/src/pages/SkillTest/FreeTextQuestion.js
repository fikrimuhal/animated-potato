//core imports
import React        from 'react';
import log2         from '../../utils/log2';
import TextField    from 'material-ui/TextField';
import FontIcon     from 'material-ui/FontIcon';
import {yellow500}  from 'material-ui/styles/colors';
import * as util    from '../../utils/utils';
import * as s       from '../../layouts/style'
import Badge        from 'material-ui/Badge';
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
    componentDidMount = ()=> {
        //log(this.refs.txtQuestion);
        setTimeout(()=> {
            this.refs.txtQuestion.input.refs.input.focus();
        }, 100);

    };
    render = function () {
        log("rendered");
        return (
            <div>
                {/*<FontIcon color={yellow500} className="material-icons md-dark md-inactive">extension</FontIcon>*/}
                <Badge badgeContent={this.props.currentQuestionNumber} primary={true}
                       badgeStyle={s.userLayoutStyles.questionBadgeYellow}>
                    <p style={s.userLayoutStyles.questionText}>
                        {this.props.question.title}
                    </p>
                </Badge>
                <TextField floatingLabelText="Your answer" hintText="Your answer" onChange={this.handleTextboxChange}
                           multiLine={true} rows={3} fullWidth={true} ref="txtQuestion"/>

            </div>
        )
    }
}
FreeTextQuestion.propTypes = {
    question: React.PropTypes.any.isRequired
}
