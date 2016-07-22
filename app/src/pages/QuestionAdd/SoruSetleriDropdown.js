import React from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import {log2} from '../../utils/'
import _ from 'lodash'
const log = log2("SoruSetleriDropdown: ")
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

export default class SoruSetleriDropdown extends React.Component {
  constructor(props)
  {
    super(props);
  }
  handleQuestionSetChange= (event,value) => {
    var model = this.props.parent.state.data;
    if (value != null && value!="") {
      model.set = event.target.textContent;
    //   this.props.parent.setState({
    //     data : model
    //  });
    }
  }
  shouldComponentUpdate= function(nextProps, nextState) {
    log("scu: ",this.props.setsOfQuestion,nextProps.setsOfQuestion);
    return true;
  }
  handleChekboxSetClick= (setName,event)=>{
    log(setName,event);

    var index = _.findIndex(this.props.setsOfQuestion, (k)=>{return k==setName});
    if (index != -1) {
        this.props.setsOfQuestion.splice(index,1);
    }
    else {
        this.props.setsOfQuestion.push(setName);
    }
    //console.dir(this.props.setsOfQuestion)
    //console.dir(this.props.parent.state.data.setList)
    this.forceUpdate();

  }
  render= ()=> {
    log("rendered")
    const _this = this;
    return (
      <div>
     <label>Dahil Olacağı Setler</label><br/>
      <div style = {styles.container}>

        {
          this.props.allSet.map((setName)=>{
            let setsOfQuestion = _this.props.setsOfQuestion;
            let isHaveThisSet = _.findIndex(setsOfQuestion,(k)=> {return k==setName;}) != -1;

            return (
              <div style={styles.child}>
                <Checkbox key={setName} value={setName} label={setName} checked={isHaveThisSet}  onClick={_this.handleChekboxSetClick.bind(_this,setName)}/>
              </div>

            )

          })
        }
      </div>
      </div>


    )
  }
}
