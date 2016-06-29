import React from "react";
import Header from "../Header";
import Deneme2 from "./Deneme2";
import HelloMessage from "./example";


console.log(Deneme2)
/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
 var styles = {
   kirmizi: {
     backgroundColor: "red"
   }
 }
var degisken = "ebru"


const Application = () => {
    return <div style= {styles.kirmizi}>

dsgfsd----
    <HelloMessage/>
    sdsf
    </div>
};

Application.displayName = 'Application';

export default Application;
