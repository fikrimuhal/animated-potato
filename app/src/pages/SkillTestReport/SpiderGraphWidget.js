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
import * as _               from 'lodash'
import materialColors       from '../../utils/material-colors'
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
const options = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
        display: true,
        gridLines: {
            display: true
        },
        ticks: {
            display: false
        },
        pointLabels: {
            fontSize: 10,
            fontColor: materialColors.darkText.primary
        }
    },
    legend: {
        position: 'bottom',
        fullWidth: true,
        labels: {
            fontSize: 10,
            boxWidth: 20
        }
    }

};
const styles = {
    chartContainer: {
        height: "100%"
    }
};
export default  class SpiderGraphWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
        //log(this.props)
        //this.createGraph();
    }

    createGraph = function () {
        var dataset = [];
        var data = {};
        //3 katmanda kategorilere göre sıralanıyor
        var userScore = _.take(_.sortBy(this.props.data["userScore"], o=> {
            return o.category.category
        }), 6);
        var personelAverageScore = _.take(_.sortBy(this.props.data["personnelAverage"], o=> {
            return o.category.category
        }), 6);
        var generalAverageScore = _.take(_.sortBy(this.props.data["overallAverage"], o=> {
            return o.category.category
        }), 6);

        //Grafikte gözükecek etiketler
        data.labels = userScore.map(item=> {
            return item.category.category
        });
        //log("labels sorted->",data.labels);

        var userScoreValues = userScore.map(o=> {
            return o.score.toFixed(2);
        });
        var personelAverageScoreValues = personelAverageScore.map(o=> {
            return o.score.toFixed(2);
        });
        var generalAverageScoreValues = generalAverageScore.map(o=> {
            return o.score.toFixed(2);
        });

        dataset.push({
            label: "User's Score",
            data: userScoreValues,
            backgroundColor: colorHash["score"].light,
            borderColor: colorHash["score"].dark,
            pointBackgroundColor: colorHash["score"].dark,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: colorHash["score"].dark
        });
        dataset.push({
            label: "Personals's Average Score",
            data: personelAverageScoreValues,
            backgroundColor: colorHash["companyScore"].light,
            borderColor: colorHash["companyScore"].dark,
            pointBackgroundColor: colorHash["companyScore"].dark,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: colorHash["companyScore"].dark
        });
        dataset.push({
            label: "Overall Average Score",
            data: generalAverageScoreValues,
            backgroundColor: colorHash["generalScore"].light,
            borderColor: colorHash["generalScore"].dark,
            pointBackgroundColor: colorHash["generalScore"].dark,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: colorHash["generalScore"].dark
        });

        data.datasets = dataset;

        return <Radar data={data} options={options}/>
    };
    getContent = function () {
        if (this.props.dataLoaded) {
            //return <Radar data={this.state.graphData} options={options}/>
            return this.createGraph();
        }
        else {
            return <LinearProgress mode="indeterminate" color="red"/>
        }
    };
    render = ()=> {
        var containerStyle = Object.assign(JSON.parse(JSON.stringify(s.GraphStyles.widgetContainer)), styles.chartContainer);
        return (
            <div style={containerStyle}>
                {this.getContent()}
            </div>
        )
    }
}

SpiderGraphWidget.propTypes = {
    data: React.PropTypes.object
}