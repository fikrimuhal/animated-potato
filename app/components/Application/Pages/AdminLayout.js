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
    height: 400,
    width: 150,
  },
  contente:{
    width: '100%',
    marginLeft: 50
  },
  container:{
      display: 'flex',
      height: '100%',
  },
  space:{
      marginLeft: 255,
  },
};
export default React.createClass({
  render() {
    return (
      <MuiThemeProvider>


            <div style={styles.space}>



                  {this.props.children}

    </div>
      </MuiThemeProvider>
    )}
})
