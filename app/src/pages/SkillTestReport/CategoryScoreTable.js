/**
 * Created by MYigit on 9.9.2016.
 */
import  React from 'react'
import {
    Table, TableBody, TableFooter,
    TableHeader, TableHeaderColumn,
    TableRow, TableRowColumn
}
    from 'material-ui/Table';
import mockData  from '../../utils/mock_data'
import * as _ from 'lodash'
import log2 from '../../utils/log2'
import colors from '../../utils/material-colors'
import * as s from '../../layouts/style'
const log = log2("CategoryScoreTable");
export default  class CategoryScoreTable extends React.Component {
    constructor(props) {
        super(props);
        this.init();
    }

    init = function () {
        var categories = this.getCategories();
    };
    getCategories = function () {
        var firstPersonData = this.props.data[0];
        var categories = firstPersonData.scores.map(score=> {
            return score.category.category;
        });
        return categories;
    };
    getContent = function () {
        var selectedCategory = this.getCategories()[0];
        var scoreList = this.props.data.map((item, index)=> {
            var fullName = item.name + ' ' + item.lastName;
            var catScoreInfo = _.filter(item.scores, q => {
                return q.category.category == selectedCategory
            })[0];
            var score = catScoreInfo.score;
            return {
                name: fullName,
                score: score,
                userId: item.participantId,
                interviewId:item.interviewId,
                visible: false
            };
        });


        scoreList = _.orderBy(scoreList, ["score"]);
        scoreList.reverse();
        for (var i = 0; i < scoreList.length; i++) {
            var item = scoreList[i];
            //log("item.interviewId ->",item.interviewId,this.context.interviewId);
            if (scoreList.length <= 5) {
                item.visible = true;
            }
            else {
                if (item.interviewId == this.context.interviewId && i < 5) {
                    for (var j = 0; j < 5; j++) {
                        scoreList[j].visible = true;
                    }
                    break;
                }
                else if (i == 0 || i == 1 || i == (scoreList.length - 1)) {
                    item.visible = true;
                }
                else if (item.interviewId == this.context.interviewId) {
                    item.visible = true;
                    if (i > 0)scoreList[i - 1].visible = true;
                    if (i < (scoreList.length - 1))scoreList[i + 1].visible = true;
                    i++;
                }
                else {
                    item.visible = false;
                }
            }
        }
        ;

       // log("new scoreList", scoreList);

        var content = scoreList.map((item, index)=> {
            //log("userIds", item.userId, this.context.userId);
            var isCurrentUser = item.interviewId == this.context.interviewId;
            var backColor = isCurrentUser ? colors.yellow.x100 : colors.white.x100;
            var foreColor = isCurrentUser ? colors.orange.x500 : colors.blueGrey.x500;
            var border = isCurrentUser ? "2px dashed teal" : "none";
            if (index == (scoreList.length - 1) && !isCurrentUser) {
                backColor = colors.red.x100;
            }
            if (index == 0 && !isCurrentUser) {
                backColor = colors.lightGreen.x100;
            }
            var display = item.visible ? "" : "none";
            var style = {
                display: display,
                backgroundColor: backColor,
                color: foreColor,
                border: border
            };
            return <TableRow key={index + 1} style={style}>
                <TableRowColumn>#{index + 1}</TableRowColumn>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.score.toFixed(2)}</TableRowColumn>
            </TableRow>
        });
        return content;

    };
    render = ()=> {
        return (
            <div style={s.GraphStyles.widgetContainer}>
                <Table
                    height={500}
                    fixedHeader={true}
                    fixedFooter={false}
                    selectable={false}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="3" tooltip="Score Table By Category Groups"
                                               style={{textAlign: 'left'}}>
                                <h5 style={{color: colors.darkText.primary}}> Score Table By Category Groups</h5>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="Order"><b>#Order</b></TableHeaderColumn>
                            <TableHeaderColumn tooltip="Name"><b>Name</b></TableHeaderColumn>
                            <TableHeaderColumn tooltip="Score"><b>Score</b></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={false}
                        stripedRows={false}
                    >
                        {this.getContent()}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

CategoryScoreTable.propTypes = {
    data: React.PropTypes.array.isRequired
};
CategoryScoreTable.contextTypes = {
    userId: React.PropTypes.number,
    interviewId: React.PropTypes.number
}