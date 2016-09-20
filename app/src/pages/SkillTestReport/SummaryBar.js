/**
 * Created by MYigit on 8.9.2016.
 */
import React                from 'react'
import Paper                from 'material-ui/Paper'
import LinearProgress       from 'material-ui/LinearProgress';
import {Row, Col}           from 'react-flexbox-grid'
import * as s               from '../../layouts/style'
import log2                 from '../../utils/log2'
import {Doughnut}           from 'react-chartjs-2'
import * as util            from '../../utils/utils'
import colors               from '../../utils/material-colors'
const log = log2("SummaryBar");
import UserInfoBar          from './UserInfoBar'
export default  class SummaryBar extends React.Component {
    constructor(props) {
        super(props);
    }

    getScoreColor = function () {
        var score = this.props.data.overallScore * 100;
        var color = colors.grey.x800;
        switch (true) {
            case (score < 20):
                color = colors.grey.x800;
                break;
            case (score < 40):
                color = colors.blueGrey.x800;
                break;
            case (score < 60):
                color = colors.blue.x800;
                break;
            case (score < 80):
                color = colors.teal.x800;
                break;
            default:
                color = colors.green.x800;
                break;
        }
        return color;
    };
    getPaperColor = function () {
        var score = this.props.data.overallScore * 100;
        var color = colors.grey.x200;
        switch (true) {
            case (score < 20):
                color = colors.grey.x200;
                break;
            case (score < 40):
                color = colors.blueGrey.x200;
                break;
            case (score < 60):
                color = colors.blue.x200;
                break;
            case (score < 80):
                color = colors.teal.x200;
                break;
            default:
                color = colors.green.x200;
                break;
        }
        return {
            backgroundColor: color
        };
    };
    getTrustRateChartData = function () {
        var tRate = parseFloat(this.props.data.overAllConfidence*100).toFixed(2);
        var data = [tRate, (100 - tRate)];
        var labels = ["Trust Rate", ""];
        var dataset = [
            {
                data: data,
                backgroundColor: [
                    colors.blue.x500,
                    colors.grey.x500

                ],
                hoverBackgroundColor: [
                    colors.blue.x500,
                    colors.grey.x500
                ]
            }
        ];
        var chartData = {
            labels: labels,
            datasets: dataset
        };

        return chartData;
    };
    getPercentRateChartData = function () {
        var pDegree = parseFloat(this.props.data.overallPercentage * 100).toFixed(2);
        var data = [ pDegree,100 - pDegree];
        var labels = ["Percent Degree", ""];
        var dataset = [
            {
                data: data,
                backgroundColor: [
                    colors.blue.x500,
                    colors.grey.x500

                ],
                hoverBackgroundColor: [
                    colors.blue.x500,
                    colors.grey.x500
                ]
            }
        ];
        var chartData = {
            labels: labels,
            datasets: dataset
        };

        return chartData;
    };
    render = ()=> {
        log("rendered", this.props.data);
        var info = this.props.data;
        return (
            <div>
                <LinearProgress mode="determinate" color={this.getScoreColor()} value={info.overallScore * 100}
                                style={{height: "20px"}}/>
                <Row>
                    <Col lg={5}> <UserInfoBar userInfo={info}/></Col>
                    <Col lg={7}>
                        <Row>
                            <Col lg={6}>
                                <Paper style={Object.assign(s.GraphStyles.SummaryBarPaper, this.getPaperColor())}
                                       rounded={false}>
                                    <b>Trust Rate</b><br/>

                                    <Row height={85}>
                                        <Col lg={12}>
                                            <div style={{height: "85px"}}>
                                                <Doughnut data={this.getTrustRateChartData()}
                                                          options={{
                                                              responsive: true,
                                                              maintainAspectRatio: false,
                                                              legend: {
                                                                  display: false
                                                              }
                                                          }}/>

                                            </div>
                                        </Col>
                                        {/*<Col lg={5}><span style={s.GraphStyles.SummaryBarLabel}>{(this.props.data.overAllConfidence*100).toFixed(1)}%</span></Col>*/}
                                    </Row>
                                </Paper>
                            </Col>
                            <Col lg={6}><Paper
                                style={Object.assign(s.GraphStyles.SummaryBarPaper, this.getPaperColor())}
                                rounded={false}>
                                <b>Score</b><br/>
                                <span
                                    style={s.GraphStyles.SummaryBarLabel}> {(info.overallScore.toFixed(3) * 100).toFixed(1)}/<span
                                    style={{fontSize: "20px"}}>100</span></span>
                            </Paper>
                            </Col>
                            <Col lg={6}><Paper
                                style={Object.assign(s.GraphStyles.SummaryBarPaper, this.getPaperColor())}
                                rounded={false}>
                                <b>Degree</b><br/>
                                <span style={s.GraphStyles.SummaryBarLabel}>11.</span>
                            </Paper>
                            </Col>
                            <Col lg={6}><Paper
                                style={Object.assign(s.GraphStyles.SummaryBarPaper, this.getPaperColor())}
                                rounded={false}>
                                <b>Percent Degree</b><br/>
                                <Row height={85}>
                                    <Col lg={12}>
                                        <div style={{height: "85px"}}>
                                            <Doughnut data={this.getPercentRateChartData()}
                                                      options={{
                                                          responsive: true,
                                                          maintainAspectRatio: false,
                                                          legend: {
                                                              display: false
                                                          }
                                                      }}/>

                                        </div>
                                    </Col>
                                    {/*<Col lg={5}>*/}
                                    {/*<span style={s.GraphStyles.SummaryBarLabel}> %{info.overallPercentage.toFixed(2)} </span>*/}
                                    {/*</Col>*/}
                                </Row>

                            </Paper>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

SummaryBar.propTypes = {
    data: React.PropTypes.object.isRequired
};