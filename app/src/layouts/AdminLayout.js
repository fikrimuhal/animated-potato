import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link, browserHistory} from 'react-router'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import PowerOffIcon from 'material-ui/svg-icons/action/exit-to-app'
import {log2} from '../utils/'
import * as util from '../utils/utils'
import * as db from '../utils/data'
const log = log2("MainLayout.js:")
var image = require("../assets/images/bg1.jpg")
//Styles
const styles = {
    paperStyle: {
        margin: "0 auto",
        border: "1px teal solid",
        borderRadius: "10px",
        minHeight: "300px",
        height: "auto !important",
        width: "75%",
        padding: "15px",
        marginTop: "10px"
    },
    main: {
        backgroundImage: "url(" + image + ")"
    },
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
export default class AdminLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        util.bindFunctions.call(this, ['toogleMenu','singOut'])
    };

    componentWillMount = function () {
        log("isuser:" , db.isUser())
        log("isAdmin:" , db.isAdmin())
        if (!db.isAdmin())
            browserHistory.push("/signin");
    };
    toogleMenu = function (event) {
        console.log("tıklandı");
        this.setState({
            open: !this.state.open
        })
    };
    singOut = function () {
        db.clearUserAuthenticationInfo();
        browserHistory.push("/signin");
    }
    render = function () {
        log(image)
        return (

            <MuiThemeProvider>
                <div id="page_container" style={styles.main}>
                    <header>
                        <AppBar title="Fikrimuhal Teknoloji - HR Admin Paneli"
                                onLeftIconButtonTouchTap={this.toogleMenu}
                                iconElementRight={

                                    <IconMenu
                                        iconButtonElement={
                                            <IconButton><AccountIcon /></IconButton>
                                        }
                                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                    >
                                        <label style={styles.userLabel}>Mesut Yiğit</label>
                                        <Divider />
                                        <MenuItem primaryText="Sign out" leftIcon={<PowerOffIcon />} onTouchTap={this.singOut} />
                                    </IconMenu>

                                }
                        />
                    </header>
                    <Drawer width={200} openPrimary={true} open={this.state.open} docked={false}
                            onRequestChange={(open) => this.setState({open})}>
                        <Menu>
                            <Link to='/adminpanel/listofparticipants'>
                                <MenuItem primaryText="Participants"/>
                            </Link>
                            <Link to='/adminpanel/questionlist'>
                                <MenuItem primaryText="Questions"/>
                            </Link>
                            <Link to='/adminpanel/questionsetdetails'>
                                <MenuItem primaryText="Soru Set Bilgileri"/>
                            </Link>
                            <Link to='/adminpanel/usersprofile'>
                                <MenuItem primaryText="All User"/>
                            </Link>
                            <Link to='/adminpanel/adminprofile'>
                                <MenuItem primaryText="Admin Info"/>
                            </Link>
                        </Menu>
                    </Drawer>
                    <Paper style={styles.paperStyle} zDepth={5} rounded={false}>
                        {this.props.children}
                    </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}
