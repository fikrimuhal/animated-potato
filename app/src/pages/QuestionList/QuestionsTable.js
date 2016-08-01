import React from 'react'
import FixedDataTable from 'fixed-data-table';
const {Table, Column, Cell} = FixedDataTable;

export default class QuestionsTable extends React.Component{
  constructor(props)
  {
    super(props);
  }
  render = function () {
    return(
      <Table
          rowHeight={150}
          rowsCount={this.props.data.length}
          width={1000}
          height={1000}
          headerHeight={50}>
        <Column
          header={<Cell>Title</Cell>}
          cell={({rowIndex, ...props}) =>
                  (<Cell {...props}>{this.props.data[rowIndex].title}</Cell>
          )}
          width={300} />
          <Column
            header={<Cell>Answer Type</Cell>}
            cell={({rowIndex, ...props}) =>
                    (<Cell {...props}>{this.props.data[rowIndex].type}</Cell>
            )}
            width={200} />
            <Column
              header={<Cell>Question Sets</Cell>}
              cell={({rowIndex, ...props}) =>
                      {
                      var setList = this.props.data[rowIndex].setList;
                      var arr = Object.keys(setList).map((key)=> {
                        return setList[key]
                      })
                        return (
                          <Cell {...props}>
                            {
                                  arr.map((setName) => {
                                    return (
                                      <span>{setName},</span>
                                    )
                                  })
                                }
                        </Cell>
                        )

                      }
            }
              width={140} />
              <Column
                header={<Cell>Category Weights</Cell>}
                cell={({rowIndex, ...props}) =>
                        {
                        var categoryList = this.props.data[rowIndex].categoryWeights;
                        var arr = Object.keys(categoryList).map((key)=> {
                          return categoryList[key]
                        })
                          return (
                            <Cell {...props}>
                              {
                                  arr.map((item) => {
                                      return (
                                        <span>{item.category}<br/></span>
                                      )
                                    })
                                  }
                          </Cell>
                          )

                        }
              }
                width={140}
                height={80}
                 />
      </Table>

    )

  }
}

QuestionsTable.propTypes = {
  data : React.PropTypes.array.isRequired
}
