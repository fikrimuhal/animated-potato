import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MaterialUiComponents/MyAwesomeReactComponent';
import { Link } from 'react-router'
import TextFieldExampleSimple from './MaterialUiComponents/TextFieldExampleSimple';


export default React.createClass({
  render() {
    return (<MuiThemeProvider>
      <div>


        <span>
          ?Lütfen aşağıdaki bilgileri eksiksiz bir şekilde doldurunuz.
        </span>

        <h2>Üye Ol</h2>

          <TextFieldExampleSimple nameHintText="ad soyad"/>

      </div>
      </MuiThemeProvider>
    )}
})
