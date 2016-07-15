import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';


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
              <Slider defaultValue={0.03} />

          </div>
        <div style={styles}>

          <h3>Sorular</h3>
            <div>
                <p><b>3)</b> Kişisel bilgisayarınızda hangi işletim sistemini kullanıyorsunuz?</p>

                <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

                <RadioButton

                   label="Windows"
                   style={styles.radioButton}
                 />
                 <RadioButton
                    value="experience"
                    label="Linux"
                    style={styles.radioButton}
                  />
                  <RadioButton

                     label="Mac Os"
                     style={styles.radioButton}
                   />
                </RadioButtonGroup>
            </div>
            <div>
                <p><b>4)</b> Aşağıdakilerin hangisinde daha iyisiniz?</p>

                <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

                <RadioButton

                   label="Back end"
                   style={styles.radioButton}
                 />
                 <RadioButton
                    value="experience"
                    label="Front end"
                    style={styles.radioButton}
                  />
                  <RadioButton

                     label="Sistem Yönetimi"
                     style={styles.radioButton}
                   />
                </RadioButtonGroup>
            </div>
              <br/><br/><br/>
            <div style={styles.button}>
            <Link to="/questions3"><RaisedButton label="İleri" primary={true}/></Link>

            </div>

        </div>
</div>
      </MuiThemeProvider>
    )}
})
