import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from 'react-router'

const styles = {
  contente:{
    width: '100%',
    marginLeft: 50
  },
  container:{
      display: 'flex',
      height: '100%',
  },
  display: 'inline-block',

};
export default class  AdminLayout extends React.Component{
  constructor(props){
    super(props);
  }
  render = function () {
    return(
      <div style={styles.container}>
        <div style={styles.menu}>
        </div>
        <div style={styles.contente}>{this.props.children}</div>
      </div>      
    )
  }
}
