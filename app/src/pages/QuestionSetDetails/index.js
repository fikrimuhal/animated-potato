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
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const {Table, Column, Cell} = FixedDataTable;
const rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more
];
const styles = {
  container: {
    backgroundColor:"#f1f1f1",
    margin: '134px'
  },

   buttonPadding: {
     marginRight: '5px'
   },
   toolbar:{
     width: '1000'
   }
}
const setModels = db.getQuestionSetAddToStorage();
const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}
export default class QuestionSetDetails extends React.Component {
  constructor(props) {
    super(props);
    this._dataList = new FakeObjectDataListStore(55);

    this.state = {
      filteredDataList: this._dataList,
      data2: setModels,
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
        veri: setModels
      });

    }
    var veri= [];

    // var filterBy = e.target.value.toLowerCase();
    // var size = this._dataList.getSize();
    // var filteredIndexes = [];
    // for (var index = 0; index < size; index++) {
    //   var {firstName} = this._dataList.getObjectAt(index);
    //   if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
    //     filteredIndexes.push(index);
    //   }
    // }
    this.setState({
      filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
    });
  }
  handleSearchSet = function(event, value){
    this.setState({addOptionDisplay: true});
  }
  handleSetSave = function(event, value){
      var model = this.state.data2
      var input = this.refs.inputQuestionSet.input

      if(input.value != null && input.value != "")
      {
        model.title = input.value
        model.count = 0
        this.setState({
          data2: model
        })
      }
      console.log(this.state.data2);
    db.setQuestionSetAddToStorage(input.value, util.guid())
  }
  render() {
    var {filteredDataList} = this.state;
    //console.log(filteredDataList)
    console.log(setModels);
    return (
        <div>
            <div>

              <br/>

                <Toolbar style={{width: '1000'}}>
                  <ToolbarGroup>
                    <ToolbarTitle text="Question Set Details"/>
                    <FontIcon className="muidocs-icon-custom-sort" />
                    <ToolbarSeparator />
                    <IconMenu
                      iconButtonElement={
                        <IconButton touch={true}>
                          <NavigationExpandMoreIcon />
                        </IconButton>
                      }
                    >
                      <MenuItem primaryText="Soru Seti Ekle" onClick={this.handleSearchSet.bind(this)}/>
                    </IconMenu>

                    <TextField onChange={this._onFilterChange}
                      hintText="Soru Seti Ara"
                    />
                  </ToolbarGroup>
                  <RaisedButton label="Create Broadcast" primary={true} />
                </Toolbar>

            </div>
            <div style={{display: this.state.addOptionDisplay}}>
            <TextField ref="inputQuestionSet"
              hintText="Soru Seti Ekle"
            />
            <br/>
            <RaisedButton label="Ekle" secondary={true} onChange={this.handleSetSave.bind(this)}/>
            </div>
            <Table
              rowHeight={50}
              rowsCount={setModels.length}
              width={5000}
              height={5000}
              headerHeight={50}>
              <Column
                header={
                  <Cell>
                    Set Adı
                  </Cell>
                }
                cell={({rowIndex, ...props}) => (
                  <Cell {...props}>
                    {setModels[rowIndex].title}
                  </Cell>
                )}
                width={200}
                />
                <Column
                  header={
                    <Cell>
                      Soru Sayısı
                    </Cell>
                  }
                  cell={({rowIndex, ...props}) => (
                    <Cell {...props}>
                      {setModels[rowIndex].count}
                    </Cell>
                  )}
                  width={200}
                  />

            </Table>
            {
            //   <Table
            //   rowHeight={50}
            //   rowsCount={filteredDataList.getSize()}
            //   headerHeight={50}
            //   height={700}
            //   width= {1200}
            //   {...this.props}>
            // <Column
            //     header={<Cell>Soru Seti Adı</Cell>}
            //     cell={<TextCell data={filteredDataList} col="firstName" />}
            //     fixed={true}
            //     width={400}
            //   />
            //   <Column
            //     header={<Cell>Soru Sayısı</Cell>}
            //     cell={<TextCell data={filteredDataList} col="zipCode" />}
            //     fixed={true}
            //     width={400}
            //   />
            //   <Column
            //     header={<Cell>İşlemler</Cell>}
            //     cell={<div><RaisedButton label="Sil" secondary={true} style={styles.buttonPadding}/>
            //           <RaisedButton label="Düzenle" primary={true}/></div>
            //       }
            //     width={400}
            //   />
            // </Table>
          }
            <br/>

        </div>

    );
  }
}

//module.exports = FilterExample;
