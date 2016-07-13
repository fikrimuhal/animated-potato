import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  height: 400,
  width: 150,
  display: 'flex',
  flexWrap: 'wrap',
  flexFlow: 'row wrap'

};

export default React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Fikrimuhal Teknoloji" iconClassNameRight="muidocs-icon-navigation-expand-more" />
          <div style={style}>
            <div>
              <Paper >
                <Menu>
                  <MenuItem primaryText="Anasayfa" />
                  <MenuItem primaryText="İşlemler" />
                  <MenuItem primaryText="İletişim" />
                  <MenuItem primaryText="Hakkımızda" />

                </Menu>
                </Paper>
            </div>
            <h1>adsf</h1>
                {this.props.children}
              <Link to="/interview/uyeol"><RaisedButton label="Uye ol" ></RaisedButton></Link>
            </div>
        </div>
      </MuiThemeProvider>
    )}
})
