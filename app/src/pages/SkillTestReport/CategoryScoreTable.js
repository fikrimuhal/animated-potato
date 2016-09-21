/**
 * Created by MYigit on 9.9.2016.
 */
import  React           from 'react'
import {
    Table, TableBody, TableFooter,
    TableHeader, TableHeaderColumn,
    TableRow, TableRowColumn
}                        from 'material-ui/Table';
import mockData         from '../../utils/mock_data'
import * as _           from 'lodash'
import log2             from '../../utils/log2'
import colors           from '../../utils/material-colors'
import * as s           from '../../layouts/style'
import LinearProgress   from 'material-ui/LinearProgress';
import FlatButton       from 'material-ui/FlatButton'
const log = log2("CategoryScoreTable");
export default  class CategoryScoreTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //categoryCount: 0,
            //currentCategoryIndex: 0,
            selectedCategory: ""
        };
    }

    componentWillReceiveProps = function (nextProps) {
        //log("componentWillReceiveProps",nextProps);
        this.props = nextProps;
        var categoryCount = (nextProps.dataLoaded) ? this.getCategories().length : 0;
        var selectedCategory = (nextProps.dataLoaded && this.getCategories().length > 0) ? this.getCategories()[0] : "";
        this.setState({
            //categoryCount: categoryCount,
            //currentCategoryIndex: 0
            selectedCategory: selectedCategory
        })
    }
    componentDidMount = ()=> {

        // setInterval(()=> {
        //     var current = this.state.currentCategoryIndex;
        //     var last = this.state.categoryCount;
        //     if (current < last - 1)
        //         current++;
        //     else
        //         current = 0;
        //     this.setState({
        //         currentCategoryIndex: current
        //     });
        // }, 10000);
    };

    getCategories = function () {
        // var firstPersonData = this.props.data[0];
        // var categories = firstPersonData.scores.map(score=> {
        //     return score.category.category;
        // });
        var categories = this.props.data.map(item=> {
            return item.category.category
        });
        return categories;
    };
    createTableBody = function () {
        //var selectedCategory = this.getCategories()[this.state.currentCategoryIndex];
        var selectedCategory = this.state.selectedCategory;
        var scoreList = _.filter(this.props.data, q=> {
            return q.category.category == selectedCategory
        })[0].results;
        scoreList = scoreList.map(item=> {
            var fullName = item.name + " " + item.lastname;
            if (item.participantId == -2) {
                fullName = "Average of All Staff"
            }
            else if (item.participantId == -4) {
                fullName = "Average of All Person"
            }
            return {
                name: fullName,
                score: item.score,
                userId: item.participantId,
                interviewId: item.interviewId,
                order: item.order,
                visible: true
            };
        });
        scoreList = _.orderBy(scoreList, ["order"]);
        //scoreList.reverse();


        // var scoreList = this.props.data.map((item, index)=> {
        //     var fullName = item.name + ' ' + item.lastName;
        //     var catScoreInfo = _.filter(item.scores, q => {
        //         return q.category.category == selectedCategory
        //     })[0];
        //     var score = catScoreInfo.score;
        //     return {
        //         name: fullName,
        //         score: score,
        //         userId: item.participantId,
        //         interviewId: item.interviewId,
        //         visible: false
        //     };
        // });
        //
        //
        // scoreList = _.orderBy(scoreList, ["score"]);
        // scoreList.reverse();
        // for (var i = 0; i < scoreList.length; i++) {
        //     var item = scoreList[i];
        //     //log("item.interviewId ->",item.interviewId,this.context.interviewId);
        //     if (scoreList.length <= 5) {
        //         item.visible = true;
        //     }
        //     else {
        //         if (item.interviewId == this.context.interviewId && i < 5) {
        //             for (var j = 0; j < 5; j++) {
        //                 scoreList[j].visible = true;
        //             }
        //             break;
        //         }
        //         else if (i == 0 || i == 1 || i == (scoreList.length - 1)) {
        //             item.visible = true;
        //         }
        //         else if (item.interviewId == this.context.interviewId) {
        //             item.visible = true;
        //             if (i > 0)scoreList[i - 1].visible = true;
        //             if (i < (scoreList.length - 1))scoreList[i + 1].visible = true;
        //             i++;
        //         }
        //         else {
        //             item.visible = false;
        //         }
        //     }
        // }


        // log("new scoreList", scoreList);

        var content = scoreList.map((item, index)=> {
            //log("userIds", item.userId, this.context.userId);
            var isCurrentUser = item.interviewId == this.context.interviewId;
            var isStaffAvg = item.interviewId == -2;
            var isGeneralAvg = item.interviewId == -4;

            var backColor = isCurrentUser ? colors.yellow.x100 : colors.white.x100;
            var foreColor = isCurrentUser ? colors.orange.x500 : colors.blueGrey.x800;
            var border = isCurrentUser ? "2px dashed teal" : "none";

            if (isStaffAvg)
                backColor = colors.grey.x300;
            if (isGeneralAvg)
                backColor = colors.grey.x100;
            if (index == (scoreList.length - 1) && !isCurrentUser)
                backColor = colors.red.x100;
            if (index == 0 && !isCurrentUser)
                backColor = colors.lightGreen.x100;


            var display = item.visible ? "" : "none";
            var style = {
                display: display,
                backgroundColor: backColor,
                color: foreColor,
                border: border
            };
            return <TableRow key={index + 1} style={style}>
                <TableRowColumn style={{width: "10%"}}>#{item.order}</TableRowColumn>
                <TableRowColumn style={{width: "70%"}}>{item.name}</TableRowColumn>
                <TableRowColumn style={{width: "20%"}}>{(item.score * 100).toFixed(2)}</TableRowColumn>
            </TableRow>
        });
        return content;

    };

    createTable = function () {
        //var selectedCategory = this.getCategories()[this.state.currentCategoryIndex];
        var selectedCategory = this.state.selectedCategory;
        return <Table
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
                    <TableHeaderColumn colSpan="3" style={{whiteSpace: "normal",paddingLeft:0,paddingRight:0}}>
                        {this.getCategoryButtons()}
                    </TableHeaderColumn>
                </TableRow>
                <TableRow>
                    <TableHeaderColumn colSpan="3" tooltip="Score Table By Category Groups"
                                       style={{textAlign: 'left'}}>
                        <h5 style={{color: colors.darkText.primary}}>{selectedCategory} Score Table</h5>
                    </TableHeaderColumn>
                </TableRow>
                <TableRow>
                    <TableHeaderColumn tooltip="Order" style={{width: "10%"}}><b>#Order</b></TableHeaderColumn>
                    <TableHeaderColumn tooltip="Name" style={{width: "70%"}}><b>Name</b></TableHeaderColumn>
                    <TableHeaderColumn tooltip="Score" style={{width: "20%"}}><b>Score (#/100)</b></TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={true}
                showRowHover={false}
                stripedRows={false}
            >
                {this.createTableBody()}
            </TableBody>
        </Table>
    }

    getContent = function () {
        if (this.props.dataLoaded) {
            return this.createTable();
        }
        else {
            return <LinearProgress mode="indeterminate" color="red"/>
        }
    }

    getCategoryButtons = function () {
        var content = this.getCategories().map(category=> {
            var isSelected  = category == this.state.selectedCategory;
            return <FlatButton label={category} labelStyle={{fontSize: "9px"}}
                               onClick={this.showCategoryResult(category)} primary={isSelected}></FlatButton>
        });
        return content;
    };
    showCategoryResult = category => ()=> {
        this.setState({
            selectedCategory: category
        });
    }
    render = ()=> {

        return (
            <div style={s.GraphStyles.widgetContainer}>
                {this.getContent()}
            </div>
        )
    }
}

CategoryScoreTable.propTypes = {
    data: React.PropTypes.array.isRequired,
    dataLoaded: React.PropTypes.bool
};
CategoryScoreTable.contextTypes = {
    userId: React.PropTypes.number,
    interviewId: React.PropTypes.number
}