import React from 'react'
import {RadioButton,RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox'
import {log2,util} from '../../utils/'
import * as Immutable from 'immutable'
import {Link,browserHistory} from 'react-router';
import Mousetrap from 'mousetrap';
import _lodash from 'lodash';
import * as s              from '../../layouts/style'
import LinearProgress from 'material-ui/LinearProgress';
var catMap = [];

const log = log2("CategoryWeights: ")
const styles = {
    flexContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flexStart",
        flexFlow:"row wrap"
    },
    container:{

        backgroundColor:"#f1f1f1",
        padding:"5px 5px 5px 5px",
        marginTop:"5px",
        border:"dotted 1px teal"

    },
    child:{
        width:"200px",
        height:"100px",
        backgroundColor:"lightYellow",
        padding:"5px 5px 5px 5px",
        marginLeft:"5px",
        marginTop:"5px"
    }
};
export default class CategoryWeights extends React.Component {

    constructor(props){
        super(props)
        util.bindFunctions.call(this,["categorySelected","sliderChange"]);
    }

    categoryHotkey = (e,combo)=>{

        if(combo.indexOf("alt") != -1) {
            var indis = parseInt(combo.split('+')[2]);
            if(indis !== NaN) {
                this.categorySelected(catMap[indis - 1],null);
            }
        }
    }
    componentDidMount = ()=>{
        var count = _.size(this.props.categoryList);
        var keyboardList = [];
        for( var i = 1; i < count + 1; i++ ) {
            keyboardList[i - 1] = 'alt+k+'.concat(i)
        }
        Mousetrap.bind(keyboardList,this.categoryHotkey);
    }
    componentWillUnmount = ()=>{
        var count = _.size(this.props.categoryList);
        var keyboardList = [];
        for( var i = 1; i < count + 1; i++ ) {
            keyboardList[i - 1] = 'alt+k+'.concat(i)
        }
        Mousetrap.bind(keyboardList,this.categoryHotkey);
    }
    categorySelected = function (selectedCategory,event){
        log("selected cat->",selectedCategory);
        let oldCategoryWeights = this.props.categoryWeights;
        var newCategoryWeights;
        var foundKey = oldCategoryWeights.findKey(x =>{return x.get("id") == selectedCategory});
        log("foundkey->",foundKey);
        log("size->", oldCategoryWeights.size);
        if(foundKey == undefined) {
            newCategoryWeights = oldCategoryWeights.set(
                oldCategoryWeights.size,
                Immutable.fromJS({
                        id:selectedCategory,
                        weight:0
                    },
                    (key,value)=>{return value.toOrderedMap()}
                )
            )
        }
        else {
            newCategoryWeights = oldCategoryWeights.remove(foundKey);
        }
        this.props.categoryWeightsChanged(newCategoryWeights);
    }
    sliderChange = function (category,key,value){
        //log(key,value,category)
        let oldCategoryWeights = this.props.categoryWeights;
        var newCategoryWeights;
        newCategoryWeights = oldCategoryWeights.updateIn([key,'weight'],
            (v)=>{return value;}
        );
        this.props.categoryWeightsChanged(newCategoryWeights);
    }
    shouldComponentUpdate = function (nextProps,nextState){
        let oldCategoryWeights = this.props.categoryWeights;
        let newCategoryWeights = nextProps.categoryWeights;

        var currentCategoryList = this.props.categoryList;
        var nextCategoryList = nextProps.categoryList;
        currentCategoryList = Immutable.fromJS(currentCategoryList,(key,value)=>{return value.toOrderedMap();});
        nextCategoryList = Immutable.fromJS(nextCategoryList,(key,value)=>{return value.toOrderedMap();});

        var isEqualState = newCategoryWeights.equals(oldCategoryWeights);
        var isEqualProps = nextCategoryList.equals(currentCategoryList);

        //log("scu",isEqualState,isEqualProps);
        return !isEqualState || !isEqualProps;
    }
    render = ()=>{
        log("categoryList ",this.props.categoryList);
        log("categoryWeights ",this.props.categoryWeights);
        let categoryWeights = this.props.categoryWeights;
        var i = 0;
        return (
            <div style={styles.container}>
                <label style={s.questionAddPage.sectionTitle}>Category weights of question</label>
                <LinearProgress mode="indeterminate" color="red"
                                style={{display:this.props.categoriesWaiting ? "" : "none"}}/>
                <div style={styles.flexContainer}>
                    {
                        this.props.categoryList.map((item) =>{

                            let foundKey = categoryWeights.findKey(x=>{return x.toJS().id == item.id;});
                            let checked = foundKey != undefined;
                            let weight = (checked) ? categoryWeights.get(foundKey).toJS().weight : 0;
                            catMap[i++] = item.id;
                            return (
                                <div style={styles.child} key={item.id}>
                                    <Checkbox ref="cbKategori" checked={checked} key={item.id} value={item.id}
                                              label={item.category + " (" + i + ")"}
                                              onClick={() => this.categorySelected(item.id)}/>
                                    <span>Weight: {weight.toFixed(2)}</span>
                                    <Slider min={0} max={10} step={1} value={weight} disabled={!checked}
                                            onChange={(event,value)=>this.sliderChange(item.id,foundKey,value)}/>
                                </div>
                            )

                        })
                    }
                </div>
            </div>

        )

    }
}

CategoryWeights.propTypes = {
    categoryList:React.PropTypes.array.isRequired
}
