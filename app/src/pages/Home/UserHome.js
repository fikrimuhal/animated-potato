import React        from 'react'
import FlatButton   from 'material-ui/FlatButton'
import FontIcon     from 'material-ui/FontIcon';
import Paper        from 'material-ui/Paper'
import {Link,browserHistory}       from 'react-router'
import Subheader    from 'material-ui/Subheader'
import {Tabs, Tab} from 'material-ui/Tabs';
import * as db      from  '../../utils/data'
import * as util    from '../../utils/utils'
//Styles
const styles = {
  paperStyle: {
    width:"80%",
    height:300,
    margin:"0 auto",
    marginTop:"10px",
    padding:"10px"
  },
  rightFloated:{
    float:"right",
    marginRight:"5px"
  }
}

export default class UserHome extends React.Component{
   constructor(props){
     super(props);
     this.state = {
           value: 'profile',
       };
       util.bindFunctions.call(this,['handleChange']);
   }
    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };
   render=function () {
     return(
       <div>
             <Tabs
                 value={this.state.value}
                 onChange={this.handleChange}
             >
                 <Tab label="Profil" value="profile" >
                     <div>
                         <h4 style={styles.headline}>Profil Bilgileri</h4>
                         <p>
                             Tabs are also controllable if you want to programmatically pass them their values.
                             This allows for more functionality in Tabs such as not
                             having any Tab selected or assigning them different values.
                         </p>
                     </div>
                 </Tab>
                 <Tab label="Yeterlilik Formu" value="form">
                     <div>
                         <h4 style={styles.headline}>Yeterlilik Formu</h4>
                         <p>
                             This is another example of a controllable tab. Remember, if you
                             use controllable Tabs, you need to give all of your tabs values or else
                             you wont be able to select them.
                         </p>
                     </div>
                 </Tab>
             </Tabs>

       </div>
     )
   }
}
