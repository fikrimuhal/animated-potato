/**
 * Created by MYigit on 27.9.2016.
 */
import React from 'react'
import * as s from '../../layouts/style'
import log2   from '../../utils/log2'
import * as _ from 'lodash'
import colors from '../../utils/material-colors'
const log = log2("AnswersWidget")
const styles = {
    userLabel: {
        fontSize: "9px",
        fill: "#767676",
        direction: "rtl",
        unicodeBidi: "plaintext"
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

//SVG nin viewBoxu ayarlanacak
export default  class AnswersWidget extends React.Component {
    constructor(props) {
        super(props)
    }

    createXaxis = function () {
        var data = this.props.data;
        var users = data.map(user=> {
            return user.name + " " + user.lastName;
        });
        var i = 0;
        var content = users.map(user=> {
            var y = -1 * (i * 13 + 3);
            i++;
            return <text x="-3" y={y} style={styles.categoryLabel} key={"textUser-" + i}>{user}</text>
        });
        return content;
    };
    createYaxis = function () {
        var dy = 9;
        var i = 0;
        var questions = [];
        questions = this.props.data[0].answers.map(answer=> {
            return answer.question
        });
        questions = _.orderBy(questions, ['id'], ['asc']);
        //questions.sort();
        //log("questions",questions)
        var content = questions.map(question=> {
            if (i == 0) dy = 9; else dy += 13;
            i++;
            //var fullName = item.name + " " + item.lastName;
            //if (item.interviewId == -4)fullName = "Global Avg";
            //if (item.interviewId == -2)fullName = "Staffs Avg";
            return <text dx="-5" dy={dy} style={styles.userLabel} key={"questionLabel-" + i}>{question.title}</text>
        });
        return content;
    };
    createMatrix = function () {
        var data = this.props.data;
        var users = data.map(item=> {
            return {
                fullName: item.name + " " + item.lastName,
                interviewId: item.interviewId
            }
        });
        var x = 0, y = 0;
        var gCount = 0;
        var matrix = users.map(user=> {
            return <g transform={"translate(" + x + "," + y + ")"} key={"g-" + gCount}>
                {
                    (()=> {
                        x += 13;
                        var index = 0;
                        var answers = data[gCount].answers.map(ans=> {
                            ans.question.id = parseInt(ans.question.id);
                            return ans
                        });
                        //log("unsorted ansers",answers);
                        answers = _.orderBy(answers, (item)=> {
                            return item.question.id
                        }, ['asc']);
                        var column = answers.map(item=> {
                            var location = index++ * 13;
                            var value = item.value;
                            var key = "cell-" + index + "-int-" + user.interviewId;
                            // log("iid,qid,val",user.fullName,item.questionId,item.value)
                            return this.createCell(11, 11, location, value, key);
                        });
                        gCount++;
                        //log("sorted ansers",answers);
                        return column;
                    })()
                }
            </g>
        });
        return matrix;
    };

    createCell = function (width, height, location, value, key) {
        var color = this.getColor(value);
        return <rect className="day" width={width} height={height} y={location} fill={color} data-value={value}
                     key={key}></rect>;
    };
    getColor = function (value) {

        var color = colors.grey.x500;
        if (value == -1)
            color = colors.grey.x500;
        else if (value == 0)
            color = colors.red.x500;
        else if (value == 1)
            color = colors.green.x500;
        return color;
    };
    render = ()=> {
        //log("this.props.data", this.props.data);
        var answersData = this.props.data;

        return (

            <div style={s.GraphStyles.widgetContainer}>
                <h5>Answers</h5>
                {
                    (()=> {
                        if (this.props.dataLoaded) {
                            var height = 100 + answersData[0].answers.length * 15;
                            var width = 400 + answersData.length * 40;
                            //var viewBox = "0 -20 " + Math.floor(width / 2) + " " + Math.floor(height / 2);
                            return <svg width={width} height={height} className="">
                                <g transform="translate(400, 60)">
                                    {this.createMatrix()}
                                    {this.createXaxis()}
                                    {this.createYaxis()}
                                </g>
                            </svg>
                        }
                        else {
                            return <div>Yükleniyor</div>
                        }
                    })()
                }
            </div>
        )
    }
}

AnswersWidget.propTypes = {
    data: React.PropTypes.array,
    dataLoaded: React.PropTypes.bool
}