import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {log2} from '../../utils/'
const log = log2("MTableHead")
export default class MTableHead extends React.Component{
  constructor(props){
    super(props)
  }
  shouldComponentUpdate= function(nextProps, nextState) {
    return true;
  }
  render = function () {
    log("rendered");
    return(
      <TableHeader>
       <TableRow>
      {
        this.props.columns.map((col)=>{
          return(
             <TableHeaderColumn key={col}>{col}</TableHeaderColumn>
          )
        })
      }
      </TableRow>
     </TableHeader>
    )
  }
}
