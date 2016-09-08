/**
 * Created by MYigit on 8.9.2016.
 */
import  React from 'react'
import * as mockApi         from '../../utils/mock_api'
import LinearProgress       from 'material-ui/LinearProgress';
import log2                 from '../../utils/log2'
import {Pie}                from 'react-chartjs-2'
import * as util            from '../../utils/utils'
import * as s               from '../../layouts/style'
import * as _               from 'lodash'
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
        var dataset = [];
        var data = {};
        // mockApi.getRadarData().then(json=>{
        //     log("received json=>",json);
        var grData = this.props.data["score"].map(item=>{
            return {
                label:item.category,
                value:parseFloat(item.score.toPrecision(2))
            }
        });
        grData = _.sortBy(grData,"value").reverse();

        var labels = grData.map(item=>{
            return item.label
        });
        var values = grData.map(item=>{
            return item.value
        });
        var colors = labels.map(item=>{
            return util.generateColor(0.5)
        });
        var backColors = colors.map(color=>{return color.dark});
        var hoverColors = colors.map(color=>{return color.light});
        dataset.push({
            data:values,
            backgroundColor:backColors,
            hoverBackgroundColor:hoverColors
        });

        data.datasets = dataset;
        data.labels = labels;
        log("labels",labels);
        log("data",data);
        this.state = {
            chartData:data,
            dataLoaded:true
        };

    };
    getContent = function (){
        if(this.state.dataLoaded) {
            return <Pie data={this.state.chartData}/>
        }
        else {
            return <LinearProgress mode="indeterminate" color="red"/>
        }
    };
    render = ()=>{
        return (
            <div style={s.GraphStyles.widgetContainer}>
                {this.getContent()}
            </div>
        )
    }
}
PieChartWidget.propTypes = {
    data:React.PropTypes.object.isRequired
}