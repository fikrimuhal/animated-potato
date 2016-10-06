/**
 * Created by MYigit on 26.9.2016.
 */
import React from 'react'
import * as mockAPI from '../../../utils/mock_api'
import  {Row, Col}  from 'react-flexbox-grid'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import       CircularProgress      from 'material-ui/CircularProgress'
import  moment from 'moment'
import log2 from '../../../utils/log2'
import * as _ from 'lodash'
import  ResultView from './resultViewer'
const log = log2("ExamResult");

//TODO user için rapor üretilecek
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
        mockAPI.getUserOnlyResult().then(json => {
            this.setState({
                data: json,
                dataLoaded: true
            })
        })
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
        return <Row>
            <Col lg={3}>Girmiş olduğunuz mülakatı seçiniz</Col>
            <Col lg={9}>{this.getSelectMulakat()}</Col>
        </Row>
    };
    getSelectMulakat = ()=> {
        var interviewSelectListContent = this.state.data.map(result => {
            return <MenuItem value={result.interviewId} primaryText={moment(result.date).format("LLL")}/>
        })


        var interviewSelectList = <SelectField value={this.state.selectedInterviewId}
                                               onChange={(event, value)=> this.handleChange(value)}>
            {interviewSelectListContent}
        </SelectField>

        if (this.state.selectedInterviewId != -1) {

            return <div> {interviewSelectList} <ResultView data={this.state.selectedInterview}/></div>
        }
        else {
           return <div> {interviewSelectList}</div>
        }

    };
    handleChange = (interviewId)=> {
        log("handleChange", interviewId);
        var interviews = this.state.data;
        var selectedInterview = _.filter(interviews, q => {
            return q.id == interviewId
        })[0];
        this.setState({
            selectedInterviewId: interviewId,
            selectedInterview: selectedInterview
        })
    }
    render = ()=> {
        return (
            <div>
                <h5>Mülakat Sınav Sonuçlarım</h5>
                {this.getContent()}
            </div>
        )
    }
}