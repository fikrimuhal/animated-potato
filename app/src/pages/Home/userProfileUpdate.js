import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {pink500} from 'material-ui/styles/colors';
import {log2,db,util} from '../../utils'

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
    }

}
export default  class  UserProfile extends  React.Component{
    constructor(props){
        super(props)
        util.bindFunctions.call(this,['goToUpdate']);

    }
    goToUpdate = function(){

    }
    render = ()=>{
        return(
            <div style={styles.font}>
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
                <div style={{width: "350px"}}><FlatButton label="Düzenle" style={{float:"right"}} secondary={true} onTouch={this.goToUpdate}/></div>

            </div>
        )
    }

}

UserProfile.propTypes ={
    user: React.PropTypes.object.isRequired
}