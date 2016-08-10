//core imports
import React      from 'react';
import log2       from '../../utils/log2';
import * as util  from '../../utils/utils';
import Slider     from 'material-ui/Slider';
import FontIcon   from 'material-ui/FontIcon';
import {red500}   from 'material-ui/styles/colors';

//variables and const definitions
const log = log2("NumberQuestion");

//React component
export default class NumberQuestion extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['handleSliderChange'])
        this.state = {
            sliderValue: 0
        }
    }
    handleSliderChange = function (event, value) {
        //log(value);
        this.props.onChange([value]);
        this.setState({
            sliderValue: value
        })
    };
    render = function () {
        log("rendered");
        return (
            <div>

                <FontIcon color={red500} className="material-icons md-dark md-inactive">view_agenda</FontIcon>
                {this.props.question.title}
                {
                    <div>
                        <Slider
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={0}
                            onChange={this.handleSliderChange}
                        />
                        <label>{this.state.sliderValue}</label>
                    </div>

                }

            </div>
        )
    }
}

NumberQuestion.propTypes = {
    question: React.PropTypes.any.isRequired
}
