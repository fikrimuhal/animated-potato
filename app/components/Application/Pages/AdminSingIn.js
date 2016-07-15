import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import TextField from 'material-ui/TextField';
import TextFieldExampleSimple from '../MaterialUiComponents/TextFieldExampleSimple';
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
    return (<MuiThemeProvider>

      <div style={styles.contente}>
        <h1>Giriş Yap</h1>
        <TextField
          hintText="Ad Soyad"
          floatingLabelText="Ad Soyad"
        /><br/>
        <TextField
          hintText="Şifre"
          floatingLabelText="Şifre"
        />
        <br/>
        <div style={styles.button}>
            <Link to="/adminpanel"><RaisedButton label="Giriş Yap" primary={true}/></Link>
          <RaisedButton label="Şifremi Unuttum" secondary={true}/>
        </div>

      </div>
      </MuiThemeProvider>
    )}
})
