/**
 * Created by MYigit on 8.8.2016.
 */
import React                  from 'react'
import AdminMenu              from './AdminMenu'
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider';
import {Link, browserHistory} from 'react-router'
import Paper                  from 'material-ui/Paper';
import Drawer                 from 'material-ui/Drawer';
import log2                   from '../utils/log2'
import * as util              from '../utils/utils'
import * as db                from '../utils/data'
import AdminAppBar            from './AdminAppBar'
import Mousetrap              from 'mousetrap'
var  userInfo = null;
const log = log2("AdminLayout.js:")
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
};

var loggedIn=false;
export default class AdminLayout extends React.Component {
    constructor(props) {
        super(props);
        userInfo = db.getUserInfo();
        this.state = {
            open: false
        };
        util.bindFunctions.call(this, ['toogleMenu']);

    };
    v=(e,combo)=>{
        log(combo);
        console.log("deneme")

        switch (combo) {
            case "shift+m+1":
                browserHistory.push("/adminpanel/listofparticipants");
                break;
            case  "shift+m+2":
                browserHistory.push("/adminpanel/questionlist");
                break;
        }

    }
    generalHotkeys=(e,combo)=>{

       if(combo=="shift+e"){
           db.clearUserAuthenticationInfo();
           browserHistory.push("/signin");
       }
       else if(combo=="shift+m"){
           this.toogleMenu();
       }

    }
    componentWillMount = function () {

        if (db.isAdmin()) loggedIn=true;

    };
    componentDidMount=()=> {
        Mousetrap.bind([`shift+m+1`, `shift+m+2`], this.menuHotkey);
        Mousetrap.bind([`shift+e`, `shift+m`], this.generalHotkeys);
    };
    componentWillUnmount=()=> {
        Mousetrap.unbind([`shift+e`, `shift+m`], this.generalHotkeys);
        Mousetrap.unbind([`shift+m+1`, `shift+m+2`], this.menuHotkey);

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
        log("userInfo",userInfo);
        if(!loggedIn)
        {
            browserHistory.push("/signin");
            return <div></div>
        };
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
