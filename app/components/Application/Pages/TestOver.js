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


   contente:{
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
      <div>
          <div style={styles.menu}>

          </div>
          <div style={styles.contente}>
            <h2>Test Tamamlandı.</h2>
            <span><b>25</b> dakika içerisinde <b>50</b> soruya yanıt verdiniz.</span>
            <h3>Başvurunuz için teşekkür ederiz</h3>
            <span>Tarafınıza en kısa zamanda dönüş yapılacaktır.</span>
          </div>
    </div>
    )}
})
