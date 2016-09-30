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
import  {Row, Col}      from 'react-flexbox-grid'
import  SpiderWidget    from './SpiderGraphWidget'
import  BarWidget       from './BarChartsWidget'
import  PieWidget       from './PieChartWidget'
import  SummaryBar      from './SummaryBar'
import  ScoreTable      from './CategoryScoreTable'
import  ColorMatrix     from './ColorMatrixChart'
import  BoxPlot         from './BoxPlotWidget'
import  AnswersWidget   from './AnswersWidget'
import * as _           from 'lodash'
import QRCode           from 'qrcode.react'
import colors           from '../../utils/material-colors'
const log = log2("ReportViewer");

export default  class ReportViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: window.location.href
        }
    }

    getScoreTables = function () {
        var userScoreData = _.filter(this.props.generalInfo.scores, q=> {
            return q.score != -1
        });
        //log("userScoreData", userScoreData)
        var tables = userScoreData.map(item=> {

            var category = item.category.category;
            return <Col lg={3} md={4}>
                <ScoreTable data={this.props.scoreTable} dataLoaded={this.props.scoreTableLoaded}
                            selectedCategory={category} showCategorChangeBar={false} key={"table-" + category}/>
            </Col>
        });
        tables = [<Col lg={3} md={4}>
            <ScoreTable data={this.props.scoreTable} dataLoaded={this.props.scoreTableLoaded}
                        selectedCategory={"Overall"} showCategorChangeBar={false}
                        key={"table-Overall"}/></Col>].concat(tables);

        return tables;
    };
    render = ()=> {

        var userScoreData = this.props.generalInfo;
        //log("rendered", userScoreData ,this.props.generalInfo );
        return (
            <div>
                <Row>
                    <SummaryBar data={userScoreData}/>
                </Row>
                <hr/>
                <Row style={{height: "400px"}}>
                    <Col lg={6}>
                        <SpiderWidget data={this.props.comparativeResult}
                                      dataLoaded={this.props.comparativeResultLoaded}/>
                    </Col>
                    <Col lg={6}>
                        <PieWidget data={userScoreData}/>
                    </Col>
                </Row> <br/>
                <hr/>

                <Row>
                    <Col lg={12} style={{width: "100%"}}>
                        <BarWidget data={this.props.comparativeResult} dataLoaded={this.props.comparativeResultLoaded}/>
                    </Col>
                </Row><br/>
                <hr/>
                <Row>
                    {this.getScoreTables()}
                </Row><br/>
                <hr/>
                <Row>
                    <Col lg={12} md={12}>
                        <BoxPlot data={userScoreData}/>
                    </Col>
                </Row><br/>
                <hr/>
                <Row>
                    <Col lg={12} style={{width: "100%"}}>
                        <ColorMatrix data={this.props.scoreData}/>
                    </Col>

                </Row>
                <hr/>
                <Row>
                    <Col lg={12} style={{width: "100%"}}>

                        <AnswersWidget data={this.props.answers} dataLoaded={this.props.answersLoaded}/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col lg={9} md={9} style={{position: "relative"}}>
                        <div style={{position: "absolute", bottom: "0px"}}>
                            {this.state.url} {"Bu sayfa " + Date.now().toLocaleString() + " tarihinde oluşturulmuştur"}
                        </div>
                    </Col>
                    <Col lg={3} md={3}>
                        <div style={s.GraphStyles.barcodeContainer}>
                            <QRCode value={this.state.url} size={128} fgColor={colors.teal.x500}/>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}
ReportViewer.propTypes = {
    categoryScoreInfo: React.PropTypes.object,
    generalScoreInfo: React.PropTypes.object,
    scoreData: React.PropTypes.array,
    answers: React.PropTypes.array
};

ReportViewer.contextTypes = {
    interviewId: React.PropTypes.number
}