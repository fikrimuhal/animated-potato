/**
 * Created by MYigit on 8.8.2016.
 */
import React from 'react'
export default  class  UserProfile extends  React.Component{
    constructor(props){
    super(props)
    }
    render = ()=>{
    return(
    <div>
        <h4>{this.props.user.name} {this.props.user.lastname} - Profil Bilgileri</h4>
        <p>
           ........
        </p>

    </div>
    )
    }

}

UserProfile.propTypes ={
    user: React.PropTypes.object.isRequired
}