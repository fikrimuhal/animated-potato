import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from  'material-ui/Paper'
import {log2} from '../utils/'
const log = log2("DefaultLayout.js:")
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
          <Paper>
            {this.props.children}
          </Paper>
      </div>
    </MuiThemeProvider>
    )
  }
}
