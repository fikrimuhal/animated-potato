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
        <h2>Başvuru Formu</h2>

        <div>
          <TextField
            hintText="Ad"
            floatingLabelText="Ad"
          />
            <TextField
              hintText="Soyad"
              floatingLabelText="Soyad"
            /> <br/>
          <TextField
            hintText="E mail"
            floatingLabelText="E mail"
          />
          <TextField
            hintText="Telefon"
            floatingLabelText="Telefon"
          /><br/>


        <div>
        <div>
          <h4>Fotoğraf</h4>
        </div>

        <div style={styles.button}>
          <RaisedButton label="Yükle" primary={true}/>
          <RaisedButton label="İptal" secondary={true}/>
        </div>
        <br/>
        <TextField
          hintText="Kişisel Web Sayfanız"
          floatingLabelText="Kişisel Web Sayfanız"
        />
        <br/>
        <TextField
          hintText="Ek notlarınız"
          floatingLabelText="Ek notlarınız"
        />
        </div>
        <br/>
        <div style={styles.button}>
            <Link to="/interview/detailssaved"><RaisedButton label="Kaydet" primary={true}/></Link>
        </div>

        </div>
          </div>


      </div>
      </MuiThemeProvider>
    )}
})
