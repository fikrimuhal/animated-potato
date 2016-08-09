import React from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox'
import {log2,util} from '../../utils/'
import Immutable from 'Immutable'
import { Link ,browserHistory} from 'react-router';
import Mousetrap from 'Mousetrap';
var catMap=[];

const log = log2("CategoryWeights: ")
const styles = {
  flexContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent: "flexStart",
    flexFlow:"row wrap"
  },
  container: {

    backgroundColor:"#f1f1f1",
    padding:"5px 5px 5px 5px",
    marginTop:"5px",

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
export default class CategoryWeights extends React.Component{

  constructor(props) {
    super(props)
    util.bindFunctions.call(this,["categorySelected","sliderChange"]);
  }
    menuHotkey=(e,combo)=>{
        log(combo);
        if(combo.indexOf("alt") != -1){
            var indis = parseInt(combo.split('+')[2]);
            if(indis !== NaN)
            {
                this.categorySelected(catMap[indis-1],null);
            }
        }
    }
    componentDidMount=()=> {
        Mousetrap.bind([`alt+k+1`, `alt+k+2`, `alt+k+3`, `alt+k+4`], this.menuHotkey);
    }
    componentWillUnmount=()=> {
        Mousetrap.bind([`alt+k+1`, `alt+k+2`, `alt+k+3`, `alt+k+4`], this.menuHotkey);
    }
categorySelected= function (selectedCategory,event) {
  let oldCategoryWeights = this.props.categoryWeights;
  var newCategoryWeights;
  var foundKey =  oldCategoryWeights.findKey( x => {return x.get("category") == selectedCategory});
  if (foundKey == undefined) {
    newCategoryWeights=oldCategoryWeights.set(
                                              util.guid(),
                                              Immutable.fromJS({
                                                                category:selectedCategory,
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
sliderChange = function (category,key,value) {
  //log(key,value,category)
  let oldCategoryWeights = this.props.categoryWeights;
  var newCategoryWeights;
  newCategoryWeights=oldCategoryWeights.updateIn( [key,'weight'],
                                                  (v)=>{return value;}
                                                );
  this.props.categoryWeightsChanged(newCategoryWeights);
}
shouldComponentUpdate= function(nextProps, nextState) {
    let oldCategoryWeights = this.props.categoryWeights;
    let newCategoryWeights = nextProps.categoryWeights;
    var isEqual =  newCategoryWeights.equals(oldCategoryWeights);
    //log("scu",oldCategoryWeights,newCategoryWeights,isEqual)
    return !isEqual;
}
render= ()=>{
    log("rendered")
      let kategoriList = this.props.categoryWeights;
    var i=0;
    return (
      <div style = {styles.container}>
        <label>Category weights of question: </label>
          <div style = {styles.flexContainer}>
                {

                  this.props.categoryList.map( (kategori) => {
                      let foundKey = kategoriList.findKey( x=> {return x.toJS().category == kategori;} );
                      let checked = foundKey != undefined;
                      let weight = (checked)? kategoriList.get(foundKey).toJS().weight:0;
                      catMap[i++]=kategori;
                      return(
                        <div style={styles.child} key={kategori}>
                          <Checkbox ref="cbKategori" checked={checked}  key={kategori} value={kategori} label={kategori + " (" + i +")"} onClick={() =>  this.categorySelected(kategori)}/>
                          <span>Weight: {weight}</span>
                          <Slider   min={0} max={10} step={1} value={weight} disabled={!checked} onChange={(event,value)=>this.sliderChange(kategori,foundKey,value)} />
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
  categoryList: React.PropTypes.array.isRequired
}
