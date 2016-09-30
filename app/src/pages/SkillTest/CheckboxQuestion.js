//core imports
import React        from 'react'
import log2         from '../../utils/log2'
import * as util    from '../../utils/utils'
import Checkbox     from 'material-ui/Checkbox';
import FontIcon     from 'material-ui/FontIcon';
import {blue500}    from 'material-ui/styles/colors';
import * as _       from 'lodash'
import * as s       from '../../layouts/style'
import Mousetrap    from 'mousetrap'
import Badge        from 'material-ui/Badge';
//variables and const definitions
const log = log2("CheckboxQuestion");
var keyOptionMap = [];
//React component
export default class CheckboxQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: []
        };
        util.bindFunctions.call(this, ['handleCheckbox', 'isChecked', 'handleHotkey']);
        //log("constructor")
    }

    handleCheckbox = function (optionId, checked) {


        var answer = this.state.answer;
        log("old answer", answer);
        if (checked) {
            answer.push(optionId);
        }
        else {
            answer = _.filter(answer, (ans)=> {
                return ans != optionId
            });
        }
        log("new answer", answer);
        this.setState({
            answer: answer
        });
        this.props.onChange(answer);
    };
    isChecked = function (optionId) {
        //log(optionId,this.state.answer);
        return undefined != this.state.answer.find((v, k)=> {
                return v == optionId
            });

    };
    handleHotkey = function (e, combo) {
        if (Object.keys(keyOptionMap).includes(combo)) {
            var optId = keyOptionMap[combo];
            var checked = !this.refs[optId].state.switched;
            this.handleCheckbox(optId, checked);
        }
    };
    componentWillUpdate = function (nextProps, nextState) {
        var options = util.obj2Array(this.props.question.options);
        var answer = [];
        options.map((opt)=> {
            var checkbox = this.refs[opt.id];
            //console.dir(checkbox);
            //log(checkbox.state.switched);
            if (checkbox.state.switched) {
                answer.push(opt.id);
            }
        });
        this.state.answer = answer;
    };
    componentDidMount = ()=> {
        var keyCombines = [];
        var options = util.obj2Array(this.props.question.options);
        keyOptionMap = [];
        for (var i = 1; i <= options.length; i++) {
            keyCombines.push(i.toString());
            keyOptionMap[i] = options[i - 1].id;
        }
        //log("keyCombines",keyCombines);
        //log("keyOptionMap",keyOptionMap);
        Mousetrap.bind(keyCombines, this.handleHotkey);

    };
    componentWillUnmount = function () {
        var keyCombines = [];
        var options = util.obj2Array(this.props.question.options);
        keyOptionMap = [];
        for (var i = 1; i <= options.length; i++) {
            keyCombines.push(i.toString());
        }
        Mousetrap.unbind(keyCombines, this.handleHotkey);

    };
    shouldComponentUpdate = function (nextProps, nextState) {
        return true;
    };
    render = function () {
        log("rendered");
        var options = util.obj2Array(this.props.question.options);
        var counter = 1;
        return (
            <div>
                {/*<FontIcon color={blue500} className="material-icons md-dark md-inactive">label</FontIcon>*/}
                <Badge badgeContent={this.props.currentQuestionNumber} primary={true}
                       badgeStyle={s.userLayoutStyles.questionBadgeRed}>
                    <p style={s.userLayoutStyles.questionText}>
                        {this.props.question.title}
                    </p>
                </Badge>
                {

                    options.map((option) => {

                        return (
                            <div>

                                <Checkbox
                                    ref={option.id}
                                    key={option.id}
                                    name={"options"}
                                    value={option.id}
                                    label={<span>{option.text}<i
                                        style={s.userLayoutStyles.tusStili}>{counter++}</i></span>}
                                    checked={this.isChecked(option.id)}
                                    onCheck={(event, checked)=> this.handleCheckbox(option.id, checked)}
                                    labelStyle={s.userLayoutStyles.optionText}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
CheckboxQuestion.propTypes = {
    question: React.PropTypes.any.isRequired
};
