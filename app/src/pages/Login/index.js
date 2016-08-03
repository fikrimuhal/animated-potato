import React from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button:{
    marginRight: 12,
  }, contente:{
     width: '100%',
     marginLeft: 200
   },
   container:{
       display: 'flex',
       height: '100%',
   },

};
export default React.createClass({
  render() {
    return (
      <div style={styles.contente}>
        <h3>Giriş Yap</h3>
        <TextField hintText="Ad Soyad"   floatingLabelText="Ad Soyad" /><br/>
        <TextField hintText="Şifre"      floatingLabelText="Şifre" /> <br/>
        <div style={styles.button}>
          <Link to="/adminpanel"><RaisedButton label="Giriş Yap" primary={true}/></Link>
          <RaisedButton label="Şifremi Unuttum" secondary={true}/>
        </div>
      </div>
    )}
})
