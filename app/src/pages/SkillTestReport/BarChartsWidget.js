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
import * as _               from 'lodash'
const log = log2("BarChartsWidget");
var labelHash = {
    "score": "This Person",
    "companyScore": "Avarage of Fikrimuhal's Staffs",
    "generalScore": "Avarage of All Person"
};
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
export default  class BarChartsWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    createGraph = function () {
        var dataset = [];
        var data = {};
        //3 katmanda kategorilere göre sıralanıyor
        var userScore  = _.sortBy(this.props.data["userScore"],o=>{return o.category.category});
        var personelAverageScore  = _.sortBy(this.props.data["personnelAverage"],o=>{return o.category.category});
        var generalAverageScore  = _.sortBy(this.props.data["overallAverage"],o=>{return o.category.category});
        //Grafikte gözükecek etiketler
        data.labels = userScore.map(item=> {
            return item.category.category
        });
        //log("labels sorted->",data.labels);

        var userScoreValues = userScore.map(o=>{return o.score.toFixed(2);});
        var personelAverageScoreValues = personelAverageScore.map(o=>{return o.score.toFixed(2);});
        var generalAverageScoreValues = generalAverageScore.map(o=>{return o.score.toFixed(2);});

        dataset.push({
            label: "User's Score",
            data: userScoreValues,
            backgroundColor: colorHash["score"].dark,
            borderColor: colorHash["score"].dark,
            borderWidth: 2,
            hoverBackgroundColor: colorHash["score"].light,
            hoverBorderColor: colorHash["score"].dark
        });
        dataset.push({
            label: "Personals's Average Score",
            data: personelAverageScoreValues,
            backgroundColor: colorHash["companyScore"].dark,
            borderColor: colorHash["companyScore"].dark,
            borderWidth: 1,
            hoverBackgroundColor: colorHash["companyScore"].light,
            hoverBorderColor: colorHash["companyScore"].dark
        });
        dataset.push({
            label: "Overall Average Score",
            data: generalAverageScoreValues,
            backgroundColor: colorHash["generalScore"].dark,
            borderColor: colorHash["generalScore"].dark,
            borderWidth: 1,
            hoverBackgroundColor: colorHash["generalScore"].light,
            hoverBorderColor: colorHash["generalScore"].dark
        });

        // ["score", "companyScore", "generalScore"].forEach(scoreType=> {
        //
        //     var values = this.props.data[scoreType].map(valueItem=> {
        //         return parseFloat(valueItem.score.toPrecision(2));
        //     });
        //     dataset.push({
        //         label: labelHash[scoreType],
        //         data: values,
        //         backgroundColor: colorHash[scoreType].dark,
        //         borderColor: colorHash[scoreType].dark,
        //         borderWidth: 1,
        //         hoverBackgroundColor: colorHash[scoreType].light,
        //         hoverBorderColor: colorHash[scoreType].dark
        //     })
        // });
        data.datasets = dataset;

        return <Bar
            data={data}
            width={100}
            height={300}
            options={{
                maintainAspectRatio: false
            }}
        />;
    };
    getContent = function () {
        if (this.props.dataLoaded) {
            return this.createGraph();
        }
        else {
            return <LinearProgress mode="indeterminate" color="red"/>
        }
    };
    render = ()=> {
        return (
            <div style={s.GraphStyles.widgetContainer}>
                {this.getContent()}
            </div>
        )
    }
}
BarChartsWidget.propTypes = {
    data: React.PropTypes.object
};