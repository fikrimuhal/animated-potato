import React from "react";
import Header from "../Header";
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuExampleDisable from './MaterialUiComponents/MenuExampleDisable';
import MenuExampleSimple from './MaterialUiComponents/MenuExampleSimple';
import injectTapEventPlugin from 'react-tap-event-plugin'
import RaisedButton from 'material-ui/RaisedButton';
// import {print,print2} from './utils'
// import deneme from './utils'
// import _ from 'lodash'
injectTapEventPlugin();

function App() {
   return (
     <MuiThemeProvider>
     <div>

         <h2>Home Page</h2>
         Mülakat sayfasına gitmek için lütfen tıklayınız!
         <br/>

     <Link to="/interview"><RaisedButton label="Mülakat Sayfası" ></RaisedButton></Link>

    </div>
</MuiThemeProvider>
)};

App.displayName = 'App';

export default App;
