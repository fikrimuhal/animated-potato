/**
 * Created by MYigit on 5.10.2016.
 */
import React        from 'react'
import  colors      from '../../../utils/material-colors'
import * as _       from 'lodash'
import {Bar}        from 'react-chartjs-2'
export default  class BarView extends React.Component {
    constructor(props) {
        super(props)
    }

    createChart = ()=> {
        var scores = this.props.data.categoryScores;
        scores = _.orderBy(scores, ['score'], ['desc']);
        var labels = scores.map(x=> {
            return x.category.category
        });
        var values = scores.map(x=> {
            return x.score
        });
        var dataset = [];
        var chartData = {};
        dataset.push({
            label: "Skor",
            data: values,
            backgroundColor: colors.green.x300,
            borderColor: colors.green.x300,
            borderWidth: 2,
            hoverBackgroundColor: colors.green.x100,
            hoverBorderColor: colors.green.x300
        });

        chartData.datasets = dataset;
        chartData.labels = labels;
        return <Bar
            data={chartData}
            width={100}
            height={300}
            options={{
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }

            }}
        />;
    }
    render = ()=> {
        return (
            <div>
                {this.createChart()}
            </div>
        )
    }
}

BarView.propTypes = {
    data: React.PropTypes.object.isRequired
}