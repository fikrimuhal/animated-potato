import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  height: '100%'
};
export default React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <div style={style}>
          <AppBar title="Fikrimuhal Teknoloji" iconClassNameRight="muidocs-icon-navigation-expand-more" />
                {this.props.children}
            </div>
      </MuiThemeProvider>
    )}
})
