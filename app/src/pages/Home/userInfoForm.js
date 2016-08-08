/**
 * Created by MYigit on 8.8.2016.
 */
import React from  'react'

const styles={
    formContainer:{
        display:'flex',
        width:'800px',
        justifyContent: "flexStart",
        flexFlow:"row wrap"
    }
}
export default  class  UserInfoForm extends  React.Component{
    constructor(props){
    super(props)
    }
    render = ()=>{
    return(
    <div style={styles.formContainer}>

    </div>
    )
    }
}