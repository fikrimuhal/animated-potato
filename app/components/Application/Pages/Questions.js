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
              <Slider defaultValue={0.5} />

          </div>
        <div style={styles}>

          <h3>Sorular</h3>
            <div>
                <p><b>1)</b> İş tecrübeniz var mı?</p>

                <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

                <RadioButton
                  value="experience"
                   label="Evet"
                   style={styles.radioButton}
                 />
                 <RadioButton

                    label="Hayır"
                    style={styles.radioButton}
                  />
                </RadioButtonGroup>
            </div>
            <div>
                <p><b>2)</b> Scala biliyor musunuz?</p>

                <RadioButtonGroup name="shipSpeed" defaultSelected="experience">

                <RadioButton
                  value="experience"
                   label="Evet"
                   style={styles.radioButton}
                 />
                 <RadioButton

                    label="Hayır"
                    style={styles.radioButton}
                  />
                </RadioButtonGroup>
            </div>
              <br/><br/><br/>
            <div style={styles.button}>
              <RaisedButton label="İleri" primary={true}/>
            </div>

        </div>
</div>
      </MuiThemeProvider>
    )}
})
