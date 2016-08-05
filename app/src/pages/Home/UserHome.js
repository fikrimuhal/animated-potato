import React        from 'react'
import FlatButton   from 'material-ui/FlatButton'
import FontIcon     from 'material-ui/FontIcon';
import Paper        from 'material-ui/Paper'
import {Link,browserHistory}       from 'react-router'
import Subheader    from 'material-ui/Subheader'
import * as db      from  '../../utils/data'
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
   }

   render=function () {
     return(
       <div>
         <Paper style={styles.paperStyle}>
          <Subheader>User HomePage</Subheader>

         </Paper>
       </div>
     )
   }
}
