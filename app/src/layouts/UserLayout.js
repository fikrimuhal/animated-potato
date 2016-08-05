import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link,browserHistory } from 'react-router'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {log2} from '../utils/'
import * as util from '../utils/utils'
import * as db from '../utils/data'
const log = log2("MainLayout.js:")
export default class UserLayout extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open:false
    };
    util.bindFunctions.call(this,['toogleMenu'])
  }
  componentWillMount = function() {
    if (!db.isUser())
        browserHistory.push("/signin");

  };
  toogleMenu = function (event) {
    console.log("tıklandı");
    this.setState({
      open:!this.state.open
    })
  };
  render= function () {
    return  (

    <MuiThemeProvider>
      <div id="page_container">
         <header>
              <AppBar title="Fikrimuhal Teknoloji - HR" onLeftIconButtonTouchTap={this.toogleMenu}/>
          </header>
          <Drawer width={200} openPrimary={true} open={this.state.open} docked={false}  onRequestChange={(open) => this.setState({open})} >
            <Menu>
              <Link to='/adminpanel/listofparticipants'><MenuItem primaryText="Participants"/></Link>
              <Link to='/adminpanel/questionlist'><MenuItem primaryText="Questions" /></Link>
              <Link to='/adminpanel/questionsetdetails'><MenuItem primaryText="Soru Set Bilgileri" /></Link>
              <Link to='/adminpanel/usersprofile'><MenuItem primaryText="Kullanıcıları Gör" /></Link>
              <Link to='/adminpanel/adminprofile'><MenuItem primaryText="Admin Bilgileri" /></Link>
              <Link to='/adminlayout/singin'><MenuItem primaryText="Admin Giriş" /></Link>
              <Link to='/adminlayout/singup'><MenuItem primaryText="Admin Kaydol" /></Link>
            </Menu>
          </Drawer>
          {this.props.children}
      </div>
    </MuiThemeProvider>
    )
  }
}
