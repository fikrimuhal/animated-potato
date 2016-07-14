import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


const styles = {
  button:{
    marginRight: 12,
  },
  position: 'absolute',
  display: 'inline-block',
  alignItems: 'center',
  marginLeft: 250

  };
export default React.createClass({
  render() {
    return (<MuiThemeProvider>
        <div>
          <div>
              <Slider defaultValue={0.10} />

          </div>
        <div style={styles}>

          <h3>Sorular</h3>
            <div>
                <p><b>5)</b> Aşağıdaki programlama dillerinden hangisi/hangilerinde bilgi sahibisiniz?</p>

                <div style={styles.block}>
                    <Checkbox
                      label="Python"
                      defaultChecked={true}
                      style={styles.checkbox}
                    />
                      <Checkbox
                        label="JavaScript"
                        style={styles.checkbox}
                      />
                      <Checkbox
                        label="C"
                        style={styles.checkbox}
                      />
                      <Checkbox
                        label="C++"
                        style={styles.checkbox}
                      />

                  </div>
            </div>
            <div>
                <p><b>6)</b> Aşağıdaki etkinliklerden hangilerine katıldınız?</p>

                <div style={styles.block}>
                    <Checkbox
                      label="Veri Bilimi İstanbul"
                      defaultChecked={true}
                      style={styles.checkbox}
                    />
                      <Checkbox
                        label="Linux Yaz Kampı"
                        style={styles.checkbox}
                      />
                      <Checkbox
                        label="Akademik Bilişim"
                        style={styles.checkbox}
                      />
                      <Checkbox
                        label="Programlama Günleri"
                        style={styles.checkbox}
                      />

                  </div>
            </div>
              <br/><br/><br/>
            <div style={styles.button}>
            <Link to="/interview/testover"><RaisedButton label="İleri" primary={true}/></Link>
            </div>

        </div>
</div>
      </MuiThemeProvider>
    )}
})
