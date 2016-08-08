//core imports
import React        from 'react'
import FlatButton   from 'material-ui/FlatButton'
import FontIcon     from 'material-ui/FontIcon';
import Paper        from 'material-ui/Paper'
import {Link}       from 'react-router'
import Subheader    from 'material-ui/Subheader';

//My Components
import SignUpForm   from './SignUpForm'



export default class UserSignUp extends React.Component{
   constructor(props){
     super(props);
   }
   render=function () {
     return(
       <div style={{width:"400px"}}>
           <Subheader>Fikrimuhal HR - Sign Up</Subheader>
           <SignUpForm />
       </div>
     )
   }
}