/**
 * Created by MYigit on 29.8.2016.
 */
import React  from 'react'
import {Row, Col}    from 'react-flexbox-grid/lib/index';
import Slider       from 'material-ui/Slider';
import TextField    from 'material-ui/TextField'
import log2         from '../../utils/log2'
import RaisedButton from 'material-ui/RaisedButton';
import * as util       from '../../utils/utils'
import DeleteIcon   from 'material-ui/svg-icons/action/delete';
import * as     s    from '../../layouts/style'
const log = log2("QuestionOptionItem")
export default  class QuestionOptionItem extends React.Component {
    constructor(props) {
        super(props);

        util.bindFunctions.call(this, ['handleTitleChange'])
    }

    handleTitleChange = function (value) {
        log("handleTitleChange", value);
        var id = this.props.id;
        this.props.onTitleChange(id, value);
    };
    render = ()=> {
        log("rendered", this.props);
        var id = this.props.id;
        var weight = this.props.weight;
        var title = this.props.title;
        return (
            <div key={id} style={s.questionAddPage.optionItem}>
                <Row>
                    <Col lg={12} md={12}>
                        <TextField ref={"txtOptionText-" + id }
                                   hintText="Option text"
                                   floatingLabelText="Option text"
                                   value={title}
                                   onChange={(event, value)=> this.handleTitleChange(value)}
                                   style={{width: "100%"}}
                        /><br />
                    </Col>
                    <Col lg={7} md={7}>
                        <Slider onChange={(event, value)=> this.props.onSliderChange(id, value)}
                                defaultValue={weight}
                                value={weight}
                                min={0.0}
                                max={1.0}
                                step={0.05}/>
                    </Col>
                    <Col lg={5} md={5}>
                        <b>Option weight:<br/> {weight}</b>
                    </Col>
                    <Col lg={2} lgOffset={10}>
                        <RaisedButton primary={true} onClick={()=> this.props.onDeleteOption(id)}
                                      style={{float: "right"}} icon={<DeleteIcon/>}></RaisedButton>
                    </Col>
                </Row>
            </div>
        )
    }
}

React.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    weight: React.PropTypes.number,
    onTitleChange: React.PropTypes.func.isRequired,
    onSliderChange: React.PropTypes.func.isRequired,
    onDeleteOption: React.PropTypes.func.isRequired,
}