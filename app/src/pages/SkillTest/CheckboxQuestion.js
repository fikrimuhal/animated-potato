//core imports
import React        from 'react'
import log2         from '../../utils/log2'
import * as util    from '../../utils/utils'
import Checkbox     from 'material-ui/Checkbox';
import FontIcon     from 'material-ui/FontIcon';
import {blue500}    from 'material-ui/styles/colors';
import * as _            from 'lodash'
import * as s       from '../../layouts/style'
//variables and const definitions
const log = log2("CheckboxQuestion");

//React component
export default class CheckboxQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            answer:[]
        };
        util.bindFunctions.call(this, ['handleCheckbox','isChecked']);
        log("constructor")
    }

    handleCheckbox = function (optionId, checked) {


        var answer = this.state.answer;
        log("old answer",answer);
        if(checked){
            answer.push(optionId);
        }
        else{
         answer = _.filter(answer,(ans)=> {
             return ans != optionId
         });
        }
        log("new answer",answer);
        this.setState({
            answer:answer
        });
        this.props.onChange(answer);
    };
    isChecked = function (optionId) {
        //log(optionId,this.state.answer);
      return  undefined !=  this.state.answer.find((v,k)=>{return v==optionId});

    };
    componentWillUpdate = function(nextProps, nextState) {
        var options = util.obj2Array(this.props.question.options);
        var answer = [];
        options.map((opt)=> {
            var checkbox = this.refs[opt.id];
            //console.dir(checkbox);
            //log(checkbox.state.switched);
            if(checkbox.state.switched){
                answer.push(opt.id);
            }
        });
        this.state.answer = answer;
    };
    shouldComponentUpdate = function (nextProps, nextState) {
        return true;
    };
    render = function () {
        log("rendered");
        var options = util.obj2Array(this.props.question.options);
        return (
            <div>
                <FontIcon color={blue500} className="material-icons md-dark md-inactive">label</FontIcon>
                <p style={s.userLayoutStyles.questionText}>
                    {this.props.question.title}
                </p>
                {
                    options.map((option) => {

                        return (
                            <Checkbox
                                ref={option.id}
                                key={option.id}
                                name={"options"}
                                value={option.id}
                                label={option.text}
                                checked={this.isChecked(option.id)}
                                onCheck={(event, checked)=> this.handleCheckbox(option.id, checked)}
                                labelStyle={s.userLayoutStyles.optionText}
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
};
