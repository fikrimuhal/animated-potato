//core imports
import React        from 'react'
import FlatButton   from 'material-ui/FlatButton'
import FontIcon     from 'material-ui/FontIcon';
import Paper        from 'material-ui/Paper'
import {Link}       from 'react-router'
import Subheader    from 'material-ui/Subheader';




export default class UserSignUp extends React.Component{
   constructor(props){
     super(props);
   }
   render=function () {
     return(
       <div>
           <Subheader>Fikrimuhal HR - Sign Up</Subheader>
           <SignUpForm />
       </div>
     )
   }
}
