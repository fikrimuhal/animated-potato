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
    return(
      <div style={styles.contente}>
        <br/><br/>
        ?Lütfen aşağıdaki bilgileri eksiksiz bir şekilde doldurunuz.
        <div>
          <h3>Kayıt Ol</h3>
        <div>
          <TextField hintText="Ad"      floatingLabelText="Ad" />
          <TextField hintText="Soyad"   floatingLabelText="Soyad" /> <br/>
          <TextField hintText="E mail"  floatingLabelText="E mail" />
          <TextField hintText="Telefon" floatingLabelText="Telefon" /><br/>
        </div>

        </div>
          <div style={styles.button}>
            <Link to="/adminpanel"><RaisedButton label="Kayıt Ol" primary={true}/></Link>
            <RaisedButton label="Temizle" secondary={true}/>
      </div>
    </div>
    )}
})
