import React from 'react'
import moment from 'moment'

export default class DateDisplayer extends React.Component{
constructor(props){
  super(props)
}
render = ()=>{
  <label>{moment(this.props.date).format(this.props.format)}</label>
}
}

DateDisplayer.propTypes = {
  date:React.PropTypes.any.isRequired,
  format: React.PropTypes.string.isRequired
}
