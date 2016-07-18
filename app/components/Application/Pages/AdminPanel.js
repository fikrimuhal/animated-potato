import React from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

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
  },
  display: 'inline-block',

};
export default React.createClass({
  render() {
    return (
        <div style={styles.container}>
          <div>
            <div style={styles.menu}>
            <Paper style={styles}>
                 <Menu desktop={true}>
                   <Link to='/adminpanel/listofparticipants'><MenuItem primaryText="Katılımcı Listesi" /></Link>
                   <Link to='/adminpanel/questionsee'><MenuItem primaryText="Soruları Gör" /></Link>
                   <Link to='/adminpanel/questionadd'><MenuItem primaryText="Soru Ekle" /></Link>
                   <Link to='/adminpanel/questionsetdetails'><MenuItem primaryText="Soru Set Bilgileri" /></Link>
                   <Link to='/adminpanel/usersprofile'><MenuItem primaryText="Kullanıcıları Gör" /></Link>
                   <Link to='/adminpanel/adminprofile'><MenuItem primaryText="Admin Bilgileri" /></Link>
                   <Link to='/adminlayout/singin'><MenuItem primaryText="Admin Giriş" /></Link>
                   <Link to='/adminlayout/singup'><MenuItem primaryText="Admin Kaydol" /></Link>
                 </Menu>
               </Paper>
            </div>
            </div>
            <div style={styles.contente}>{this.props.children}</div>
        </div>
    )}
})
