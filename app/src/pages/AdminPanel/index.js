import React from 'react'
import {log2} from '../../utils'
import AdminMenu from '../../layouts/AdminMenu'
const log = log2("AdminPanel.js:")
const styles = {
  menu:{
    height: 400,
    width: 200,
  },
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
export default React.createClass({
  render() {
    log("adminPanel")
    return (
        <div style={styles.container}>
            <AdminMenu/>
            <div style={styles.contente}>{this.props.children}</div>
        </div>
    )}
})
