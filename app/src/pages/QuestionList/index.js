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
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import TextField from 'material-ui/TextField';

const {Table, Column, Cell} = FixedDataTable;

const allQuestions = db.getQuestionsFromStorage();
export default class QuestionSee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data: allQuestions,
    setType: 0,
    categoryType: 0
  };
  util.bindFunctions.call(this,['setTypeValueChange','categoryTypeValueChange']);

  }
  setTypeValueChange = function changed(newData, NewSetType){
  this.setState({data: newData,
    setType: NewSetType,
  });
  }
  categoryTypeValueChange = function chanced(newData, NewCategoryType){
    console.log("yeni veri", newData);
  this.setState({
    data: newData,
    categoryType: NewCategoryType});

  }

  createNew = function () {
    window.location.href = '/adminpanel/questionadd';
  }
  render() {
    return (
      <div>
        <div>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="Question List"/>
              <FontIcon className="muidocs-icon-custom-sort" />
              <ToolbarSeparator />

            <QuestionsFilter onChange={this.setTypeValueChange} setType={this.state.setType} onChangeCategory={this.categoryTypeValueChange} categoryType={this.state.categoryType}/>

            </ToolbarGroup>
          </Toolbar>

          <RaisedButton label="+Create New" secondary={true} onClick={()=> this.createNew()} style={{float:"right"} }/>
          <QuestionsTable data={this.state.data} />
        </div>
      </div>
    );
  }
}
