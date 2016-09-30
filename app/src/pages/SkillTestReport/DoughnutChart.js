/**
 * Created by MYigit on 8.9.2016.
 */
import  React from 'react'
import * as mockApi         from '../../utils/mock_api'
import LinearProgress       from 'material-ui/LinearProgress';
import log2                 from '../../utils/log2'
import {Doughnut}              from 'react-chartjs-2'
import * as util            from '../../utils/utils'

const log = log2("DoughnutChart");
export default  class DoughnutChart extends React.Component {
    constructor(props) {
        super(props)
    }

    render = ()=> {
        return (
            <div>
                <Doughnut data={this.props.data}/>
            </div>
        )
    }
}
DoughnutChart.propTypes = {
    data: React.PropTypes.object.isRequired
}
