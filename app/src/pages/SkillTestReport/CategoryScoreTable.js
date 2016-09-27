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
            selectedCategory: props.selectedCategory
        };
    }

    componentWillReceiveProps = function (nextProps) {
        this.props = nextProps;
        //var selectedCategory = (nextProps.dataLoaded && this.getCategories().length > 0) ? this.getCategories()[0] : "";
        this.setState({
            selectedCategory: nextProps.selectedCategory
        })
    }

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
        //log("selectedCategory",selectedCategory , "data",this.props.data)
        var scoreList = _.filter(this.props.data, q=> {
            return q.category.category == selectedCategory
        })[0].results;
        scoreList = scoreList.map(item=> {
            var fullName = item.name + " " + item.lastname;
            if (item.participantId == -2) {
                fullName = "Average of Staffs"
            }
            else if (item.participantId == -4) {
                fullName = "Average of People"
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
                <TableRowColumn style={{width:"15%"}}>#{item.order}</TableRowColumn>
                <TableRowColumn style={{width:"50%",textAlign:"right"}}>{item.name}</TableRowColumn>
                <TableRowColumn>{(item.score * 100).toFixed(2)}</TableRowColumn>
            </TableRow>
        });
        return content;

    };

    createTable = function () {
        //var selectedCategory = this.getCategories()[this.state.currentCategoryIndex];
        var selectedCategory = this.state.selectedCategory;
        var _this = this;
        log("showCategorChangeBar",this.props.showCategorChangeBar);
        return <Table
            fixedHeader={true}
            fixedFooter={false}
            selectable={false}
            style={{width: "100%"}}
        >
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
                style={{minWidth: "220px",width:"100%"}}
            >
                { (()=> {
                    if (_this.props.showCategorChangeBar) {
                        return <TableRow>
                            <TableHeaderColumn colSpan="3"
                                               style={{whiteSpace: "normal", paddingLeft: 0, paddingRight: 0}}>
                                {this.getCategoryButtons()}
                            </TableHeaderColumn>
                        </TableRow>
                    }
                })()}

                <TableRow>
                    <TableHeaderColumn colSpan="3" tooltip="Score Table By Category Groups"
                                       style={{textAlign: 'left',whiteSpace:"normal"}}>
                        <h5 style={{color: colors.darkText.primary}}>{selectedCategory} Score Table</h5>
                    </TableHeaderColumn>
                </TableRow>
                <TableRow>
                    <TableHeaderColumn tooltip="Order"><b>Order</b></TableHeaderColumn>
                    <TableHeaderColumn tooltip="Name" ><b>Name</b></TableHeaderColumn>
                    <TableHeaderColumn tooltip="Score"><b>Score</b></TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={true}
                showRowHover={false}
                stripedRows={false}
                style={{width:"100%"}}
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
            var isSelected = category == this.props.selectedCategory;
            return <FlatButton label={category} labelStyle={{fontSize: "9px"}}
                               onClick={this.showCategoryResult(category)} primary={isSelected}
                               key={"btnCategory-" + category}></FlatButton>
        });
        return content;
    };
    showCategoryResult = category => ()=> {
        this.setState({
            selectedCategory: category
        });
    }
    render = ()=> {
        var minHeight = this.props.dataLoaded ? "410px":"50px";
        var containerStyle = Object.assign(JSON.parse(JSON.stringify(s.GraphStyles.widgetContainer)), {height: "inherit",minHeight:minHeight})
        return (
            <div style={containerStyle}>
                {this.getContent()}
            </div>
        )
    }
}

CategoryScoreTable.propTypes = {
    data: React.PropTypes.array,
    dataLoaded: React.PropTypes.bool,
    selectedCategory: React.PropTypes.string,
    showCategorChangeBar: React.PropTypes.bool
};
CategoryScoreTable.contextTypes = {
    userId: React.PropTypes.number,
    interviewId: React.PropTypes.number
}