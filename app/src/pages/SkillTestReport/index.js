//core imports
import React            from 'react';
import FlatButton       from 'material-ui/FlatButton';
import NavigateBefore   from 'material-ui/svg-icons/navigation/arrow-back';
import {browserHistory} from 'react-router'
import Graph            from '../GraphicInfo/index'
import * as mockApi     from '../../utils/mock_api'
import CircularProgress from 'material-ui/CircularProgress';
import log2             from '../../utils/log2'
import * as Cache       from '../../utils/cache'
import * as util        from '../../utils/utils'
//consts and variables
const log=log2("SkillTestReportContainer");

export default  class SkillTestReportContainer extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this,['initializeFromAPI','initializeFromCache']);
        this.state={
            dataWaiting: true
        };
        var userId = this.props.params.userId;
        if(Cache.checkTestResultReportCache(userId))
            this.initializeFromCache(userId)
        else
            this.initializeFromAPI(userId)

        //log(this.props);

    }
    initializeFromAPI = function (userId) {
        log("Data from SERVER");
        mockApi.getUserSkillTestReport(userId).then(response=> {
            var data=JSON.parse(response);
            log("data",data);
            this.setState({
                dataWaiting: false,
                data: data
            });
        })
    };
    initializeFromCache = function (userId) {
        log("Data from CACHE");
        var data = Cache.getTestResultReportFromCache(userId);
        data.isValidUser=true;
        this.state = {
            dataWaiting: false,
            data: data
        }
    };
    goToList=function () {
        browserHistory.push("/dashboard/listofparticipants");
    };
    createWaitingContent=()=> {
        return (<div>
            Kullanıcın test sonuçları hazırlanıyor,lütfen bekleyiniz.. <br/>
            <CircularProgress size={1}/>
        </div>);
    };
    createUserInfoContent=()=> {
        var user=this.state.data.userInfo;
        var report=this.state.data.reportHtml;

        if(this.state.data.isValidUser){
            return (<div>
                {user.name}  {user.lastname} - kullanıcısının test sonuçları
                <div dangerouslySetInnerHTML={{__html: report}}>

                </div>
            </div>);
        }
        else{
          return  <div>Bu kullanıcı bulunamadı veya bu kullanıcıya ait test sonuç bilgisi yoktur..</div>
        }

    };
    getContent=function () {
        var content;
        if(this.state.dataWaiting)
            return this.createWaitingContent();
        else
            return this.createUserInfoContent()

    };
    render=()=> {
        log("rendered");
        return (
            <div>
                <FlatButton label={"Back to list"} icon={<NavigateBefore/>} onClick={this.goToList}></FlatButton>
                <hr/>

                Participant Skill Test Report<br/>
                {this.getContent()}

            </div>
        )
    }
}

