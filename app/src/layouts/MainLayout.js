import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link,browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {log2,util} from '../utils/'
const log = log2("MainLayout.js:")
export default class MainLayout extends React.Component {
  constructor(props){
    super(props)
    this.state={
      open:false
    }
    util.bindFunctions.call(this,['toogleMenu'])
  }
  toogleMenu = function (event) {
    console.log("tıklandı");
    this.setState({
      open:!this.state.open
    })
  }
  render= function () {
    return  (

    <MuiThemeProvider>
      <div id="page_container">
         <header>
              <AppBar title="Fikrimuhal Teknoloji - HR" onLeftIconButtonTouchTap={this.toogleMenu}/>
          </header>
          {this.props.children}
      </div>
    </MuiThemeProvider>
    )
  }
}
