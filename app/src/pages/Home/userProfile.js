import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {pink500} from 'material-ui/styles/colors';
import {log2,db,util} from '../../utils';
import userProfileUpdate from './userProfileUpdate';
import userInfoForm from './userInfoForm';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


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
        marginRight: "5px",
    },
    divCorner: {
        marginTop: '10px',

        padding: '20px',
        width: '430px',
        height: '400px',
    },
    form:{
        marginLeft: 20
    },
    paperStyle:{
       width: '100%',
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
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

            this.setState({
                activeForm:false
            })
    }
    render = ()=>{
        console.log(this.state.activeForm)
    return(
    <div>
         <div style={styles.divCorner}>
                <Paper style={styles.paperStyle} zDepth={1} >
            <h4>{this.props.user.name} {this.props.user.lastname} - Profil Bilgileri</h4>
                    <FontIcon style={styles.fontIconStyle} color={pink500} className="material-icons md-dark md-inactive" >person</FontIcon>
                    Adı: <TextField
                    disabled={this.state.activeForm}
                        hintText={this.props.user.name}
                    defaultValue={this.props.user.name}
                    /><br />
                    <FontIcon style={styles.fontIconStyle} color={pink500} className="material-icons md-dark md-inactive" >person</FontIcon>
                    Soyadı: <TextField
                        disabled={this.state.activeForm}
                        hintText={this.props.user.lastname}
                        defaultValue={this.props.user.lastname}
                    /><br />
                    <FontIcon style={styles.fontIconStyle} color={pink500} className="material-icons md-dark md-inactive" >mail</FontIcon>
                    Email:<TextField
                    disabled={this.state.activeForm}
                        hintText={this.props.user.email}
                    defaultValue={this.props.user.email}
                    /><br />
                    <FontIcon style={styles.fontIconStyle} color={pink500} className="material-icons md-dark md-inactive" >home</FontIcon>
                    WebSite: <TextField
                    disabled={this.state.activeForm}
                        hintText={this.props.user.website}
                        defaultValue={this.props.user.website}
                    /><br />
                    <FontIcon style={styles.fontIconStyle} color={pink500} className="material-icons md-dark md-inactive" >note</FontIcon>
                    Your Notes: <TextField
                    disabled={this.state.activeForm}
                    hintText={this.props.user.yournotes}
                    defaultValue={this.props.user.yournotes}
                />
                    <FlatButton label="İptal" style={{float:"right"}} secondary={true} disabled={this.state.activeForm}/>
                    <FlatButton label="Düzenle" style={{float:"right"}} secondary={true} onClick={this.goToUpdate}/>
             </Paper>
         </div>
    </div>
    )
    }
}
UserProfile.propTypes ={
    user: React.PropTypes.object.isRequired
}