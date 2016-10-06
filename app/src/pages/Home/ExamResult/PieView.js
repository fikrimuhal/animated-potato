/**
 * Created by MYigit on 5.10.2016.
 */
import React from 'react'
import  colors      from '../../../utils/material-colors'
import * as _       from 'lodash'
import {Pie}        from 'react-chartjs-2'
import * as util from '../../../utils/utils'
export default  class PieView extends React.Component {
    constructor(props) {
        super(props)
    }

    createChart = ()=> {
        var scores = this.props.data.categoryScores;
        scores = _.orderBy(scores, ['score'], ['desc']);
        var labels = scores.map(x=> {
            return x.category.category
        });
        var colors = labels.map(item=> {
            return util.generateColor()
        });
        var backColors = colors.map(color=> {
            return color.dark
        });
        var hoverColors = colors.map(color=> {
            return color.light
        });


        var values = scores.map(x=> {
            return x.score
        });
        var dataset = [];
        var chartData = {};


        dataset.push({
            data: values,
            backgroundColor: backColors,
            hoverBackgroundColor: hoverColors
        });

        chartData.datasets = dataset;
        chartData.labels = labels;
        return <Pie
            data={chartData}
            width={100}
            height={300}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom',
                    fullWidth: true,
                    labels: {
                        fontSize: 10,
                        boxWidth: 20
                    }
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

PieView.propTypes = {
    data: React.PropTypes.object.isRequired
}