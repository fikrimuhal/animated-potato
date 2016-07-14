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
      marginLeft: 55,
  },
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
                  <MenuItem primaryText="Anasayfa" />
                  <MenuItem primaryText="İşlemler" />
                  <MenuItem primaryText="İletişim" />
                  <MenuItem primaryText="Hakkımızda" />
                </Menu>
                </Paper>
            </div>
            </div>
            <div style={styles.space}>
              <h3>Fikrimuhal Teknoloji Çalışan Arıyor.</h3>
              Hangi alanlarda çalışabilirim?
              <ul>
                <li>Linux Sistem/Sunucu</li>
                <li>Web Teknolojileri</li>
                <li>Front End</li>
                </ul>
                Kimler Başvurmalı?
                <ul>
                  <li>-----</li>
                  <li>-----------</li>
                  <li>--------------</li>
                  </ul>
                  Nerede?
                  <ul>
                    <li>-----</li>
                    <li>-----------</li>
                    <li>--------------</li>
                    </ul>

                    <br/>
                  <p><b>Dipnot: </b> Başvuru yapabilmek için sisteme üye olmanız gerekmekte. Eğer üye iseniz lütfen giriş yapınız.</p>
                  <div style={styles.button}>
                    <Link to="/interview/singin"><RaisedButton label="Giriş Yap" primary={true}/></Link>
                    <Link to="/interview/singup"><RaisedButton label="Üye Ol" secondary={true}/></Link>
                  </div>
            </div>
        </div>
      </MuiThemeProvider>
    )}
})
