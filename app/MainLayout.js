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

const styles = {
  height: '100%'
};
export default React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <div style={styles}>
        <div>
        <AppBar
             title="Title"
             iconElementRight={<IconButton><NavigationClose /></IconButton>}
             iconElementLeft={
               <IconMenu
                 iconButtonElement={
                   <IconButton><MoreVertIcon /></IconButton>
                 }
                 targetOrigin={{horizontal: 'right', vertical: 'top'}}
                 anchorOrigin={{horizontal: 'right', vertical: 'top'}}
               >
                 <Link to='/interview'> <MenuItem primaryText="Interview" /></Link>
                 <Link to='/interview/applicationform'><MenuItem primaryText="applicationform" /></Link>
                 <Link to='/interview/detailssaved'><MenuItem primaryText="detailssaved" /></Link>
                 <Link to='questions'><MenuItem primaryText="questions" /></Link>
                 <Link to='/questions2'><MenuItem primaryText="questions2" /></Link>
                 <Link to='/questions3'><MenuItem primaryText="questions3" /></Link>
                 <Link to='/testover'><MenuItem primaryText="testover" /></Link>
                 <Link to='/adminpanel'><MenuItem primaryText="adminpanel" /></Link>
                 <Link to='/adminsingin'><MenuItem primaryText="admin giriş" /></Link>
                 <Link to='/adminsingup'><MenuItem primaryText="admin kaydol" /></Link>
               </IconMenu>
             }
            />
          </div>
                {this.props.children}
            </div>
      </MuiThemeProvider>
    )}
})
