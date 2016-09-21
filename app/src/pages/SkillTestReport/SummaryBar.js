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
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import GradeIcon from 'material-ui/svg-icons/action/grade'
import * as materialColors from 'material-ui/styles/colors';
import * as _ from 'lodash'
export default  class SummaryBar extends React.Component {
    constructor(props) {
        super(props);
    }

    getBestAtCategories = function () {
        return _.filter(this.props.data.scores,o=>{return o.percentage >= 0.75}).map(item => {return item.category.category});
    }
    getGoodAtCategories = function () {
        return _.filter(this.props.data.scores,o=>{return o.percentage < 0.75 && o.percentage >=0.50}).map(item => {return item.category.category});
    }
    getBestAtList = function () {
        return this.getBestAtCategories().map(category=>{
            return <ListItem primaryText={category}
                      leftIcon={<GradeIcon color={materialColors.yellow500}/>}/>
        })
    };
    getGoodAtList = function () {
        return this.getGoodAtCategories().map(category=>{
            return <ListItem primaryText={category}
                      leftIcon={<GradeIcon color={materialColors.yellow500}/>}/>
        })
    };
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
        var tRate = parseFloat(this.props.data.overAllConfidence * 100).toFixed(2);
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
        var data = [pDegree, 100 - pDegree];
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
        //TODO best at, good at için Herhangi bir sınırlama olmadan hesaplama yapılacak listeye konacak
        var info = this.props.data;
        return (
            <div>
                <LinearProgress mode="determinate" color={this.getScoreColor()} value={info.overallScore * 100}
                                style={{height: "20px"}}/>
                <Row>
                    <Col lg={5} md={5}> <UserInfoBar userInfo={info}/></Col>
                    <Col lg={7} md={5}>
                        <Row>
                            <Col lg={8} md={8}>
                                <Row>
                                    <Col lg={6} md={6}>
                                        <Paper
                                            style={Object.assign(s.GraphStyles.SummaryBarPaper, this.getPaperColor())}
                                            rounded={false}>
                                            <b>Trust Rate</b><br/>

                                            <Row height={85}>
                                                <Col lg={12} style={{width: "100%"}}>
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
                                    <Col lg={6} md={6}>
                                        <Paper
                                            style={Object.assign(s.GraphStyles.SummaryBarPaper, this.getPaperColor())}
                                            rounded={false}>
                                            <b>Score</b><br/>
                                            <span
                                                style={s.GraphStyles.SummaryBarLabel}> {(info.overallScore.toFixed(3) * 100).toFixed(1)}/<span
                                                style={{fontSize: "20px"}}>100</span></span>
                                        </Paper>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <Paper
                                            style={Object.assign(s.GraphStyles.SummaryBarPaper, this.getPaperColor())}
                                            rounded={false}>
                                            <b>Degree</b><br/>
                                            <span style={s.GraphStyles.SummaryBarLabel}>11.</span>
                                        </Paper>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <Paper
                                            style={Object.assign(s.GraphStyles.SummaryBarPaper, this.getPaperColor())}
                                            rounded={false}>
                                            <b>Percent Degree</b><br/>
                                            <Row height={85}>
                                                <Col lg={12} md={12} style={{}}>
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
                            <Col lg={4} md={4}>


                                <Paper style={s.GraphStyles.SummaryBarPaper2}
                                       rounded={false}>
                                    <Divider/>
                                    <b>Best at</b><br/>
                                    <Divider/>
                                    <List>
                                        {this.getBestAtList()}
                                    </List>
                                    <Divider/>
                                    <b>Good at</b>
                                    <Divider/>
                                    <List>
                                        {this.getGoodAtList()}
                                    </List>
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