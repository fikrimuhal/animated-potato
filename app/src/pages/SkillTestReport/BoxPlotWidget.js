/**
 * Created by MYigit on 19.9.2016.
 */
import React   from 'react'
import * as s  from '../../layouts/style'
import colors  from '../../utils/material-colors'
var Plotly = require('plotly.js');
export default  class BoxPlotWidget extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = ()=> {
        var y = ['JAVA','JAVA','C#','C#','C#','C#','C#','C#','C#','C#']

        var trace1 = {
            x: [1, 2,1,3,0,4,2,2,2,2],
            y: y,
            name: 'Person',
            marker: {color: colors.red.x500},
            type: 'box',
            boxmean: false,
            orientation: 'h',
            jitter:2
        };

        // var trace2 = {
        //     x: [0.6, 0.7, 0.3, 0.6, 0.0, 0.5, 0.7, 0.9, 0.5, 0.8, 0.7, 0.2],
        //     y: y,
        //     name: 'Fikrimuhal\'s Persons',
        //     marker: {color: colors.green.x500},
        //     type: 'box',
        //     boxmean: false,
        //     orientation: 'h'
        // };
        //
        // var trace3 = {
        //     x: [0.1, 0.3, 0.1, 0.9, 0.6, 0.6, 0.9, 1.0, 0.3, 0.6, 0.8, 0.5],
        //     y: y,
        //     name: 'General',
        //     marker: {color: colors.blue.x500},
        //     type: 'box',
        //     boxmean: false,
        //     orientation: 'h'
        // };

        var data = [trace1];

        var layout = {
            title: 'Grouped by Category, Score Box-Plot',
            xaxis: {
                title: 'normalized score',
                zeroline: true
            },
            boxmode: 'group'
        };

        Plotly.newPlot('chartDiv', data, layout);
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