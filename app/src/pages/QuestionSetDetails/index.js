var FakeObjectDataListStore = require('../Deneme/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {log2,util,db} from '../../utils/'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';



const {Table, Column, Cell} = FixedDataTable;

const styles = {
  container: {
    backgroundColor:"#f1f1f1",
    margin: '134px'
  },

   buttonPadding: {
     marginRight: '5'
   },
   toolbar:{
     width: '1000',
   },
   toolbarButton:{
     marginLeft: '290'
   }
}

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);
export default class QuestionSetDetails extends React.Component {
  constructor(props) {
    super(props);
    this._dataList = db.getQuestionSetAddToStorage();

    this.state = {
      filteredDataList: this._dataList,
      value: 3,
      addOptionDisplay: 'none'
    };
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  handleChange = function(event, index, value){
    this.setState({value});
}
  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this._dataList,
      });

    }

     var filterBy = e.target.value.toLowerCase();
     var size = this._dataList.length;
     var arr = [];
     for (var index = 0; index < size; index++) {
       var setName = this._dataList[index].title;
       if (setName.toLowerCase().indexOf(filterBy) !== -1) {
         arr.push(this._dataList[index]);
       }
     }
    this.setState({
      filteredDataList: arr
    });
  }
  handleSearchSet = function(event, value){
    this.setState({addOptionDisplay: true});
  }
  handleSetSave = function(event, value){
      var input = this.refs.inputQuestionSet.input
      if(input.value != null && input.value != "")
      {
        db.setQuestionSetAddToStorage(input.value, util.guid())
        this.setState({
          filteredDataList: db.getQuestionSetAddToStorage()
        })
      }
  }
  handleQuestionSetDelete = function(id)
  {
  }
  render() {
    var {filteredDataList} = this.state;
    //console.log(filteredDataList)

    return (
        <div>
            <div>
              <br/>
                <Toolbar style={styles.toolbar}>
                  <ToolbarGroup>
                    <ToolbarTitle text="Question Set Details"/>
                    <FontIcon className="muidocs-icon-custom-sort" />
                    <ToolbarSeparator />

                    <TextField onChange={this._onFilterChange}
                      hintText="Soru Seti Ara"
                    />
                  <RaisedButton label="Soru Seti Ekle" primary={true} onClick={this.handleSearchSet.bind(this)} style={styles.toolbarButton}/>

                  </ToolbarGroup>
                </Toolbar>

            </div>
            <div style={{display: this.state.addOptionDisplay}}>
            <TextField ref="inputQuestionSet"
              hintText="Soru Seti Ekle"
            />
            <br/>
            <RaisedButton label="Ekle" secondary={true} onClick={this.handleSetSave.bind(this)}/>
            </div>

               <Table
               rowHeight={50}
               rowsCount={this.state.filteredDataList.length}
               headerHeight={50}
               height={700}
               width= {1200}
               >



               <Column
                 header={<Cell>Soru Seti Adı</Cell>}
                 cell={({rowIndex, ...props}) => (
              <Cell {...props}>
                {this.state.filteredDataList[rowIndex].title}
              </Cell>



            )}
                 fixed={true}
                 width={400}
               />
               <Column
                 header={<Cell>Soru Sayısı</Cell>}
                 cell={({rowIndex, ...props}) => (
              <Cell {...props}>
                {this.state.filteredDataList[rowIndex].count}

              </Cell>
            )}
                 fixed={true}
                 width={400}
               />
               <Column
                 header={<Cell>İşlemler</Cell>}
                 cell={({rowIndex, ...props}) => (
                   <Cell {...props}>
                     {

                       <div><RaisedButton label="Sil" secondary={true} style={styles.buttonPadding}  onClick={this.handleQuestionSetDelete.bind(this,this.state.filteredDataList[rowIndex].id)}/>
                           <RaisedButton label="Düzenle" primary={true}/></div>
                           }
                   </Cell>
                 )
                   }
                 width={400}
               />
             </Table>
            <br/>
        </div>
    );
  }
}
