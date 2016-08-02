import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {log2} from '../../utils/'
import moment from 'moment'
const log = log2("MTableBody")
export default class MTableBody extends React.Component{
  constructor(props){
    super(props)
  }

  render = function () {
    log("rendered")
    return(
      <TableBody>
      {
        this.props.rows.map((row)=>{
          return(
            <TableRow key={row.id}>
              <TableRowColumn>{row.fullName}</TableRowColumn>
              <TableRowColumn>{moment(row.date).format("LLL")}</TableRowColumn>
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
