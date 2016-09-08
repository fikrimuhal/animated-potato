/**
 * Created by MYigit on 8.9.2016.
 */
import  React from 'react'
import * as mockApi         from '../../utils/mock_api'
import LinearProgress       from 'material-ui/LinearProgress';
import log2                 from '../../utils/log2'
import {Pie}              from 'react-chartjs-2'
import * as util            from '../../utils/utils'
const log = log2("PieChartWidget");

export default  class PieChartWidget extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dataLoaded:false
        };
        this.createGraph();
    }

    createGraph = function (){
        var _this = this;
        var dataset = [];
        var data = {};
        mockApi.getRadarData().then(json=>{
            log("received json=>",json);
            var labelHash = {
                "score":"Kişinin kendisi",
                "companyScore":"Fikrimuhal çalışanları",
                "generalScore":"Tüm kişiler"
            }
            var labels = json["score"].map(item=>{
                return item.category
            });
            log("labels",labels);
            data.labels = labels;

            var values = json["score"].map(item=>{
                return parseFloat(item.score.toPrecision(2));
            });
            var colors = [];
            colors = labels.map(item=>{
                return util.generateColor(0.5)
            });
            var backColors = colors.map(color=>{return color.dark});
            var hoverColors = colors.map(color=>{return color.light});
            //var color = util.generateColor(0.2);
            dataset.push({
                data:values,
                backgroundColor:backColors,
                hoverBackgroundColor:hoverColors
            });

            data.datasets = dataset;
            log("data",data);
            _this.setState({
                data:data,
                dataLoaded:true
            })
        });
    };
    getContent = function (){
        if(this.state.dataLoaded) {
            return <Pie data={this.state.data}/>
        }
        else {
            return <LinearProgress mode="indeterminate" color="red"/>
        }
    };
    render = ()=>{
        return (
            <div style={this.props.style}>
                {this.getContent()}
            </div>
        )
    }
}