import React from 'react'
import {log2} from '../../utils'
import AdminMenu from '../../layouts/AdminMenu'
import * as db from '../../utils/data.js'
import {browserHistory} from 'react-router'
const log = log2("AdminPanel.js:")
const styles = {
  menu:{
    height: 400,
    width: 200,
  },
  contente:{
    width: '100%',
    marginLeft: 50
  },
  container:{
      display: 'flex',
      height: '100%',
  },
  display: 'inline-block',

};
export default class AdminPanel extends React.Component{

    constructor(props){
        super(props)
    }
    render = ()=>{
       return(
           <div>
               {/*<AdminMenu/>*/}
               {this.props.children}
           </div>
       )
   }
}
