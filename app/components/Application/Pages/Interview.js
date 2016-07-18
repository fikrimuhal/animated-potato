import React from 'react'
import AppBar from 'material-ui/AppBar';

const styles = {
  menu:{
    height: 400,
    width: 250,
  },
  contente:{
    width: '100%',
    marginLeft: 50
  },
  container:{
      display: 'flex',
      height: '100%',
  }
};
export default React.createClass({
  render() {
    return (
        <div style={styles.container}>

            <div style={styles.menu}>

            </div>

            <div style={styles.contente}>
              {this.props.children}
            </div>
            
        </div>
    )}
})
