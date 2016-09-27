import React            from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar           from 'material-ui/AppBar';
import Paper            from  'material-ui/Paper'
import Toast            from '../components/MyComponents/Toast'
import {log2}           from '../utils/'
import * as util        from '../utils/utils'
import * as db          from '../utils/data'
import UserAppBar       from './UserAppBar'
const log = log2("DefaultLayout.js:")
var showToast = null;
var context = {};
//Styles
const styles = {
    paperStyle:{
        margin:"0 auto",
        border:"1px teal solid",
        borderRadius:"10px",
        minHeight:"300px",
        height:"auto !important",
        width:"500px",
        //width: "300px",
        padding:"15px",
        marginTop:"10px"
    }
};
export default class DefaultLayout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            toastSettings:{
                open:false,
                message:"",
                duration:0
            }
        };
        showToast = util.myToast("toastSettings",this);
    }

    getChildContext(){
        context.showMessage = this.showMessage;
        return context;
    };

    showMessage = function (message,duration){
        showToast(message,duration);
    };
    getAppBar = function (){
        if(db.isLoggedIn()) {
            return <UserAppBar userInfo={db.getUserInfo()}/>
        }
        else {
            return (<header>
                <AppBar title="Fikrimuhal Teknoloji - Hızlı Mülakat" showMenuIconButton={false} iconElementRight={
                    <img src="http://fikrimuhal.com/wp-content/uploads/2014/11/logo_sag-02-01-300x113.png" height={"55px"}/>
                }/>
            </header>)
        }
    }
    render = function (){
        log("rendered")
        return (
            <MuiThemeProvider>
                <div id="page_container">
                    {this.getAppBar()}
                    {this.props.children}
                    <Toast settings={this.state.toastSettings}/>
                </div>
            </MuiThemeProvider>
        )
    }
}
DefaultLayout.childContextTypes = {
    showMessage:React.PropTypes.func
};