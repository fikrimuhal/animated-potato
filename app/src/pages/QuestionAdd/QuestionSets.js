import React from 'react'
import Checkbox from 'material-ui/Checkbox';
import {log2,util} from '../../utils/'
const log = log2("QuestionSets: ")
const styles = {
  container: {
    display:"flex",
    backgroundColor:"#f1f1f1",
    padding:"5px 5px 5px 5px",
    marginTop:"5px",
    flexDirection:"row",
    justifyContent: "flexStart",
    flexFlow:"row wrap"
  },
  child:{
    width:"100px",

    marginLeft:'5px'
  }
}

export default class QuestionSets extends React.Component {
  constructor(props)
  {
    super(props);
    util.bindFunctions.call(this,['handleChekboxSetClick'])
  }
  shouldComponentUpdate= function(nextProps, nextState) {
    var isEqual = nextProps.setsOfQuestion.equals(this.props.setsOfQuestion);
    return !isEqual;
  }
  handleChekboxSetClick= (setName,key)=> {
    let foundKey = this.props.setsOfQuestion.findKey( k => {return k == setName;});
    var newMap;
    if (foundKey != undefined)
        newMap= this.props.setsOfQuestion.remove(foundKey);
    else
        newMap= this.props.setsOfQuestion.toList().push(setName).toOrderedMap();

    this.props.onChangeSetsOfQuestion(newMap);
  }
  render= ()=> {
    log("rendered")
    const _this = this;
    const setsOfQuestion = this.props.setsOfQuestion;
    return (
      <div>
        <label>Sets of Question</label>
        <div style = {styles.container}>
            {
              this.props.allSet.map((setName)=>{
                let foundKey = setsOfQuestion.findKey( k => {return k == setName;});
                let checked = foundKey != undefined;
                return (
                        <div style={styles.child} key={setName}>
                          <Checkbox key={setName} value={setName} label={setName} checked={checked}  onClick={ ()=> _this.handleChekboxSetClick(setName,foundKey)}/>
                        </div>
                      )
              })
            }
         </div>
      </div>
    )
  }
}
