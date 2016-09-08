/**
 * Created by MYigit on 8.9.2016.
 */
import  React               from 'react'
import * as mockApi         from '../../utils/mock_api'
import LinearProgress       from 'material-ui/LinearProgress';
import log2                 from '../../utils/log2'
import {Bar}              from 'react-chartjs-2'
import * as util            from '../../utils/utils'
const log = log2("BarChartsWidget");
export default  class BarChartsWidget extends React.Component {
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
            ["score","companyScore","generalScore"].forEach(scoreType=>{
                var layerData = [];
                var values = json[scoreType].map(valueItem=>{
                    return parseFloat(valueItem.score.toPrecision(2));
                });
                //var color = util.generateColor(0.2);
                dataset.push({
                    label:labelHash[scoreType],
                    data:values,
                    backgroundColor:colorHash[scoreType].light,
                    borderColor:colorHash[scoreType].dark,
                    pointBackgroundColor:colorHash[scoreType].dark,
                    pointBorderColor:'#fff',
                    pointHoverBackgroundColor:'#fff',
                    pointHoverBorderColor:colorHash[scoreType].dark
                })
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
            return <Bar
                data={this.state.data}
                width={100}
                height={300}
                options={{
                    maintainAspectRatio: false
                }}
            />
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