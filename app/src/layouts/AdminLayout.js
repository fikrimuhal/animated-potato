/**
 * Created by MYigit on 8.8.2016.
 */
import React                  from 'react'
import AdminMenu              from './AdminMenu'
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider';
import {Link,browserHistory}  from 'react-router'
import Paper                  from 'material-ui/Paper';
import Drawer                 from 'material-ui/Drawer';
import log2                   from '../utils/log2'
import * as util              from '../utils/utils'
import * as db                from '../utils/data'
import AdminAppBar            from './AdminAppBar'
import Mousetrap              from 'mousetrap'
import Toast                  from '../components/MyComponents/Toast'
import {Row,Col}              from 'react-flexbox-grid/lib/index';
import * as s                 from './style'
import Immutable              from 'immutable'
var context = {};
var userInfo = null;
const log = log2("AdminLayout.js:")
var showToast = null;
var loggedIn = false;


export default class AdminLayout extends React.Component {
    constructor(props){
        super(props);
        userInfo = db.getUserInfo();
        this.state = {
            open:false,
            toastSettings:{
                open:false,
                message:"",
                duration:0
            }
        };

        util.bindFunctions.call(this,['toogleMenu']);
        showToast = util.myToast("toastSettings",this);
    };
    shouldComponentUpdate = (nextProps,nextState)=>{
        var im_currentProp = Immutable.fromJS(this.props,(k,v)=>{return v.toOrderedMap()});
        var im_nextProp = Immutable.fromJS(nextProps,(k,v)=>{return v.toOrderedMap()});
        var im_currentState = Immutable.fromJS(this.state,(k,v)=>{return v.toOrderedMap()});
        var im_nextState = Immutable.fromJS(nextState,(k,v)=>{return v.toOrderedMap()});

        var propEquality = im_currentProp.equals(im_nextProp);
        var stateEquality = im_currentState.equals(im_nextState);
        //log("shouldComponentUpdate",propEquality,stateEquality,(!propEquality || !stateEquality));
        return (!propEquality || !stateEquality);
    };
    getChildContext(){
        context.showMessage = this.showMessage;
        return context;
    };

    v = (e,combo)=>{
        //log(combo);
        switch(combo) {
            case "shift+m+1":
                browserHistory.push("/adminpanel/listofparticipants");
                break;
            case  "shift+m+2":
                browserHistory.push("/adminpanel/questionlist");
                break;
        }

    };
    generalHotkeys = (e,combo)=>{
        if(combo == "shift+e") {
            db.clearUserAuthenticationInfo();
            browserHistory.push("/signin");
        }
        else if(combo == "shift+m") {
            this.toogleMenu();
        }

    };
    componentWillMount = function (){
        if(db.isAdmin()) loggedIn = true;
    };
    componentDidMount = ()=>{
        Mousetrap.bind([`shift+m+1`,`shift+m+2`],this.menuHotkey);
        Mousetrap.bind([`shift+e`,`shift+m`],this.generalHotkeys);
    };
    componentWillUnmount = ()=>{
        Mousetrap.unbind([`shift+e`,`shift+m`],this.generalHotkeys);
        Mousetrap.unbind([`shift+m+1`,`shift+m+2`],this.menuHotkey);

    };
    toogleMenu = function (event){
        this.setState({
            open:!this.state.open
        })
    };

    menuClick = ()=>{
        this.setState({
            open:false
        })
    };
    showMessage = function (message,duration){
        showToast(message,duration);
    };
    render = function (){
        //log("userInfo",userInfo);
        if(!loggedIn) {
            browserHistory.push("/signin");
            return <div></div>
        }

        return (
            <MuiThemeProvider>
                <div id="page_container" style={s.AdminLayoutStyle.main}>
                    <AdminAppBar toogleMenu={this.toogleMenu} userInfo={userInfo}/>
                    <Row>
                        <Col lg={2} md={3}>
                            <Paper zDepth={1} rounded={false} style={s.AdminLayoutStyle.adminMenuContainer}>
                                <AdminMenu menuClick={this.menuClick}/>
                            </Paper>
                        </Col>
                        <Col lg={10} md={9} >
                            <Paper style={s.AdminLayoutStyle.mainPaper} zDepth={5} rounded={false}>
                                {this.props.children}
                            </Paper>
                        </Col>
                    </Row>

                    <Toast settings={this.state.toastSettings}/>
                </div>

            </MuiThemeProvider>
        )
    }
}
AdminLayout.childContextTypes = {
    showMessage:React.PropTypes.func
};