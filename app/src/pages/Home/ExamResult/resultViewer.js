/**
 * Created by MYigit on 5.10.2016.
 */
import  React from 'react'
import {Row, Col} from 'react-flexbox-grid'
import moment from 'moment'
import  BarView from './BarView'
import PieView from './PieView'
import log2  from '../../../utils/log2'
const log = log2("ResultViewer")
export default  class ResultViewer extends React.Component {
    constructor(props) {
        super(props)
    }

    render = ()=> {
        var data = this.props.data;
        log("rendered", data)
        return (
            <div>
                <Row>
                    <Col lg={6} md={4} style={{textAlign: "left"}}>
                        Skor: {data.overallScore.toFixed(4)*100}
                    </Col>
                    <Col lg={6} md={8} style={{textAlign: "right"}}>
                        Mülakat tarihi : <span>{moment(data.date).format("LLLL")}</span>
                    </Col>
                </Row><hr/>
                <Row>
                    <Col lg={6} md={6}>
                        <BarView data={this.props.data}/>
                    </Col>
                    <Col lg={6} md={6}>
                        <PieView data={this.props.data}/>
                    </Col>
                </Row>

            </div>
        )
    }
}

ResultViewer.propTypes = {
    data: React.PropTypes.object.isRequired
}