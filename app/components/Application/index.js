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
import MenuExampleSimple from './MenuExampleSimple';
import CardExampleWithAvatar from './CardExampleWithAvatar';
import DividerExampleForm from './DividerExampleForm';
import RaisedButtonExampleSimple from './RaisedButtonExampleSimple';


var style={
  boyut:{
    width:'500px'
  },
  hiza:{
    display: 'flex',
    flexWrap: 'wrap'
  },
  hiza2:{
    display: 'flex',
    flexDirection: 'row'
  },
}

 const App = () => (
   <div>
   <div>
   <div>
    <MuiThemeProvider>
      <AppBarExampleIcon />
    </MuiThemeProvider>
  </div>
  </div>
  <div style = {style.hiza}>
   <div>
     <MuiThemeProvider>
       <MenuExampleSimple/>
     </MuiThemeProvider>
     </div>

    <div>
     <h3>Kayıt Ol!</h3>


   <div style = {style.hiza}>
     <MuiThemeProvider>
       <DividerExampleForm/>
     </MuiThemeProvider>
     </div>
     <div>
       <MuiThemeProvider>
         <RaisedButtonExampleSimple/>
       </MuiThemeProvider>
       </div>

     </div>

   </div>


    </div>

);

App.displayName = 'App';

export default App;
