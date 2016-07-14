import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const styles = {
  menu:{
    height: 400,
    width: 200,
  },
  contente:{
    width: '100%',
    marginLeft: 50
  },
  container:{
      display: 'flex',
      height: '100%',
  }
};
export default React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <div>
            <div style={styles.menu}>
              <Paper >
                <Menu>
                <MenuItem
            primaryText="Katılımcı Bilgileri"
             rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Bilgileri Gör" />,
            ]}
                />

                <MenuItem
            primaryText="Soru Bilgileri"
             rightIcon={<ArrowDropRight />}
              menuItems={[
              <MenuItem primaryText="Soruları Gör" />,

                  <MenuItem primaryText="Soru Ekle" />,

                  <MenuItem primaryText="Soru Set Bilgileri" />,
                  <MenuItem primaryText="Soru Seti Ekle" />,
                  ]}
            />
                  <MenuItem
                  primaryText="İşlemler"
                   rightIcon={<ArrowDropRight />}
                    menuItems={[
                    <MenuItem primaryText="Kullanıcıları Gör" />,

                        <MenuItem primaryText="Admin Bilgileri" />,

                        <MenuItem primaryText="Admin Ekle" />,
                        <MenuItem primaryText="Katılımcıları Gör" />,
                        <MenuItem primaryText="Kullanıcı Ekle" />,


                        ]}
              />

                </Menu>
                </Paper>
            </div>
            </div>
            <div style={styles.contente}>{this.props.children}</div>
        </div>
      </MuiThemeProvider>
    )}
})
