/**
 * Created by MYigit on 8.8.2016.
 */
import React            from 'react';
import AppBar           from 'material-ui/AppBar';
import MenuItem         from 'material-ui/MenuItem';
import IconButton       from 'material-ui/IconButton';
import IconMenu         from 'material-ui/IconMenu';
import Divider          from 'material-ui/Divider';
import AccountIcon      from 'material-ui/svg-icons/action/account-circle';
import PowerOffIcon     from 'material-ui/svg-icons/action/exit-to-app';
import HomeIcon         from 'material-ui/svg-icons/action/home'
import * as db          from "../utils/data";
import {browserHistory} from 'react-router'
import log2             from '../utils/log2'
const log = log2("UserLayout.js:")
const styles = {
    userLabel:{
        color:"rgba(0, 0, 0, 0.870588)",
        fontSize:"14px",
        fontFamily:"Roboto, sans-serif",
        margin:"0 auto",
        fontWeight:"600",
        textAlign:"center",
        width:"100%"

    }
}
export default  class  UserAppBar extends  React.Component{
    constructor(props){
    super(props)
    }
    singOut = function () {
        db.clearUserAuthenticationInfo();
        browserHistory.push("/signin");
    };
    goToHome = function () {
        browserHistory.push("/home");
    };
    render = ()=>{
    return(

        <header>
            <AppBar title="Fikrimuhal Teknoloji - HR" showMenuIconButton={false}                     iconElementRight={

                <IconMenu
                    iconButtonElement={
                        <IconButton><AccountIcon /></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                    <label style={styles.userLabel}>{this.props.userInfo.name} {this.props.userInfo.lastname}</label>
                    <Divider />
                    <MenuItem primaryText="Anasayfa" leftIcon={<HomeIcon />} onTouchTap={this.goToHome} />
                    <MenuItem primaryText="Çıkış yap" leftIcon={<PowerOffIcon />} onTouchTap={this.singOut} />
                </IconMenu>

            }/>
        </header>

    )
    }
}
UserAppBar.propTypes ={
    userInfo:React.PropTypes.object.isRequired
}