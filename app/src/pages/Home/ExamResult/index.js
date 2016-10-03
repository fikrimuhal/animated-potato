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

const log = log2("ExamResult");

//TODO user için rapor üretilecek
export default  class ExamResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataLoaded: false
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
        var content = this.state.data.map(result => {
            return <MenuItem value={result.interviewId} primaryText={moment(result.applyDate).format("LLL")}/>
        })

        return <SelectField value={this.state.value} onChange={(event,value)=> this.handleChange(value)}>
            {content}
        </SelectField>
    };
    handleChange = (interviewId)=> {
        log("handleChange", interviewId)
    }
    render = ()=> {
        return (
            <div>
                <h5>Exam Result</h5>
                {this.getContent()}
            </div>
        )
    }
}