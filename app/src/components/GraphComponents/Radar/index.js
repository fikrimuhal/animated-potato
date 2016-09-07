import React from 'react'
import * as _ from 'lodash'
require('./lib/d3');
import RadarChart from './lib/radarChart'
require('./lib/radarChart')

var color = d3.scale.ordinal()
.range(["#EDC951","#CC333F","#00A0B0"]);
const data = [
    [//iPhone
        {axis:"Battery Life",value:0.22},
        {axis:"Brand",value:0.28},
        {axis:"Contract Cost",value:0.29},
        {axis:"Design And Quality",value:0.17},
        {axis:"Have Internet Connectivity",value:0.22},
        {axis:"Large Screen",value:0.02},
        {axis:"Price Of Device",value:0.21},
        {axis:"To Be A Smartphone",value:0.50}
    ],[//Samsung
        {axis:"Battery Life",value:0.27},
        {axis:"Brand",value:0.16},
        {axis:"Contract Cost",value:0.35},
        {axis:"Design And Quality",value:0.13},
        {axis:"Have Internet Connectivity",value:0.20},
        {axis:"Large Screen",value:0.13},
        {axis:"Price Of Device",value:0.35},
        {axis:"To Be A Smartphone",value:0.38}
    ],[//Nokia Smartphone
        {axis:"Battery Life",value:0.26},
        {axis:"Brand",value:0.10},
        {axis:"Contract Cost",value:0.30},
        {axis:"Design And Quality",value:0.14},
        {axis:"Have Internet Connectivity",value:0.22},
        {axis:"Large Screen",value:0.04},
        {axis:"Price Of Device",value:0.41},
        {axis:"To Be A Smartphone",value:0.30}
    ]
];
var margin = {top: 50, right: 50, bottom: 10, left: 50},
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
var radarChartOptions = {
     w:350,
     h:350,
     margin:margin,
    maxValue:1,
    levels:5,
    roundStrokes:true,
    color:color
};
export default  class Radar extends React.Component {
    constructor(props){
        super(props);
        console.log(RadarChart);
    }

    componentDidMount = ()=>{
        RadarChart(".radarChart",this.props.data,radarChartOptions);
    };
    render = ()=>{
        return (
            <div>
                <div className="radarChart"></div>
            </div>
        )
    }
}
Radar.propTypes = {
    data:React.PropTypes.array
};
