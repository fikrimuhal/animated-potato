import React from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button:{
  marginRight: 12,
  },
  marginLeft: 20,
  block: {
  maxWidth: 250,
   },
  radioButton: {
  marginBottom: 16,
   },
};
export default React.createClass({
  render() {
    return (
      <div style={styles}>
        <h3>Bilgileriniz kaydedilmiştir.</h3>
        <p>
          <b>Not: </b>
          Başvurunuzun kabul edilmesi için yeterlilik formunu doldurmanız gerekmektedir.
        </p>

        <p>Forma ulaşmak için lütfen tıklayınız.</p>
        <div style={styles.button}>
          <Link to="/questions"><RaisedButton label="Yeterlilik Formu" primary={true}/></Link>
        </div>

      </div>
    )}
})
