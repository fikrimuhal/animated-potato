import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class THead extends React.Component{
  constructor(props){
    super(props)
  }
  shouldComponentUpdate= function(nextProps, nextState) {
    return true;
  }
  render = function () {
    console.log(this.props);
    return(
      <TableHeader>
       <TableRow>
      {
        this.props.columns.map((col)=>{
          return(
             <TableHeaderColumn>{col}</TableHeaderColumn>
          )
        })
      }
      </TableRow>
     </TableHeader>
    )
  }
}
