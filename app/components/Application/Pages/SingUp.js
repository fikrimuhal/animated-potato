import React from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField';
import TextFieldExampleSimple from '../MaterialUiComponents/TextFieldExampleSimple';
import RaisedButton from 'material-ui/RaisedButton';

export default React.createClass({
  render() {
    return(
      <div>
        <br/><br/>
        ?Lütfen aşağıdaki bilgileri eksiksiz bir şekilde doldurunuz.
        <div>
          <h2>Kayıt Ol</h2>
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
        </div>

        </div>
          <div>
            <Link to="/adminpanel"><RaisedButton label="Kayıt Ol" primary={true}/></Link>
            <RaisedButton label="Temizle" secondary={true}/>
      </div>
    </div>
    )}
})
