import React                          from 'react'
import {RadioButton,RadioButtonGroup} from 'material-ui/RadioButton';
import log2                           from '../../utils/log2'
import {Grid,Row,Col}                   from 'react-flexbox-grid/lib/index';
import * as util                       from '../../utils/utils'

const log = log2("AnswerTypes: ")
const styles = {
    flexContainer:{
        display:"flex",
        justifyContent:"flexStart",
        flexFlow:"row wrap"
    },
    container:{
        backgroundColor:"#f1f1f1",
        padding:"5px 5px 5px 5px",
        marginTop:"5px"
    },
    child:{
        width:"140px",
        marginLeft:"5px"
    }
};
export default class AnswerTypes extends React.Component {
    constructor(props){
        super(props);
        util.bindFunctions.call(this,['handleRadiButtonChange']);
    }

    handleRadiButtonChange = function (event,value){
        this.props.onChangeAnswerType(value);
    }
    shouldComponentUpdate = function (nextProps,nextState){
        return true;
    }

    render(){
        log("rendered")
        return (
            <div>
                <label>Answer Type:</label> <br/>
                <div style={styles.container}>

                    <RadioButtonGroup name="radiosAnswerTypes" valueSelected={this.props.answerType}
                                      onChange={this.handleRadiButtonChange} style={styles.flexContainer}>

                        <RadioButton value="radio" label="Radio (1)"
                                     style={styles.child}/>
                        <RadioButton value="checkbox" label="Checkbox (2)"
                                     style={styles.child}/>
                        <RadioButton value="freetext" label="FreeText (3)"
                                     style={styles.child}/>
                        <RadioButton value="number" label="Number (4)"
                                     style={styles.child}/>
                        <RadioButton value="yesno" label="Yes/No (5)"
                                     style={styles.child}/>

                    </RadioButtonGroup>

                </div>
            </div>
        )
    }
}
AnswerTypes.propTypes = {
    onChangeAnswerType:React.PropTypes.func.isRequired
}
