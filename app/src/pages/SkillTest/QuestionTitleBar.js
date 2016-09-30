/**
 * Created by MYigit on 6.9.2016.
 */
import React        from 'react'
import * as s       from '../../layouts/style'
import Badge        from 'material-ui/Badge'
const colors = {
    "blue": s.userLayoutStyles.questionBadgeBlue,
    "red": s.userLayoutStyles.questionBadgeRed,
    "yellow": s.userLayoutStyles.questionBadgeYellow,
    "green": s.userLayoutStyles.questionBadgeGreen
}
export default  class QuestionTitleBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render = ()=> {
        return (
            <div>
                <Badge badgeContent={this.props.number} primary={true}
                       badgeStyle={colors[this.props.color]}>
                    <p style={s.userLayoutStyles.questionText}>
                        {this.props.questionTitle}
                    </p>
                </Badge>
            </div>
        )
    }
}

QuestionTitleBar.propTypes = {
    number: React.PropTypes.number.isRequired,
    color: React.PropTypes.string,
    questionTitle: React.PropTypes.string
};