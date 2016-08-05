import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link,browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FontIcon from 'material-ui/FontIcon';
import SvgIcon from 'material-ui/SvgIcon';
import {log2,util} from '../utils/'
import * as db from '../utils/data'
const log = log2("MainLayout.js:")
const styles = {
  height: '100%'
};
var menuItems = [
  { route: 'interview', text: 'Interview' },
  { route: '/interview/applicationform', text: 'Apply Form' },
  { route: '/adminpanel', text: 'Admin Panel' }
];

export default class MainLayoutAuthenticated extends React.Component {
  constructor(props){
    super(props)
    this.state={
      open:false
    }
    util.bindFunctions.call(this,['toogleMenu'])
  }
  componentWillMount = function() {
    log("*******cwm********");
    if (db.isUser())
        browserHistory.push("/signin");
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
