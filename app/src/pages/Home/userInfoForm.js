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
        <div style={styles.divCorner}>
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
    </div>
    )
    }
}