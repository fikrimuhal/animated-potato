import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class TBody extends React.Component{
  constructor(props){
    super(props)
  }

  render = function () {
    return(
      <TableBody>
      {
        this.props.rows.map((row)=>{
          return(
            <TableRow>
              <TableRowColumn>{row.fullName}</TableRowColumn>
              <TableRowColumn>{row.date}</TableRowColumn>
              <TableRowColumn>{row.score}</TableRowColumn>
              <TableRowColumn>-</TableRowColumn>
            </TableRow>
          )
        })
      }

     </TableBody>
    )
  }
}
