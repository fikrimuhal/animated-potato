//core imports
import React        from 'react'
import FlatButton   from 'material-ui/FlatButton'
import FontIcon     from 'material-ui/FontIcon';
import Paper        from 'material-ui/Paper'
import {Link}       from 'react-router'
import Subheader    from 'material-ui/Subheader';

//My Components
import SignUpForm   from './SignUpForm'

//Styles
const styles = {
  paperStyle: {
    width:"800px",
    minHeight:300,
    height:"auto !important",
    margin:"0 auto",
    marginTop:"10px",
    padding:"10px"
  },
  rightFloated:{
    float:"right",
    marginRight:"5px"
  }
}

export default class UserSignUp extends React.Component{
   constructor(props){
     super(props);
   }
   render=function () {
     return(
       <div>
         <Paper style={styles.paperStyle}>
           <Subheader>Fikrimuhal - User Sign Up</Subheader>
           <SignUpForm />
         </Paper>
       </div>
     )
   }
}
