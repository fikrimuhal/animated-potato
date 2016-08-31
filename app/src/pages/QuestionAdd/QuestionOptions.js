import React        from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Slider       from 'material-ui/Slider';
import TextField    from 'material-ui/TextField'
import log2         from '../../utils/log2'
import * as util    from '../../utils/utils'
import Immutable    from  'immutable'
import {Row,Col}    from 'react-flexbox-grid/lib/index';
import * as s       from '../../layouts/style'
import Option       from './QuestionOptionItem'
const log = log2("QuestionOptions: ")
const styles = {
    flexContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flexStart",
        flexFlow:"row wrap"
    },
    child:{
        width:"20%",
        height:"300px",
        border:'1px solid teal',
        borderRadius:'5px',
        padding:'5px 5px 5px 5px',
        marginBottom:'5px',
        marginLeft:'10px',
    },
    secenekBox:{
        border:'1px solid teal',
        borderRadius:'5px',
        padding:'5px 5px 5px 5px',
        marginBottom:'5px',
        marginLeft:'10px',
        float:'left'
    }
};

export default class QuestionOptions extends React.Component {
    constructor(props){
        super(props);
        util.bindFunctions.call(this,['handleSliderValueChange','handleOptionTextChanged','removeOptionFromModel','createContent','getContent']);
    }

    handleSliderValueChange = function (id,value){
        log("handleSliderValueChange",id,value);
        var itemKey = this.props.optionList.findKey((x)=>{return x.get('id') == id});
        var oldOptions = this.props.optionList;
        var newOptions = oldOptions.updateIn([itemKey,"weight"],(v)=>{return value;});
        this.props.onQuestionOptionsChange(newOptions);
    }
    removeOptionFromModel = function (id){
        var itemKey = this.props.optionList.findKey((x)=>{return x.get('id') == id});
        var oldOptions = this.props.optionList;
        var newOptions = oldOptions.remove(itemKey);
        this.props.onQuestionOptionsChange(newOptions);
    }
    handleOptionTextChanged = function (id,value){
        log("handleOptionTextChanged",id,value);
        //var input = this.refs["txtOptionText-" + key].input;
        var itemKey = this.props.optionList.findKey((x)=>{return x.get('id') == id});
        var oldOptions = this.props.optionList;
        var newOptions = oldOptions.updateIn([itemKey,"title"],(v)=>{return value;});
        this.props.onQuestionOptionsChange(newOptions);

    }
    shouldComponentUpdate = function (nextProps,nextState){
        var isEqual = nextProps.optionList.equals(this.props.optionList);
        return !isEqual;
    };
    createContent = function (){
        var content = <div></div>;
        if(util.obj2Array(this.props.optionList.toJS()).length > 0) {
            var _this = this;
            content = this.props.optionList.map(function (item){
                var itemKey = _this.props.optionList.findKey((x)=>{return x.get('id') == item.get("id")});
                return (
                    <div key={item.get('id')} style={styles.child}>
                        <p>Option Details</p>
                        <hr/>
                        <TextField ref={"txtOptionText-" + itemKey } hintText="Seçenek" value={item.get('title')}
                                   onChange={()=>_this.handleOptionTextChanged(itemKey)}/><br />
                        <Slider onChange={(event,value)=> _this.handleSliderValueChange(itemKey,value)}
                                defaultValue={item.get('weight')} value={item.get('weight')} min={0.05}
                                max={1.0} step={0.05}/>
                        <b>weight: {item.get('weight')}</b>
                        <RaisedButton primary={true} onClick={()=> _this.removeOptionFromModel(itemKey)}
                                      style={{float:"right"}}>Remove</RaisedButton>
                    </div>
                )
            })

        }
        return content;
    };
    getContent = function (){
        var content = <div></div>;
        var optionList = util.obj2Array(this.props.optionList.toJS());
        if(optionList.length > 0) {
            optionList.forEach(option=>{
                React.render(<Option {...option}></Option>)
            });
        }
    }
    render = ()=>{
        log("rendered");
        var optionList = util.obj2Array(this.props.optionList.toJS());
        return (
            <div style={s.questionAddPage.dottedContainer}>
                <label style={s.questionAddPage.sectionTitle}>Options of Question:</label><br/>

                <Row>
                    {
                        optionList.map(optionItem=>{
                            return (
                                <Col lg={2} md={3}>
                                    <Option {...optionItem}
                                            onTitleChange={this.handleOptionTextChanged}
                                            onSliderChange={this.handleSliderValueChange}
                                            onDeleteOption={this.removeOptionFromModel}></Option>
                                </Col>)
                        })

                    }
                </Row>
            </div>
        )
    }
}
QuestionOptions.PropTypes = {
    optionList:React.PropTypes.any.isRequired,
    onQuestionOptionsChange:React.PropTypes.func.isRequired
}
