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
import  {Row, Col}       from 'react-flexbox-grid'
import  SpiderWidget    from './SpiderGraphWidget'
import  BarWidget       from './BarChartsWidget'
import  PieWidget       from './PieChartWidget'
import  SummaryBar      from './SummaryBar'
import  ScoreTable      from './CategoryScoreTable'
import ColorMatrix      from './ColorMatrixChart'
import BoxPlot          from './BoxPlotWidget'
const log = log2("ReportViewer");

export default  class ReportViewer extends React.Component {
    constructor(props) {
        super(props)

    }

    render = ()=> {
        log("rendered", this.props)
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
                <Row style={{height: "400px"}}>
                    <Col lg={6}>
                        <SpiderWidget data={this.props.categoryScoreInfo}/>
                    </Col>
                    <Col lg={6}>
                        <PieWidget data={this.props.categoryScoreInfo}/>
                    </Col>
                </Row> <br/>
                <hr/>

                <Row style={{height: "480px"}}>
                    <Col lg>
                        <BarWidget data={this.props.categoryScoreInfo}/>
                    </Col>
                </Row><br/>
                <hr/>
                <Row style={{height: "480px"}}>
                    <Col lg={6}>
                        <ScoreTable data={this.props.scoreData}/>
                    </Col>
                    <Col lg={6}>
                        <ScoreTable data={this.props.scoreData}/>
                    </Col>
                </Row><br/>
                <hr/>
                <Row>
                    <Col lg>
                        <BoxPlot/>
                    </Col>
                </Row><br/>
                <hr/>
                <Row>
                    <Col lg>
                        <ColorMatrix data={this.props.scoreData}/>
                    </Col>
                </Row>

            </div>
        )
    }
}
ReportViewer.propTypes = {
    categoryScoreInfo: React.PropTypes.object.isRequired,
    generalScoreInfo: React.PropTypes.object.isRequired,
    userInfo: React.PropTypes.object.isRequired,
    scoreData: React.PropTypes.array.isRequired
};