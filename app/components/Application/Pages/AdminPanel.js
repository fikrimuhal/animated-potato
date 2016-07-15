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
              <Link to='/adminpanel/listofparticipants'><MenuItem primaryText="Katılımcı Listesi" /></Link>
            ]}
                />
                <MenuItem
            primaryText="Soru Bilgileri"
             rightIcon={<ArrowDropRight />}
              menuItems={[
                  <Link to='/adminpanel/questionsee'><MenuItem primaryText="Soruları Gör" /></Link>,
                  <Link to='/adminpanel/questionadd'><MenuItem primaryText="Soru Ekle" /></Link>,
                  <Link to='/adminpanel/questionsetdetails'><MenuItem primaryText="Soru Set Bilgileri" /></Link>,
                  ]}
            />
                  <MenuItem
                  primaryText="İşlemler"
                   rightIcon={<ArrowDropRight />}
                    menuItems={[
                        <Link to='/adminpanel/usersprofile'><MenuItem primaryText="Kullanıcıları Gör" /></Link>,
                        <Link to='/adminpanel/adminprofile'><MenuItem primaryText="Admin Bilgileri" /></Link>,
                        <Link to='/adminsingin'><MenuItem primaryText="Admin Giriş" /></Link>,
                        <Link to='/adminsingup'><MenuItem primaryText="Admin Kaydol" /></Link>,

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
