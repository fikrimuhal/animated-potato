import React                    from 'react'
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';
import {Link, browserHistory}   from 'react-router'
import Paper                    from 'material-ui/Paper';
import * as util                from '../utils/utils'
import * as db                  from '../utils/data'
import log2                     from '../utils/log2'
import  UserAppBar              from './UserAppBar'
import Toast                    from '../components/MyComponents/Toast'

var image = require("../assets/images/bg1.jpg")
const log = log2("UserLayout.js:")
var showToast = null;
var context = {};
//Styles
const styles = {
    paperStyle: {
        margin: "0 auto",
        border: "1px teal solid",
        borderRadius: "10px",
        minHeight: "400px",
        height: "auto !important",
        width: "75%",
        padding: "15px",
        marginTop: "10px"
    },
    main: {
        backgroundImage: "url(" + image + ")",
        height: "100%"
    }
}
var user = null;
export default class UserLayout extends React.Component {
    constructor(props) {
        super(props);

        if (!db.isLoggedIn()) {
            browserHistory.push("/signin");
            return false;
        }
        else {
            if (db.isAdmin()) {
                browserHistory.push("/dashboard");

            }
        }
        this.state = {
            toastSettings: {
                open: false,
                message: "",
                duration: 0
            }
        };
        user = db.getUserInfo();
        showToast = util.myToast("toastSettings", this);
    }

    getChildContext() {
        context.showMessage = (message, duration)=> {
            showToast(message, duration)
        }
        return context;
    };

    render = function () {
        return (

            <MuiThemeProvider>
                <div id="page_container" style={styles.main}>
                    <UserAppBar userInfo={user}/>
                    {this.props.children}
                    <Toast settings={this.state.toastSettings}/>
                </div>

            </MuiThemeProvider>
        )
    }
}
UserLayout.childContextTypes = {
    showMessage: React.PropTypes.func
};