import React from 'react'
import AdminMenu from './AdminMenu'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Link, browserHistory} from 'react-router'
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import {log2} from '../utils/'
import * as util from '../utils/utils'
import * as db from '../utils/data'
import AdminAppBar from './AdminAppBar'
var  userInfo = null;
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
        backgroundImage: "url(" + image + ")",
        height:"100%"
    }
}
export default class AdminLayout extends React.Component {
    constructor(props) {
        super(props);
        userInfo = db.getUserInfo();
        this.state = {
            open: false
        };
        util.bindFunctions.call(this, ['toogleMenu']);
    };

    componentWillMount = function () {
        if (!db.isAdmin())
            browserHistory.push("/signin");
    };
    toogleMenu = function (event) {
        this.setState({
            open: !this.state.open
        })
    };

    menuClick = ()=>{
        this.setState({
            open: false
        })
    }
    render = function () {
        log("userInfo",userInfo)
        return (
            <MuiThemeProvider>
                <div id="page_container" style={styles.main}>
                    <AdminAppBar toogleMenu={this.toogleMenu}  userInfo={userInfo}/>
                    <Drawer width={200} openPrimary={true} open={this.state.open} docked={false}
                            onRequestChange={(open) => this.setState({open})}>
                        <AdminMenu menuClick={this.menuClick}/>
                    </Drawer>
                    <Paper style={styles.paperStyle} zDepth={5} rounded={false}>
                        {this.props.children}
                    </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}
