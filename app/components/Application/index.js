import React from "react";
import Header from "../Header";
import Deneme2 from "./Deneme2";
import Example from "./Example";
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import AppBarExampleIcon from './AppBarExampleIcon';
import AutoCompleteExampleSimple from './AutoCompleteExampleSimple';
import BadgeExampleSimple from './BadgeExampleSimple';

/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */

var style={
  boyut:{
    width:'500px'
  },
  appBar:{
    width:'600px'
  },
  


}

 const App = () => (
   <div>
      <div>
        <MuiThemeProvider>
          <BadgeExampleSimple/>
        </MuiThemeProvider>
        </div>

     <div style={style.appBar}>
      <MuiThemeProvider>
        <AppBarExampleIcon />
      </MuiThemeProvider>
    </div>
      <div style={style.boyut}>
        <MuiThemeProvider>
          <AutoCompleteExampleSimple/>
          </MuiThemeProvider>
      </div>

      <div>
        <MuiThemeProvider>
          <MyAwesomeReactComponent />
        </MuiThemeProvider>
      </div>

    </div>

);

App.displayName = 'App';

export default App;
