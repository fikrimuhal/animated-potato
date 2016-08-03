import React        from 'react'
import FlatButton   from 'material-ui/FlatButton'
import FontIcon     from 'material-ui/FontIcon';
import Paper        from 'material-ui/Paper'
import {Link}       from 'react-router'
//Styles
const styles = {
  paperStyle: {
    width:"800px",
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

export default class Home extends React.Component{
   constructor(props){
     super(props);
   }
   render=function () {
     return(
       <div>
         <Paper style={styles.paperStyle}>
           <h4>Fikrimuhal mülakatlarına katılabilmek için sisteme üye olmanız gerekmektedir.<br/> Zaten üye iseniz giriş yapınız.
           </h4>
           <Link to='/signin'>
             <FlatButton label="Sign In" secondary={true}
               backgroundColor="lightgrey"
               style={styles.rightFloated}/>
           </Link>
           <Link to='/signup'>
             <FlatButton label="Sign Up" secondary={true}
               backgroundColor="lightgrey"
               style={styles.rightFloated}/>
           </Link>

         </Paper>
       </div>
     )
   }
}
