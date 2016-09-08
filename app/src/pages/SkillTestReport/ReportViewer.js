/**
 * Created by MYigit on 8.9.2016.
 */
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
import * as s           from '../../layouts/style'
import  {Row,Col}       from 'react-flexbox-grid'
import  SpiderWidget    from './SpiderGraphWidget'
import  BarWidget       from './BarChartsWidget'
import  PieWidget       from './PieChartWidget'
import  SummaryBar      from './SummaryBar'
const log = log2("ReportViewer");
export default  class ReportViewer extends React.Component {
    constructor(props){
        super(props)

    }

    render = ()=>{
        log("rendered",this.props)
        var scoreInfo = this.props.generalScoreInfo;
        var userInfo = this.props.userInfo;
        return (
            <div>
                <Row>
                    <SummaryBar degree={scoreInfo.degree}
                                rate={scoreInfo.rate}
                                score={scoreInfo.score}
                                trustRate={scoreInfo.trustRate}
                                userInfo={userInfo}
                    />
                </Row>
                <hr/>
                <Row>
                    <Col lg={6}>
                        <SpiderWidget data={this.props.categoryScoreInfo}/>
                    </Col>
                    <Col lg={6}>
                        <PieWidget data={this.props.categoryScoreInfo}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg>
                        <BarWidget data={this.props.categoryScoreInfo}/>
                    </Col>
                </Row>


            </div>
        )
    }
}
ReportViewer.propTypes = {
    categoryScoreInfo:React.PropTypes.object.isRequired,
    generalScoreInfo:React.PropTypes.object.isRequired,
    userInfo:React.PropTypes.object.isRequired
};