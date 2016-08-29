//core imports
import React               from 'react'
import Checkbox            from 'material-ui/Checkbox';
import log2                from '../../utils/log2'
import * as util           from '../../utils/utils'
import  Immutable          from 'immutable'
import {Grid, Row, Col}    from 'react-flexbox-grid/lib/index';
import * as s              from '../../layouts/style'
import LinearProgress from 'material-ui/LinearProgress';
const log = log2("QuestionSets: ");
const styles = {
    container:{

        backgroundColor:"#f1f1f1",
        padding:"5px 5px 5px 5px",
        marginTop:"5px",
        border:"dotted 1px teal"

    }
}

export default class QuestionSets extends React.Component {
    constructor(props){
        super(props);
        util.bindFunctions.call(this,['handleChekboxSetClick'])
    }

    shouldComponentUpdate = function (nextProps,nextState){

        var currentProps = this.props;

        currentProps = Immutable.fromJS(currentProps,(key,value)=>{return value.toOrderedMap();});
        nextProps = Immutable.fromJS(nextProps,(key,value)=>{return value.toOrderedMap();});
        var isEqualProps = nextProps.equals(currentProps);
        //var isEqualState = nextProps.setsOfQuestion.equals(this.props.setsOfQuestion);
        //log("isEqualProps",isEqualProps)
        return !isEqualProps;
    }
    handleChekboxSetClick = (setId,key)=>{
        let foundKey = this.props.setsOfQuestion.findKey(k =>{return k == setId;});
        var newMap;
        if(foundKey != undefined)
            newMap = this.props.setsOfQuestion.remove(foundKey);
        else
            newMap = this.props.setsOfQuestion.toList().push(setId).toOrderedMap();

        this.props.onChangeSetsOfQuestion(newMap);
    }
    render = ()=>{
        //log("rendered",this.props.allSet);
        const _this = this;
        const setsOfQuestion = this.props.setsOfQuestion;
        var counter=1;
        return (
            <div style={styles.container}>
                <label style={s.questionAddPage.sectionTitle}>Sets of Question</label>
                <LinearProgress mode="indeterminate" color="red"
                                style={{display:this.props.setListWaiting ? "" : "none"}}/>
                <div>
                    <Row>
                        {
                            this.props.allSet.map((qSet)=>{
                                let foundKey = setsOfQuestion.findKey(k =>{return k == qSet.id;});
                                let checked = foundKey != undefined;
                                return (
                                <Col lg>
                                    <Checkbox key={qSet.id} value={qSet.id} label={qSet.title + "(" + (counter++) + ")"} checked={checked}
                                              onClick={ ()=> _this.handleChekboxSetClick(qSet.id,foundKey)}/>
                                </Col>

                                )
                            })
                        }
                    </Row>
                </div>
            </div>
        )
    }
}
