/**
 * Created by MYigit on 7.9.2016.
 */
import  React               from 'react'
import * as mockApi         from '../../utils/mock_api'
import LinearProgress       from 'material-ui/LinearProgress';
import log2                 from '../../utils/log2'
import {Radar}              from 'react-chartjs-2'
import * as util            from '../../utils/utils'
import * as s               from '../../layouts/style'
import materialColors               from '../../utils/material-colors'
const log = log2("SpiderGraphWidget");
var colorHash = {
    "score": {
        light: 'rgba(233, 30, 99,0.4)',
        dark: 'rgba(233, 30, 99,1.0)'
    },
    "companyScore": {
        light: 'rgba(76, 175, 80,0.2)',
        dark: 'rgba(76, 175, 80,1.0)'
    },
    "generalScore": {
        light: "rgba(0, 188, 212,0.2)",
        dark: "rgba(0, 188, 212,1.0)"
    }
};
var labelHash = {
    "score": "This Person",
    "companyScore": "Avarage of Fikrimuhal's Staffs",
    "generalScore": "Avarage of All Person"
};
const options = {
    responsive: true,
    maintainAspectRatio:false,
    scale: {
        display: true,
        gridLines: {
            display: true
        },
        ticks: {
            display: false
        },
        pointLabels:{
            fontSize:10,
            fontColor:materialColors.darkText.primary
        }
    },
    legend:{
        position:'bottom',
        fullWidth:true,
        labels:{
            fontSize:10,
            boxWidth:20
        }
    }

};
const styles={
    chartContainer:{
        height:"100%"
    }
};
export default  class SpiderGraphWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
        this.createGraph();
    }

    createGraph = function () {
        var dataset = [];
        var data = {};

        var labels = this.props.data["score"].map(item=> {
            return item.category
        });

        log("labels", labels);
        data.labels = labels;

        ["score", "companyScore", "generalScore"].forEach(scoreType=> {
            var values = this.props.data[scoreType].map(valueItem=> {
                return parseFloat(valueItem.score.toPrecision(2));
            });
            dataset.push({
                label: labelHash[scoreType],
                data: values,
                backgroundColor: colorHash[scoreType].light,
                borderColor: colorHash[scoreType].dark,
                pointBackgroundColor: colorHash[scoreType].dark,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colorHash[scoreType].dark
            })
        });
        data.datasets = dataset;
        //log("data", data);
        this.state = {
            graphData: data,
            dataLoaded: true
        };

    };
    getContent = function () {
        if (this.state.dataLoaded) {
            return <Radar data={this.state.graphData} options={options}/>
        }
        else {
            return <LinearProgress mode="indeterminate" color="red"/>
        }
    };
    render = ()=> {
        return (
            <div style={Object.assign(s.GraphStyles.widgetContainer,styles.chartContainer)}>
                {this.getContent()}
            </div>
        )
    }
}

SpiderGraphWidget.propTypes = {
    data: React.PropTypes.object.isRequired
}