import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import TextField from 'material-ui/TextField';
import TextFieldExampleSimple from '../MaterialUiComponents/TextFieldExampleSimple';

const style = {
  height: 400,
  width: 150,

};
export default React.createClass({
  render() {
    return (<MuiThemeProvider>
      <div style={style}>


        <span>
          ?Lütfen aşağıdaki bilgileri eksiksiz bir şekilde doldurunuz.
        </span>

        <h2>Üye Ol</h2>

          <TextFieldExampleSimple nameHintText="ad soyad"/>

      </div>
      </MuiThemeProvider>
    )}
})
