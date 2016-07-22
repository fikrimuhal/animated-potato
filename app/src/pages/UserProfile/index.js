import React, {Component, PropTypes} from 'react';
import UserView from './UserView'

const users = [
  {
    a: 1,
    b:"Ebru Güleç"
  },
  {
    a: 2,
    b:"Ayşe Yıldız"
  },
  {
    a: 3,
    b:"Selma Yiğit"
  },
  {
    a: 4,
    b:"Sevtap Ersönmez"
  },
]

export default class Users extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <UserView users = {users} />
    )
  }
}
