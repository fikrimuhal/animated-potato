import React        from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import UserProfile from './userProfile'
import FormIntro    from './formIntro'
import * as db      from  '../../utils/data'
import * as util    from '../../utils/utils'
import * as s  from '../../layouts/style'
import Paper from 'material-ui/Paper'
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
    }
    onSave = function(newValues, oldValues){

    }
   render=function () {
     return(

           <Paper style={s.userLayoutStyles.paperStyle}>
             <Tabs
                 value={this.state.value}
                 onChange={this.handleChange}
             >
                 <Tab label="Profil" value="profile" >
                    <UserProfile user={this.state.user} onSave={this.onSave}/>
                     <userInfoForm user={this.state.user}/>
                 </Tab>
                 <Tab label="Yeterlilik Formu" value="form">
                    <FormIntro/>
                 </Tab>
             </Tabs>
           </Paper>

     )
   }
}
