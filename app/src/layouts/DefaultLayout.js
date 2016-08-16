import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from  'material-ui/Paper'
import {log2} from '../utils/'
const log = log2("DefaultLayout.js:")

//Styles
const styles = {
  paperStyle: {
    margin: "0 auto",
    border: "1px teal solid",
    borderRadius: "10px",
    minHeight: "300px",
    height: "auto !important",
    width:"500px",
    //width: "300px",
    padding: "15px",
    marginTop: "10px"
  }
};
export default class DefaultLayout extends React.Component {
  constructor(props){
    super(props);
  }
  render= function () {
    return  (
    <MuiThemeProvider>
      <div id="page_container">
         <header>
              <AppBar title="Fikrimuhal Teknoloji - HR" showMenuIconButton={false}/>
          </header>
          {/*<Paper style={styles.paperStyle} zDepth={4}>*/}
            {this.props.children}
          {/*</Paper>*/}
      </div>
    </MuiThemeProvider>
    )
  }
}
