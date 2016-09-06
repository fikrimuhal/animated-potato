/**
 * Created by MYigit on 5.8.2016.
 */
import  React from 'react'
import {Link, browserHistory} from 'react-router'
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import PowerOffIcon from 'material-ui/svg-icons/action/exit-to-app';
import * as db from '../utils/data'
import * as util from '../utils/utils'
//Styles
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
export default  class  AdminAppBar extends  React.Component{
    constructor(props){
        super(props);
        util.bindFunctions.call(this, ['singOut'])
    }
    singOut = function () {
        db.clearUserAuthenticationInfo();
        browserHistory.push("/signin");
    }
    shouldComponentUpdate= (nextProps,nextState)=>{
            return false;
    }
    render = ()=>{
    return(
        <header>
            <AppBar title="Fikrimuhal Fast Interview - Dashboard"
                    showMenuIconButton={false}
                    iconElementRight={

                        <IconMenu
                            iconButtonElement={
                                <IconButton><AccountIcon /></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                            <label style={styles.userLabel}>{this.props.userInfo.name} {this.props.userInfo.lastname}</label>
                            <Divider />
                            <MenuItem primaryText="Sign out" leftIcon={<PowerOffIcon />} onTouchTap={this.singOut} />
                        </IconMenu>

                    }
            />
        </header>
    )
    }
}
AdminAppBar.propTypes={
    toogleMenu:React.PropTypes.func,
    userInfo: React.PropTypes.object
}