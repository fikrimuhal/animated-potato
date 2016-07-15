import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import TextField from 'material-ui/TextField';
import TextFieldExampleSimple from '../MaterialUiComponents/TextFieldExampleSimple';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  button:{
    marginRight: 12,
  }

};
export default React.createClass({
  render() {
    return (<MuiThemeProvider>

      <div>
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
            <Link to="/interview/applicationform"><RaisedButton label="Giriş Yap" primary={true}/></Link>
          <RaisedButton label="Şifremi Unuttum" secondary={true}/>
        </div>

      </div>
      </MuiThemeProvider>
    )}
})
