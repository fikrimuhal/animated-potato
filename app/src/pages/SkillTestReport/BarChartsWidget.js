/**
 * Created by MYigit on 8.9.2016.
 */
import  React               from 'react'
import * as mockApi         from '../../utils/mock_api'
import LinearProgress       from 'material-ui/LinearProgress';
import log2                 from '../../utils/log2'
import {Bar}                from 'react-chartjs-2'
import * as util            from '../../utils/utils'
import * as s               from '../../layouts/style'
const log = log2("BarChartsWidget");
var labelHash = {
    "score":"This Person",
    "companyScore":"Avarage of Fikrimuhal's Staffs",
    "generalScore":"Avarage of All Person"
};
var colorHash = {
    "score":{
        light:'rgba(147,54,77,0.2)',
        dark:'rgba(147,54,77,1)'
    },
    "companyScore":{
        light:'rgba(84,102,43,0.2)',
        dark:'rgba(84,102,43,1)'
    },
    "generalScore":{
        light:"rgba(115,162,201,0.2)",
        dark:"rgba(115,162,201,1)"
    }
};
export default  class BarChartsWidget extends React.Component {
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
        var labels = this.props.data["score"].map(item=>{
            return item.category        });
        log("labels",labels);
        data.labels = labels;
        ["score","companyScore","generalScore"].forEach(scoreType=>{

            var values = this.props.data[scoreType].map(valueItem=>{
                return parseFloat(valueItem.score.toPrecision(2));
            });
            dataset.push({
                label:labelHash[scoreType],
                data:values,
                backgroundColor:colorHash[scoreType].dark,
                borderColor:colorHash[scoreType].dark,
                borderWidth:1,
                hoverBackgroundColor:colorHash[scoreType].light,
                hoverBorderColor:colorHash[scoreType].dark
            })
        });
        data.datasets = dataset;
        log("data",data);
        this.state={
            chartData:data,
            dataLoaded:true
        };
    };
    getContent = function (){
        if(this.state.dataLoaded) {
            return <Bar
                data={this.state.chartData}
                width={100}
                height={300}
                options={{
                    maintainAspectRatio:false
                }}
            />
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
BarChartsWidget.propTypes = {
    data:React.PropTypes.object.isRequired
};