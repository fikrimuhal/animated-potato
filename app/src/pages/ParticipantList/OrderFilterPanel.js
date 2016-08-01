import React from 'react'
import SelectField from 'material-ui/SelectField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {util,log2} from '../../utils/'
export default class OrderFilterPanel extends React.Component{
  constructor(props){
    super(props)
    util.bindFunctions.call(this,['handleChange'])
  }
  handleChange=function () {

  }
  render = function () {
    return(
      <SelectField value={1} onChange={(event, index, value)=>this.handleChang(value)}>
        <MenuItem value={1} primaryText="Sıralama Türü" />
        <MenuItem value={2} primaryText="Büyükden Küçüğe" />
        <MenuItem value={3} primaryText="Küçükden Büyüğe" />
      </SelectField>
    )
  }
}
