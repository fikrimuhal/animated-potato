import React from 'react'
import { PropTypes } from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router'
const styles = {
  menu:{
    height: 400,
    width: 200,
  }
}
export default class AdminMenu extends React.Component{
  render= function() {
    return (

        <div style={styles.menu}>
          <Paper>
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

    );
  }
}
