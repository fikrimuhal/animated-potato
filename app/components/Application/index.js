import React from "react";
import Header from "../Header";
import Example from "./Example";
import ReactDOM from 'react-dom';



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


function App(props) {
   return (<div>
   <h1>Application</h1>

   {props.children}

    </div>

)};

App.displayName = 'App';

export default App;
