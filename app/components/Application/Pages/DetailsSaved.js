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
          <h3>Bilgileriniz kaydedilmiştir.</h3>
          <p>
            <b>Not: </b>
            Başvurunuzun kabul edilmesi için yeterlilik formunu doldurmanız gerekmektedir.
          </p>
          <p>Forma ulaşmak için lütfen tıklayınız.</p>
          <div style={styles.button}>
              <Link to="/questions"><RaisedButton label="Yeterlilik Formu" primary={true}/></Link>
          </div>
      </div>
      </MuiThemeProvider>
    )}
})
