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
import * as _           from 'lodash'
const log = log2("ReportViewer");

export default  class ReportViewer extends React.Component {
    constructor(props) {
        super(props)
    }

    render = ()=> {

        var userScoreData = this.props.generalInfo;
        //log("rendered", userScoreData ,this.props.generalInfo );
        return (
            <div>
                <Row>
                    <SummaryBar data={userScoreData} />
                </Row>
                <hr/>
                <Row style={{height: "400px"}}>
                    <Col lg={6}>
                        <SpiderWidget data={this.props.comparativeResult} dataLoaded={this.props.comparativeResultLoaded}/>
                    </Col>
                    <Col lg={6}>
                        <PieWidget data={userScoreData}/>
                    </Col>
                </Row> <br/>
                <hr/>

                <Row style={{height: "480px"}}>
                    <Col lg={12} style={{width:"100%"}}>
                        <BarWidget data={this.props.comparativeResult} dataLoaded={this.props.comparativeResultLoaded}/>
                    </Col>
                </Row><br/>
                <hr/>
                <Row>
                    <Col lg={6} md={6} style={{width:"50%"}}>
                        <ScoreTable data={this.props.scoreTable} dataLoaded={this.props.scoreTableLoaded}/>
                    </Col>
                    <Col lg={6} md={6} style={{width:"50%"}}>
                        <ScoreTable data={this.props.scoreTable} dataLoaded={this.props.scoreTableLoaded}/>
                    </Col>
                </Row><br/>
                <hr/>
                <Row>
                    <Col lg={12} md={12}>
                        <BoxPlot data={userScoreData} />
                    </Col>
                </Row><br/>
                <hr/>
                <Row>
                    <Col lg={12} style={{width:"100%"}}>
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
    scoreData: React.PropTypes.array.isRequired
};

ReportViewer.contextTypes = {
    interviewId: React.PropTypes.number
}