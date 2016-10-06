/**
 * Created by MYigit on 5.10.2016.
 */
import  React from 'react'
import {Row, Col} from 'react-flexbox-grid'
import moment from 'moment'
import  BarView from './BarView'
import PieView from './PieView'
export default  class ResultViewer extends React.Component {
    constructor(props) {
        super(props)
    }

    render = ()=> {
        var data = this.props.data;
        return (
            <div>
                <Row>
                    Mülakat tarihi : {moment(data.date)} <br/>
                    Skor: {data.overallScore.toFixed(4) * 100}
                </Row>
                <Row>
                    <Col lg={12} md={12}>
                        ´<BarView data={this.props.data}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} md={12}>
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