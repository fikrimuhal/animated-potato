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
      <h2>Test Tamamlandı.</h2>
      <span><b>25</b> dakika içerisinde <b>50</b> soruya yanıt verdiniz.</span>
        <h3>Teşekkür Ederiz</h3>

      </div>
      </MuiThemeProvider>
    )}
})
