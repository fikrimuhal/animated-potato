import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import DropDownMenuLongMenuExample from '../MaterialUiComponents/DropDownMenuLongMenuExample'

const styles = {
  button:{
  marginRight: 12,
},
   marginLeft: 20,
   block: {
     maxWidth: 250,
   },
   radioButton: {
     marginBottom: 16,
   },
};
export default React.createClass({
  render() {
    return (<MuiThemeProvider>
      <div style={styles}>

          <div>
        <h2>Başvuru Formu</h2>

          <Paper zDepth={2}>
              <TextField hintText="Ad Soyad" style={styles} underlineShow={false} />
              <Divider />
              <TextField hintText="TC Kimlik No" style={styles} underlineShow={false} />
              <Divider />
              <TextField hintText="Üniversite" style={styles} underlineShow={false} />
              <Divider />
              <TextField hintText="Kişisel Web Adresiniz" style={styles} underlineShow={false} />
              <Divider />
              <TextField hintText="Cep Telefonu" style={styles} underlineShow={false} />
              <Divider />
              <TextField hintText="Sosyal Medya Hesapları" style={styles} underlineShow={false} />
              <Divider />
              <TextField hintText="Çalışmak İstediğiniz Alan" style={styles} underlineShow={false} />
              <Divider />
          </Paper>
          <h4>Cinsiyet</h4>
          <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">

          <RadioButton
            value="not_light"
             label="Kadin"
             style={styles.radioButton}
           />
           <RadioButton

              label="Erkek"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          </div>
          <div>
            <h4>Doğum Yılınız</h4>
            <DropDownMenuLongMenuExample/>
          </div>

          <div>
            <h4>Fotoğraf</h4>
          </div>

          <div style={styles.button}>
            <RaisedButton label="Kaydet" primary={true}/>
            <RaisedButton label="Temizle" secondary={true}/>
          </div>
          <div>
            <h5>Not:</h5>Başvurunuzun kabul edilmesi için yeterlilik formunu doldurmanız gerekmektedir.
          </div>

          <div style={styles.button}>
            <RaisedButton label="Başvuru Formu" primary={true}/>
          </div>

      </div>
      </MuiThemeProvider>
    )}
})
