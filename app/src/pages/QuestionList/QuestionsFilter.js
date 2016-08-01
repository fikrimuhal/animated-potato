import React from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {log2,db,util} from '../../utils/'
import {QuestionAdd} from '../QuestionAdd'

const styles = {
  flexContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent: "flexStart",
    flexFlow:"row wrap",
    width: "500"

  },
  child:{
    width:"40%",
    marginTop:"5px",
    marginLeft:"15px"
  }
};
const allSet = [
  "Default Set","Set 1","Set 2","Set 3", "Back End Set", "Front End Set"
];
const categoryList = [
  "Default Category","Back-End","Front-End","Sistem-Yöneticisi","DBA","Java EE"
];

export default class QuestionsFilter extends React.Component {
  constructor(props) {
    super(props);
    util.bindFunctions.call(this,['setTypeChange','categoryTypeChange']);
}
setTypeChange = function(event, value){
  if(value != 0)
  {
    var setName = allSet[value]
    var data = db.getQuestionsBySetName(setName)
  }
  else {
    var data = db.getQuestionsFromStorage();
  }
  this.props.onChange(data, value)
}
categoryTypeChange = function(event, value){
  if(value != 0)
  {
  var categoryName = categoryList[value]
  var data = db.getQuestionsByCategory(categoryName)
  }
  else{
    var data = db.getQuestionsFromStorage();
  }
  this.props.onChange(data, value)
}
  render() {
    return (

          <div style={styles.flexContainer}>
            <SelectField value={this.props.setType} style={styles.child} onChange={this.setTypeChange}>

              {
                allSet.map((set, idx) => {
                  return (
                    <MenuItem value={idx} primaryText={set} />
                  )
                })
              }

            </SelectField>

            <SelectField value={this.props.categoryType} style={styles.child} onChange={this.categoryTypeChange}>
              {
                categoryList.map((category, idx) => {
                  return (
                    <MenuItem value={idx} primaryText={category} />
                  )
                })
              }
            </SelectField>
          </div>
    );
  }
}
QuestionsFilter.propTypes = {

}
