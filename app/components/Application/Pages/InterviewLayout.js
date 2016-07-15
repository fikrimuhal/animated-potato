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
      marginLeft: 185,
  },
};
export default React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
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
                  <p><b>Dipnot: </b> Başvuru yapabilmek için lütfen tıklayınız.</p>
                  <div style={styles.button}>
                    <Link to="/interview/applicationform"><RaisedButton label="Başvuru Yap" primary={true}/></Link>
                  </div>
            </div>
        </div>
      </MuiThemeProvider>
    )}
})
