import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MaterialUiComponents/MyAwesomeReactComponent';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';


export default React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Fikrimuhal Teknoloji" iconClassNameRight="muidocs-icon-navigation-expand-more"/>

          <h2>01-01 Fikrimuhal Çalışan Arıyor</h2>
          <span>?Hangi alanlarda çalışabilirim
          <br/>
          ----------------------------
          <br/>
          ?Kimler başvurmalı
          <br/>
          ----------------------------
          </span>
          <br/>

            <Link to="/uyeol"><RaisedButton label="Uye ol" ></RaisedButton></Link>

        </div>
      </MuiThemeProvider>
    )}
})
