import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';




const styles = {
  button:{
    marginRight: 12,
  },
  textAlign: 'center',
  radioButton: {
    marginBottom: 16,
  },
};
export default React.createClass({
  render() {
    return (<MuiThemeProvider>

        <div style={styles}>
          <h3>Yeterlilik Formu</h3>
          <p><b>Açıklama: </b> Şirket prensipleri gereği bu formu doldurmanız
          gerekmektedir.<br/> Forma bilgileriniz kaydedilecek ve bizimle çalışmak
          için uygun olup <br/> olmadığınız saptanacaktır.</p>
          <div style={styles.button}>
            <Link to="/questions"><RaisedButton label="Teste Başla" primary={true}/></Link>
          </div>
        </div>

      </MuiThemeProvider>
    )}
})
