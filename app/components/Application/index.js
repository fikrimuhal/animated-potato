import React from "react";
import Header from "../Header";
import Deneme2 from "./Deneme2";
import Example from "./Example";

/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
 var styles = {
   kirmizi: {
     backgroundColor: "#FAEBD7"
   }
 }
var degisken = "ebru"


const Application = () => {
    return <div style= {styles.kirmizi}>

    <Example/>
    <Deneme2/>

    </div>
};

Application.displayName = 'Application';

export default Application;
