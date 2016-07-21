import React from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import {log2} from '../../utils/'
const log = log2("SoruSetleriDropdown: ")
const styles = {
  container: {
    display:"flex",
    backgroundColor:"#f1f1f1",
    padding:"5px 5px 5px 5px",
    marginTop:"5px",
    flexDirection:"row",
    justifyContent: "space-around",
    flexFlow:"row wrap"
  },
  child:{
    width:"100px",
    margin:"auto"
  }
}

export default class SoruSetleriDropdown extends React.Component {
  constructor(props)
  {
    super(props);
  }
  handleQuestionSetChange= (event,value) => {
    var model = this.props.parent.state.data;
    if (value != null && value!="") {
      model.set = event.target.textContent;
    //   this.props.parent.setState({
    //     data : model
    //  });
    }
  }
  shouldComponentUpdate= function(nextProps, nextState) {
    return false;
  }
  render= ()=> {
    log("soruseti",this.props.setler)
    return (
      <div>
     <label>Dahil Olacağı Setler</label><br/>
      <div style = {styles.container}>

        {
          this.props.setler.map((setName)=>{
            return (
              <div style={styles.child}>
                <Checkbox key={setName} value={setName} label={setName}/>
              </div>

            )

          })
        }
      </div>
      </div>


    )
  }
}
