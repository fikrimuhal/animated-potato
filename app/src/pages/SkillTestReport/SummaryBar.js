/**
 * Created by MYigit on 8.9.2016.
 */
import React                from 'react'
import Paper                from 'material-ui/Paper'
import LinearProgress       from 'material-ui/LinearProgress';
import {Row,Col}            from 'react-flexbox-grid'
import * as s               from '../../layouts/style'
import log2                 from '../../utils/log2'
const  log = log2("SummaryBar");
import UserInfoBar          from './UserInfoBar'
export default  class SummaryBar extends React.Component {
    constructor(props){
        super(props);
    }

    getScoreColor = function (){
        var score = this.props.score;
        var color = "rgba(150, 19, 19, 0.6)";
        switch(true) {
            case (score < 20):
                color = "rgba(150, 19, 19, 0.6)";
                break;
            case (score < 40):
                color = "rgba(150, 98, 19, 0.6)";
                break;
            case (score < 60):
                color = "rgba(57, 150, 19, 0.6)";
                break;
            case (score < 80):
                color = "rgba(19, 23, 150, 0.6)";
                break;
            default:
                color = "rgba(150, 19, 61, 0.6)";
                break;
        }
        return color;
    };
    getPaperColor = function (){
        var score = this.props.score;
        var color = "rgba(150, 19, 19, 0.2)";
        switch(true) {
            case (score < 20):
                color = "rgba(150, 19, 19, 0.2)";
                break;
            case (score < 40):
                color = "rgba(150, 98, 19, 0.2)";
                break;
            case (score < 60):
                color = "rgba(57, 150, 19, 0.2)";
                break;
            case (score < 80):
                color = "rgba(19, 23, 150, 0.2)";
                break;
            default:
                color = "rgba(150, 19, 61, 0.2)";
                break;
        }
        return {
            backgroundColor:color
        };
    };
    render = ()=>{
        log("rendered",this.props)
        return (
            <div>
                <LinearProgress mode="determinate" color={this.getScoreColor()} value={this.props.score}
                                style={{height:"20px"}}/>
                <Row>
                    <Col lg={5}> <UserInfoBar userInfo={this.props.userInfo}/></Col>
                    <Col lg={7}>
                        <Row>
                            <Col lg={6}><Paper style={Object.assign(s.GraphStyles.SummaryBarPaper,this.getPaperColor())}
                                               rounded={false}>
                                <b>Trust Rate</b><br/>
                                <span style={s.GraphStyles.SummaryBarLabel}>{this.props.trustRate} %</span>
                            </Paper>
                            </Col>
                            <Col lg={6}><Paper style={Object.assign(s.GraphStyles.SummaryBarPaper,this.getPaperColor())}
                                               rounded={false}>
                                <b>Score</b><br/>
                                <span style={s.GraphStyles.SummaryBarLabel}> {this.props.score} </span>
                            </Paper>
                            </Col>
                            <Col lg={6}><Paper style={Object.assign(s.GraphStyles.SummaryBarPaper,this.getPaperColor())}
                                               rounded={false}>
                                <b>Degree</b><br/>
                                <span style={s.GraphStyles.SummaryBarLabel}>{this.props.degree}</span>
                            </Paper>
                            </Col>
                            <Col lg={6}><Paper style={Object.assign(s.GraphStyles.SummaryBarPaper,this.getPaperColor())}
                                               rounded={false}>
                                <b>Percent Degree</b><br/>
                                <span style={s.GraphStyles.SummaryBarLabel}> % {this.props.rate} </span>
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
    trustRate:React.PropTypes.number.isRequired,
    score:React.PropTypes.number.isRequired,
    degree:React.PropTypes.number.isRequired,
    rate:React.PropTypes.number.isRequired,
    userInfo:React.PropTypes.object.isRequired
};