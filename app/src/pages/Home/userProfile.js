import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {pink500} from 'material-ui/styles/colors';
import {log2,db,util} from '../../utils';
import userProfileUpdate from './userProfileUpdate';
import userInfoForm from './userInfoForm';


const styles ={
    font:{
        fontFamily: 'PT Sans Caption',
    },
    container:{
        display:"flex",
        backgroundColor:"#f1f1f1",
        marginTop:"5px",

        fontFamily: 'Hammersmith One',
        width: "350px"
    },
    fontIconStyle:{
        backgroundColor:"#D2CCCC",
        height: "23px",
        width: "23px",
        marginRight: "5px"
    },
    divCorner: {
        marginTop: '10px',

        padding: '20px',
        width: '430px',
        height: '400px',
    },
    form:{
        marginLeft: 20
    }
}
export default  class  UserProfile extends  React.Component{
    constructor(props){
    super(props)

        this.state = {
            activeForm: true
        }
        util.bindFunctions.call(this,['goToUpdate','nameChanced']);

    }
    nameChanced = function(event, value){
        console.log(value)
        var oldUser = this.props.user
    }
    goToUpdate = function(){
        if(this.state.activeForm){
            this.setState({
                activeForm:false
            })}
            else{
            this.setState({
                activeForm:true
            })
        }
    }
    render = ()=>{
        console.log(this.state.activeForm)
        var content;
    return(
    <div>
        {
            (()=>{
                var content;
                if(this.state.activeForm){
                    content = <userInfoForm user={this.props.user}/>
                }
                else{
                    content = <userProfileUpdate user={this.props.user} />
                }
                return content;
            })()
        }
    </div>
    )
    }

}

UserProfile.propTypes ={
    user: React.PropTypes.object.isRequired
}