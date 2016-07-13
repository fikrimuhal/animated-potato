import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  menu:{
    backgroundColor:"red",
    width: 200

  },
  content:{
    backgroundColor: "green",
    width: '100%'
  },
  container:{
      backgroundColor: "blue",
      display: 'flex',
      height: '100%'
  }
};

export default React.createClass({
  render() {
    return (
    <div style={styles.container}>

        <div style={styles.menu}>Menu</div>
        <div style={styles.content}>

        {this.props.children}
        </div>
    </div>
    )}
})
