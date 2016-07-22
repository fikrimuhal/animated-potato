import React from 'react';
import TextField from 'material-ui/TextField';
import QuestionSets from './QuestionSets'
import RaisedButton from 'material-ui/RaisedButton';
import {log2,db,util} from '../../utils/'
const log = log2("QuestionSetDetails: ")
log("db",db,"Utils",util)

const setModels = [
  {
    title: "Set 1",
    count: 23
  },
  {
    title: "Set 4",
    count: 65
  },
]

export default class QuestionSetDetails extends React.Component{
  constructor(props){
    super(props)
    this.setState = {
      data: setModels
    }
  }
  handleSetTextChange = function(event, value){
    var model = data
    if(value != null && value != "")
    {
      model.title = value
    }
  }
  handleSaveSet = function(event, value){
    db.setQuestionSetAddToStorage(this.state.data, utils.guid())
  }

  render(){
    log("questionModel: " , this.setState.data)
    return(
      <div>
        <QuestionSets sets={setModels} />
        <TextField hintText="Soru Seti Adı" onChange={this.handleSetTextChange.bind(this)}/>
        <br/>
        <RaisedButton label="Ekle" primary={true} onChange={this.handleSaveSet.bind(this)}/>
      </div>
    )
  }
}
