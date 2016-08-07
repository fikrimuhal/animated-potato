import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link,browserHistory } from 'react-router'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {log2} from '../utils/'
import * as util from '../utils/utils'
import * as db from '../utils/data'

var image = require("../assets/images/bg1.jpg")
const log = log2("MainLayout.js:")
//Styles
const styles = {
    paperStyle: {
        margin: "0 auto",
        border: "1px teal solid",
        borderRadius: "10px",
        minHeight: "400px",
        height: "auto !important",
        width: "75%",
        padding: "15px",
        marginTop: "10px"
    },
    main: {
        backgroundImage: "url(" + image + ")",
        height:"100%"
    }
}
export default class UserLayout extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open:false
    };
  }
  componentWillMount = function() {
    if (!db.isUser())
        browserHistory.push("/signin");

  };
  render= function () {
    return  (

    <MuiThemeProvider>
      <div id="page_container" style={styles.main}>
         <header>
              <AppBar title="Fikrimuhal Teknoloji - HR"/>
          </header>

          <Paper style={styles.paperStyle}>
             {this.props.children}
          </Paper>
      </div>
    </MuiThemeProvider>
    )
  }
}
