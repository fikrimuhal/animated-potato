import React        from 'react'
import FlatButton   from 'material-ui/FlatButton'
import FontIcon     from 'material-ui/FontIcon';
import Paper        from 'material-ui/Paper'
import {Link,browserHistory}       from 'react-router'
import Subheader    from 'material-ui/Subheader'
import {Tabs, Tab} from 'material-ui/Tabs';
import UserProfile from './userProfile'
import FormIntro    from './formIntro'
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
const user = db.getUserInfo();
export default class UserHome extends React.Component{
   constructor(props){
     super(props);
     this.state = {
           value: 'profile',
           user:user
       };
       util.bindFunctions.call(this,['handleChange']);
   }
    handleChange = (value) => {
        this.setState({
            value: value,
            user: user
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
                    <UserProfile user={this.state.user}/>
                 </Tab>
                 <Tab label="Yeterlilik Formu" value="form">
                    <FormIntro/>
                 </Tab>
             </Tabs>

       </div>
     )
   }
}
