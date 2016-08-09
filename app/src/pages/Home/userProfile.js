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
    return(
    <div>
        {
            (()=>{
                var content;
                if(this.state.activeForm){
                    content = <div style={styles.divCorner}>
                        <h4>{this.props.user.name} {this.props.user.lastname} - Profil Bilgileri</h4>
                        Fotoğraf:
                        <div style={{width: '50px' ,height: '50px', backgroundColor: 'pink'}}>{this.props.user.photo}</div>
                        Ad Soyad:
                        <div style={styles.container}><FontIcon style={styles.fontIconStyle} color={pink500} className="material-icons md-dark md-inactive" >person</FontIcon>
                            {this.props.user.name} {this.props.user.lastname}
                        </div>
                        Email:
                        <div style={styles.container}>
                            <FontIcon style={styles.fontIconStyle} color={pink500} className="material-icons md-dark md-inactive" >mail</FontIcon>
                            {this.props.user.email}
                        </div>
                        Website:
                        <div style={styles.container}>
                            <FontIcon style={styles.fontIconStyle} color={pink500} className="material-icons md-dark md-inactive" >home</FontIcon>
                            {this.props.user.website}
                        </div>
                        Notlarınız:
                        <div style={styles.container}>
                            <FontIcon style={styles.fontIconStyle} color={pink500} className="material-icons md-dark md-inactive" >note</FontIcon>
                            {this.props.user.yournotes}
                        </div>
                        <div style={{width: "350px"}}><FlatButton label="Düzenle" style={{float:"right"}} secondary={true} onClick={this.goToUpdate}/></div>
                    </div>
                }
                else{
                    content = <div>
                        <h4>{this.props.user.name} {this.props.user.lastname} - Profil Bilgileri</h4>
                        Fotoğraf:
                        <div style={{width: '50px' ,height: '50px', backgroundColor: 'pink'}}>{this.props.user.photo}</div>
                        <div style={{marginBottom: 10}}>
                            Ad: <input style={{marginLeft: 74}} value={this.props.user.name} onChange={this.nameChanced}/>
                            Soyad: <input value={this.props.user.lastname}/>
                        </div>
                        <div style={{marginBottom: 10}}>
                            Email: <input style={{marginLeft: 58}}  value={this.props.user.email}/>
                            WebSite: <input value={this.props.user.website}/>
                        </div>
                        <div>
                            Your Notes:
                            <textarea style={{marginLeft: 25, width: 200}} value={this.props.user.yournotes}/>
                        </div>
                        <div style={{width: "350px"}}>
                            <FlatButton label="Kaydet" style={{float:"right"}} secondary={true} onClick={this.goToUpdate}/>
                            <FlatButton label="İptal" style={{float:"right"}} primary={true} onClick={this.goToUpdate}/>
                        </div>
                    </div>
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