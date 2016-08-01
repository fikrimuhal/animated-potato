import React from 'react'
import Immutable from 'Immutable'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const Deneme = React.createClass({
  radioChange: function (value) {
    console.log(value,this.state.value);
    this.setState({
      value:2
    })
  },
  getInitialState: function() {
    return {
    value  : 2
    };
  },
  render () {

    return (
     <div>
       <RadioButtonGroup name={"deneme"} valueSelected={this.state.value} onChange={(event,value)=> this.radioChange(value)} disabled>


               <RadioButton
                 key = {1}
                 value = {1}
                 label= "opt 1"
                />
                <RadioButton
                  key = {2}
                  value = {2}
                  label= "{opt 2}"
                 />

         </RadioButtonGroup>
         <input type="text" value={"deneme"} ></input>
     </div>
    )
  }
})

export default Deneme
