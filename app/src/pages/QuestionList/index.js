import React from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FixedDataTable from 'fixed-data-table';
import {log2,db,util} from '../../utils/'
import QuestionsTable from './QuestionsTable'
import QuestionsFilter from './QuestionsFilter'
const {Table, Column, Cell} = FixedDataTable;
const styles = {
};
const allQuestions = db.getQuestionsFromStorage();
export default class QuestionSee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:allQuestions};
    util.bindFunctions.call(this,['createNew']);
  }
  handleChange = (event, index, value) => this.setState({value});

  createNew = function () {
    window.location.href = '/adminpanel/questionadd';
  }
  render() {
    return (
      <div>
        <h2>Question List</h2>
        <div>
          <RaisedButton label="+Create New" secondary={true} onClick={()=> this.createNew()} style={{float:"right"} }/>
          <QuestionsFilter />
          <QuestionsTable data={this.state.data} />
        </div>
      </div>
    );
  }
}
