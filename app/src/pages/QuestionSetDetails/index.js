var FakeObjectDataListStore = require('../Deneme/FakeObjectDataListStore');
var FixedDataTable = require('fixed-data-table');
var React = require('react');
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {log2,db,util} from '../../utils/'


const {Table, Column, Cell} = FixedDataTable;

const style = {
  container: {
    backgroundColor:"#f1f1f1",
    margin: '134px'

  },
}

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

export default class FilterExample extends React.Component {
  constructor(props) {
    super(props);
    this._dataList = new FakeObjectDataListStore(5);

    this.state = {
      filteredDataList: this._dataList,
      data2: setModels
    };
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this._dataList,
      });
    }

    var filterBy = e.target.value.toLowerCase();
    var size = this._dataList.getSize();
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var {firstName} = this._dataList.getObjectAt(index);
      if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }
    this.setState({
      filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
    });
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

    return (
        <div>
          <h3>Question Set Details</h3>
          <br />
            <TextField onChange={this._onFilterChange}
              hintText="Soru Seti Ara"
            />
          <br />
            <Table
              rowHeight={50}
              rowsCount={filteredDataList.getSize()}
              headerHeight={50}
              width={1100}
              height={640}
              {...this.props}>
            <Column
                header={<Cell>Soru Seti Adı</Cell>}
                cell={<TextCell data={filteredDataList} col="firstName" />}
                fixed={true}
                width={250}
              />
              <Column
                header={<Cell>Soru Sayısı</Cell>}
                cell={<TextCell data={filteredDataList} col="lastName" />}
                fixed={true}
                width={250}
              />
              <Column
                header={<Cell>İşlemler</Cell>}
                cell={<div><RaisedButton label="Sil" secondary={true}/>
                      <RaisedButton label="Düzenle" primary={true}/></div>
                  }
                width={500}
              />
            </Table>
            <br/>
            <div>
              <TextField ref="inputQuestionSet"
                hintText="Soru Seti Ekle"
              />
              <br/>
              <RaisedButton label="Ekle" secondary={true} onClick={this.handleSetSave.bind(this)}/>
              <br/>
            </div>
        </div>

    );
  }
}

//module.exports = FilterExample;
