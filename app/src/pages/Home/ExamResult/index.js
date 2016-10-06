/**
 * Created by MYigit on 26.9.2016.
 */
import React                from 'react'
import * as mockAPI         from '../../../utils/mock_api'
import  {Row, Col}          from 'react-flexbox-grid'
import SelectField          from 'material-ui/SelectField';
import MenuItem             from 'material-ui/MenuItem';
import CircularProgress     from 'material-ui/CircularProgress'
import  moment              from 'moment'
import momentLocale         from '../../../../../node_modules/moment/locale/tr'
import log2                 from '../../../utils/log2'
import * as _               from 'lodash'
import  ResultView          from './resultViewer'
import Avatar               from 'material-ui/Avatar';
import  colors              from '../../../utils/material-colors'
import {UserResultsCaching} from '../../../utils/cache'
import * as api             from '../../../utils/api'
import * as db              from '../../../utils/data'
import * as util            from '../../../utils/utils'
import {browserHistory}                  from 'react-router'
import ResponseMessages     from '../../../utils/static-messages'

var avatarImage = require("!file!../../../assets/images/test-report-avatar.png");
const log = log2("ExamResult");
const styles = {
    mulakatSelectBar: {
        height: "50px",
        backgrounColor: colors.teal.x100,
        border: `1px solid ${colors.teal.x100}`,
        textAlign: "right"
    },
    resultViewContainer: {
        minHeight: "300px",
        backgrounColor: colors.white,
        border: `1px dashed ${colors.blueGrey.x100}`,
        marginTop: "10px"
    },
    avatar: {
        backgroundColor: colors.white
    },
    pageContainer: {
        marginTop: "10px"
    }

}


export default  class ExamResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataLoaded: false,
            selectedInterviewId: -1

        }
        this.init();
    }

    init = ()=> {
        if (UserResultsCaching.check()) {
            this.initFromCache()
        }
        else {
            this.initFromServer()
        }

    };
    initFromCache = ()=> {
        var data = UserResultsCaching.getAll();
        this.state = {
            data: data,
            dataLoaded: true,
            selectedInterviewId: -1
        }
    };
    initFromServer = ()=> {
        var userInfo = db.getUserInfo();
        api.ReportAPI.getUserOnlyResult({
            id: userInfo.id
        }).then(response=> {
            response.json().then(json=> {
                if (json.status == ResponseMessages.SESSION_EXPIRED || json.status == ResponseMessages.UNAUTHORIZED) {
                    util.clearToken();
                    this.context.showMessage(json.message, 2000);
                    setTimeout(()=> {
                        browserHistory.push("/signin")
                    }, 2000);
                    return;
                }
                else if (json.status == ResponseMessages.FORBIDDEN) {
                    browserHistory.push("/")
                }
                else {
                    var normalizedData = this.normalizeData(json);
                    UserResultsCaching.clear();
                    UserResultsCaching.cache(normalizedData);
                    util.setToken(response.headers.get("Authorization"));
                    this.setState({
                        data: normalizedData,
                        dataLoaded: true
                    })
                }
            }).catch(err=> {
                log("error", err);
                this.context.showMessage("Error", 2000);
            })
        }).catch(err=> {
            log("error", err);
            this.context.showMessage("Error", 2000);
        });

        // mockAPI.getUserOnlyResult().then(json => {
        //     this.setState({
        //         data: json,
        //         dataLoaded: true
        //     })
        // })
    };

    normalizeData = (data)=> {
        var result = data.map(interviewResult=> {
            var normalizedScores = _.filter(interviewResult.categoryScores, q=> {
                return q.score !== -1
            }).map(scoreItem=> {
                scoreItem.score = scoreItem.score.toFixed(4) * 100;
                return scoreItem;
            });
            interviewResult.categoryScores = normalizedScores;
            return interviewResult;
        });
        log("normalized scores", result);
        return result;
    }
    getContent = ()=> {
        if (this.state.dataLoaded) {
            return this.createPage();
        }
        else {
            return <CircularProgress color={"teal"} size={1}></CircularProgress>
        }
    };
    createPage = ()=> {
        log("createPage", this.getSelectMulakat());
        return <div>
            <Row>
                <Col lg={3}>Girmiş olduğunuz mülakatı seçiniz</Col>
                <Col lg={9}>{this.getSelectMulakat()}</Col>
            </Row>
            <Row>
                <Col lg={12}>
                    {this.getReportView()}
                </Col>
            </Row>
        </div>
    };
    getSelectMulakat = ()=> {
        var selectContent = <span></span>;
        if (this.state.dataLoaded) {
            selectContent = this.state.data.map(result => {
                return <MenuItem value={result.interviewId}
                                 primaryText={moment(result.date, 'DD-MM-YYYY hh:mm:ss').format("LLL") + " tarihli mülakat"}/>
            });
        }
        var selectField = <SelectField value={this.state.selectedInterviewId}
                                       onChange={(event, index, value)=> this.handleChange(value)} autoWidth={true}
                                       style={{width: "400px"}}>
            <MenuItem value={-1} primaryText={"Seçiniz"}/>
            {selectContent}
        </SelectField>

        return selectField;

    };
    getReportView = ()=> {
        var content;
        if (this.state.selectedInterviewId != -1) {
            content = <ResultView data={this.state.selectedInterview}/>
        }
        else {
            content = <div></div>
        }
        return content;
    }
    handleChange = (interviewId)=> {

        var interviews = this.state.data;
        if (interviewId != -1) {
            var selectedInterview = _.filter(interviews, q => {
                return q.interviewId == interviewId
            })[0];
            log("selectedInterview", selectedInterview);
            this.setState({
                selectedInterviewId: parseInt(interviewId),
                selectedInterview: selectedInterview
            })
        }
        else {
            this.setState({
                selectedInterviewId: -1,
                selectedInterview: null
            })
        }


    }
    render = ()=> {

        return (
            <div style={styles.pageContainer}>
                <Row center="lg">
                    <Col lg={3} md={4}>
                        <Avatar size={80} src={avatarImage} style={styles.avatar}/>
                    </Col>
                </Row>
                <Row style={styles.mulakatSelectBar} end="lg">

                    <Col lg={7} md={7}>
                        {this.getSelectMulakat()}
                    </Col>
                </Row>
                <Row style={styles.resultViewContainer}>
                    <Col lg={12} md={12}>
                        {this.getReportView()}
                    </Col>
                </Row>

            </div>
        )
    }
}

ExamResult.contextTypes = {
    showMessage: React.PropTypes.func
}