/**
 * Created by MYigit on 9.9.2016.
 */
import React from 'react'
import * as s               from '../../layouts/style'
import colors from '../../utils/material-colors'
import * as _ from 'lodash'
const styles = {
    userLabel: {
        fontSize: "9px",
        fill: "#767676",
        direction: "rtl",
        //textAnchor:"middle"
    },
    categoryLabel: {
        fontSize: "9px",
        fill: "#767676",
        transform: "rotate(90deg)",
        unicodeBidi: "plaintext",
        //textTransform: "uppercase",
        direction: "rtl"
    }
}
export default  class ColorMatrixChart extends React.Component {
    constructor(props) {
        super(props)
    }

    createXaxis = function () {
        var obj = this.props.data[0].scores;
        var categories = obj.map(x=> {
            return x.category.category;
        });
        var i = 0;
        var content = categories.map(category=> {
            var y = -1 * (i * 13 + 3);
            i++;
            return <text x="-3" y={y} style={styles.categoryLabel} key={"textCategory-"+i}>{category}</text>
        });
        return content;
    };
    createYaxis = function () {
        var dy = 9;
        var i = 0;
        var content = this.props.data.map(item=> {
            if (i == 0) dy = 9; else dy += 13;
            i++;
            return <text  dx="-5" dy={dy} style={styles.userLabel}>{item.name} {item.lastName}</text>
        });
        return content;
    };
    createMatrix = function () {
        var data = this.props.data;
        var obj = this.props.data[0].scores;
        var categories = obj.map(x=> {
            return x.category.category;
        });
        var x = 0, y = 0;
        var gCount = 0;
        var matrix = categories.map(category=> {
            return <g transform={"translate(" + x + "," + y + ")"} key={"g-"+gCount++}>
                {
                    (()=> {
                        x += 13;
                        var index = 0;
                        var column = data.map(item=> {
                            var location = index++ * 13;
                            var score = _.filter(item.scores, q=> {

                                return q.category.category == category
                            })[0].score;
                            var key = category  + index;
                            return this.createCell(11, 11, location, score,key);
                        })
                        return column;
                    })()
                }
            </g>
        });
        return matrix;
    };

    createCell = function (width, height, location, score,key) {
        var color = this.getColor(score);
        return <rect className="day" width={width} height={height} y={location} fill={color} data-score={score} key={key}></rect>;
    };
    getColor = function (score) {
        var normalizedScore = score;
        var color = colors.grey.x400;
        if(normalizedScore<=0)
            color = colors.grey.x400;
        else if(normalizedScore<0.25)
            color = colors.green.x200;
        else if(normalizedScore<0.50)
            color = colors.green.x400;
        else if(normalizedScore<0.75)
            color = colors.green.x600;
        else
            color = colors.green.x900;
        return color;
    };
    render = ()=> {

        var height = this.props.data.length * 60;
        var width = this.props.data[0].scores.length * 40;

        var viewBox = "0 -20 "+ Math.floor(width/2)+" "+ Math.floor(height/2);
        return (
            <div style={s.GraphStyles.widgetContainer}>
                <h5>Color Matrix</h5>

                <svg width={width} height={height} className="" viewBox={viewBox}>
                    <g transform="translate(80, 60)">
                        {this.createMatrix()}
                        {this.createXaxis()}
                        {this.createYaxis()}
                    </g>
                </svg>
            </div>
        )
    }
}
ColorMatrixChart.propTypes = {
    data: React.PropTypes.array.isRequired
}