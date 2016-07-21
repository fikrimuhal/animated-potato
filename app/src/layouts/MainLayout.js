import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {log2} from '../utils/'
const log = log2("MainLayout.js:")
const styles = {
  height: '100%'
};
var menuItems = [
  { route: 'interview', text: 'Interview' },
  { route: '/interview/applicationform', text: 'Apply Form' },
  { route: '/adminpanel', text: 'Admin Panel' }
];
export default React.createClass({
  render() {
   log("render")
    return (
      <MuiThemeProvider>
        <div id="page_container">
           <header>
                <AppBar title="Fikrimuhal Teknoloji - HR"/>
            </header>
            {this.props.children}
        </div>
      </MuiThemeProvider>
    )}
})
