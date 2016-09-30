/**
 * Created by MYigit on 19.9.2016.
 */
import React   from 'react'
import * as s  from '../../layouts/style'
import colors  from '../../utils/material-colors'
import log2     from '../../utils/log2'
import * as _  from 'lodash'
const log = log2("BoxPlotWidget");
var Plotly = require('plotly.js');
export default  class BoxPlotWidget extends React.Component {
    constructor(props) {
        super(props)
    }

    createDataSeries = function (average, confidence) {

        var quartile1, quartile3;
        quartile1 = average - confidence;
        quartile3 = average + confidence;
        if (quartile1 < 0)quartile1 = 0;
        if (quartile3 > 100)quartile3 = 100;
        var result = [0, quartile1, quartile1, average, average, average, quartile3, quartile3, 100];
        //log("result", result);
        return result;
    }
    componentDidMount = ()=> {
        var scores = _.filter(this.props.data.scores, q => {
            return q.score >= 0
        });
        scores = _.orderBy(scores, ['score'], ['desc']);
        var categoryTraces = scores.map(item=> {
            var score = parseFloat((item.score * 100).toFixed(2));
            var category = item.category.category;
            return {
                y: this.createDataSeries(score, 10),
                name: category,
                type: 'box',
                //boxpoints:'all'
            };
        })
        //log("categoryTraces",categoryTraces)
        var chartData = categoryTraces;
        Plotly.newPlot('chartDiv', chartData);

    };
    render = ()=> {
        return (
            <div style={s.GraphStyles.widgetContainer}>
                <div id="chartDiv" itemID="chartDiv"></div>
            </div>
        )
    }
}
BoxPlotWidget.propTypes = {
    data: React.PropTypes.object
}