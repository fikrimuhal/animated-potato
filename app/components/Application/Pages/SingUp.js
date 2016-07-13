import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import TextField from 'material-ui/TextField';
import TextFieldExampleSimple from '../MaterialUiComponents/TextFieldExampleSimple';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  button:{
  marginRight: 12,
},
};
export default React.createClass({
  render() {
    return (<MuiThemeProvider>
      <div style={styles}>

          ?Lütfen aşağıdaki bilgileri eksiksiz bir şekilde doldurunuz.

          <div>
        <h2>Üye Ol</h2>

        <div>
          <TextField
            hintText="Ad"
            floatingLabelText="Ad"
          />
            <TextField
              hintText="Soyad"
              floatingLabelText="Soyad"
            />
          <TextField
            hintText="E mail"
            floatingLabelText="E mail"
          />
          <TextField
            hintText="Telefon"
            floatingLabelText="Telefon"
          />
          <TextField
            hintText="Şifre"
            floatingLabelText="Şifre"
            type="password"
          />
          <TextField
            hintText="Şifre Tekrar"
            floatingLabelText="Şifre Tekrar"
            type="password"
          /><br />
        </div>
          </div>
          <div style={styles.button}>
            <RaisedButton label="Kayıt Ol" primary={true}/>
            <RaisedButton label="Temizle" secondary={true}/>
          </div>

      </div>
      </MuiThemeProvider>
    )}
})
