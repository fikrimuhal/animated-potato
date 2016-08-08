import React from 'react'
import FlatButton from 'material-ui/FlatButton';
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
export default  class  UserProfileUpdate extends  React.Component{
    constructor(props){
        super(props)
    }
    render = ()=>{
        console.log("Bu user profile")
        return(
            <div>
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
        )
    }

}