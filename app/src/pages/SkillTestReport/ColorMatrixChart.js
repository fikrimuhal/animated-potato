/**
 * Created by MYigit on 9.9.2016.
 */
import React from 'react'
import * as s               from '../../layouts/style'
import colors from '../../utils/material-colors'
import * as _ from 'lodash'
const styles = {
    wday: {
        fontSize: "9px",
        fill: "#767676",
        direction: "rtl"
    },
    month: {
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
            return <text x="-3" y={y} style={styles.month}>{category}</text>
        });
        return content;
    };
    createYaxis = function () {
        var dy = 9;
        var i = 0;
        var content = this.props.data.map(item=> {
            if (i == 0) dy = 9; else dy += 13;
            i++;
            return <text text-anchor="middle" dx="-5" dy={dy} style={styles.wday}>{item.name} {item.lastName}</text>
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
        var matrix = categories.map(category=> {
            return <g transform={"translate(" + x + "," + y + ")"}>
                {
                    (()=> {
                        x += 13;
                        var index = 0;
                        var column = data.map(item=> {
                            var location = index++ * 13;
                            var score = _.filter(item.scores, q=> {

                                return q.category.category == category
                            })[0].score;

                            return this.createCell(11, 11, location, score);
                        })
                        return column;
                    })()
                }
            </g>
        });
        return matrix;
    };

    createCell = function (width, height, location, score) {
        var color = this.getColor(score);
        return <rect className="day" width={width} height={height} y={location} fill={color} data-score={score}></rect>;
    };
    getColor = function (score) {
        var normalizedScore = score / 100;
        var color = colors.grey.x400;
        if(normalizedScore==0)
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
        return (
            <div style={s.GraphStyles.widgetContainer}>
                <h5>Color Matrix</h5>

                <svg width="700" height={60+this.props.data.length * 15} className="">
                    <g transform="translate(80, 60)">
                        {/*<g transform="translate(0, 0)">*/}
                        {/*<rect className="day" width="11" height="11" y="0" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-10"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="13" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-11"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="26" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-12"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="39" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-13"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="52" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-14"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="65" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-15"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="78" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-16"></rect>*/}
                        {/*</g>*/}
                        {/*<g transform="translate(13, 0)">*/}
                        {/*<rect className="day" width="11" height="11" y="0" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-17"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="13" fill="#8cc665" data-count="2"*/}
                        {/*data-date="2016-07-18"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="26" fill="#8cc665" data-count="3"*/}
                        {/*data-date="2016-07-19"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="39" fill="#d6e685" data-count="1"*/}
                        {/*data-date="2016-07-20"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="52" fill="#8cc665" data-count="3"*/}
                        {/*data-date="2016-07-21"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="65" fill="#d6e685" data-count="1"*/}
                        {/*data-date="2016-07-22"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="78" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-23"></rect>*/}
                        {/*</g>*/}
                        {/*<g transform="translate(26, 0)">*/}
                        {/*<rect className="day" width="11" height="11" y="0" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-24"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="13" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-25"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="26" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-26"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="39" fill="#8cc665" data-count="3"*/}
                        {/*data-date="2016-07-27"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="52" fill="#8cc665" data-count="3"*/}
                        {/*data-date="2016-07-28"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="65" fill="#44a340" data-count="4"*/}
                        {/*data-date="2016-07-29"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="78" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-30"></rect>*/}
                        {/*</g>*/}
                        {/*<g transform="translate(39, 0)">*/}
                        {/*<rect className="day" width="11" height="11" y="0" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-07-31"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="13" fill="#44a340" data-count="4"*/}
                        {/*data-date="2016-08-01"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="26" fill="#1e6823" data-count="6"*/}
                        {/*data-date="2016-08-02"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="39" fill="#44a340" data-count="4"*/}
                        {/*data-date="2016-08-03"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="52" fill="#d6e685" data-count="1"*/}
                        {/*data-date="2016-08-04"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="65" fill="#1e6823" data-count="8"*/}
                        {/*data-date="2016-08-05"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="78" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-08-06"></rect>*/}
                        {/*</g>*/}
                        {/*<g transform="translate(52, 0)">*/}
                        {/*<rect className="day" width="11" height="11" y="0" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-08-07"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="13" fill="#1e6823" data-count="8"*/}
                        {/*data-date="2016-08-08"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="26" fill="#8cc665" data-count="2"*/}
                        {/*data-date="2016-08-09"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="39" fill="#8cc665" data-count="3"*/}
                        {/*data-date="2016-08-10"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="52" fill="#1e6823" data-count="21"*/}
                        {/*data-date="2016-08-11"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="65" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-08-12"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="78" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-08-13"></rect>*/}
                        {/*</g>*/}
                        {/*<g transform="translate(65, 0)">*/}
                        {/*<rect className="day" width="11" height="11" y="0" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-08-14"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="13" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-08-15"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="26" fill="#8cc665" data-count="3"*/}
                        {/*data-date="2016-08-16"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="39" fill="#8cc665" data-count="3"*/}
                        {/*data-date="2016-08-17"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="52" fill="#d6e685" data-count="1"*/}
                        {/*data-date="2016-08-18"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="65" fill="#8cc665" data-count="2"*/}
                        {/*data-date="2016-08-19"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="78" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-08-20"></rect>*/}
                        {/*</g>*/}
                        {/*<g transform="translate(78, 0)">*/}
                        {/*<rect className="day" width="11" height="11" y="0" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-08-21"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="13" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-08-22"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="26" fill="#1e6823" data-count="8"*/}
                        {/*data-date="2016-08-23"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="39" fill="#44a340" data-count="4"*/}
                        {/*data-date="2016-08-24"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="52" fill="#1e6823" data-count="8"*/}
                        {/*data-date="2016-08-25"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="65" fill="#1e6823" data-count="7"*/}
                        {/*data-date="2016-08-26"></rect>*/}
                        {/*<rect className="day" width="11" height="11" y="78" fill="#eeeeee" data-count="0"*/}
                        {/*data-date="2016-08-27"></rect>*/}
                        {/*</g>*/}
                        {this.createMatrix()}
                        {this.createXaxis()}
                        {this.createYaxis()}
                        {/*<text x="-3" y="-3" style={styles.month}>Java</text>*/}
                        {/*<text x="-3" y="-15" style={styles.month}>C#</text>*/}
                        {/*<text x="-3" y="-27" style={styles.month}>Back.</text>*/}
                        {/*<text x="-3" y="-39" style={styles.month}>Front.</text>*/}
                        {/*<text text-anchor="middle" dx="-45" dy="9" style={styles.wday}>Person</text>*/}
                        {/*<text text-anchor="middle" dx="-45" dy="22" style={styles.wday}>Fikrimuhal</text>*/}
                        {/*<text text-anchor="middle" dx="-45" dy="35" style={styles.wday}>Mesut</text>*/}
                        {/*<text text-anchor="middle" dx="-45" dy="48" style={styles.wday}>Ilgaz</text>*/}
                        {/*<text text-anchor="middle" dx="-45" dy="61" style={styles.wday}>Mücahit</text>*/}
                        {/*<text text-anchor="middle" dx="-45" dy="74" style={styles.wday}>Şükrü</text>*/}
                        {/*<text text-anchor="middle" dx="-45" dy="87" style={styles.wday}>Fatih</text>*/}
                    </g>
                </svg>
            </div>
        )
    }
}
ColorMatrixChart.propTypes = {
    data: React.PropTypes.object.isRequired
}